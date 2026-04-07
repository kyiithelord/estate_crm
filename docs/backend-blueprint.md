# Backend Blueprint

This folder is reserved for the Laravel API.

## What to build first

1. Laravel app bootstrap
2. Sanctum auth
3. migrations from `../docs/database-schema.sql`
4. models:
   - Company
   - User
   - Property
   - Client
   - Deal
   - Task
5. API routes from `../docs/api-contract.md`
6. tenant scoping middleware or query scopes

## Suggested Laravel route groups

- `auth`
- `dashboard`
- `properties`
- `clients`
- `deals`
- `tasks`

## Suggested policies

- user can only access records matching their `company_id`
- agent can only mutate assigned tasks unless admin

## Next backend milestone

Set up feature tests for:

- register/login/logout
- cross-company access denial
- deal stage transition
- task completion
