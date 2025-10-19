# TrustChain Backend

A Node.js Express backend API for the TrustChain decentralized hate incident reporting platform.

## Features

- RESTful API for report management
- SQLite database for data persistence
- Analytics and reporting endpoints
- Input validation and security middleware
- Rate limiting and CORS protection
- Search functionality

## API Endpoints

### Reports
- `GET /api/reports` - Get all reports (with pagination)
- `GET /api/reports/:id` - Get specific report
- `POST /api/reports` - Create new report
- `PATCH /api/reports/:id/status` - Update report status
- `GET /api/search?q=term` - Search reports

### Analytics
- `GET /api/analytics` - Get comprehensive analytics
- `GET /api/analytics/summary` - Get quick summary stats

### Health
- `GET /health` - Health check endpoint

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment configuration:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `DATABASE_PATH` - SQLite database file path

## Database Schema

### Reports Table
- `id` - UUID primary key
- `message` - Report content
- `txId` - Algorand transaction ID
- `timestamp` - Unix timestamp
- `isAnonymous` - Boolean flag
- `policeRef` - Optional police reference
- `ipfsCid` - Optional IPFS content ID
- `incidentDate` - Optional incident date
- `status` - Report status (pending/confirmed/failed)
- `accountAddress` - Reporter's address (if not anonymous)

## Security Features

- Rate limiting (100 requests per 15 minutes)
- Input validation using express-validator
- CORS protection
- Helmet.js security headers
- SQL injection prevention

## Development

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Start production server
npm start
```
