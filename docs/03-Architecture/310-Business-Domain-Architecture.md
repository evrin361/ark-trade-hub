# ATH-ARC-310

# Business Domain Architecture

---

## Document Information

| Field | Value |
|---|---|
| Document ID | ATH-ARC-310 |
| Category | Architecture |
| Title | Business Domain Architecture |
| Version | 1.0.0 |
| Status | Draft |
| Owner | ARK Engineering |
| Project | ARK Trade Hub (ATH) |

---

# 1. Purpose

This document defines the core business domain architecture of ARK Trade Hub.

It establishes the fundamental business entities, their responsibilities, ownership rules, and relationships.

The objective is to create a stable domain model capable of supporting future growth without requiring structural redesign.

This document serves as the primary business architecture reference for all future implementation.

---

# 2. Business Philosophy

ARK Trade Hub is a trade execution platform.

It does not own customer assets.

It does not generate trading signals.

It coordinates execution between organizations, operators, customers, portfolios and exchanges while preserving ownership boundaries.

Core principle:

> Assets belong to Customers.
>
> Execution belongs to Organizations.
>
> The platform belongs to ARKVERSE.

---

# 3. Architectural Principles

The business domain follows these principles:

- Clear ownership
- Explicit responsibilities
- Separation of concerns
- Tenant isolation
- Independent business entities
- Future scalability
- Auditability
- Extensibility

Every business entity owns a single responsibility.

No entity should combine multiple business concerns.

---

# 4. Tenant Model

The platform is designed as a Multi-Tenant system.

Each Organization represents one Tenant.

Organizations are completely isolated from one another.

Business data is never shared across organizations.

Each tenant owns:

- Users
- Customers
- Workspaces
- Campaigns
- Portfolios
- Exchange connections
- Trade history

Tenant isolation is a mandatory architectural rule.

---

# 5. Core Business Entities

The ARK Trade Hub business domain is built around the following primary entities:

- Organization
- Workspace
- User
- Customer
- Portfolio
- Exchange Account
- Campaign
- Trade

Each entity has a single, well-defined responsibility.

Relationships between entities are explicit and must not overlap.

---

# 6. Organization

Organization is the highest-level business entity inside ARK Trade Hub.

Each Organization represents an independent company or business operating on the platform.

An Organization owns all business resources created within its tenant.

Examples:

- Investment Company
- Asset Management Firm
- Family Office
- Financial Institution

An Organization owns:

- Users
- Customers
- Workspaces
- Campaigns
- Portfolios
- Exchange Connections
- Trade History
- Business Configuration

Organizations are completely isolated from one another.

No Organization can directly access another Organization's data.

---

# 7. Workspace

Workspace represents an operational environment inside an Organization.

It is the primary interface where operators perform their daily activities.

A Workspace may contain:

- Widgets
- Trade Console
- Campaign Views
- Customer Views
- Portfolio Views
- Monitoring Panels

Each User may personalize one or more Workspaces according to their responsibilities.

Workspace affects only the user experience.

It does not own business data.

---

# 8. User

A User represents a person who can authenticate into the system.

Users belong to exactly one Organization.

Users perform operational activities on behalf of their Organization.

Examples:

- Trader
- Portfolio Manager
- Analyst
- Administrator
- Support Operator

Users are responsible for:

- Authentication
- Performing business operations
- Creating campaigns
- Managing customers
- Executing trades

Users do not own customer assets.

---

# 9. Customer

A Customer represents the owner of investment assets managed by an Organization.

A Customer is a business entity.

A Customer is not a system user.

A Customer may own one or more Portfolios.

A Customer may later receive access to the Customer Portal through one or more Customer Accounts.

Customer responsibilities include:

- Asset ownership
- Investment preferences
- Risk profile
- Business relationship with the Organization

Customer data belongs exclusively to its Organization.

---

# 10. Portfolio

A Portfolio represents a logical collection of assets belonging to a single Customer.

Assets belong to Portfolios, not directly to Customers.

A Customer may own multiple Portfolios.

Examples:

- Long-term Investment
- High-Risk Portfolio
- Retirement Portfolio
- Crypto Portfolio

Each Portfolio may contain:

- Multiple Exchange Accounts
- Asset Allocation
- Positions
- Campaign Participation
- Performance History

Portfolio is the primary owner of investment assets.
---

# 11. Exchange Account

An Exchange Account represents a trading account connected to a financial exchange.

Examples include:

- Nobitex
- Binance
- Tehran Stock Exchange Broker
- Forex Broker

An Exchange Account does not own assets.

It provides the technical connection through which Portfolio assets are traded.

Each Exchange Account belongs to exactly one Portfolio.

A Portfolio may contain multiple Exchange Accounts.

Responsibilities of an Exchange Account include:

- Exchange connectivity
- API credentials
- Account status
- Trading permissions
- Exchange-specific configuration

Business decisions must never depend directly on Exchange implementations.

---

# 12. Campaign

A Campaign represents an investment or trading strategy applied to one or more Portfolios.

A Campaign defines:

- Trading objective
- Risk profile
- Allocation rules
- Execution policy

A Campaign does not own assets.

Instead, it operates on a defined allocation within participating Portfolios.

Multiple Portfolios may participate in the same Campaign.

Likewise, a single Portfolio may participate in multiple Campaigns, provided that allocation rules prevent conflicts.

Campaigns coordinate trading activity but never become the owner of customer assets.

---

# 13. Trade

A Trade represents a single execution activity.

Examples include:

- Buy Order
- Sell Order
- Stop Loss
- Take Profit
- Order Cancellation

A Trade belongs to one Campaign.

A Trade affects one Portfolio through one Exchange Account.

Trades are immutable business records.

Once executed, a Trade becomes part of the permanent audit history.

Trades do not own assets.

They only record business operations performed on assets.

---

# 14. Ownership Rules

Business ownership inside ARK Trade Hub follows strict rules.

Organization owns:

- Users
- Customers
- Workspaces
- Campaigns

Customer owns:

- Portfolios

Portfolio owns:

- Assets
- Exchange Accounts

Campaign manages:

- Allocations
- Trading Strategy
- Trade Execution

Trade records:

- Executed Operations

Ownership must always move downward.

No child entity may own its parent.

---

# 15. Relationship Overview

The high-level business hierarchy is:

Organization

↓

Users

↓

Customers

↓

Portfolios

↓

Exchange Accounts

↓

Assets

Campaigns operate across one or more Portfolios.

Trades are executed through Exchange Accounts on behalf of Campaigns.

This separation ensures clear ownership while allowing flexible execution.

---

# 16. Multi-Tenant Principles

Each Organization is an independent Tenant.

Tenant isolation is mandatory.

Business data must never be shared across Organizations.

A Customer may exist in multiple Organizations.

However, each occurrence represents an independent business relationship.

There is no shared ownership between Organizations.

This guarantees:

- Privacy
- Auditability
- Regulatory compliance
- Independent business operation

---

---

# 17. Business Relationship Rules

The relationships between business entities are governed by the following rules.

## Organization

- One Organization owns many Users.
- One Organization owns many Customers.
- One Organization owns many Campaigns.
- One Organization owns many Workspaces.

Organizations are completely isolated from one another.

---

## User

- A User belongs to exactly one Organization.
- A User may manage many Customers.
- A User may participate in many Campaigns.
- A User may execute Trades according to assigned permissions.

Users never own customer assets.

---

## Customer

- A Customer belongs to exactly one Organization.
- A Customer owns one or more Portfolios.
- A Customer may have zero or more Customer Portal Accounts.
- The same real-world person or company may exist as independent Customers in different Organizations.

Customer identity never crosses tenant boundaries.

---

## Portfolio

- A Portfolio belongs to exactly one Customer.
- A Portfolio contains one or more Assets.
- A Portfolio may contain multiple Exchange Accounts.
- A Portfolio may participate in multiple Campaigns.

Portfolio is the business owner of investment assets.

---

## Exchange Account

- An Exchange Account belongs to exactly one Portfolio.
- An Exchange Account connects to exactly one Exchange.
- All executions performed through an Exchange Account affect its owning Portfolio.

---

## Campaign

- A Campaign belongs to exactly one Organization.
- A Campaign may manage many Portfolios.
- A Portfolio may participate in multiple Campaigns.
- Allocation policies determine how Portfolio assets are used by each Campaign.

Campaigns never own assets.

---

## Trade

- Every Trade belongs to one Campaign.
- Every Trade is executed through one Exchange Account.
- Every Trade affects one Portfolio.
- Every Trade becomes part of the permanent audit history.

Trades are immutable business events.

---

# 18. Domain Boundaries

Each business entity owns a clearly defined responsibility.

Business responsibilities must never overlap.

| Entity | Responsibility |
|---------|----------------|
| Organization | Owns the business environment |
| Workspace | Provides the operational interface |
| User | Performs business operations |
| Customer | Owns investment portfolios |
| Portfolio | Owns investment assets |
| Exchange Account | Connects portfolios to financial markets |
| Campaign | Coordinates investment strategies |
| Trade | Records execution events |

This separation is mandatory and must be preserved throughout future development.

# 17. Future Evolution

This domain architecture is designed to support future expansion without structural redesign.

Future capabilities include:

- Customer Portal
- Multiple Financial Markets
- AI Signal Integration
- Smart Analysis Platform
- White-label Deployments
- Dedicated Customer Infrastructure
- Independent Organization Databases

Future features must extend this domain model rather than replace it.

---

# 19. Closing Principle

ARK Trade Hub is built around business ownership before software implementation.

The business domain defines the architecture.

The architecture defines the implementation.

Every new feature must respect the ownership boundaries and responsibilities established in this document.

---

# Revision History

| Version | Date | Description |
|---|---|---|
| 1.0.0 | 2026-07-10 | Initial Business Domain Architecture |