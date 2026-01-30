import { useState } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { Filter, X, Calendar } from "lucide-react";

/**
 * EventFilters Component
 * Reusable filter component for events (category, type, date)
 */

const EventFilters = ({
  onFilterChange,
  initialFilters = {},
  compact = false,
}) => {
  const [filters, setFilters] = useState({
    category: initialFilters.category || "all",
    type: initialFilters.type || "all",
    dateRange: initialFilters.dateRange || "all",
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "TECHNICAL", label: "Technical" },
    { value: "CULTURAL", label: "Cultural" },
    { value: "SPORTS", label: "Sports" },
    { value: "WORKSHOP", label: "Workshop" },
    { value: "SEMINAR", label: "Seminar" },
    { value: "OTHER", label: "Other" },
  ];

  const types = [
    { value: "all", label: "All Types" },
    { value: "ONLINE", label: "Online" },
    { value: "OFFLINE", label: "Offline" },
    { value: "HYBRID", label: "Hybrid" },
  ];

  const dateRanges = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "upcoming", label: "Upcoming" },
    { value: "past", label: "Past Events" },
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
    console.log(
      "%c[FILTER] Applied filters",
      "color: #3b82f6; font-weight: bold",
      newFilters,
    );
  };

  const clearFilters = () => {
    const defaultFilters = { category: "all", type: "all", dateRange: "all" };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
    console.log(
      "%c[FILTER] Cleared all filters",
      "color: #3b82f6; font-weight: bold",
    );
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.type !== "all" ||
    filters.dateRange !== "all";

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 text-neutral-600">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <select
          value={filters.dateRange}
          onChange={(e) => handleFilterChange("dateRange", e.target.value)}
          className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {dateRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <Card.Title>Filters</Card.Title>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleFilterChange("category", cat.value)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    filters.category === cat.value
                      ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleFilterChange("type", type.value)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    filters.type === type.value
                      ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleFilterChange("dateRange", range.value)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    filters.dateRange === range.value
                      ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-neutral-200">
              <p className="text-sm font-medium text-neutral-700 mb-2">
                Active Filters:
              </p>
              <div className="flex flex-wrap gap-2">
                {filters.category !== "all" && (
                  <Badge variant="primary">
                    {
                      categories.find((c) => c.value === filters.category)
                        ?.label
                    }
                  </Badge>
                )}
                {filters.type !== "all" && (
                  <Badge variant="info">
                    {types.find((t) => t.value === filters.type)?.label}
                  </Badge>
                )}
                {filters.dateRange !== "all" && (
                  <Badge variant="warning">
                    {
                      dateRanges.find((d) => d.value === filters.dateRange)
                        ?.label
                    }
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default EventFilters;
