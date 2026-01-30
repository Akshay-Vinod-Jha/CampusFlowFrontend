/**
 * QRCodeDisplay Component
 * Displays a QR code with download and print options
 */

import { useState, useEffect } from "react";
import { QRCodeSVG } from "react-qr-code";
import { Download, Printer, QrCode } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  generateQRData,
  generateQRCodeDataURL,
  downloadQRCode,
} from "../../utils/qrCodeUtils";

const QRCodeDisplay = ({
  registration,
  event,
  size = 200,
  showActions = true,
}) => {
  const [qrData, setQrData] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (registration) {
      try {
        const data = generateQRData(registration);
        setQrData(data);
        console.log("[QRCodeDisplay] QR code data generated");
      } catch (error) {
        console.error("[QRCodeDisplay] Error generating QR data:", error);
      }
    }
  }, [registration]);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      console.log("[QRCodeDisplay] Generating QR code for download");

      const dataURL = await generateQRCodeDataURL(qrData, { width: 512 });
      const filename = `event-${event?.title?.replace(/\s+/g, "-") || "registration"}-qr.png`;
      downloadQRCode(dataURL, filename);

      console.log("[QRCodeDisplay] QR code downloaded successfully");
    } catch (error) {
      console.error("[QRCodeDisplay] Download failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    try {
      console.log("[QRCodeDisplay] Printing QR code");

      // Create a new window for printing
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        console.error("[QRCodeDisplay] Failed to open print window");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>QR Code - ${event?.title || "Event Registration"}</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
                font-family: 'Inter', -apple-system, sans-serif;
              }
              .print-container {
                text-align: center;
                max-width: 600px;
              }
              h1 {
                font-size: 24px;
                margin-bottom: 8px;
                color: #1f2937;
              }
              .subtitle {
                font-size: 16px;
                color: #6b7280;
                margin-bottom: 24px;
              }
              .qr-code {
                margin: 32px 0;
                padding: 20px;
                background: white;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                display: inline-block;
              }
              .info {
                font-size: 14px;
                color: #4b5563;
                margin-top: 16px;
              }
              @media print {
                body {
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              <h1>${event?.title || "Event Registration"}</h1>
              <div class="subtitle">Event QR Code</div>
              <div class="qr-code">
                <div id="qr-container"></div>
              </div>
              <div class="info">
                <p><strong>Registration ID:</strong> ${registration?._id || "N/A"}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p>Present this QR code at the event for attendance tracking.</p>
              </div>
            </div>
            <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
            <script src="https://unpkg.com/react-qr-code@2.0.15/lib/index.umd.js"></script>
            <script>
              const container = document.getElementById('qr-container');
              const element = React.createElement(
                ReactQRCode.QRCodeSVG,
                { value: '${qrData}', size: 256 }
              );
              ReactDOM.render(element, container);
              setTimeout(() => window.print(), 500);
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
    } catch (error) {
      console.error("[QRCodeDisplay] Print failed:", error);
    }
  };

  if (!registration || !qrData) {
    return (
      <Card>
        <Card.Content className="p-6 text-center">
          <QrCode className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
          <p className="text-sm text-neutral-500">No QR code available</p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Event QR Code
        </Card.Title>
      </Card.Header>
      <Card.Content className="p-6">
        {/* QR Code Display */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white border-2 border-neutral-200 rounded-lg">
            <QRCodeSVG value={qrData} size={size} level="M" />
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-900 font-medium mb-1">
            How to use:
          </p>
          <ul className="text-sm text-primary-700 space-y-1 ml-4 list-disc">
            <li>Download or print this QR code</li>
            <li>Present it at the event entrance</li>
            <li>Organizers will scan it to mark your attendance</li>
          </ul>
        </div>

        {/* Registration Info */}
        <div className="mb-6 space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-neutral-200">
            <span className="text-neutral-600">Registration ID:</span>
            <span className="font-mono text-neutral-900">
              {registration._id.slice(-8)}
            </span>
          </div>
          {event && (
            <div className="flex justify-between py-2 border-b border-neutral-200">
              <span className="text-neutral-600">Event:</span>
              <span className="text-neutral-900 font-medium">
                {event.title}
              </span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-neutral-200">
            <span className="text-neutral-600">Status:</span>
            <span className="text-success-600 font-medium capitalize">
              {registration.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDownload}
              disabled={isGenerating}
            >
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Download"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default QRCodeDisplay;
