import { useState } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Alert, 
  Dialog, 
  Spinner, 
  Skeleton,
  EmptyState,
  useToast 
} from '@/components/ui';
import { 
  Plus, 
  Mail, 
  Calendar,
  Trash2,
  Download,
  Settings
} from 'lucide-react';

/**
 * UI Components Demo/Preview Page
 * Showcases all base components with examples
 */

const ComponentsDemo = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const { toast } = useToast();

  const handleLoadingDemo = () => {
    setLoading(true);
    toast.info('Processing request...');
    setTimeout(() => {
      setLoading(false);
      toast.success('Operation completed successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            UI Components Library
          </h1>
          <p className="text-neutral-600">
            Professional shadcn-style components built with Radix UI + Tailwind CSS
          </p>
        </div>

        {/* Buttons Section */}
        <Card>
          <Card.Header>
            <Card.Title>Buttons</Card.Title>
            <Card.Description>
              Different variants, sizes, and states
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {/* Variants */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* States */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button loading={loading} onClick={handleLoadingDemo}>
                    {loading ? 'Processing...' : 'Click to Load'}
                  </Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">With Icons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button><Plus className="w-4 h-4" /> Create Event</Button>
                  <Button variant="outline"><Mail className="w-4 h-4" /> Send Email</Button>
                  <Button variant="destructive"><Trash2 className="w-4 h-4" /> Delete</Button>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Input Section */}
        <Card>
          <Card.Header>
            <Card.Title>Inputs</Card.Title>
            <Card.Description>
              Form inputs with labels, errors, and helper text
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input 
                label="Email Address" 
                type="email"
                placeholder="you@example.com"
                helperText="We'll never share your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input 
                label="Password" 
                type="password"
                placeholder="••••••••"
              />
              <Input 
                label="Event Date" 
                type="date"
              />
              <Input 
                label="Error State" 
                placeholder="Invalid input"
                error="This field is required"
              />
              <Input 
                label="Disabled Input" 
                placeholder="Cannot edit"
                disabled
              />
            </div>
          </Card.Content>
        </Card>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover>
            <Card.Header>
              <Card.Title>Basic Card</Card.Title>
              <Card.Description>
                Clean card with hover effect
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-sm text-neutral-600">
                This is a basic card component with header and content sections.
              </p>
            </Card.Content>
          </Card>

          <Card hover>
            <Card.Header>
              <Badge variant="success">Active</Badge>
              <Card.Title>Event Card</Card.Title>
              <Card.Description>Tech Fest 2024</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4" />
                <span>March 15, 2024</span>
              </div>
            </Card.Content>
            <Card.Footer>
              <Button size="sm" variant="outline">View Details</Button>
            </Card.Footer>
          </Card>

          <Card padding="lg">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Downloads</h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">1,234</p>
              <p className="text-xs text-neutral-500">+12% from last month</p>
            </div>
          </Card>
        </div>

        {/* Badges Section */}
        <Card>
          <Card.Header>
            <Card.Title>Badges</Card.Title>
            <Card.Description>
              Status indicators and labels
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="success">Approved</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Rejected</Badge>
              <Badge variant="info">Draft</Badge>
              <Badge variant="primary">Featured</Badge>
            </div>
          </Card.Content>
        </Card>

        {/* Alerts Section */}
        <div className="space-y-4">
          <Alert variant="success" title="Success!">
            Your event has been created successfully and submitted for approval.
          </Alert>
          <Alert variant="error" title="Error occurred">
            Failed to upload event poster. Please try again.
          </Alert>
          <Alert variant="warning" title="Warning">
            Event capacity is almost full. Only 5 seats remaining.
          </Alert>
          <Alert 
            variant="info" 
            title="Information"
            onClose={() => toast.info('Alert dismissed')}
          >
            Your approval is required for 3 pending events.
          </Alert>
        </div>

        {/* Dialog Section */}
        <Card>
          <Card.Header>
            <Card.Title>Dialogs</Card.Title>
            <Card.Description>
              Professional modal dialogs (no browser alerts)
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <Dialog.Trigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Confirm Action</Dialog.Title>
                  <Dialog.Description>
                    Are you sure you want to delete this event? This action cannot be undone.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button variant="ghost">Cancel</Button>
                  </Dialog.Close>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      toast.success('Event deleted successfully');
                      setDialogOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          </Card.Content>
        </Card>

        {/* Loading States Section */}
        <Card>
          <Card.Header>
            <Card.Title>Loading States</Card.Title>
            <Card.Description>
              Spinners and skeleton loaders
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-6">
              {/* Spinners */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-3">Spinners</h4>
                <div className="flex items-center gap-6">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" text="Loading..." />
                </div>
              </div>

              {/* Skeletons */}
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-3">Skeleton Loaders</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton.Avatar size="lg" />
                    <div className="flex-1">
                      <Skeleton height="20px" width="40%" className="mb-2" />
                      <Skeleton height="16px" width="60%" />
                    </div>
                  </div>
                  <Skeleton.Text lines={4} />
                  <Skeleton.Card />
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Empty State Section */}
        <Card>
          <Card.Header>
            <Card.Title>Empty States</Card.Title>
            <Card.Description>
              Display when no data is available
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <EmptyState
              icon={Calendar}
              title="No events found"
              description="You haven't created any events yet. Create your first event to get started."
              action={() => toast.info('Creating new event...')}
              actionLabel="Create Event"
            />
          </Card.Content>
        </Card>

        {/* Toast Demo */}
        <Card>
          <Card.Header>
            <Card.Title>Toast Notifications</Card.Title>
            <Card.Description>
              Non-blocking notifications with auto-dismiss
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('Operation successful!')}>
                Success Toast
              </Button>
              <Button onClick={() => toast.error('Something went wrong!')}>
                Error Toast
              </Button>
              <Button onClick={() => toast.warning('Please review your input')}>
                Warning Toast
              </Button>
              <Button onClick={() => toast.info('New update available')}>
                Info Toast
              </Button>
            </div>
          </Card.Content>
        </Card>

      </div>
    </div>
  );
};

export default ComponentsDemo;
