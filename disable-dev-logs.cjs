/**
 * Disable Development Console Logs Script
 * Removes/comments out development console.log statements
 * while keeping console.error, console.warn intact
 */

const fs = require('fs');
const path = require('path');

// Files to process
const filesToClean = [
  // Dashboard pages
  'src/pages/student/StudentDashboard.jsx',
  'src/pages/organizer/OrganizerDashboard.jsx',
  'src/pages/faculty/FacultyDashboard.jsx',
  'src/pages/admin/AdminDashboard.jsx',
  'src/pages/super-admin/SuperAdminDashboard.jsx',
  
  // Auth pages
  'src/pages/auth/LoginPage.jsx',
  'src/pages/auth/RegisterPage.jsx',
  'src/pages/auth/ForgotPasswordPage.jsx',
  
  // Student pages
  'src/pages/student/EventListingPage.jsx',
  'src/pages/student/EventDetailsPage.jsx',
  'src/pages/student/MyEventsPage.jsx',
  
  // Organizer pages
  'src/pages/organizer/CreateEventPage.jsx',
  'src/pages/organizer/MyCreatedEventsPage.jsx',
  'src/pages/organizer/AttendanceTrackingPage.jsx',
  
  // Faculty pages
  'src/pages/faculty/PendingApprovalsPage.jsx',
  'src/pages/faculty/EventApprovalPage.jsx',
  
  // Admin pages
  'src/pages/admin/AdminPendingApprovalsPage.jsx',
  'src/pages/admin/AdminEventApprovalPage.jsx',
  
  // Components
  'src/components/auth/ProtectedRoute.jsx',
  'src/components/auth/PublicRoute.jsx',
  'src/components/events/EventFilters.jsx',
  'src/components/events/SearchBar.jsx',
  'src/components/qr/QRCodeDisplay.jsx',
  'src/components/qr/QRScanner.jsx',
  'src/components/email/EmailPreview.jsx',
  'src/components/email/EmailHistory.jsx',
  'src/components/email/SendEmailDialog.jsx',
  'src/components/ui/Toast.jsx',
  
  // Layouts
  'src/layouts/Navbar.jsx',
  'src/layouts/AppLayout.jsx',
  
  // Services
  'src/services/authService.js',
  'src/services/eventService.js',
  'src/services/approvalService.js',
  'src/services/attendanceService.js',
  'src/services/emailService.js',
  'src/services/api.js',
  
  // Context
  'src/context/AuthContext.jsx',
  
  // Utils
  'src/utils/qrCodeUtils.js',
  
  // App
  'src/App.jsx',
];

function cleanFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const originalContent = content;
  
  // Remove console.log statements (but not console.error or console.warn)
  // Pattern matches: console.log(...) including multi-line
  content = content.replace(
    /console\.log\([^)]*\);?\n?/g,
    ''
  );
  
  // Remove console.info and console.debug
  content = content.replace(
    /console\.(info|debug)\([^)]*\);?\n?/g,
    ''
  );
  
  // Clean up multiple empty lines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✓ Cleaned: ${filePath}`);
  } else {
    console.log(`○ No changes: ${filePath}`);
  }
}

console.log('🧹 Starting console.log cleanup...\n');

filesToClean.forEach(cleanFile);

console.log('\n✅ Console log cleanup complete!');
console.log('ℹ️  Console.error and console.warn statements preserved for error logging.');
