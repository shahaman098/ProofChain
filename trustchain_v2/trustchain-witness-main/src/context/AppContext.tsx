import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { peraWallet } from '@/lib/algorand';

export interface Report {
  id: string;
  txId: string;
  submitter: string;
  isAnonymous: boolean;
  category: string;
  message: string;
  location?: string;
  timestamp: string;
  incidentDate?: string;
  incidentTime?: string;
  policeRef?: string;
  ipfsCid?: string;
  verified: boolean;
  status: 'Confirmed' | 'Pending' | 'Under Review';
  trustScore: number;
  name?: string;
  contact?: string;
}

interface AppContextType {
  // Wallet state
  accountAddress: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  
  // Reports state
  reports: Report[];
  addReport: (report: Report) => void;
  isLoadingReports: boolean;
  
  // Analytics
  totalReports: number;
  anonymousReports: number;
  verifiedReports: number;
  totalTrustScore: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(false);

  // Load reports from localStorage on mount
  useEffect(() => {
    const storedReports = localStorage.getItem('trustchain_reports');
    if (storedReports) {
      try {
        setReports(JSON.parse(storedReports));
      } catch (error) {
        console.error('Error loading reports from storage:', error);
      }
    }
  }, []);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem('trustchain_reports', JSON.stringify(reports));
    }
  }, [reports]);

  // Reconnect wallet on mount
  useEffect(() => {
    const reconnect = async () => {
      try {
        const accounts = await peraWallet.reconnectSession();
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
        }
      } catch (error) {
        console.log('No previous session found');
      } finally {
        setIsConnecting(false);
      }
    };

    reconnect();

    // Listen for disconnect events
    peraWallet.connector?.on('disconnect', () => {
      setAccountAddress(null);
    });
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      setAccountAddress(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    try {
      await peraWallet.disconnect();
      setAccountAddress(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw error;
    }
  };

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
  };

  // Calculate analytics
  const totalReports = reports.length;
  const anonymousReports = reports.filter(r => r.isAnonymous).length;
  const verifiedReports = reports.filter(r => r.verified).length;
  const totalTrustScore = reports.reduce((sum, r) => sum + r.trustScore, 0);

  return (
    <AppContext.Provider
      value={{
        accountAddress,
        isConnecting,
        connectWallet,
        disconnectWallet,
        reports,
        addReport,
        isLoadingReports,
        totalReports,
        anonymousReports,
        verifiedReports,
        totalTrustScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
