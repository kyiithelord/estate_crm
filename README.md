# Estate CRM

Multi-app workspace for a real estate CRM with:

- `backend/` for the Laravel API
- `frontend/` for the React + Vite dashboard
- `mobile/` for the Expo mobile app
- `docs/` for product and architecture notes

## Docker setup

The repo now includes Docker support for the web stack:

- `compose.yaml` runs the frontend, backend, and MySQL together
- `frontend/Dockerfile` supports both local dev and production image builds
- `backend/Dockerfile` supports both local dev and production image builds

Start everything with:

```bash
cp .env.example .env
docker compose up --build
```

App URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api`

MySQL is available to the app containers on the internal Docker network as `db:3306`. It is not exposed to the host by default, which avoids conflicts with any local MySQL service already using port `3306`.

The frontend dev server uses `VITE_API_URL=http://localhost:8000/api`, while production builds default to `/api` and proxy through the frontend container.

On a fresh Docker database, the backend also seeds the minimum required records for local use:

- company `#1`: `Default Workspace`
- user `#1`: `Default Agent`

These are bootstrap records so the app can create clients, properties, deals, and tasks without demo data.

## CI/CD

GitHub Actions workflows live in `.github/workflows/`:

- `ci.yml` runs frontend build checks, backend Laravel tests, and Docker image builds
- `docker-publish.yml` builds and publishes production images to GHCR on `main`

Published image names:

- `ghcr.io/<your-github-owner>/estate-crm-frontend`
- `ghcr.io/<your-github-owner>/estate-crm-backend`

## Current stack

- Backend: Laravel 10 + Sanctum
- Web: React 18 + Vite 5
- Mobile: Expo / React Native
- Local Docker database: MySQL 8.4

## Repo structure

```text
backend/
frontend/
mobile/
docs/
```
