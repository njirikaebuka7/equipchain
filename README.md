# EquipChain Global Ltd — Enterprise Fullstack Monorepo

Welcome to the **EquipChain Global Ltd** enterprise fullstack monorepo. This project is structured as a standard, high-performance, and platform-independent monorepo powered by **pnpm workspaces**, **Vite (React SPA)**, **Express.js**, and **Drizzle ORM** integrated with **Supabase**.

---

## 🏗️ Repository Architecture

The codebase is organized into modular directories:
*   **`apps/`**: Single-Page Applications and services:
    *   `apps/web`: Frontend React SPA built with Vite, TypeScript, and Tailwind CSS.
    *   `apps/api`: Express.js backend serving as the REST API and hosting public assets in production.
    *   `apps/mockup-sandbox`: Mockup testing and UI prototyping sandbox.
*   **`packages/`**: Shared, reusable packages and specifications:
    *   `packages/db`: Drizzle ORM schemas, pool configuration, and database adapters.
    *   `packages/api-client-react`: Generated React Query hooks for client-server communication.
    *   `packages/api-spec`: OpenAPI Specification files (defining all backend routes).
    *   `packages/api-zod`: Shared validation schemas for backend request sanitization and form validation.
*   **`supabase/migrations/`**: Raw SQL migration scripts managed by Drizzle Kit and deployed directly via Supabase.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have the following installed on your system:
*   [Node.js](https://nodejs.org/) (v22 or later recommended)
*   [pnpm](https://pnpm.io/) (v10 or later recommended)

### 2. Environment Variables Setup
Copy the environment variables template in the root directory to `.env` and fill in your secrets:
```bash
cp .env.example .env
```
Open `.env` and ensure `DATABASE_URL` is set to your **Supabase PostgreSQL** database string (either a local docker instance or your cloud project ref).

### 3. Installation
Install all monorepo dependencies and link the workspace packages natively:
```bash
pnpm install
```

---

## 🛠️ Local Development & Running

You can run individual apps or boot up the entire fullstack environment in parallel using root-level commands.

### 1. Run the Fullstack Stack (Frontend + Backend)
To run the main client application (`apps/web` on port `5173`) and the backend API (`apps/api` on port `5000`) concurrently:
```bash
pnpm run dev
```

### 2. Run All Apps (Including UI Sandbox)
To run the main client, the API server, and the mockup preview sandbox (`apps/mockup-sandbox` on port `5174`) all at once:
```bash
pnpm run dev:all
```

---

## 💾 Database Migrations & Drizzle Setup

Database tables are defined using Drizzle ORM in `packages/db/src/schema/`.

### 1. Generate SQL Migrations
Whenever you change a schema definition in `packages/db/src/schema/`, run the following command to generate a standard PostgreSQL SQL migration script:
```bash
pnpm run db:generate
```
This command triggers `drizzle-kit` to automatically output a migration script inside **`supabase/migrations/`**.

### 2. Apply Migrations Locally (Developer Push)
To quickly push schema modifications to your active dev database without creating versioned migration files:
```bash
pnpm run db:push
```

### 3. Deploy Migrations via Supabase CLI
Since versioned SQL migrations are saved in `/supabase/migrations`, you can apply them directly via the standard **Supabase CLI**:
```bash
# Link your Supabase CLI to your project
supabase link --project-ref your-project-ref

# Apply pending migrations to the linked database
supabase db push
```

---

## 🧪 Production Compilation & Verification

### 1. Local Production Build
Before deploying to production (e.g. Docker, VPS, Render, Railway), build and bundle the entire monorepo:
```bash
pnpm run build
```
This will:
1.  Typecheck all libraries and applications cleanly.
2.  Compile the React frontend client into `apps/web/dist/public/`.
3.  Bundle the Express backend into `apps/api/dist/index.mjs`.

### 2. Local Linting Check
To check the workspace formatting and structure:
```bash
pnpm run lint
```

### 3. Run Production Server Locally
In production mode, the backend **Express API server serves the built React frontend SPA directly** from a single unified server process. To test this locally after running `pnpm run build`:
```bash
# Set production variables
export NODE_ENV="production"
export PORT=5000

# Start the unified server
pnpm run start
```
Now, navigating to `http://localhost:5000` will load the compiled React SPA, and any sub-routes (e.g., `/about`, `/insights`, `/request-quote`) will be handled correctly by the single-page application router!
