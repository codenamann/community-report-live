import React, { useState } from 'react';
import { Issue, mockIssues } from '@/data/mockData';
import CivicMap from '@/components/Map/CivicMap';
import IssueCard from '@/components/Issues/IssueCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MapPin, 
  Plus, 
  Search, 
  Filter,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filter, setFilter] = useState<{
    status: string;
    category: string;
    search: string;
  }>({
    status: 'all',
    category: 'all',
    search: ''
  });

  const filteredIssues = issues.filter(issue => {
    const matchesStatus = filter.status === 'all' || issue.status === filter.status;
    const matchesCategory = filter.category === 'all' || issue.category === filter.category;
    const matchesSearch = filter.search === '' || 
      issue.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      issue.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handleStatusChange = (issueId: string, newStatus: Issue['status']) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              status: newStatus,
              updatedAt: new Date().toISOString(),
              resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : issue.resolvedAt,
              citizenVerification: newStatus === 'resolved' ? { status: 'pending' as const } : issue.citizenVerification
            }
          : issue
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-critical" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const statusCounts = {
    open: issues.filter(i => i.status === 'open').length,
    'in-progress': issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    closed: issues.filter(i => i.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/90">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CivicReport</h1>
                <p className="text-sm text-muted-foreground">Community Issue Tracker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/report">
                <Button className="civic-transition">
                  <Plus className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div 
              key={status}
              className="civic-card p-4 flex items-center gap-3 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setFilter({...filter, status: status})}
            >
              {getStatusIcon(status)}
              <div>
                <div className="font-semibold">{count}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {status.replace('-', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="civic-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Issue Map</h2>
                <Badge variant="secondary">
                  {filteredIssues.length} issues
                </Badge>
              </div>
              <CivicMap 
                issues={filteredIssues}
                onIssueSelect={setSelectedIssue}
                selectedIssue={selectedIssue}
                className="h-96 w-full"
              />
            </div>

            {/* Filters */}
            <div className="civic-card p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search issues, locations..."
                      className="pl-10"
                      value={filter.search}
                      onChange={(e) => setFilter({...filter, search: e.target.value})}
                    />
                  </div>
                </div>
                
                <Select value={filter.status} onValueChange={(value) => setFilter({...filter, status: value})}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filter.category} onValueChange={(value) => setFilter({...filter, category: value})}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => setFilter({status: 'all', category: 'all', search: ''})}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Issues</h2>
              {selectedIssue && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedIssue(null)}
                >
                  Clear Selection
                </Button>
              )}
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {filteredIssues.length === 0 ? (
                <div className="civic-card p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No issues found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              ) : (
                filteredIssues
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onStatusChange={handleStatusChange}
                      userRole="citizen"
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;