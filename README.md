# BBK Labs — Complete Website

**Your Business. Our Technology.**

BBK Labs is a technology company that helps businesses use technology to work smarter, reach more customers and grow — starting from Barabanki, UP, India.

---

## 📁 Project Structure

```text
bbkLabs/
├── frontend/       # Next.js 15 + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # Config, API client, SEO, schema
│   │   └── data/           # Static content (services, industries, FAQs)
│   └── public/             # Static assets
│
├── backend/        # Express.js + TypeScript + MongoDB
│   ├── src/
│   │   ├── config/         # DB connection, env vars
│   │   ├── modules/        # Feature-based modules
│   │   │   ├── leads/      # Lead form submissions
│   │   │   ├── contacts/   # General enquiries
│   │   │   ├── case-studies/ # Case study CRUD
│   │   │   ├── blog/       # Blog/resources CRUD
│   │   │   └── newsletter/ # Newsletter subscriptions
│   │   └── middleware/     # Error handling, rate limiting, validation
│   └── Dockerfile
│
└── README.md       # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm

### Backend Setup

```bash
cd backend
cp .env.example .env    # Edit with your MongoDB URI
npm install
npm run dev             # Starts on port 5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev             # Starts on port 3000
```

Visit `http://localhost:3000` to see the website.

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Next.js 15, TypeScript, Tailwind CSS |
| Backend   | Express.js, TypeScript, Mongoose    |
| Database  | MongoDB                              |
| Deployment | GCP (Cloud Run)                    |

---

## 📄 Pages

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/` | Hero, services, industries, process, USPs, pricing, FAQ, CTA |
| Services | `/services` | Service overview |
| Service Detail | `/services/[slug]` | 6 individual service pages |
| Industries | `/industries` | Industry overview |
| Industry Detail | `/industries/[slug]` | 5 individual industry pages |
| About | `/about` | Company story, vision, values |
| Contact | `/contact` | Form, WhatsApp, call, email |
| Case Studies | `/case-studies` | Coming soon state |
| Resources | `/resources` | Blog coming soon state |
| Barabanki | `/locations/barabanki` | Local SEO page |

---

## 🔧 Configuration

All business info is centralized in `frontend/src/lib/config.ts`:
- Company name, tagline
- Phone, WhatsApp, email (placeholders)
- Social links
- Business hours
- SEO defaults
- Location info

Update these before deployment.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Submit lead form |
| GET | `/api/leads` | List leads (admin) |
| POST | `/api/contacts` | Submit contact form |
| GET/POST | `/api/case-studies` | Case study CRUD |
| GET/POST | `/api/blog` | Blog CRUD |
| POST | `/api/newsletter/subscribe` | Newsletter signup |
| GET | `/api/health` | Health check |

---

## 🚢 Deployment (GCP Cloud Run)

### Backend

```bash
cd backend
gcloud builds submit --tag gcr.io/PROJECT_ID/bbklabs-api
gcloud run deploy bbklabs-api --image gcr.io/PROJECT_ID/bbklabs-api --platform managed
```

### Frontend

```bash
cd frontend
npm run build
# Deploy to Vercel, or build Docker image for Cloud Run
```

### Environment Variables (Production)

**Backend:**
- `MONGO_URI` — MongoDB Atlas connection string
- `CORS_ORIGIN` — Frontend URL
- `NODE_ENV` — `production`

**Frontend:**
- `NEXT_PUBLIC_API_URL` — Backend API URL

---

## 📋 SEO Features

- ✅ Dynamic XML sitemap
- ✅ robots.txt
- ✅ Open Graph + Twitter cards
- ✅ Organization schema (JSON-LD)
- ✅ LocalBusiness schema
- ✅ Service schema per service page
- ✅ FAQ schema on homepage
- ✅ Breadcrumb schema on detail pages
- ✅ Canonical URLs
- ✅ Unique title/description per page

---

## 📝 License

Private — BBK Labs
