import api from './api';

export const applicationService = {
  applyToJob: async (jobId, data) => {
    // data might be FormData if uploading resume
    const response = await api.post(`/applications/job/${jobId}`, data, {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    });
    return response.data;
  },

  getMyApplications: async (params) => {
    const response = await api.get('/applications/me', { params });
    return response.data;
  },

  getEmployerApplications: async (params) => {
    const response = await api.get('/applications/employer', { params });
    return response.data;
  },

  updateApplicationStatus: async (id, status) => {
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data;
  }
};
