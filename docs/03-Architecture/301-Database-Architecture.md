# ARK Trade Hub - Database Architecture

## 1. Overview

This document defines the database architecture principles for ARK Trade Hub.

The purpose of this architecture is to provide a scalable, secure and maintainable data foundation for future modules.

---

# 2. Database Strategy

ARK Trade Hub separates business entities and authentication identities.

The system does not mix customer business data with user authentication data.

---

# 3. Core Concepts

## 3.1 Customer

Customer represents a business entity.

Examples:

- Traders
- Companies
- Partners
- Clients

Customer data belongs to the business domain.

Example fields:

- id
- first_name
- last_name
- mobile
- email
- customer_code
- status
- archived
- created_at
- updated_at


---

## 3.2 User Account

User represents an authenticated identity.

Authentication data is managed separately.

Example fields:

- id
- email
- password_hash
- role
- permissions
- customer_id (optional)
- created_at
- updated_at


---

# 4. Authentication Architecture

The system supports multiple user types:

## Internal Users

Examples:

- Admin
- Operator
- Manager


## Customer Users

Examples:

- Customer portal users
- Company employees


Authentication responsibility:

- Login
- Password management
- Sessions
- Permissions


---

# 5. Customer Lifecycle

Customer has independent lifecycle states.

Example:

Active:

Customer can operate normally.


Inactive:

Customer exists but operations are disabled.


Archived:

Customer is hidden from normal workflows but data remains preserved.


Rules:

- Archived customer cannot become active directly.
- Restore operation must happen before activation.
- Archive operation automatically disables customer.


---

# 6. Database Technology Decision

Initial architecture supports PostgreSQL based systems.

Candidate platforms:

- Supabase PostgreSQL
- Managed PostgreSQL services


Decision will be based on:

- Hosting requirements
- Cost
- Authentication needs
- Scalability


---

# 7. Current Development Phase

Current implementation uses local service abstraction.

Purpose:

- Build UI
- Validate workflows
- Define business rules


Database integration will replace the service layer without changing UI architecture.

---

# 8. Future Database Modules

Planned entities:

- Customers
- Users
- Roles
- Permissions
- Markets
- Providers
- Products
- Orders
- Trades
- Reports

---

# 9. Architecture Principle

Business logic must not depend directly on database implementation.

Application layers:

UI Layer

↓

Feature Layer

↓

Service Layer

↓

Repository / Database Layer


This allows future migration between database providers.