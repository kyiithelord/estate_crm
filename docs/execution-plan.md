# Execution Plan

## Goal

Launch a small, usable real estate CRM SaaS for web and mobile that helps agents manage:

- leads
- properties
- deal stages
- reminders

## Phase 0: MVP definition

Time: 1 to 2 days

Ship only:

- login and registration
- properties
- clients
- deals
- tasks and reminders

Success criteria:

- a single agent can log in
- a company can only see its own records
- an agent can move a deal through the pipeline
- reminders can be created and marked complete

## Phase 1: system setup

Time: 1 to 2 days

Technical setup:

- create Laravel API project in `backend/`
- create React app in `frontend/`
- create Expo app in `mobile/`
- provision PostgreSQL
- decide auth strategy with Sanctum tokens for API access

Business setup:

- write a one-sentence offer
- identify 10 target agents or agencies
- prepare simple demo screenshots from the web starter

## Phase 2: database and tenancy

Time: 1 to 2 days

Implementation focus:

- create `companies`
- assign `company_id` to tenant-owned records
- add middleware or scoped queries so users only access company data
- keep stages simple and explicit

Done when:

- tenant filtering exists for properties, clients, deals, and tasks
- seed data can create one company with two users

## Phase 3: backend MVP

Time: 5 to 7 days

Build APIs for:

- auth
- properties CRUD
- clients CRUD
- deals CRUD with stage updates
- tasks CRUD and completion
- dashboard summary counts

Engineering rules:

- request validation everywhere
- API resources or transformers for stable response shapes
- feature tests for auth, tenant access, and stage transitions

## Phase 4: web dashboard

Time: 5 to 7 days

Pages:

- login
- register
- dashboard
- properties
- clients
- deals
- tasks

UX focus:

- fast tables and forms
- clear pipeline view
- obvious daily work state

## Phase 5: mobile app

Time: 4 to 6 days after web baseline

Mobile MVP should prioritize field work:

- login
- today screen
- clients
- deals
- tasks
- property quick lookup

UX focus:

- large tap targets
- short forms
- call and message friendly layouts
- pipeline visibility without desktop complexity

## Phase 6: launch and sales

Time: 1 to 2 weeks alongside MVP

Actions:

- talk to 5 to 10 agents before full polish
- offer early access to first 3 to 5 users
- launch in Myanmar real estate Facebook groups
- use manual onboarding and manual payments at first

## Pricing

- Free: up to 10 leads
- $5/month: single agent full MVP
- $10/month: small team with multiple agents

## What comes later

Do not build these before validation:

- Stripe
- Facebook lead sync
- automation
- AI features
- advanced analytics
- drag and drop pipeline polish
- offline-first sync
