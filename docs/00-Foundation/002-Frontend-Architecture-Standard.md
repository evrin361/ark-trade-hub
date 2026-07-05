# ATH-STD-002

# Frontend Architecture Standard

---

Document ID: ATH-STD-002

Title: Frontend Architecture Standard

Status: Approved

Version: 1.0

Owner: ARK Engineering

Project: ARK Trade Hub (ATH)

---

# 1. Purpose

This document defines the mandatory architectural rules for the frontend of ARK Trade Hub.

Its purpose is to ensure:

- Long-term maintainability
- Low coupling
- High cohesion
- Feature isolation
- Scalability
- Predictable project structure

This standard is mandatory for every frontend developer and every AI assistant contributing to the project.

---

# 2. Architectural Philosophy

The frontend is not merely a user interface.

It is an application composed of independent business features.

Every feature must own its own UI, logic, services and types whenever possible.

The project follows:

Feature First Architecture

instead of

Layer First Architecture.

---

# 3. Project Structure

```
src/

app/

components/

features/

services/

hooks/

lib/

config/

types/

styles/
```

Each directory has one clear responsibility.

---

# 4. Directory Responsibilities

## 4.1 app/

Contains only:

- Routing
- Layouts
- Pages
- Route configuration

Business logic is NOT allowed.

---

## 4.2 components/

Contains reusable UI components.

Examples:

- Button
- Modal
- Card
- Table
- Dialog
- Badge

Components must never contain business rules.

Components must never communicate directly with external services.

---

## 4.3 features/

Every business capability lives here.

Examples:

```
features/

customers/

campaigns/

trades/

dashboard/

settings/

auth/
```

Each feature may contain:

```
components/

hooks/

services/

types/

utils/
```

Features must be independent whenever possible.

---

## 4.4 services/

Contains integrations with external systems.

Examples:

- Exchange APIs
- Supabase
- Email
- Telegram
- SMS

Services communicate.

Services do NOT decide business rules.

---

## 4.5 hooks/

Contains reusable React Hooks.

Hooks should contain reusable UI behavior.

Business rules should remain inside Features.

---

## 4.6 lib/

Contains generic utilities.

Examples:

- Date formatting
- Number formatting
- Validators
- Helpers

Utilities must remain business independent.

---

## 4.7 config/

Contains application configuration.

Examples:

- Environment mappings
- Constants
- Feature flags

---

## 4.8 types/

Contains shared TypeScript types.

Business-specific types should remain inside their Feature.

---

## 4.9 styles/

Contains global styling resources.

---

# 5. Dependency Rules

Dependencies must always flow downward.

Allowed:

```
Page

↓

Feature

↓

Service

↓

External API
```

Forbidden:

Service

↓

Feature

Forbidden:

Component

↓

External API

Forbidden:

Component

↓

Database

Forbidden:

Feature A

↓

Internal files of Feature B

Communication between Features must happen only through public interfaces.

---

# 6. Feature Isolation

Every Feature owns:

- Components
- Hooks
- Types
- Utilities
- Internal Services

A Feature should be movable with minimum changes.

High cohesion is preferred over shared code.

---

# 7. Shared Code Policy

Code must become shared only after at least two Features require it.

Premature abstraction is prohibited.

---

# 8. Naming Convention

Directories:

lowercase

Examples:

customers

campaigns

trade-console

Files:

PascalCase

Example:

TradeTable.tsx

CustomerCard.tsx

Types:

PascalCase

Interfaces:

Prefix I is prohibited.

Use:

Customer

TradeCampaign

instead of

ICustomer

ITradeCampaign

---

# 9. Business Logic

Business rules belong inside Features.

Examples:

✔ Position validation

✔ Campaign validation

✔ Trade calculation

✔ Risk validation

These must never exist inside UI components.

---

# 10. Future Evolution

When a business capability becomes reusable outside the Web application,

it must be promoted into:

packages/

Examples:

trade-engine

exchange

shared

dispatch-engine

The Web application must remain an application layer,

not the owner of the business logic.

---

# 11. Architecture Principles

The frontend follows:

- Single Responsibility Principle
- Low Coupling
- High Cohesion
- Feature Isolation
- Composition over Inheritance
- Explicit Dependencies
- Separation of Concerns

---

# 12. Compliance

Every Pull Request must comply with this document.

Any exception requires architectural review.

---

# Design Impact

This document directly affects:

- Frontend Folder Structure
- Feature Design
- Component Design
- Service Layer
- Shared Packages
- Future Mobile Application
- Exchange Adapter Integration
- Trade Console Implementation
