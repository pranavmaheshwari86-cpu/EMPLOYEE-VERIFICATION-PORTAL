import Job from '../models/Job.js';

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Employer)
export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      employer: req.user._id,
    });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all active jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res, next) => {
  try {
    const { search, type } = req.query;
    
    let query = { status: 'active' };

    if (search) {
      query.$text = { $search: search };
    }
    
    if (type) {
      query.jobType = type;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email profileImage');
    
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }
    
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};
