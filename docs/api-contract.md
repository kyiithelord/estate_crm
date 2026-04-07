# API Contract

## Auth

### `POST /api/register`

Request body:

```json
{
  "company_name": "Shwe Property",
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "secret123",
  "password_confirmation": "secret123"
}
```

### `POST /api/login`

```json
{
  "email": "admin@example.com",
  "password": "secret123"
}
```

### `POST /api/logout`

Requires auth token.

## Dashboard

### `GET /api/dashboard`

Response example:

```json
{
  "stats": {
    "properties": 42,
    "clients": 128,
    "openDeals": 16,
    "dueTasks": 5
  },
  "pipeline": {
    "new": 4,
    "contacted": 5,
    "visit": 3,
    "negotiation": 2,
    "closed": 2
  }
}
```

## Properties

- `GET /api/properties`
- `POST /api/properties`
- `GET /api/properties/{id}`
- `PUT /api/properties/{id}`
- `DELETE /api/properties/{id}`

Create payload:

```json
{
  "title": "2 bedroom condo",
  "price": 85000,
  "property_type": "sale",
  "location": "Yangon",
  "status": "available",
  "description": "Near city center"
}
```

## Clients

- `GET /api/clients`
- `POST /api/clients`
- `GET /api/clients/{id}`
- `PUT /api/clients/{id}`
- `DELETE /api/clients/{id}`

Create payload:

```json
{
  "name": "Aung Aung",
  "phone": "+959123456789",
  "email": "client@example.com",
  "interest": "buy",
  "notes": "Looking for downtown condo",
  "assigned_to": 2
}
```

## Deals

- `GET /api/deals`
- `POST /api/deals`
- `GET /api/deals/{id}`
- `PUT /api/deals/{id}`
- `DELETE /api/deals/{id}`
- `PATCH /api/deals/{id}/stage`

Stage update payload:

```json
{
  "stage": "visit"
}
```

## Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/{id}`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`
- `PATCH /api/tasks/{id}/complete`

Create payload:

```json
{
  "deal_id": 7,
  "title": "Call client after property visit",
  "due_date": "2026-04-08T09:00:00Z"
}
```
