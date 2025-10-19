/**
 * Custom hook for managing report submissions with blockchain and backend integration
 */

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { submitReport } from '@/lib/algorand';
import { 
  submitReportToBackend, 
  getReports, 
  getAnalytics,
  searchReports,
  type ReportSubmission 
} from '@/lib/api';
import { uploadToIPFS } from '@/lib/ipfs';

export interface UseReportSubmissionOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useReportSubmission(options?: UseReportSubmissionOptions) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async ({
      message,
      accountAddress,
      isAnonymous = false,
      policeRef,
      evidenceFile,
      incidentDate,
    }: {
      message: string;
      accountAddress: string;
      isAnonymous?: boolean;
      policeRef?: string;
      evidenceFile?: File;
      incidentDate?: Date;
    }) => {
      let ipfsCid: string | undefined;
      
      // Upload evidence to IPFS if provided
      if (evidenceFile) {
        ipfsCid = await uploadToIPFS(evidenceFile);
      }
      
      // Submit to blockchain
      const { txId, reportData } = await submitReport(
        message,
        accountAddress,
        isAnonymous,
        policeRef,
        ipfsCid,
        incidentDate
      );
      
      // Submit to backend
      const backendReport = await submitReportToBackend(reportData);
      
      return { txId, backendReport, ipfsCid };
    },
    onSuccess: (data) => {
      // Invalidate and refetch reports
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });

  return {
    submitReport: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}

export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSearchReports(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchReports(query),
    enabled: query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
