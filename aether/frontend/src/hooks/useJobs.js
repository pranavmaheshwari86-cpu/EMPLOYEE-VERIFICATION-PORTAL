import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '../services/job.service';
import toast from 'react-hot-toast';

export const useJobs = (params) => {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => jobService.getJobs(params),
    keepPreviousData: true,
  });
};

export const useEmployerJobs = (params) => {
  return useQuery({
    queryKey: ['employer-jobs', params],
    queryFn: () => jobService.getEmployerJobs(params),
  });
};

export const useJobDetails = (id) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => jobService.getJobById(id),
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => jobService.createJob(data),
    onSuccess: () => {
      toast.success('Job posted successfully');
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
