/**
 * Attendance Tracking Page
 * Allows organizers to scan QR codes and mark attendance
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Badge, Spinner, Alert, Dialog } from "@/components/ui";
import {
  Camera,
  CheckCircle,
  AlertCircle,
  Users,
  UserCheck,
  Clock,
  ArrowLeft,
  Download,
} from "lucide-react";
import { QRScanner } from "@/components/qr";
import { RegistrationList } from "@/components/events";
import attendanceService from "@/services/attendanceService";
import eventService from "@/services/eventService";
import { formatDate } from "@/utils/dateUtils";

const AttendanceTrackingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const [stats, setStats] = useState({
    registered: 0,
    attended: 0,
    pending: 0,
    attendanceRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [marking, setMarking] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [lastScanned, setLastScanned] = useState(null);

  useEffect(() => {
    fetchEventAndAttendance();
  }, [eventId]);

  const fetchEventAndAttendance = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(
        "%c[PAGE] Fetching event and attendance data",
        "color: #9333ea; font-weight: bold",
        eventId,
      );

      // Fetch event details
      const eventResponse = await eventService.getEventById(eventId);
      setEvent(eventResponse.data);

      // Fetch attendance list
      const attendanceResponse = await attendanceService.getAttendance(eventId);
      setAttendanceList(attendanceResponse.data || []);

      // Calculate stats
      const registered = attendanceResponse.data?.length || 0;
      const attended =
        attendanceResponse.data?.filter((r) => r.status === "ATTENDED")
          .length || 0;
      const pending = registered - attended;
      const attendanceRate = registered > 0 ? (attended / registered) * 100 : 0;

      setStats({
        registered,
        attended,
        pending,
        attendanceRate: attendanceRate.toFixed(1),
      });

      console.log(
        "%c[STATE] Event and attendance loaded",
        "color: #22c55e; font-weight: bold",
        { registered, attended },
      );
    } catch (err) {
      console.error(
        "%c[ERROR] Failed to fetch data",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to load event data");
    } finally {
      setLoading(false);
    }
  };

  const handleScanSuccess = async (qrData) => {
    try {
      setMarking(true);
      setError("");
      console.log(
        "%c[ACTION] Processing scanned QR code",
        "color: #3b82f6; font-weight: bold",
        qrData,
      );

      // Validate QR code
      const validationResponse = await attendanceService.validateQRCode(
        eventId,
        qrData,
      );

      if (!validationResponse.valid) {
        throw new Error(validationResponse.message || "Invalid QR code");
      }

      // Mark attendance
      const response = await attendanceService.markAttendance(eventId, qrData);

      // Update attendance list
      setAttendanceList((prev) =>
        prev.map((reg) =>
          reg._id === qrData.registrationId
            ? { ...reg, status: "ATTENDED", attendedAt: new Date() }
            : reg,
        ),
      );

      // Update stats
      setStats((prev) => ({
        ...prev,
        attended: prev.attended + 1,
        pending: prev.pending - 1,
        attendanceRate: (((prev.attended + 1) / prev.registered) * 100).toFixed(
          1,
        ),
      }));

      setLastScanned(response.data);
      setSuccessMessage("Attendance marked successfully");
      setScannerOpen(false);

      console.log(
        "%c[STATE] Attendance marked",
        "color: #22c55e; font-weight: bold",
        response.data,
      );

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error(
        "%c[ERROR] Attendance marking failed",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to mark attendance");
      setScannerOpen(false);
    } finally {
      setMarking(false);
    }
  };

  const handleScanError = (err) => {
    console.error(
      "%c[ERROR] QR scan error",
      "color: #ef4444; font-weight: bold",
      err,
    );
    setError(err.message || "Failed to scan QR code");
  };

  const handleExportAttendance = async () => {
    try {
      console.log(
        "%c[ACTION] Exporting attendance list",
        "color: #3b82f6; font-weight: bold",
      );

      const blob = await attendanceService.exportAttendance(eventId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${event.title.replace(/\s+/g, "-")}-attendance.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(
        "%c[STATE] Attendance list exported",
        "color: #22c55e; font-weight: bold",
      );
    } catch (err) {
      console.error(
        "%c[ERROR] Export failed",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to export attendance list");
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <Spinner size="xl" text="Loading attendance data..." />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Attendance Tracking
        </h1>
        {event && (
          <div className="space-y-1">
            <p className="text-lg text-neutral-700 font-medium">
              {event.title}
            </p>
            <p className="text-sm text-neutral-600">
              {formatDate(event.startDate, "long")}
            </p>
          </div>
        )}
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

      {/* Success Alert */}
      {successMessage && (
        <Alert
          variant="success"
          className="mb-6"
          dismissible
          onClose={() => setSuccessMessage("")}
        >
          <CheckCircle className="w-5 h-5" />
          {successMessage}
          {lastScanned && (
            <span className="ml-2">
              ({lastScanned.user?.name || "Student"})
            </span>
          )}
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {stats.registered}
            </h3>
            <p className="text-sm text-neutral-600">Total Registered</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-success-600 mb-1">
              {stats.attended}
            </h3>
            <p className="text-sm text-neutral-600">Attended</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-warning-600 mb-1">
              {stats.pending}
            </h3>
            <p className="text-sm text-neutral-600">Pending</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-info-100 text-info-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-info-600 mb-1">
              {stats.attendanceRate}%
            </h3>
            <p className="text-sm text-neutral-600">Attendance Rate</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setScannerOpen(true)}
        >
          <Camera className="w-5 h-5 mr-2" />
          Scan QR Code
        </Button>
        <Button variant="outline" onClick={handleExportAttendance}>
          <Download className="w-4 h-4 mr-2" />
          Export Attendance
        </Button>
      </div>

      {/* Attendance List */}
      <RegistrationList
        registrations={attendanceList}
        eventTitle={event?.title}
        onExport={handleExportAttendance}
        showActions={false}
      />

      {/* QR Scanner Dialog */}
      <Dialog open={scannerOpen} onClose={() => setScannerOpen(false)}>
        <Dialog.Content className="max-w-2xl">
          <QRScanner
            onScan={handleScanSuccess}
            onError={handleScanError}
            onClose={() => setScannerOpen(false)}
            isActive={scannerOpen}
          />

          {marking && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <Spinner />
              <p className="text-sm text-neutral-600">Marking attendance...</p>
            </div>
          )}
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default AttendanceTrackingPage;
