import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Input, Badge, EmptyState, Spinner, Alert } from '@/components/ui';
import { Search, Calendar, MapPin, Users, Clock, Filter, ArrowRight } from 'lucide-react';
import eventService from '@/services/eventService';
import { formatDate } from '@/utils/dateUtils';

/**
 * Event Listing Page
 * Browse and search all available events
 */

const EventListingPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Event categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'TECHNICAL', label: 'Technical' },
    { value: 'CULTURAL', label: 'Cultural' },
    { value: 'SPORTS', label: 'Sports' },
    { value: 'WORKSHOP', label: 'Workshop' },
    { value: 'SEMINAR', label: 'Seminar' },
    { value: 'OTHER', label: 'Other' },
  ];

  // Event types
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'ONLINE', label: 'Online' },
    { value: 'OFFLINE', label: 'Offline' },
    { value: 'HYBRID', label: 'Hybrid' },
  ];

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('%c[PAGE] Fetching events...', 'color: #9333ea; font-weight: bold');
      
      // Mock data for now (will be replaced with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockEvents = [
        {
          _id: '1',
          title: 'Tech Fest 2024',
          description: 'Annual technical festival with coding competitions, hackathons, and tech talks',
          category: 'TECHNICAL',
          type: 'OFFLINE',
          startDate: new Date('2024-03-15T09:00:00'),
          endDate: new Date('2024-03-17T18:00:00'),
          location: 'Main Auditorium',
          maxParticipants: 500,
          registeredCount: 324,
          bannerUrl: null,
          status: 'APPROVED',
        },
        {
          _id: '2',
          title: 'AI & Machine Learning Workshop',
          description: 'Hands-on workshop on building ML models with Python and TensorFlow',
          category: 'WORKSHOP',
          type: 'ONLINE',
          startDate: new Date('2024-03-20T14:00:00'),
          endDate: new Date('2024-03-20T17:00:00'),
          location: 'Google Meet',
          maxParticipants: 100,
          registeredCount: 78,
          bannerUrl: null,
          status: 'APPROVED',
        },
        {
          _id: '3',
          title: 'Cultural Night',
          description: 'Evening of music, dance, and drama performances by students',
          category: 'CULTURAL',
          type: 'OFFLINE',
          startDate: new Date('2024-03-22T18:00:00'),
          endDate: new Date('2024-03-22T22:00:00'),
          location: 'Open Air Theatre',
          maxParticipants: 800,
          registeredCount: 567,
          bannerUrl: null,
          status: 'APPROVED',
        },
        {
          _id: '4',
          title: 'Startup Seminar',
          description: 'Learn from successful entrepreneurs about building startups',
          category: 'SEMINAR',
          type: 'HYBRID',
          startDate: new Date('2024-03-25T10:00:00'),
          endDate: new Date('2024-03-25T13:00:00'),
          location: 'Seminar Hall / Zoom',
          maxParticipants: 200,
          registeredCount: 145,
          bannerUrl: null,
          status: 'APPROVED',
        },
        {
          _id: '5',
          title: 'Inter-College Cricket Tournament',
          description: 'Annual cricket championship with teams from multiple colleges',
          category: 'SPORTS',
          type: 'OFFLINE',
          startDate: new Date('2024-04-01T08:00:00'),
          endDate: new Date('2024-04-05T18:00:00'),
          location: 'College Cricket Ground',
          maxParticipants: 150,
          registeredCount: 96,
          bannerUrl: null,
          status: 'APPROVED',
        },
        {
          _id: '6',
          title: 'Web Development Bootcamp',
          description: 'Intensive 3-day bootcamp on modern web development with React and Node.js',
          category: 'WORKSHOP',
          type: 'ONLINE',
          startDate: new Date('2024-04-10T09:00:00'),
          endDate: new Date('2024-04-12T17:00:00'),
          location: 'Online',
          maxParticipants: 80,
          registeredCount: 62,
          bannerUrl: null,
          status: 'APPROVED',
        },
      ];

      setEvents(mockEvents);
      console.log('%c[STATE] Events loaded', 'color: #22c55e; font-weight: bold', mockEvents.length);
    } catch (err) {
      console.error('%c[ERROR] Failed to fetch events', 'color: #ef4444; font-weight: bold', err);
      setError(err.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Get category badge variant
  const getCategoryVariant = (category) => {
    const variants = {
      TECHNICAL: 'primary',
      CULTURAL: 'secondary',
      SPORTS: 'success',
      WORKSHOP: 'warning',
      SEMINAR: 'info',
      OTHER: 'neutral',
    };
    return variants[category] || 'neutral';
  };

  // Get type badge variant
  const getTypeVariant = (type) => {
    const variants = {
      ONLINE: 'info',
      OFFLINE: 'success',
      HYBRID: 'warning',
    };
    return variants[type] || 'neutral';
  };

  // Calculate seats availability
  const getSeatsInfo = (event) => {
    const available = event.maxParticipants - event.registeredCount;
    const percentage = (event.registeredCount / event.maxParticipants) * 100;
    return { available, percentage, isFull: available === 0 };
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <Spinner size="xl" text="Loading events..." />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Browse Events</h1>
        <p className="text-neutral-600">Discover and register for upcoming events</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="error" className="mb-6" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <Input
                icon={Search}
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all') && (
            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
              <Filter className="w-4 h-4" />
              <span>
                Showing {filteredEvents.length} of {events.length} events
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description={
            searchTerm || selectedCategory !== 'all' || selectedType !== 'all'
              ? 'Try adjusting your filters'
              : 'No events available at the moment'
          }
          action={
            (searchTerm || selectedCategory !== 'all' || selectedType !== 'all') && (
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
              >
                Clear filters
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const seatsInfo = getSeatsInfo(event);
            return (
              <Card key={event._id} hover className="flex flex-col">
                {/* Event Banner Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-t-lg flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-white opacity-50" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={getCategoryVariant(event.category)}>
                      {event.category}
                    </Badge>
                    <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {seatsInfo.available} seats available
                        {seatsInfo.isFull && (
                          <Badge variant="error" size="sm" className="ml-2">
                            Full
                          </Badge>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Seats Progress Bar */}
                  <div className="mb-4">
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          seatsInfo.percentage > 90
                            ? 'bg-error-500'
                            : seatsInfo.percentage > 70
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                        }`}
                        style={{ width: `${seatsInfo.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      {event.registeredCount} / {event.maxParticipants} registered
                    </p>
                  </div>

                  {/* View Details Button */}
                  <Link to={`/student/events/${event._id}`} className="mt-auto">
                    <Button variant="primary" className="w-full">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventListingPage;
