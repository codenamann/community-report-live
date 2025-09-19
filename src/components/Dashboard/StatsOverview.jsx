import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Calendar
} from 'lucide-react';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Issues',
      value: stats.totalIssues,
      icon: AlertCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Open Issues', 
      value: stats.openIssues,
      icon: AlertCircle,
      color: 'text-critical',
      bgColor: 'bg-critical/10'
    },
    {
      title: 'In Progress',
      value: stats.inProgressIssues,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Resolved',
      value: stats.resolvedIssues,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Closed',
      value: stats.closedIssues,
      icon: XCircle,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10'
    }
  ];

  const resolutionRate = stats.totalIssues > 0 
    ? Math.round(((stats.resolvedIssues + stats.closedIssues) / stats.totalIssues) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="civic-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground truncate">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Insights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="civic-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success mb-2">
              {resolutionRate}%
            </div>
            <p className="text-sm text-muted-foreground">
              Issues successfully resolved
            </p>
          </CardContent>
        </Card>

        <Card className="civic-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Avg. Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              {stats.averageResolutionTime}
            </div>
            <p className="text-sm text-muted-foreground">
              Average time to resolve issues
            </p>
          </CardContent>
        </Card>

        <Card className="civic-card md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Most Common Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge 
              variant="secondary" 
              className="text-base px-4 py-2 capitalize"
            >
              {stats.mostCommonCategory}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              Primary issue type reported
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsOverview;