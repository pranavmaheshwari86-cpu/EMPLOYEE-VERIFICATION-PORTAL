import api from './api';

export const aiService = {
  analyzeResume: async (jobId) => {
    const response = await api.post('/ai/analyze-resume', { jobId });
    return response.data;
  },

  generateInterview: async (applicationId) => {
    const response = await api.post(`/ai/generate-interview/${applicationId}`);
    return response.data;
  },

  checkFraud: async (applicationId) => {
    const response = await api.post(`/ai/fraud-check/${applicationId}`);
    return response.data;
  },

  rankCandidates: async (jobId) => {
    const response = await api.get(`/ai/rank-candidates/${jobId}`);
    return response.data;
  }
};
