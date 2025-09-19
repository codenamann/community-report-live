import React, { useState } from 'react';
import { Issue, mockIssues, mockStats } from '@/data/mockData';
import StatsOverview from '@/components/Dashboard/StatsOverview';
import IssueCard from '@/components/Issues/IssueCard';
import CivicMap from '@/components/Map/CivicMap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart3,
  Map,
  List,
  Settings,
  ArrowLeft,
  Download,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [issues, setIssues] = useState(mockIssues);
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState<{
    status: string;
    category: string;
    priority: string;
    assignee: string;
  }>({
    status: 'all',
    category: 'all', 
    priority: 'all',
    assignee: 'all'
  });

  const filteredIssues = issues.filter(issue => {
    const matchesStatus = filter.status === 'all' || issue.status === filter.status;
    const matchesCategory = filter.category === 'all' || issue.category === filter.category;
    const matchesPriority = filter.priority === 'all' || issue.priority === filter.priority;
    const matchesAssignee = filter.assignee === 'all' || 
      (filter.assignee === 'unassigned' && !issue.assignedTo) ||
      (issue.assignedTo && issue.assignedTo.name.toLowerCase().includes(filter.assignee.toLowerCase()));
    
    return matchesStatus && matchesCategory && matchesPriority && matchesAssignee;
  });

  const handleStatusChange = (issueId, newStatus) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              status: newStatus,
              updatedAt: new Date().toISOString(),
              resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : issue.resolvedAt,
              citizenVerification: newStatus === 'resolved' ? { status: 'pending' } : issue.citizenVerification
            }
          : issue
      )
    );
  };

  const assigneeOptions = [
    'all',
    'unassigned',
    ...Array.from(new Set(issues.filter(i => i.assignedTo).map(i => i.assignedTo!.name)))
  ];

  const urgentIssues = issues.filter(issue => 
    (issue.priority === 'critical' || issue.priority === 'high') && 
    issue.status !== 'closed'
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/90">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Map
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Authority Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage and track civic issues</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Urgent Issues Alert */}
        {urgentIssues.length > 0 && (
          <div className="civic-card border-warning bg-warning/5 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-warning">
                  {urgentIssues.length} Urgent Issues Require Attention
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  High and critical priority issues that need immediate action
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setFilter({...filter, priority: 'critical'});
                  setActiveTab('issues');
                }}
              >
                View Issues
              </Button>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Issues ({filteredIssues.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <StatsOverview stats={mockStats} />
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="civic-card p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {issues
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 5)
                    .map(issue => (
                      <div key={issue.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{issue.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(issue.updatedAt).toLocaleDateString()} - {issue.reportedBy.name}
                          </div>
                        </div>
                        <Badge className={`status-badge ${issue.status}`}>
                          {issue.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>

              <div className="civic-card p-6">
                <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
                <div className="space-y-3">
                  {(['critical', 'high', 'medium', 'low']).map(priority => {
                    const count = issues.filter(i => i.priority === priority).length;
                    const percentage = issues.length > 0 ? (count / issues.length) * 100 : 0;
                    return (
                      <div key={priority} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{priority}</span>
                          <span>{count} issues</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              priority === 'critical' ? 'bg-critical' :
                              priority === 'high' ? 'bg-warning' :
                              priority === 'medium' ? 'bg-primary' :
                              'bg-muted-foreground'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <div className="civic-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Issues Map</h2>
                <Badge variant="secondary">
                  {filteredIssues.length} issues shown
                </Badge>
              </div>
              <CivicMap 
                issues={filteredIssues}
                className="h-[600px] w-full"
              />
            </div>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            {/* Filters */}
            <div className="civic-card p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Select value={filter.status} onValueChange={(value) => setFilter({...filter, status: value})}>
                  <SelectTrigger>
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
                  <SelectTrigger>
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

                <Select value={filter.priority} onValueChange={(value) => setFilter({...filter, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filter.assignee} onValueChange={(value) => setFilter({...filter, assignee: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {assigneeOptions.map(assignee => (
                      <SelectItem key={assignee} value={assignee}>
                        {assignee === 'all' ? 'All Assignees' : 
                         assignee === 'unassigned' ? 'Unassigned' : 
                         assignee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Issues Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues
                .sort((a, b) => {
                  // Sort by priority, then by creation date
                  const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                  const aPriority = priorityOrder[a.priority];
                  const bPriority = priorityOrder[b.priority];
                  
                  if (aPriority !== bPriority) {
                    return bPriority - aPriority;
                  }
                  
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
                .map(issue => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onStatusChange={handleStatusChange}
                    userRole="authority"
                  />
                ))}
            </div>

            {filteredIssues.length === 0 && (
              <div className="civic-card p-8 text-center">
                <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No issues found</h3>
                <p className="text-muted-foreground">
                  No issues match your current filters.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;