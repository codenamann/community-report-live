import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  ArrowLeft, 
  Send,
  AlertTriangle,
  Upload,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CivicMap from '@/components/Map/CivicMap';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    location: null,
    images: [],
    reporterName: '',
    reporterEmail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Demo location - NYC City Hall
  const demoLocation = {
    lat: 40.7128,
    lng: -74.0060,
    address: 'Click on map to select location'
  };

  const handleMapClick = (lat, lng) => {
    // In a real app, you'd reverse geocode to get the address
    setForm({
      ...form,
      location: {
        lat,
        lng,
        address: `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
      }
    });
    setShowMap(false);
    toast.success('Location selected successfully');
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you'd upload to a service and get URLs
      // For demo, we'll use placeholder images
      const newImages = Array.from(files).map((_, index) => 
        `https://images.unsplash.com/photo-${1500000000000 + Date.now() + index}?w=400&h=300&fit=crop`
      );
      setForm({
        ...form,
        images: [...form.images, ...newImages].slice(0, 3) // Max 3 images
      });
      toast.success(`${files.length} image(s) added`);
    }
  };

  const removeImage = (index: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.category || !form.reporterName || !form.reporterEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!form.location) {
      toast.error('Please select a location on the map');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Issue reported successfully!', {
        description: 'Your report has been submitted and assigned ID #' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
      
      // In a real app, you'd add to the issues list/database
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = form.title && form.description && form.category && 
                     form.reporterName && form.reporterEmail && form.location;

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
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Report an Issue</h1>
                <p className="text-sm text-muted-foreground">Help make your community better</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="civic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Issue Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Issue Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Issue Title *</Label>
                    <Input
                      id="title"
                      placeholder="Briefly describe the issue..."
                      value={form.title}
                      onChange={(e) => setForm({...form, title: e.target.value})}
                      required
                    />
                  </div>

                  {/* Category & Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={form.category} onValueChange={(value) => setForm({...form, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="sanitation">Sanitation</SelectItem>
                          <SelectItem value="safety">Safety</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={form.priority} onValueChange={(value) => setForm({...form, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about the issue..."
                      className="min-h-24"
                      value={form.description}
                      onChange={(e) => setForm({...form, description: e.target.value})}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <div className="flex gap-2">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowMap(true)}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        {form.location ? 'Change Location' : 'Select on Map'}
                      </Button>
                      {form.location && (
                        <Badge variant="secondary" className="px-3 py-2">
                          Location Selected
                        </Badge>
                      )}
                    </div>
                    {form.location && (
                      <p className="text-sm text-muted-foreground">
                        {form.location.address}
                      </p>
                    )}
                  </div>

                  {/* Images */}
                  <div className="space-y-2">
                    <Label htmlFor="images">Photos (optional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload images or drag and drop
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Add Photos
                          </Button>
                        </Label>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {form.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {form.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Upload ${index + 1}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reporter Information */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-medium">Your Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reporterName">Full Name *</Label>
                        <Input
                          id="reporterName"
                          placeholder="Your name"
                          value={form.reporterName}
                          onChange={(e) => setForm({...form, reporterName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reporterEmail">Email *</Label>
                        <Input
                          id="reporterEmail"
                          type="email"
                          placeholder="your.email@example.com"
                          value={form.reporterEmail}
                          onChange={(e) => setForm({...form, reporterEmail: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Submitting Report...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Issue Report
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="civic-card">
              <CardHeader>
                <CardTitle className="text-lg">Reporting Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">📷 Photos Help</h4>
                  <p className="text-muted-foreground">
                    Clear photos help authorities understand and resolve issues faster.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">📍 Be Specific</h4>
                  <p className="text-muted-foreground">
                    Provide exact location details and landmarks when possible.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">⚡ Emergency Issues</h4>
                  <p className="text-muted-foreground">
                    For life-threatening emergencies, call 911 immediately instead of using this form.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">📧 Stay Updated</h4>
                  <p className="text-muted-foreground">
                    You'll receive email updates about your report's progress.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="civic-card">
              <CardContent className="p-4 text-center">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Contact our support team if you're having trouble reporting an issue.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Modal */}
        {showMap && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Issue Location</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowMap(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96">
                  <CivicMap
                    issues={[]}
                    className="h-full w-full"
                    onIssueSelect={() => {}} // Not used for location selection
                  />
                </div>
                <div className="p-4 bg-muted/50 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Click anywhere on the map to select the issue location
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;