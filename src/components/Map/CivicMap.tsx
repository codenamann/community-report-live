import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Issue } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { statusLabels } from '@/data/mockData';

// Fix for default markers in Leaflet with Vite
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CivicMapProps {
  issues: Issue[];
  onIssueSelect?: (issue: Issue) => void;
  selectedIssue?: Issue | null;
  className?: string;
}

const getStatusColor = (status: Issue['status']) => {
  switch (status) {
    case 'open':
      return '#dc2626'; // red
    case 'in-progress':
      return '#ea580c'; // orange  
    case 'resolved':
      return '#16a34a'; // green
    case 'closed':
      return '#64748b'; // gray
    default:
      return '#64748b';
  }
};

const createCustomIcon = (status: Issue['status']) => {
  const color = getStatusColor(status);
  return divIcon({
    html: `
      <div style="
        background-color: ${color}; 
        width: 20px; 
        height: 20px; 
        border-radius: 50%; 
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `,
    className: 'civic-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const CivicMap: React.FC<CivicMapProps> = ({ 
  issues, 
  onIssueSelect, 
  selectedIssue,
  className = "h-96 w-full" 
}) => {
  // Center map on NYC (can be made dynamic based on user location)
  const center: [number, number] = [40.7589, -73.9851];

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {issues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.location.lat, issue.location.lng]}
            icon={createCustomIcon(issue.status)}
            eventHandlers={{
              click: () => {
                onIssueSelect?.(issue);
              },
            }}
          >
            <Popup className="civic-popup">
              <div className="p-2 min-w-64">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{issue.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={`status-badge ${issue.status}`}
                  >
                    {statusLabels[issue.status]}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {issue.description}
                </p>
                
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="font-medium">Category:</span>{' '}
                    <span className="capitalize">{issue.category}</span>
                  </div>
                  <div>
                    <span className="font-medium">Priority:</span>{' '}
                    <span className="capitalize">{issue.priority}</span>
                  </div>
                  <div>
                    <span className="font-medium">Reported:</span>{' '}
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {issue.images.length > 0 && (
                  <img 
                    src={issue.images[0]} 
                    alt={issue.title}
                    className="w-full h-20 object-cover rounded mt-2"
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CivicMap;