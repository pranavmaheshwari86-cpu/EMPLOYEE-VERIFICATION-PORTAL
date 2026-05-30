import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { analyzeResume, rankCandidates } from '../services/ats.service.js';
import { generateInterviewQuestions } from '../services/interview.service.js';
import { detectFraud } from '../services/fraud.service.js';
import { aiQueue } from '../config/queue/queue.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

// @desc    Run ATS analysis on an application
// @route   POST /api/ai/analyze-resume
// @access  Employer, Admin
export const analyzeApplicationResume = async (req, res) => {
  try {
    const { applicationId } = req.body;

    const application = await Application.findById(applicationId).populate('job').populate('applicant', 'name email');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const job = application.job;

    // Fetch resume PDF from Cloudinary URL and parse
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(application.resumeUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    // Add to BullMQ
    await aiQueue.add('ats_analysis', {
      resumeText,
      jobDetails: job,
      applicationId: application._id
    });

    res.status(202).json({ success: true, message: 'ATS analysis queued successfully' });
  } catch (error) {
    console.error("Analyze Resume Error:", error.message);
    res.status(500).json({ message: 'AI analysis failed', error: error.message });
  }
};

// @desc    Generate interview questions for an application
// @route   POST /api/ai/generate-interview/:applicationId
// @access  Employer, Admin
export const generateInterview = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId).populate('job');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const job = application.job;

    const fetch = (await import('node-fetch')).default;
    const response = await fetch(application.resumeUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    const candidateSkills = application.aiAnalysis?.skillsMatch?.matched || [];

    await aiQueue.add('interview_generation', {
      resumeText,
      jobDetails: job,
      candidateSkills,
      applicationId: application._id
    });

    res.status(202).json({ success: true, message: 'Interview generation queued successfully' });
  } catch (error) {
    console.error("Generate Interview Error:", error.message);
    res.status(500).json({ message: 'Interview generation failed', error: error.message });
  }
};

// @desc    Run fraud detection on an application
// @route   POST /api/ai/fraud-check/:applicationId
// @access  Admin
export const fraudCheck = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId).populate('job').populate('applicant', 'name email');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const fetch = (await import('node-fetch')).default;
    const response = await fetch(application.resumeUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    // Get applicant's previous applications for history analysis
    const previousApps = await Application.find({
      applicant: application.applicant._id,
      _id: { $ne: application._id }
    }).populate('job', 'title');

    const applicantHistory = previousApps.map(app => ({
      jobTitle: app.job?.title || 'Unknown',
      date: app.createdAt?.toISOString().split('T')[0] || 'Unknown',
      matchScore: app.aiAnalysis?.matchScore || 0,
    }));

    await aiQueue.add('fraud_detection', {
      resumeText,
      applicantHistory,
      applicationId: application._id
    });

    res.status(202).json({ success: true, message: 'Fraud check queued successfully' });
  } catch (error) {
    console.error("Fraud Check Error:", error.message);
    res.status(500).json({ message: 'Fraud check failed', error: error.message });
  }
};

// @desc    Rank all candidates for a job
// @route   GET /api/ai/rank-candidates/:jobId
// @access  Employer, Admin
export const rankJobCandidates = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applications = await Application.find({ job: req.params.jobId }).populate('applicant', 'name email profileImage');

    if (applications.length === 0) {
      return res.json({ success: true, rankings: [], message: 'No applications found for this job.' });
    }

    const rankings = await rankCandidates(applications, job);

    res.json({ success: true, rankings });
  } catch (error) {
    console.error("Rank Candidates Error:", error.message);
    res.status(500).json({ message: 'Ranking failed', error: error.message });
  }
};
