import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
      required: true,
    },
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' }
    },
    requiredSkills: [{
      type: String,
    }],
    requiredExperience: {
      type: Number, // in years
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'active'
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for searching
jobSchema.index({ title: 'text', description: 'text', requiredSkills: 'text' });

const Job = mongoose.model('Job', jobSchema);
export default Job;
