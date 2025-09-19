export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'infrastructure' | 'sanitation' | 'safety' | 'environment' | 'transportation';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reportedBy: {
    id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    department: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  citizenVerification?: {
    status: 'pending' | 'verified' | 'disputed';
    verifiedAt?: string;
    comments?: string;
  };
}

// Mock data for demonstration
export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'A dangerous pothole that has been growing larger after recent rains. It\'s affecting multiple lanes and could damage vehicles.',
    category: 'infrastructure',
    status: 'open',
    priority: 'high',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '123 Main Street, New York, NY 10001'
    },
    reportedBy: {
      id: 'user1',
      name: 'John Smith',
      email: 'john.smith@email.com'
    },
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z'
  },
  {
    id: '2', 
    title: 'Broken Streetlight',
    description: 'Streetlight has been out for 3 days, making the intersection unsafe at night.',
    category: 'safety',
    status: 'in-progress',
    priority: 'medium',
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '456 Oak Avenue, New York, NY 10001'
    },
    reportedBy: {
      id: 'user2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com'
    },
    assignedTo: {
      id: 'worker1',
      name: 'Mike Rodriguez',
      department: 'Public Works'
    },
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'],
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-14T09:15:00Z'
  },
  {
    id: '3',
    title: 'Overflowing Trash Bin',
    description: 'Public trash bin is overflowing and attracting pests. Needs immediate attention.',
    category: 'sanitation',
    status: 'resolved',
    priority: 'medium',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '789 Park Lane, New York, NY 10001'
    },
    reportedBy: {
      id: 'user3',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com'
    },
    assignedTo: {
      id: 'worker2',
      name: 'David Chen',
      department: 'Sanitation'
    },
    images: ['https://images.unsplash.com/photo-1586021280827-6f881d9e1506?w=400'],
    createdAt: '2024-01-10T11:45:00Z',
    updatedAt: '2024-01-13T16:30:00Z',
    resolvedAt: '2024-01-13T16:30:00Z',
    citizenVerification: {
      status: 'pending',
    }
  },
  {
    id: '4',
    title: 'Graffiti on Public Building',
    description: 'Large graffiti tags on the side of the community center building.',
    category: 'environment',
    status: 'closed',
    priority: 'low',
    location: {
      lat: 40.7648,
      lng: -73.9808,
      address: '321 Community Drive, New York, NY 10001'
    },
    reportedBy: {
      id: 'user4',
      name: 'Robert Wilson',
      email: 'r.wilson@email.com'
    },
    assignedTo: {
      id: 'worker3',
      name: 'Lisa Thompson',
      department: 'Parks & Recreation'
    },
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-11T14:20:00Z',
    resolvedAt: '2024-01-11T14:20:00Z',
    citizenVerification: {
      status: 'verified',
      verifiedAt: '2024-01-12T08:30:00Z',
      comments: 'Fixed perfectly, thanks!'
    }
  },
  {
    id: '5',
    title: 'Damaged Bus Stop',
    description: 'Bus stop shelter has broken glass and damaged seating, needs repair.',
    category: 'transportation',
    status: 'open',
    priority: 'medium',
    location: {
      lat: 40.7580,
      lng: -73.9855,
      address: '555 Transit Avenue, New York, NY 10001'
    },
    reportedBy: {
      id: 'user5',
      name: 'Jennifer Lee',
      email: 'j.lee@email.com'
    },
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400'],
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-14T16:45:00Z'
  }
];

export const mockStats = {
  totalIssues: mockIssues.length,
  openIssues: mockIssues.filter(issue => issue.status === 'open').length,
  inProgressIssues: mockIssues.filter(issue => issue.status === 'in-progress').length,
  resolvedIssues: mockIssues.filter(issue => issue.status === 'resolved').length,
  closedIssues: mockIssues.filter(issue => issue.status === 'closed').length,
  averageResolutionTime: '3.2 days',
  mostCommonCategory: 'infrastructure'
};

export const categoryLabels = {
  infrastructure: 'Infrastructure',
  sanitation: 'Sanitation', 
  safety: 'Safety',
  environment: 'Environment',
  transportation: 'Transportation'
};

export const statusLabels = {
  open: 'Open',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed'
};

export const priorityLabels = {
  low: 'Low',
  medium: 'Medium', 
  high: 'High',
  critical: 'Critical'
};