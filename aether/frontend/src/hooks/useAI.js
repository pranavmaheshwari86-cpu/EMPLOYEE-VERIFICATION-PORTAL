import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService } from '../services/ai.service';
import toast from 'react-hot-toast';

export const useAnalyzeResume = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (jobId) => aiService.analyzeResume(jobId),
    onSuccess: () => {
      toast.success('AI Analysis Complete');
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
      queryClient.invalidateQueries({ queryKey: ['employer-applications'] });
    },
    onError: (err) => {
      toast.error('AI Analysis Failed: ' + (err.response?.data?.message || err.message));
    }
  });
};

export const useGenerateInterview = () => {
  return useMutation({
    mutationFn: (applicationId) => aiService.generateInterview(applicationId),
    onSuccess: () => toast.success('Interview Questions Generated'),
  });
};

export const useFraudCheck = () => {
  return useMutation({
    mutationFn: (applicationId) => aiService.checkFraud(applicationId),
    onSuccess: () => toast.success('Fraud Analysis Complete'),
  });
};

export const useRankCandidates = (jobId) => {
  return useQuery({
    queryKey: ['rank-candidates', jobId],
    queryFn: () => aiService.rankCandidates(jobId),
    enabled: !!jobId,
  });
};
