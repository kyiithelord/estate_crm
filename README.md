# Estate CRM

Starter workspace for a multi-tenant real estate CRM SaaS with:

- `backend/` for the Laravel API blueprint
- `frontend/` for the React web dashboard starter
- `mobile/` for the React Native / Expo mobile starter
- `docs/` for product, architecture, database, API, and launch planning

## MVP scope

Build only these modules first:

1. Authentication
2. Properties
3. Clients
4. Deal pipeline
5. Reminders

Anything outside this list should wait until after validation and first paying users.

## Suggested stack

- Backend: Laravel API + Sanctum
- Web: React + Vite
- Mobile: React Native + Expo
- Database: PostgreSQL
- Hosting: DigitalOcean or AWS

## Repository structure

```text
backend/
frontend/
mobile/
docs/
```

## Recommended execution order

1. Finalize MVP flows in `docs/web-product-spec.md` and `docs/mobile-product-spec.md`
2. Build the PostgreSQL schema from `docs/database-schema.sql`
3. Implement Laravel auth and CRUD APIs from `docs/api-contract.md`
4. Build the React dashboard using the starter in `frontend/`
5. Build the mobile agent app using the starter in `mobile/`
6. Validate with 5 to 10 agents before polishing advanced features

## Notes

- The workspace is intentionally lightweight and scaffold-first.
- Dependencies were not installed automatically in this environment.
- The next step is to wire real Laravel, React, and Expo projects onto this structure.
