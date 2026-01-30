import { Link } from 'react-router-dom';
import { Card, Badge, Button } from '@/components/ui';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { formatDate, formatDateRange, isPastDate } from '@/utils/dateUtils';

/**
 * EventCard Component
 * Reusable card component for displaying event information
 */

const EventCard = ({
  event,
  showStatus = false,
  showActions = true,
  actionLabel = 'View Details',
  onAction,
  variant = 'default', // default, compact, featured
}) => {
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

  const getTypeVariant = (type) => {
    const variants = {
      ONLINE: 'info',
      OFFLINE: 'success',
      HYBRID: 'warning',
    };
    return variants[type] || 'neutral';
  };

  const getStatusBadge = (status) => {
    const badges = {
      DRAFT: { variant: 'neutral', icon: AlertCircle, label: 'Draft' },
      FACULTY_PENDING: { variant: 'warning', icon: Clock, label: 'Faculty Review' },
      ADMIN_PENDING: { variant: 'warning', icon: Clock, label: 'Admin Review' },
      APPROVED: { variant: 'success', icon: CheckCircle, label: 'Approved' },
      REJECTED: { variant: 'error', icon: XCircle, label: 'Rejected' },
    };
    const badge = badges[status] || badges.DRAFT;
    const Icon = badge.icon;

    return (
      <Badge variant={badge.variant}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </Badge>
    );
  };

  const isPast = isPastDate(event.endDate);
  const seatsAvailable = event.maxParticipants - (event.registeredCount || 0);
  const isFullyBooked = seatsAvailable <= 0;
  const isAlmostFull = seatsAvailable > 0 && seatsAvailable <= event.maxParticipants * 0.2;

  if (variant === 'compact') {
    return (
      <Card hover className="overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-1">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant={getCategoryVariant(event.category)} size="sm">
                  {event.category}
                </Badge>
                <Badge variant={getTypeVariant(event.type)} size="sm">
                  {event.type}
                </Badge>
                {showStatus && getStatusBadge(event.status)}
                {isPast && <Badge variant="neutral" size="sm">Past</Badge>}
              </div>
            </div>
          </div>

          <div className="space-y-1 text-sm text-neutral-600 mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span className="line-clamp-1">{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {showActions && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onAction?.(event)}
            >
              <Eye className="w-3 h-3" />
              {actionLabel}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card hover className="overflow-hidden">
        <div className="relative">
          {/* Banner */}
          <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-white opacity-50" />
          </div>
          {/* Status Badge Overlay */}
          {showStatus && (
            <div className="absolute top-3 right-3">
              {getStatusBadge(event.status)}
            </div>
          )}
          {isPast && (
            <div className="absolute top-3 left-3">
              <Badge variant="neutral">Past Event</Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <Badge variant={getCategoryVariant(event.category)}>{event.category}</Badge>
            <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
            {isFullyBooked && <Badge variant="error">Fully Booked</Badge>}
            {isAlmostFull && <Badge variant="warning">Almost Full</Badge>}
          </div>

          <h3 className="text-xl font-bold text-neutral-900 mb-2">{event.title}</h3>

          <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Clock className="w-4 h-4" />
              <span>{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Users className="w-4 h-4" />
              <span>
                {event.registeredCount || 0} / {event.maxParticipants} registered
                {isFullyBooked && ' • Waitlist available'}
              </span>
            </div>
          </div>

          {showActions && (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => onAction?.(event)}
            >
              <Eye className="w-4 h-4" />
              {actionLabel}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card hover className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Event Banner */}
        <div className="w-full md:w-48 h-48 md:h-auto bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 relative">
          <Calendar className="w-12 h-12 text-white opacity-50" />
          {isPast && (
            <div className="absolute top-3 left-3">
              <Badge variant="neutral">Past</Badge>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getCategoryVariant(event.category)}>{event.category}</Badge>
              <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
              {showStatus && getStatusBadge(event.status)}
              {isFullyBooked && <Badge variant="error">Fully Booked</Badge>}
              {isAlmostFull && <Badge variant="warning">Almost Full</Badge>}
            </div>
          </div>

          <h3 className="text-xl font-bold text-neutral-900 mb-2">{event.title}</h3>

          <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Clock className="w-4 h-4" />
              <span>{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Users className="w-4 h-4" />
              <span>
                {event.registeredCount || 0} / {event.maxParticipants} seats
              </span>
            </div>
          </div>

          {showActions && (
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm" onClick={() => onAction?.(event)}>
                <Eye className="w-4 h-4" />
                {actionLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
