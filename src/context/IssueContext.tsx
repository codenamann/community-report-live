import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Issue, mockIssues, mockStats } from '@/data/mockData';

interface IssueContextType {
  issues: Issue[];
  stats: typeof mockStats;
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIssue: (issueId: string, updates: Partial<Issue>) => void;
  deleteIssue: (issueId: string) => void;
  getIssueById: (issueId: string) => Issue | undefined;
  filterIssues: (filters: {
    status?: string;
    category?: string;
    priority?: string;
    search?: string;
  }) => Issue[];
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};

interface IssueProviderProps {
  children: ReactNode;
}

export const IssueProvider: React.FC<IssueProviderProps> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  const addIssue = (newIssue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
    const issue: Issue = {
      ...newIssue,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setIssues(prev => [issue, ...prev]);
  };

  const updateIssue = (issueId: string, updates: Partial<Issue>) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === issueId
          ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
          : issue
      )
    );
  };

  const deleteIssue = (issueId: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
  };

  const getIssueById = (issueId: string) => {
    return issues.find(issue => issue.id === issueId);
  };

  const filterIssues = (filters: {
    status?: string;
    category?: string;
    priority?: string;
    search?: string;
  }) => {
    return issues.filter(issue => {
      const matchesStatus = !filters.status || filters.status === 'all' || issue.status === filters.status;
      const matchesCategory = !filters.category || filters.category === 'all' || issue.category === filters.category;
      const matchesPriority = !filters.priority || filters.priority === 'all' || issue.priority === filters.priority;
      const matchesSearch = !filters.search || 
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.location.address.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
    });
  };

  // Calculate dynamic stats
  const stats = {
    totalIssues: issues.length,
    openIssues: issues.filter(issue => issue.status === 'open').length,
    inProgressIssues: issues.filter(issue => issue.status === 'in-progress').length,
    resolvedIssues: issues.filter(issue => issue.status === 'resolved').length,
    closedIssues: issues.filter(issue => issue.status === 'closed').length,
    averageResolutionTime: mockStats.averageResolutionTime, // Would calculate from real data
    mostCommonCategory: mockStats.mostCommonCategory // Would calculate from real data
  };

  const value = {
    issues,
    stats,
    addIssue,
    updateIssue,
    deleteIssue,
    getIssueById,
    filterIssues
  };

  return (
    <IssueContext.Provider value={value}>
      {children}
    </IssueContext.Provider>
  );
};