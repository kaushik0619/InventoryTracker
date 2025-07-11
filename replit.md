# Inventory Management System

## Overview

This is a full-stack inventory management system built with Express.js, React, and PostgreSQL. The application provides comprehensive inventory tracking, client management, expense monitoring, and dashboard analytics for businesses to manage their stock and operations efficiently.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: TanStack React Query for server state and caching
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for database operations
- **Session Management**: Express sessions with PostgreSQL store
- **Authentication**: Session-based authentication with role-based access

### Database Schema
The system uses PostgreSQL with the following main entities:
- **Users**: Authentication and user management with role-based access
- **Products**: Inventory items with SKU, pricing, and stock tracking
- **Clients**: Customer information and contact details
- **Orders**: Sales transactions with order items
- **Expenses**: Business expense tracking with categories
- **Inventory Requests**: Stock replenishment requests
- **Activities**: System activity logging for audit trails

## Key Components

### Dashboard
- Real-time inventory metrics and KPIs
- Low stock alerts and notifications
- Revenue and expense trend charts
- Recent activity feed
- Quick action buttons for common tasks

### Inventory Management
- Product catalog with SKU tracking
- Stock level monitoring with minimum quantity alerts
- Product categorization and search
- Bulk operations for inventory updates
- Stock movement tracking

### Client Management
- Customer database with contact information
- Client activity history
- Active/inactive status management
- Search and filtering capabilities

### Expense Tracking
- Categorized expense recording
- Date-based expense analysis
- Monthly/yearly reporting
- Expense approval workflows

### Inventory Requests
- Stock replenishment request system
- Priority-based request handling
- Request status tracking (pending, approved, fulfilled)
- Automated notifications for low stock items

## Data Flow

1. **Authentication Flow**: Users authenticate via session-based login, with role-based access control
2. **Data Fetching**: React Query manages server state with automatic caching and background updates
3. **Form Handling**: React Hook Form with Zod validation ensures data integrity before API calls
4. **Database Operations**: Drizzle ORM handles all database interactions with type-safe queries
5. **Real-time Updates**: Dashboard metrics are calculated server-side and cached for performance

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database hosting
- **Connection**: Pool-based connections with WebSocket support

### UI Components
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- Local development with Vite dev server
- Hot module replacement for fast iteration
- TypeScript checking with incremental builds
- Database migrations via Drizzle Kit

### Production
- **Build Process**: 
  - Frontend: Vite builds React app to `dist/public`
  - Backend: ESBuild bundles Express server to `dist/index.js`
- **Server**: Node.js Express server serving static files and API routes
- **Database**: Neon PostgreSQL with connection pooling
- **Environment**: Production mode with secure session cookies

### Key Files
- `server/index.ts`: Main Express server entry point
- `client/src/App.tsx`: React application root
- `shared/schema.ts`: Database schema definitions
- `server/storage.ts`: Database operations interface
- `drizzle.config.ts`: Database migration configuration

The application follows a monorepo structure with clear separation between client, server, and shared code, making it easy to maintain and scale.

## Recent Changes

### January 2025
- **Fixed expense creation functionality**: Resolved date parsing issues in expense form validation
- **Added chart data integration**: Implemented inventory trends and financial trends data for dashboard charts
- **Enhanced dashboard analytics**: Added comprehensive data for inventory and finance trend visualization
- **Improved activity logging**: Added automatic activity tracking for expense operations
- **Database optimization**: Fixed PostgreSQL date handling and improved error handling