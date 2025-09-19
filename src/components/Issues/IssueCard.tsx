import React from 'react';
import { Issue, statusLabels, categoryLabels } from '@/data/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User, AlertCircle } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onViewDetails?: (issue: Issue) => void;
  onStatusChange?: (issueId: string, newStatus: Issue['status']) => void;
  userRole?: 'citizen' | 'authority' | 'admin';
}

const IssueCard: React.FC<IssueCardProps> = ({ 
  issue, 
  onViewDetails, 
  onStatusChange,
  userRole = 'citizen'
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-critical text-critical-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const canChangeStatus = userRole === 'authority' || userRole === 'admin';
  const canVerify = userRole === 'citizen' && issue.status === 'resolved' && 
                   issue.citizenVerification?.status === 'pending';

  return (
    <Card className="civic-card hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-2">{issue.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className={`status-badge ${issue.status}`}>
                {statusLabels[issue.status]}
              </Badge>
              <Badge variant="secondary">
                {categoryLabels[issue.category]}
              </Badge>
              <Badge className={getPriorityColor(issue.priority)}>
                {issue.priority}
              </Badge>
            </div>
          </div>
          {issue.priority === 'critical' && (
            <AlertCircle className="h-5 w-5 text-critical flex-shrink-0 ml-2" />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {issue.description}
        </p>

        {issue.images.length > 0 && (
          <img 
            src={issue.images[0]} 
            alt={issue.title}
            className="w-full h-48 object-cover rounded-md"
          />
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{issue.location.address}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Reported by {issue.reportedBy.name}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(issue.createdAt)}</span>
          </div>

          {issue.assignedTo && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Assigned to {issue.assignedTo.name} ({issue.assignedTo.department})</span>
            </div>
          )}
        </div>

        {issue.citizenVerification && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm font-medium mb-1">Citizen Verification</div>
            <div className="text-sm text-muted-foreground">
              Status: <span className="capitalize">{issue.citizenVerification.status}</span>
              {issue.citizenVerification.comments && (
                <div className="mt-1 italic">"{issue.citizenVerification.comments}"</div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails?.(issue)}
          >
            View Details
          </Button>
          
          {canChangeStatus && issue.status !== 'closed' && (
            <Button 
              variant="default"
              onClick={() => {
                const nextStatus = issue.status === 'open' ? 'in-progress' : 'resolved';
                onStatusChange?.(issue.id, nextStatus);
              }}
            >
              {issue.status === 'open' ? 'Start Work' : 'Mark Resolved'}
            </Button>
          )}

          {canVerify && (
            <div className="flex gap-1">
              <Button 
                variant="default"
                size="sm"
                onClick={() => onStatusChange?.(issue.id, 'closed')}
              >
                Verify Fixed
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => onStatusChange?.(issue.id, 'open')}
              >
                Reopen
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;