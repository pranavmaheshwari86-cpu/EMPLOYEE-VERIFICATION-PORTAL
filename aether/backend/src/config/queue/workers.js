import { Worker } from 'bullmq';
import { redis } from '../redis.js';
import logger from '../../utils/logger.js';
// Import services to handle jobs
import { analyzeResume } from '../../services/ats.service.js';
import { detectFraud } from '../../services/fraud.service.js';
import { generateInterviewQuestions } from '../../services/interview.service.js';
import { sendWelcomeEmail, sendVerificationEmail, sendPasswordResetEmail, sendApplicationUpdate, sendAIAnalysisComplete } from '../../services/email.service.js';
import Application from '../../models/Application.js';
import Notification from '../../models/Notification.js';

const connection = redis;

export const setupWorkers = () => {
  // 1. AI Worker
  const aiWorker = new Worker('AI_Processing_Queue', async (job) => {
    logger.info(`Processing AI Job ${job.id} of type ${job.name}`);
    
    if (job.name === 'ats_analysis') {
      const { resumeText, jobDetails, applicationId } = job.data;
      const result = await analyzeResume(resumeText, jobDetails);
      
      await Application.findByIdAndUpdate(applicationId, {
        aiAnalysis: result
      });
      return result;
    } 
    
    if (job.name === 'fraud_detection') {
      const { resumeText, applicantHistory, applicationId } = job.data;
      const result = await detectFraud(resumeText, applicantHistory);
      
      await Application.findByIdAndUpdate(applicationId, {
        'aiAnalysis.fraudRiskScore': result.fraudRiskScore,
        'aiAnalysis.fraudRiskLevel': result.riskLevel,
        'aiAnalysis.fraudFlags': result.flags
      });
      return result;
    }
    
    if (job.name === 'interview_generation') {
      const { resumeText, jobDetails, candidateSkills, applicationId } = job.data;
      const result = await generateInterviewQuestions(resumeText, jobDetails, candidateSkills);
      
      await Application.findByIdAndUpdate(applicationId, {
        'aiAnalysis.interviewQuestions': JSON.stringify(result)
      });
      return result;
    }
  }, { 
    connection,
    concurrency: 5,
    limiter: {
      max: 10,
      duration: 1000,
    }
  });

  // 2. Email Worker
  const emailWorker = new Worker('Email_Notification_Queue', async (job) => {
    logger.info(`Processing Email Job ${job.id}`);
    const { type, to, name, token, url, jobTitle, status, matchScore } = job.data;
    
    switch (type) {
      case 'welcome':
        return await sendWelcomeEmail(to, name);
      case 'verification':
        return await sendVerificationEmail(to, name, token);
      case 'password_reset':
        return await sendPasswordResetEmail(to, name, url);
      case 'application_update':
        return await sendApplicationUpdate(to, name, jobTitle, status);
      case 'ai_analysis_complete':
        return await sendAIAnalysisComplete(to, name, jobTitle, matchScore);
      default:
        throw new Error('Unknown email job type');
    }
  }, { connection, concurrency: 10 });

  // 3. Notification Worker (Could be fraud alert or general system notification)
  const fraudWorker = new Worker('Fraud_Detection_Queue', async (job) => {
    logger.info(`Processing Notification Job ${job.id}`);
    const { userId, title, message, type, relatedId } = job.data;
    
    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type,
      relatedId
    });
    
    return notification;
  }, { connection });

  // Error handling
  const workers = [aiWorker, emailWorker, fraudWorker];
  workers.forEach(w => {
    w.on('completed', job => {
      logger.info(`Job ${job.id} completed successfully`);
    });
    w.on('failed', (job, err) => {
      logger.error(`Job ${job.id} failed: ${err.message}`);
    });
    w.on('error', err => {
      logger.error(`Worker error: ${err.message}`);
    });
  });

  return workers;
};
