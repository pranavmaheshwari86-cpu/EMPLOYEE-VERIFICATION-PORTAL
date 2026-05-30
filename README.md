# AETHERIS
**AI-Powered Employee Verification & Intelligence Ecosystem**

A next-generation hiring operating system built with cinematic frontend engineering and an enterprise-grade backend foundation. AETHERIS completely reinvents professional identity, skill validation, and talent discovery.

## Features

- **Cinematic UI**: Liquid-glass design system with GPU-accelerated canvas particle effects, Framer Motion animations, and custom CSS auroras.
- **Role-based Dashboards**: Command centers for Employees, Recruiters, and Admins.
- **AI-Native**: Designed around simulated neural evaluation engines and semantic candidate matching.
- **Enterprise Foundation**: Express.js REST API with Prisma ORM and PostgreSQL integration.
- **Containerized**: Full Docker Compose setup for seamless local orchestration.

## Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion & GSAP
- Zustand

**Backend:**
- Node.js & Express
- Prisma ORM
- PostgreSQL
- Redis
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (optional but recommended)

### Quick Start (Docker)

1. Clone the repository and navigate to the root directory.
2. Create environment variables from the example file:
   ```bash
   cp .env.example .env
   cp .env.example backend/.env
   ```
3. Start the entire ecosystem (Frontend, Backend, Postgres, Redis):
   ```bash
   docker-compose up --build
   ```
4. Access the platform at `http://localhost:3000`

### Manual Start (Development Mode)

1. **Start the Frontend:**
   ```bash
   npm install
   npm run dev
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npm run dev
   ```

## Architecture

AETHERIS follows a separated monolith architecture. The Next.js frontend handles all cinematic UI rendering, routing, and state management. The Express.js backend serves as the core API, handling database transactions via Prisma, authentication, and external AI service integrations.

## License
Proprietary - AETHERIS Ecosystem
