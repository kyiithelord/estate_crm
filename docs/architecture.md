# Architecture

## High-level design

```text
React Web      Expo Mobile
     \            /
      \          /
       Laravel API
            |
       PostgreSQL
```

## Backend responsibilities

- authentication
- tenant scoping
- business validation
- CRUD APIs
- dashboard metrics

## Multi-tenant model

Use `company_id` on tenant-owned records:

- users
- properties
- clients
- deals

Tasks can be user-owned and optionally company-owned depending on reporting needs. For MVP, keep them tied to a user and infer company through the user.

## Auth recommendation

- Laravel Sanctum token auth for web and mobile API access
- role column on users for `admin` and `agent`
- later add invitations and password reset

## Environments

### Local

- Laravel API on `localhost:8000`
- React web on `localhost:5173`
- Expo mobile via development server
- PostgreSQL running locally or in Docker

### Production

- API on DigitalOcean droplet or AWS EC2
- frontend on Vercel or Netlify
- PostgreSQL managed by DigitalOcean, Neon, Supabase, or RDS

## API conventions

- prefix all endpoints with `/api`
- JSON only
- paginated list endpoints
- use filters for `status`, `stage`, `assigned_to`, and `search`

## Security checklist

- hash passwords
- validate all incoming requests
- rate limit login
- enforce tenant scoping in policies or query layers
- never trust `company_id` from the client without server-side checks
