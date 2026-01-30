/**
 * QRScanner Component
 * Scans QR codes using device camera and validates registration data
 */

import { useState, useEffect, useRef } from "react";
import { Camera, X, CheckCircle, AlertCircle, Scan } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { parseQRData, validateQRData } from "../../utils/qrCodeUtils";

const QRScanner = ({ onScan, onError, onClose, isActive = true }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [hasCamera, setHasCamera] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Initialize camera
  useEffect(() => {
    if (isActive && isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive, isScanning]);

  const startCamera = async () => {
    try {
      
      setError(null);

      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported in this browser");
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
      }

      // Start scanning loop
      startScanningLoop();
    } catch (err) {
      console.error("[QRScanner] Camera error:", err);
      setHasCamera(false);
      setError(err.message || "Failed to access camera");
      onError?.(err);
    }
  };

  const stopCamera = () => {
    try {

      // Stop scanning loop
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }

      // Stop video stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      // Clear video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } catch (err) {
      console.error("[QRScanner] Error stopping camera:", err);
    }
  };

  const startScanningLoop = () => {
    // For now, we'll use a manual scan button approach
    // In a real implementation, you would use a library like jsQR to continuously scan frames
    
  };

  const handleManualInput = () => {
    // For demo/testing: allow manual QR data input
    const input = prompt("Enter QR code data (JSON format):");
    if (input) {
      processScanResult(input);
    }
  };

  const processScanResult = (qrDataString) => {
    try {

      // Parse QR data
      const qrData = parseQRData(qrDataString);

      // Validate QR data structure
      if (!validateQRData(qrData)) {
        throw new Error("Invalid QR code data");
      }

      // Set result
      setScanResult({
        success: true,
        data: qrData,
        timestamp: new Date().toISOString(),
      });

      // Notify parent component
      onScan?.(qrData);

      // Stop scanning
      setIsScanning(false);
    } catch (err) {
      console.error("[QRScanner] Scan error:", err);
      setError(err.message || "Invalid QR code");
      setScanResult({
        success: false,
        error: err.message,
        timestamp: new Date().toISOString(),
      });
      onError?.(err);
    }
  };

  const handleStartScanning = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(true);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
    setScanResult(null);
    setError(null);
  };

  const handleClose = () => {
    stopCamera();
    onClose?.();
  };

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            QR Code Scanner
          </Card.Title>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Content className="p-6 space-y-4">
        {/* Camera View */}
        {isScanning && hasCamera && (
          <div className="relative">
            <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              {/* Scanning overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-primary-500 rounded-lg opacity-50 animate-pulse" />
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <Badge variant="primary" className="px-4 py-2">
                <Scan className="w-4 h-4 mr-2" />
                Position QR code within frame
              </Badge>
            </div>
          </div>
        )}

        {/* Error State */}
        {!hasCamera && (
          <div className="p-6 bg-error-50 border border-error-200 rounded-lg text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-error-500 mb-3" />
            <p className="text-sm text-error-900 font-medium mb-1">
              Camera Not Available
            </p>
            <p className="text-sm text-error-700">
              Please check camera permissions or use manual input
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-error-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-error-900 font-medium">Scan Error</p>
                <p className="text-sm text-error-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Result */}
        {scanResult && scanResult.success && (
          <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-success-900 font-medium mb-2">
                  QR Code Scanned
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-success-700">Registration ID:</span>
                    <span className="font-mono text-success-900">
                      {scanResult.data.registrationId.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success-700">Event ID:</span>
                    <span className="font-mono text-success-900">
                      {scanResult.data.eventId.slice(-8)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!isScanning ? (
            <>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleStartScanning}
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
              <Button variant="outline" onClick={handleManualInput}>
                Manual Input
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleStopScanning}
            >
              <X className="w-4 h-4 mr-2" />
              Stop Scanning
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <p className="text-sm text-neutral-900 font-medium mb-2">
            Instructions:
          </p>
          <ul className="text-sm text-neutral-700 space-y-1 ml-4 list-disc">
            <li>Allow camera access when prompted</li>
            <li>Position the QR code within the frame</li>
            <li>The scanner will automatically detect the code</li>
            <li>Use manual input if camera is not available</li>
          </ul>
        </div>
      </Card.Content>
    </Card>
  );
};

export default QRScanner;
