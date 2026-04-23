# AUREON9 - Enterprise Membership & Verification Platform

> **Enterprise-Grade Governance, Verification & Membership Platform**
> 
> Powered by React, Node.js, Prisma, PostgreSQL, and Tailwind CSS

## 🎯 Project Overview

AUREON9 is a comprehensive enterprise platform built according to the specifications in your Documents folder. It implements:

- **Multi-tier membership system** (Member → Sovereign)
- **Role-based access control** with 9 different admin roles
- **Comprehensive verification workflow** with 7 verification levels
- **AUREX wallet system** for rewards and settlements
- **Document management** for compliance and KYC
- **Referral program** (AAL - Aureon Affiliate Link)
- **Opportunity marketplace** with access rules
- **Admin governance dashboards** for notifications and review queues
- **Audit logging** for compliance tracking

---

## 📁 Project Structure

### Backend (`/backend`)

```
backend/
├── prisma/
│   ├── schema.prisma       # Complete database schema with all enums & models
│   └── seed.ts             # Database seeding script
├── src/
│   ├── server.js           # Express server with 20+ API routes
│   └── lib/
│       ├── db.js           # Prisma database client
│       ├── permissions.js  # Role-based permission checks
│       └── validation.js   # Input validation utilities
├── package.json
└── .env                    # Environment variables
```

### Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── App.jsx             # Main app with page routing
│   ├── main.jsx            # Entry point
│   ├── index.css           # Tailwind CSS imports
│   ├── api/
│   │   └── client.js       # Axios API client with all endpoints
│   ├── pages/
│   │   ├── MemberDashboard.jsx           # Member portal
│   │   ├── AdminReviewModule.jsx         # Verification review queue
│   │   └── AdminSettingsDashboard.jsx    # Notification governance
│   └── components/
│       └── ui/             # Reusable UI components
│           ├── Card.jsx, Button.jsx, Input.jsx
│           ├── Badge.jsx, Avatar.jsx, Progress.jsx
│           ├── Tabs.jsx, Table.jsx, Textarea.jsx
│           ├── Select.jsx, Switch.jsx, Separator.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Update DATABASE_URL with your PostgreSQL connection string

# Run Prisma migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed

# Start the server
npm run dev
```

Backend will run on `http://localhost:3001`

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# VITE_API_URL should point to backend: http://localhost:3001

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📋 Database Schema

### Core Models

**Users & Profiles**
- `User` - System users with roles
- `MemberProfile` - Extended member information
- `ParticipantClass` - 17 participant classification types
- `MembershipTier` - 7-tier membership hierarchy

**Verification & Compliance**
- `VerificationRecord` - Verification request tracking
- `MemberDocument` - KYC/compliance document storage
- `AuditLog` - Comprehensive audit trail

**Rewards & Wallets**
- `AurexWallet` - Member wallet balances
- `WalletTransaction` - Transaction history
- `Referral` - Referral program tracking

**Marketplace**
- `Opportunity` - Marketplace opportunities
- Access rules: PUBLIC, VERIFIED_ONLY, CERTIFIED_PLUS, etc.

---

## 🔑 Key Features

### 1. **Member Dashboard** (`/pages/MemberDashboard.jsx`)
- Wallet balance and transaction history
- Membership tier progression
- Verification status tracking
- Referral earnings and active referrals
- Opportunity access
- Governance alerts
- Personal settings and document management

### 2. **Admin Review Module** (`/pages/AdminReviewModule.jsx`)
- Verification review queue with case management
- Document upload and approval workflow
- Role-based screen access control
- Case selection and reviewer notes
- Decision outcomes (Approve/Reject/Request More Docs)
- Queue metrics and aging analysis

### 3. **Admin Settings Dashboard** (`/pages/AdminSettingsDashboard.jsx`)
- Notification channel configuration
- Email and in-app delivery settings
- Template management for notification events
- SLA and escalation timer configuration
- Delivery analytics and performance monitoring
- Queue health and aging distribution

---

## 🔐 Role-Based Access Control

| Role | Permissions | Access Screens |
|------|-------------|-----------------|
| **SUPER_ADMIN** | Full platform control | All screens |
| **EXECUTIVE** | Governance & escalated approvals | Queue, Roles, Members, Settings |
| **LEGAL_COMPLIANCE** | Verification & documents | Queue, Uploads, Members |
| **QUALIFICATIONS** | Tier & certification | Queue, Members |
| **CUSTOMER_SUCCESS** | Onboarding support | Uploads, Members |
| **FINANCE_TREASURY** | Financial controls | (Custom) |
| **MEMBER** | Personal portal only | Member Dashboard |
| **PARTNER** | Partner ecosystem | (Filtered views) |
| **OPERATOR** | Operational access | (Role-specific) |

---

## 🛣️ API Routes

### Authentication
- `POST /api/auth/register` - New member registration
- `POST /api/auth/login` - User login

### Members
- `GET /api/members` - List all members
- `GET /api/members/:id` - Get member details
- `PATCH /api/members/:id` - Update member profile

### Verification
- `GET /api/verification-records` - List verification records
- `POST /api/verification-records` - Create verification request
- `GET /api/verification-records/:id` - Get verification details
- `PATCH /api/verification-records/:id` - Update verification status

### Documents
- `GET /api/documents` - List documents
- `POST /api/documents` - Upload document
- `DELETE /api/documents/:id` - Delete document

### Wallets & Transactions
- `GET /api/wallets/:memberProfileId` - Get wallet details
- `POST /api/wallet-transactions` - Create transaction

### Referrals
- `GET /api/referrals` - List referrals
- `POST /api/referrals` - Create referral
- `GET /api/referrals/:id` - Get referral details

### Opportunities
- `GET /api/opportunities` - List published opportunities
- `POST /api/opportunities` - Create opportunity
- `PATCH /api/opportunities/:id` - Update opportunity

### Reference Data
- `GET /api/participant-classes` - List participant classes
- `GET /api/tiers` - List membership tiers

### Audit
- `GET /api/audit-logs` - Get audit logs
- `POST /api/audit-logs` - Create audit log entry

---

## 🎨 Design System

### Colors
- **Primary**: `#0A2540` (Dark Blue)
- **Secondary**: `#0F4C81` (Medium Blue)
- **Accent**: `#D4AF37` (Gold)
- **Neutral**: Slate color scale (50-900)

### Components
All UI components use:
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Rounded-2xl** (16px) for all border radius
- **Responsive grid layouts** for all pages

### Typography
- Font Family: System fonts (-apple-system, BlinkMacSystemFont, etc.)
- Font Smoothing: Antialiased
- Scroll Behavior: Smooth

---

## 🔄 Data Flow

### Registration Flow
1. User registers with email, name, participant class
2. Member profile created with referral code
3. AUREX wallet initialized
4. User assigned to MEMBER role by default

### Verification Flow
1. Member requests verification level upgrade
2. Record created in PENDING status
3. Legal/Compliance reviews documents
4. Decision made (APPROVED/REJECTED/SUSPENDED)
5. Member notified via email/in-app
6. Audit log created

### Wallet Transaction Flow
1. Transaction initiated (REWARD_CREDIT, WITHDRAWAL, etc.)
2. Transaction record created
3. Wallet balance updated
4. Audit log recorded
5. Notification sent to member

---

## 📦 Dependencies

### Backend
- **express** - Web framework
- **prisma** - ORM
- **@prisma/client** - Prisma client
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **axios** - HTTP client
- **bcryptjs** - Password hashing

### Frontend
- **react** - UI library
- **react-dom** - React DOM
- **axios** - HTTP client
- **lucide-react** - Icon library
- **tailwindcss** - Utility CSS
- **@vitejs/plugin-react** - Vite React plugin

---

## 🛠️ Development Scripts

### Backend
```bash
npm run dev              # Start with auto-reload
npm run start            # Production start
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database
npm run prisma:studio    # Open Prisma Studio
npm run lint             # ESLint
npm run format           # Prettier format
```

### Frontend
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # ESLint
npm run format           # Prettier format
```

---

## 🧪 Testing the Application

### Page Navigation
Use the demo buttons at the bottom-left to switch between:
1. **Member Dashboard** - Personal membership portal
2. **Admin Review Module** - Verification review interface
3. **Admin Settings Dashboard** - Notification governance

### API Testing
Use the provided API client in `frontend/src/api/client.js`:
```javascript
import { membersAPI, verificationAPI, walletsAPI } from './api/client';

// Get all members
const members = await membersAPI.getAll();

// Create verification record
const verification = await verificationAPI.create({
  memberProfileId: 'some-id',
  requestedLevel: 'COMMERCIAL_VERIFIED'
});
```

---

## 📚 Implementation Guidelines

Following **all guidance from your Documents folder**:

1. ✅ **Prisma Schema** - Complete with all enums, models, and relationships
2. ✅ **Auth System** - Credentials-based with JWT tokens
3. ✅ **Role-Based Access** - Permission layer for governance
4. ✅ **Verification Workflow** - Full queue and decision system
5. ✅ **Document Management** - Upload and compliance tracking
6. ✅ **Wallet System** - Balance and transaction tracking
7. ✅ **Notification Governance** - Channel and template management
8. ✅ **Audit Logging** - Complete action tracking
9. ✅ **UI/UX** - Professional enterprise design
10. ✅ **API Design** - RESTful with proper status codes

---

## 🚢 Deployment

### Backend Deployment (Heroku, Railway, etc.)
```bash
# Build
npm install

# Run migrations
npm run prisma:migrate

# Seed
npm run prisma:seed

# Start
npm run start
```

### Frontend Deployment (Vercel, Netlify, etc.)
```bash
# Build
npm run build

# Serve dist/ folder
```

---

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/aureon9
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

---

## 🤝 Architecture

```
┌─────────────────┐
│   React App     │
│  (Frontend)     │
└────────┬────────┘
         │ HTTP/CORS
         │
┌────────▼────────┐
│  Express API    │
│   (Backend)     │
└────────┬────────┘
         │ SQL
         │
┌────────▼────────┐
│   PostgreSQL    │
│   (Database)    │
└─────────────────┘
```

---

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns and hooks
- Tailwind CSS utility-first design
- Prisma ORM with PostgreSQL
- Express.js REST API design
- Role-based access control
- Component composition
- API client architecture
- Form handling and validation

---

## 📞 Support

For issues or questions:
1. Check the backend logs: `npm run dev`
2. Check the frontend console: Browser DevTools
3. Review the Prisma schema for model relationships
4. Verify environment variables are set correctly

---

## ✨ Next Steps

To extend this platform:

1. **Authentication** - Implement NextAuth/Auth.js for session management
2. **File Uploads** - Add S3 or Cloudinary for document storage
3. **Email Notifications** - Integrate Resend or SendGrid
4. **Real-time Updates** - Add Socket.io or Pusher
5. **Analytics** - Implement Mixpanel or Amplitude
6. **Testing** - Add Jest and Vitest test suites
7. **CI/CD** - Setup GitHub Actions workflows
8. **Monitoring** - Add Sentry for error tracking

---

**Built with ❤️ for AUREON9**

*Last Updated: April 23, 2026*
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/           # Express.js API server
│   ├── src/
│   │   └── server.js # Main server file
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- PostgreSQL 12+ installed and running
- Git

### 1. Clone or Navigate to Project

```bash
cd "AUREON 9"
```

### 2. Setup Backend

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/aureon_9_db"

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start backend server (runs on port 3000)
npm run dev
```

### 3. Setup Frontend (in a new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 5173)
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Health Check: http://localhost:3000/health

## 📚 Available API Endpoints

### Health Check
- `GET /health` - API status

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID

### Products
- `GET /products` - Get all products
- `POST /products` - Create new product

### Orders
- `GET /orders` - Get all orders
- `POST /orders` - Create new order

## 🗄️ Database Models

### User
- id (Primary Key)
- email (Unique)
- name
- role
- createdAt
- updatedAt

### Product
- id (Primary Key)
- title
- description
- price
- stock
- createdAt
- updatedAt

### Order
- id (Primary Key)
- userId
- totalAmount
- status
- createdAt
- updatedAt

## 📝 Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run lint:fix # Fix linting errors
npm run format   # Format code with Prettier
```

### Backend Scripts
```bash
npm run dev           # Start development server with watch mode
npm run start         # Start production server
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate  # Run migrations
npm run prisma:studio   # Open Prisma Studio
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting errors
npm run format       # Format code with Prettier
```

## 🔧 Configuration

### Tailwind CSS
Edit `frontend/tailwind.config.js` to customize:
- Colors
- Fonts
- Breakpoints
- And more...

### Prisma Schema
Edit `backend/prisma/schema.prisma` to:
- Add new models
- Modify relationships
- Update field types

### Environment Variables
Create `.env` files in both `frontend` and `backend` directories for:
- API URLs
- Database credentials
- Server ports

## 🚢 Deployment

### Frontend (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku, Railway, etc.)
```bash
npm start
```

## 📦 Adding Dependencies

### Frontend
```bash
cd frontend
npm install package-name
```

### Backend
```bash
cd backend
npm install package-name
```

## 🐛 Troubleshooting

### Port Already in Use
- Frontend (5173): Change in `frontend/vite.config.js`
- Backend (3000): Change PORT in `backend/.env`

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in `backend/.env`
- Verify database credentials

### Prisma Migration Issues
```bash
cd backend
npm run prisma:migrate -- --name migration_name
```

## 🤝 Contributing

1. Create feature branches
2. Commit with descriptive messages
3. Push and create pull requests

## 📄 License

MIT

## 🎯 Next Steps

1. Install dependencies in both directories
2. Setup PostgreSQL database
3. Configure environment variables
4. Run migrations
5. Start developing!

Happy coding! 🎉
