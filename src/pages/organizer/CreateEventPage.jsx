import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Input, Alert, Badge } from "@/components/ui";
import {
  ArrowLeft,
  Upload,
  X,
  Calendar,
  MapPin,
  Users,
  FileText,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import eventService from "@/services/eventService";

/**
 * Create Event Page
 * Form to create new events with all details
 */

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "TECHNICAL",
    type: "OFFLINE",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    maxParticipants: "",
    requirements: "",
    tags: "",
  });

  // Form errors
  const [errors, setErrors] = useState({});

  // Categories
  const categories = [
    {
      value: "TECHNICAL",
      label: "Technical",
      description: "Tech events, hackathons, coding competitions",
    },
    {
      value: "CULTURAL",
      label: "Cultural",
      description: "Music, dance, drama, and art events",
    },
    {
      value: "SPORTS",
      label: "Sports",
      description: "Sports tournaments and activities",
    },
    {
      value: "WORKSHOP",
      label: "Workshop",
      description: "Skill development workshops",
    },
    {
      value: "SEMINAR",
      label: "Seminar",
      description: "Educational seminars and talks",
    },
    { value: "OTHER", label: "Other", description: "Other types of events" },
  ];

  // Event types
  const types = [
    {
      value: "ONLINE",
      label: "Online",
      description: "Virtual event (Zoom, Teams, etc.)",
    },
    {
      value: "OFFLINE",
      label: "Offline",
      description: "In-person event at venue",
    },
    {
      value: "HYBRID",
      label: "Hybrid",
      description: "Both online and offline",
    },
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) setError("");
  };

  // Handle banner upload
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, banner: "Please select an image file" }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        banner: "Image size should be less than 5MB",
      }));
      return;
    }

    setBannerFile(file);
    setErrors((prev) => ({ ...prev, banner: "" }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result);
    };
    reader.readAsDataURL(file);

  };

  // Remove banner
  const removeBanner = () => {
    setBannerFile(null);
    setBannerPreview("");
    document.getElementById("banner-upload").value = "";
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Title
    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Short description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    // Long description
    if (!formData.longDescription.trim()) {
      newErrors.longDescription = "Detailed description is required";
    } else if (formData.longDescription.trim().length < 50) {
      newErrors.longDescription =
        "Detailed description must be at least 50 characters";
    }

    // Dates
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }
    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    // Validate end date is after start date
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startTime &&
      formData.endTime
    ) {
      const startDateTime = new Date(
        `${formData.startDate}T${formData.startTime}`,
      );
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      if (endDateTime <= startDateTime) {
        newErrors.endDate = "End date/time must be after start date/time";
      }
    }

    // Location
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    // Max participants
    if (!formData.maxParticipants) {
      newErrors.maxParticipants = "Maximum participants is required";
    } else if (parseInt(formData.maxParticipants) < 1) {
      newErrors.maxParticipants = "Must allow at least 1 participant";
    } else if (parseInt(formData.maxParticipants) > 10000) {
      newErrors.maxParticipants = "Maximum limit is 10,000 participants";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Prepare event data
      const startDateTime = new Date(
        `${formData.startDate}T${formData.startTime}`,
      );
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        longDescription: formData.longDescription.trim(),
        category: formData.category,
        type: formData.type,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        location: formData.location.trim(),
        maxParticipants: parseInt(formData.maxParticipants),
        requirements: formData.requirements
          .trim()
          .split("\n")
          .filter((r) => r.trim()),
        tags: formData.tags
          .trim()
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      };

      // Upload banner if selected
      if (bannerFile) {
        
        // Banner upload will be implemented when API is ready
        // const bannerResponse = await eventService.uploadBanner(bannerFile);
        // eventData.bannerUrl = bannerResponse.url;
      }

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to my events page
      navigate("/organizer/my-events");
    } catch (err) {
      console.error(
        "%c[ERROR] Failed to create event",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Save as draft
  const handleSaveDraft = async () => {
    try {
      setLoading(true);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/organizer/my-events");
    } catch (err) {
      console.error(
        "%c[ERROR] Failed to save draft",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError("Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/organizer/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Create New Event
        </h1>
        <p className="text-neutral-600">
          Fill in the details to create your event
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="error"
          className="mb-6"
          dismissible
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <Card.Header>
                <Card.Title>Basic Information</Card.Title>
                <Card.Description>Event title and description</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <Input
                    label="Event Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                    placeholder="e.g., Tech Fest 2024"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Short Description
                      <span className="text-error-600 ml-1">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.description
                          ? "border-error-500"
                          : "border-neutral-300"
                      }`}
                      placeholder="Brief description for event cards (20-200 characters)"
                    />
                    {errors.description && (
                      <p className="text-sm text-error-600 mt-1">
                        {errors.description}
                      </p>
                    )}
                    <p className="text-xs text-neutral-500 mt-1">
                      {formData.description.length} / 200 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Detailed Description
                      <span className="text-error-600 ml-1">*</span>
                    </label>
                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                      rows={8}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.longDescription
                          ? "border-error-500"
                          : "border-neutral-300"
                      }`}
                      placeholder="Full event details, schedule, what to expect, what to bring, etc."
                    />
                    {errors.longDescription && (
                      <p className="text-sm text-error-600 mt-1">
                        {errors.longDescription}
                      </p>
                    )}
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Event Details */}
            <Card>
              <Card.Header>
                <Card.Title>Event Details</Card.Title>
                <Card.Description>
                  Category, type, and location
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Category <span className="text-error-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categories.map((cat) => (
                        <label
                          key={cat.value}
                          className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.category === cat.value
                              ? "border-primary-500 bg-primary-50"
                              : "border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={formData.category === cat.value}
                            onChange={handleChange}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{cat.label}</span>
                              {formData.category === cat.value && (
                                <Badge variant="primary" size="sm">
                                  Selected
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600">
                              {cat.description}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Event Type <span className="text-error-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {types.map((type) => (
                        <label
                          key={type.value}
                          className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.type === type.value
                              ? "border-primary-500 bg-primary-50"
                              : "border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={formData.type === type.value}
                            onChange={handleChange}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{type.label}</span>
                              {formData.type === type.value && (
                                <Badge variant="primary" size="sm">
                                  Selected
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-neutral-600">
                              {type.description}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    error={errors.location}
                    placeholder={
                      formData.type === "ONLINE"
                        ? "e.g., Zoom, Google Meet"
                        : formData.type === "HYBRID"
                          ? "e.g., Main Auditorium / Zoom"
                          : "e.g., Main Auditorium, Block A"
                    }
                    icon={MapPin}
                    required
                  />
                </div>
              </Card.Content>
            </Card>

            {/* Date & Time */}
            <Card>
              <Card.Header>
                <Card.Title>Date & Time</Card.Title>
                <Card.Description>
                  When will the event take place
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    error={errors.startDate}
                    icon={Calendar}
                    required
                  />
                  <Input
                    label="Start Time"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleChange}
                    error={errors.startTime}
                    required
                  />
                  <Input
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    error={errors.endDate}
                    icon={Calendar}
                    required
                  />
                  <Input
                    label="End Time"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleChange}
                    error={errors.endTime}
                    required
                  />
                </div>
              </Card.Content>
            </Card>

            {/* Additional Details */}
            <Card>
              <Card.Header>
                <Card.Title>Additional Details</Card.Title>
                <Card.Description>
                  Requirements, tags, and capacity
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <Input
                    label="Maximum Participants"
                    name="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    error={errors.maxParticipants}
                    placeholder="e.g., 500"
                    icon={Users}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Requirements{" "}
                      <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter each requirement on a new line"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      One requirement per line
                    </p>
                  </div>

                  <Input
                    label="Tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g., Technology, Innovation, Hackathon"
                    helperText="Comma-separated tags for better discoverability"
                  />
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Banner Upload */}
            <Card>
              <Card.Header>
                <Card.Title>Event Banner</Card.Title>
                <Card.Description>
                  Upload event poster or banner
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {bannerPreview ? (
                    <div className="relative">
                      <img
                        src={bannerPreview}
                        alt="Banner preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeBanner}
                        className="absolute top-2 right-2 p-2 bg-error-600 text-white rounded-full hover:bg-error-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                        <Upload className="w-12 h-12 mx-auto mb-3 text-neutral-400" />
                        <p className="text-sm font-medium text-neutral-700 mb-1">
                          Click to upload banner
                        </p>
                        <p className="text-xs text-neutral-500">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                      <input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.banner && (
                    <p className="text-sm text-error-600">{errors.banner}</p>
                  )}
                </div>
              </Card.Content>
            </Card>

            {/* Actions */}
            <Card>
              <Card.Header>
                <Card.Title>Publish Event</Card.Title>
                <Card.Description>Submit for approval</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    loading={loading}
                  >
                    <FileText className="w-4 h-4" />
                    Submit for Approval
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSaveDraft}
                    disabled={loading}
                  >
                    Save as Draft
                  </Button>

                  <p className="text-xs text-neutral-500 text-center">
                    Event will be sent to faculty for approval
                  </p>
                </div>
              </Card.Content>
            </Card>

            {/* Help */}
            <Card>
              <Card.Header>
                <Card.Title>Need Help?</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-sm text-neutral-600 mb-3">
                  Tips for creating successful events:
                </p>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Use clear, descriptive titles</li>
                  <li>• Provide detailed information</li>
                  <li>• Upload eye-catching banners</li>
                  <li>• Set realistic participant limits</li>
                  <li>• Include all requirements</li>
                </ul>
              </Card.Content>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
