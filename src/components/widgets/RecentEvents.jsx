/**
 * RecentEvents Widget
 * Displays recent events using compact EventCard
 */

import { Card, Button, EmptyState } from "../ui";
import { Calendar, ArrowRight } from "lucide-react";
import { EventCard } from "../events";
import { Link } from "react-router-dom";

const RecentEvents = ({
  events = [],
  title = "Recent Events",
  viewAllLink,
  maxItems = 3,
}) => {
  const displayEvents = events.slice(0, maxItems);

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
              <p className="text-sm text-neutral-600">Latest updates</p>
            </div>
          </div>
          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>

        {displayEvents.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No recent events"
            description="No events to display at the moment"
          />
        ) : (
          <div className="space-y-3">
            {displayEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                variant="compact"
                showStatus={true}
                showActions={false}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentEvents;
