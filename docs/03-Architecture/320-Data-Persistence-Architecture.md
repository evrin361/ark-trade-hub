# ATH-ARC-320

# Data Persistence Architecture

Version: 1.0

Status: Draft

---

# 1. Vision

The purpose of this document is to define the architectural principles governing data persistence within ARK Trade Hub.

This document does not describe a specific database technology.

It defines how persistent storage serves the Business Domain while preserving complete architectural independence.

Persistence exists to preserve business truth.

It must never define business truth.

Business decisions always originate inside the Domain.

Persistence merely stores, retrieves, and protects those decisions.

---

# 2. Philosophy

ARK Trade Hub is designed around a Domain-First Architecture.

Business concepts are the center of the system.

Infrastructure exists to support the Business Domain.

Persistence exists to preserve the Business Domain.

Technology choices may change.

Business truth must not.

For this reason, every persistence decision must follow the Business Domain rather than influencing it.

The Domain is permanent.

Infrastructure is replaceable.

The database is an implementation detail.

Persistence is a service provided to the Domain.

It is never the owner of the Domain.
# 3. Architectural Principles

The following principles govern every persistence-related decision within ARK Trade Hub.

These principles are considered permanent architectural rules.

Implementation details may evolve over time.

These principles must remain stable.

---

## 3.1 Domain First

The Business Domain is the single source of truth.

Persistence exists only to preserve Domain state.

No persistence technology may influence Domain design.

Business concepts must never be redesigned to satisfy database limitations.

---

## 3.2 Domain Independence

The Business Domain must remain completely independent from persistence technologies.

The Domain must not depend on:

- Database engines
- ORMs
- Storage providers
- Query languages
- Infrastructure frameworks

Technology may change.

The Domain must remain stable.

---

## 3.3 Dependency Direction

Dependencies always point toward the Business Domain.

Infrastructure depends on Persistence.

Persistence depends on Domain Contracts.

Domain Contracts depend on the Business Domain.

The Business Domain depends on nothing.

The Domain is the architectural center of the system.

---

## 3.4 Repository Responsibility

Repositories provide persistence services to the Domain.

Repositories are responsible only for:

- Save
- Load
- Update
- Delete

Repositories must never:

- implement business rules
- perform business validation
- coordinate workflows
- calculate business outcomes
- make business decisions

Business behavior belongs exclusively to the Domain.

---

## 3.5 Persistence Ignorance

Business entities must not be aware of how they are persisted.

Entities must never contain persistence-specific behavior.

Persistence mechanisms must remain outside the Domain Model.

---

## 3.6 Replaceable Infrastructure

All persistence implementations must be replaceable.

Changing a database technology must not require changes inside the Business Domain.

Replacing infrastructure should affect only the persistence implementation layer.

---

## 3.7 Long-Term Maintainability

Architectural decisions should optimize long-term maintainability rather than short-term implementation convenience.

Short-term technical optimizations must never compromise Domain integrity.

The architecture should remain understandable, extensible, and replaceable throughout the lifetime of the project.

# 4. Persistence Architecture

The persistence layer exists to preserve the state of the Business Domain.

It does not define business behavior.

It does not define business ownership.

It does not define business workflows.

Its responsibility is limited to maintaining durable representations of Domain state.

---

## 4.1 Layer Structure

The persistence architecture is organized into the following architectural layers.

Business Domain
↓
Entity Identity Value Object Foundation (ATH-ARC-400)
↓
Persistence Repository Contracts
↓
Repository Foundation
↓
Repository Implementation Foundation
↓
Persistence Mapping Foundation
↓
Persistence Runtime Foundation
↓
Persistence Execution Foundation
↓
Technology Adapter Foundation
↓
Concrete Provider
↓
Database

Repository Resolution Architecture defines how repositories are identified and resolved independently of concrete providers.

Runtime Resolution Architecture defines how the persistence runtime resolves providers and coordinates runtime services.

Persistence Execution Architecture introduces the Persistence Execution Foundation the architectural execution boundary responsible for performing persistence operations.

Repository Resolution Architecture and Runtime Resolution Architecture are capability architectures.

They define architectural responsibilities that operate across the persistence architecture without introducing additional dependency layers.

Together, these architectural components complete the persistence architecture. while preserving provider independence and the canonical dependency hierarchy.

Each layer has a single responsibility and communicates only through well-defined contracts.

---

## 4.2 Business Domain

The Business Domain contains:

- Business Entities
- Value Objects
- Business Rules
- Domain Services

The Business Domain contains no persistence logic.

The Domain has no knowledge of:

- databases
- storage providers
- repository implementations
- infrastructure services

The Domain represents business truth only.

---

## 4.3 Persistence Contracts

Persistence Contracts define the persistence capabilities required by the Business Domain.

Examples include:

- Repository Interfaces
- Unit of Work Contracts
- Query Contracts
- Command Contracts

Contracts define behavior.

They do not define implementation.

---

## 4.4 Repository Foundation

Repository Foundation provides reusable persistence abstractions that implement the Persistence Contracts.

It establishes common repository behavior while remaining completely independent from persistence technologies.

Repository Foundation defines reusable architectural behavior.

It does not contain provider-specific implementation.

---

## 4.5 Repository Implementation Foundation

Repository Implementation Foundation provides reusable implementation building blocks shared by future persistence providers.

It extends the Repository Foundation while remaining technology independent.

Concrete persistence technologies are introduced through Technology Adapters.

# 5. Entity Persistence Strategy

Persistence is responsible for preserving business state.

It is not responsible for defining business state.

Each Business Entity determines its own identity and lifecycle.

Persistence preserves that information without changing its meaning.

---

## 5.1 Organization

Organization is the root business owner of the system.

Persistence preserves:

- Identity
- Ownership
- Configuration
- Lifecycle State

Organization ownership is immutable.

Business ownership must never be inferred from infrastructure.

---

## 5.2 Customer

Customers belong to exactly one Organization.

Persistence preserves:

- Customer identity
- Organization ownership
- Customer profile information
- Lifecycle state

Ownership relationships are preserved exactly as defined by the Business Domain.

---

## 5.3 Portfolio

Portfolios belong to a single Customer.

Persistence preserves:

- Portfolio identity
- Ownership
- Configuration
- Current persistent state

Calculated values are not required to become permanent data unless explicitly defined by the Business Domain.

---

## 5.4 Market

Markets represent external financial environments.

Persistence preserves only stable market definitions.

Runtime market data is not considered persistent business state unless explicitly required.

---

## 5.5 Exchange

Exchanges represent trading providers.

Persistence preserves:

- Exchange identity
- Supported capabilities
- Configuration
- Lifecycle state

Exchange runtime connectivity is infrastructure responsibility.

---

## 5.6 Exchange Account

Exchange Accounts belong to a Portfolio.

Persistence preserves:

- Ownership
- Exchange association
- Configuration
- Account lifecycle

Credentials and secrets are not part of the Business Domain and must follow dedicated security policies.

---

## 5.7 Campaign

Campaigns coordinate trading activities.

Campaigns own no business assets.

Persistence preserves:

- Configuration
- Lifecycle
- Participation rules

Asset ownership always remains outside Campaign.

---

## 5.8 Trade

Trades represent historical business events.

Completed trades become immutable business records.

Business history must remain trustworthy.

Corrections should be represented by new business events rather than modifying historical records whenever possible.
# 6. Long-Term Evolution Strategy

The persistence architecture must support continuous evolution without requiring fundamental redesign.

Business growth must extend the architecture rather than replace it.

Future technologies should integrate naturally into the existing architectural boundaries.

---

## 6.1 Replaceable Persistence

Persistence implementations are expected to evolve throughout the lifetime of the project.

Examples include:

- Database engines
- Storage providers
- Cloud platforms
- Repository implementations

Replacing these technologies must not require Business Domain modifications.

Technology evolves.

Business remains.

---

## 6.2 Horizontal Growth

New Business Domains should extend the existing architecture.

Adding new features must not require restructuring previously implemented Domains.

Future domains should integrate through existing architectural contracts.

---

## 6.3 Vertical Growth

Business entities may acquire additional capabilities over time.

New responsibilities should be introduced incrementally while preserving existing architectural boundaries.

Growth must occur through extension rather than modification whenever possible.

---

## 6.4 Infrastructure Evolution

Infrastructure services are expected to evolve independently.

Examples include:

- Authentication providers
- Cloud infrastructure
- Storage services
- Monitoring platforms
- Caching layers
- Messaging systems

Infrastructure evolution must remain isolated from Business logic.

---

## 6.5 Future Architectural Capabilities

The architecture intentionally prepares the project for future capabilities including:

- Domain Events
- Event Publishing
- Event Sourcing (if required)
- CQRS (if required)
- Multiple persistence providers
- Read models
- Background processing
- Distributed services

These capabilities should integrate without requiring Business Domain redesign.

---

## 6.6 Commercial Independence

Commercial capabilities are considered independent architectural concerns.

Examples include:

- Billing
- Subscription Management
- Licensing
- Revenue Sharing
- Usage Metering
- Marketplace integrations

Commercial services consume Business information.

They do not own Business logic.

The Business Domain must remain independent from commercial policies.
# 7. Architecture Decision Summary

The following architectural decisions define the permanent technical direction of ARK Trade Hub.

These decisions represent long-term architectural commitments.

Implementation details may evolve.

These decisions remain stable.

---

## AD-001

Business Domain defines the truth.

Persistence exists only to preserve that truth.

Status

Accepted

---

## AD-002

Business Domain remains completely independent from persistence technologies.

No database technology may influence Domain design.

Status

Accepted

---

## AD-003

Persistence follows the Business Domain.

The Business Domain never follows persistence.

Status

Accepted

---

## AD-004

The database is an implementation detail.

Changing persistence technology must not require Business Domain redesign.

Status

Accepted

---

## AD-005

Repositories are responsible only for persistence.

Business rules, validation, orchestration, and business decisions belong exclusively to the Business Domain.

Status

Accepted

---

## AD-006

Business ownership is defined by the Domain Model.

Ownership must never be inferred from infrastructure or database relationships.

Status

Accepted

---

## AD-007

Completed business events should remain immutable whenever possible.

Business history represents permanent truth.

Status

Accepted

---

## AD-008

Infrastructure exists to support persistence.

Persistence exists to support the Business Domain.

The Business Domain remains the architectural center of the system.

Status

Accepted

---

## AD-009

Commercial capabilities remain independent from Business logic.

Billing, Licensing, Subscription Management, Revenue Sharing, and future commercial services consume Business information without owning Business behavior.

Status

Accepted

---

## AD-010

The architecture is designed for continuous evolution.

Future capabilities should extend the architecture rather than replace it.

Status

Accepted

---

# Final Statement

ARK Trade Hub adopts a Domain-First architectural philosophy.

Every technical decision must preserve the independence, integrity, and long-term maintainability of the Business Domain.

Technology will evolve.

Infrastructure will evolve.

Persistence implementations will evolve.

The Business Domain remains the permanent foundation of the system.

All future architectural decisions should be evaluated against this principle before implementation.

---

# Related Architecture

This architecture is complemented by the following architectural documents:

- ATH-ARC-330 — Infrastructure Architecture
- ATH-ARC-340 — Application Architecture
- ATH-ARC-350 — Repository Resolution Architecture
- ATH-ARC-360 — Runtime Resolution Architecture
- ATH-ARC-370 — Repository Foundation Integration Architecture
- ATH-ARC-380 — Persistence Execution Architecture
- ATH-ARC-390 — Feature Persistence Identity Architecture
- ATH-ARC-400 — Entity Identity Value Object Architecture

ATH-ARC-370 formally defines the architectural relationship between Repository Contracts, Repository Foundation, Repository Implementation Foundation, Mapping Foundation, Runtime Foundation, and future provider implementations.

ATH-ARC-380 formally defines the Persistence Execution responsibility. It complements the persistence architecture by introducing the execution boundary beneath Repository Implementations without changing the responsibilities of Persistence Contracts, Repository Foundation, Runtime Foundation, or Repository Resolution Architecture.

ATH-ARC-320 remains the authoritative document for Persistence Architecture.

Relationship with ATH-ARC-390

The Persistence Architecture distinguishes between business identity and persistence identity.

Business entities continue to own their business identifiers as defined by the Business Domain.

Feature Persistence Identity introduces a persistence-facing identity model that enables persistence contracts, repository foundations, runtime coordination, and execution pipelines to remain independent from feature-specific business models.

The construction and lifecycle of persistence identities are formally governed by ATH-ARC-400. Persistence Repository Contracts use the Entity Identity Value Object defined by ATH-ARC-400 as the canonical representation of persistence identity. as the canonical architectural representation of entity identity, while remaining independent from concrete implementations.

Persistence components therefore operate on persistence identities rather than directly depending on feature entities.

This separation preserves:

Business independence
Repository generic consistency
Provider independence
Runtime neutrality
Long-term architectural stability

ATH-ARC-390 formally defines the architectural relationship between Feature Models and the Persistence Architecture without modifying the existing persistence execution chain
