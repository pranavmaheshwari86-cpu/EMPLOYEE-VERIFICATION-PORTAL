import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending',
    },
    aiAnalysis: {
      matchScore: { type: Number, default: 0 },
      atsScore: { type: Number, default: 0 },
      missingSkills: [String],
      strengths: [String],
      summary: String,
      suggestedImprovements: [String],
      interviewQuestions: [String],
      hiringRecommendation: String,
      fraudRiskScore: { type: Number, default: 0 },
      fraudRiskLevel: { type: String, default: 'low' },
      fraudFlags: [{
        type: { type: String },
        description: String,
        severity: String,
      }],
      skillsMatch: {
        matched: [String],
        missing: [String],
        score: { type: Number, default: 0 },
      },
      experienceMatch: {
        detected: String,
        required: String,
        score: { type: Number, default: 0 },
      },
      keywords: {
        found: [String],
        missing: [String],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
