/**
 * Backend API Integration for TrustChain
 * 
 * This module handles communication with the backend API server
 */

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface Report {
  id: string;
  message: string;
  txId: string;
  timestamp: number;
  isAnonymous: boolean;
  policeRef?: string;
  ipfsCid?: string;
  incidentDate?: string;
  status: 'pending' | 'confirmed' | 'failed';
  accountAddress?: string;
}

export interface ReportSubmission {
  message: string;
  txId: string;
  timestamp: number;
  isAnonymous: boolean;
  policeRef?: string;
  ipfsCid?: string;
  incidentDate?: Date;
  accountAddress?: string;
}

export interface AnalyticsData {
  totalReports: number;
  reportsThisMonth: number;
  anonymousReports: number;
  reportsWithEvidence: number;
  recentActivity: Report[];
}

/**
 * Submit a report to the backend after blockchain confirmation
 */
export async function submitReportToBackend(report: ReportSubmission): Promise<Report> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...report,
        incidentDate: report.incidentDate?.toISOString(),
        status: 'confirmed'
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend submission failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting report to backend:', error);
    throw error;
  }
}

/**
 * Get all reports from the backend
 */
export async function getReports(): Promise<Report[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch reports: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
}

/**
 * Get analytics data from the backend
 */
export async function getAnalytics(): Promise<AnalyticsData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analytics`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

/**
 * Search reports by keyword
 */
export async function searchReports(query: string): Promise<Report[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching reports:', error);
    throw error;
  }
}

/**
 * Get a specific report by ID
 */
export async function getReport(id: string): Promise<Report> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch report: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
}

/**
 * Update report status
 */
export async function updateReportStatus(id: string, status: Report['status']): Promise<Report> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update report status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating report status:', error);
    throw error;
  }
}
