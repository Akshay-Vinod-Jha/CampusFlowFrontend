# CampusFlow Frontend

> **Enterprise-grade Multi-tenant SaaS Platform for Event Management & Approvals**

## 🎯 Project Overview

CampusFlow is a comprehensive event management system designed for universities and colleges. This frontend application provides role-based dashboards, structured approval workflows, QR-based attendance, and real-time analytics.

### Core Features

- 🔐 **Multi-tenant Architecture** - Single app serving multiple colleges
- 👥 **Role-Based Access Control** - 5 distinct user roles (Student, Organizer, Faculty, Admin, Super Admin)
- 📋 **Event Approval Workflow** - Structured multi-level approval process
- 📱 **QR Code Attendance** - Contactless event check-ins
- 📊 **Real-time Analytics** - Event insights and attendance metrics
- ✉️ **Email Notifications** - Automated status updates and reminders

---

## 🛠️ Tech Stack

### Core Framework

- **React 18** - Modern UI library with hooks
- **JavaScript (ES6+)** - Modern JavaScript features
- **Vite** - Lightning-fast build tool

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Professional component library (Radix UI primitives)
- **Design System**:
  - Primary: Indigo/Blue palette
  - Typography: Inter / SF Pro
  - Spacing: 8px base unit
  - Theme: Light mode with soft shadows

### State & Data

- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Context** - Global state management (Auth, Theme)

### Features

- **Recharts** - Data visualization
- **react-qr-code** - Event registration QR codes
- **EmailJS** - Client-side email notifications

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Application runs on `http://localhost:5173`

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── services/           # API service layer
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React Context providers
│   └── utils/              # Helper functions
├── public/                 # Static assets
└── package.json
```

---

## 🎨 Design System

### Color Palette

- Primary: Indigo (#4F46E5)
- Secondary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Danger: Red (#EF4444)

### Spacing Scale (8px base)

- xs: 8px, sm: 16px, md: 24px, lg: 32px, xl: 48px

---

**Built with ❤️ for Educational Institutions**
