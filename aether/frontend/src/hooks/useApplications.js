import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '../services/application.service';
import toast from 'react-hot-toast';

export const useMyApplications = (params) => {
  return useQuery({
    queryKey: ['my-applications', params],
    queryFn: () => applicationService.getMyApplications(params),
  });
};

export const useEmployerApplications = (params) => {
  return useQuery({
    queryKey: ['employer-applications', params],
    queryFn: () => applicationService.getEmployerApplications(params),
  });
};

export const useApplyToJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ jobId, data }) => applicationService.applyToJob(jobId, data),
    onSuccess: () => {
      toast.success('Application submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }) => applicationService.updateApplicationStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries({ queryKey: ['employer-applications'] });
    },
  });
};
