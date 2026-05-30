import api from './api';

export const paymentService = {
  createCheckout: async (plan) => {
    const response = await api.post('/payments/create-checkout', { plan });
    return response.data;
  },

  getBilling: async () => {
    const response = await api.get('/payments/billing');
    return response.data;
  },

  createPortalSession: async () => {
    const response = await api.post('/payments/portal');
    return response.data;
  }
};
