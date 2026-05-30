import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { uploadToCloudinary } from '../services/upload.service.js';
import { analyzeApplication } from '../services/ai.service.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

// @desc    Apply for a job
// @route   POST /api/applications/:jobId
// @access  Private (Employee)
export const applyForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id
    });

    if (existingApplication) {
      res.status(400);
      throw new Error('You have already applied for this job');
    }

    // Handle resume upload
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a resume');
    }

    const resumeUrl = await uploadToCloudinary(req.file.buffer, 'resumes');

    // Parse PDF text
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    // Run AI analysis
    const aiAnalysis = await analyzeApplication(resumeText, job);

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resumeUrl,
      coverLetter: req.body.coverLetter,
      aiAnalysis
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications for a job (Employer)
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer)
export const getJobApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email profileImage')
      .sort({ 'aiAnalysis.matchScore': -1 }); // Sort by AI match score by default

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};
