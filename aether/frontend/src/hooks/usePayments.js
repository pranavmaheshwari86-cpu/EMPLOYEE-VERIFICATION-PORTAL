import { useQuery, useMutation } from '@tanstack/react-query';
import { paymentService } from '../services/payment.service';
import toast from 'react-hot-toast';

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: (plan) => paymentService.createCheckout(plan),
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
};

export const useBilling = () => {
  return useQuery({
    queryKey: ['billing'],
    queryFn: () => paymentService.getBilling(),
  });
};

export const useCreatePortalSession = () => {
  return useMutation({
    mutationFn: () => paymentService.createPortalSession(),
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });
};
