# ATH-ARC-370 — Repository Foundation Integration Architecture

| Status | Approved |
|---------|----------|
| Architecture ID | ATH-ARC-370 |
| Category | Architecture |
| Layer | Persistence |
| Owner | Architecture Board |
| Depends On | ATH-ARC-320, ATH-ARC-330, ATH-ARC-340, ATH-ARC-350, ATH-ARC-360 |
| Required By | ATH-DOC-007, ATH-IMP-022, ATH-IMP-021 |
| Last Updated | 2026-07-17 |

---

# 1. Purpose

This document formally defines the architectural relationship between the Persistence Repository Contracts and the Repository Foundation.

The purpose of this architecture is not to introduce a new persistence responsibility or architectural layer.

Instead, it establishes the formal integration rules that govern how the existing Repository Foundation fulfills and exposes the Persistence Repository Contracts.

This architecture eliminates ambiguity regarding repository inheritance, contract implementation, dependency direction, and generic behavior while preserving the provider-independent design principles established by the Persistence Architecture.

No new architectural capabilities are introduced by this document.

This document only formalizes an architectural relationship that was previously implicit within the persistence architecture.

# 2. Architectural Background

The persistence architecture of ARK Trade Hub has been progressively established through a series of architectural and implementation foundations.

These foundations introduced:

- - Persistence Contracts
- Repository Foundation
- Repository Implementation Foundation
- Repository Resolution Architecture
- Persistence Mapping Foundation
- Persistence Runtime Foundation
- Technology Adapter Foundation
- Runtime Resolution Architecture

Each architectural layer was intentionally designed to remain independent, reusable, and provider-neutral.

During the implementation of the first concrete repository (ATH-IMP-021), an architectural review was performed to verify that all existing foundations were sufficient for repository implementation.

The review confirmed that the persistence architecture already contained both:

- Repository Contracts
- Repository Foundation

and that both components had well-defined individual responsibilities.

However, the review also identified that the architecture had never formally specified the architectural relationship between these two existing components.

The architecture described their responsibilities and their position within the persistence layering but did not explicitly define how the Repository Foundation fulfills the Repository Contracts.

This omission did not introduce an architectural defect.

Instead, it left an important architectural relationship implicit rather than explicitly governed.

To preserve Architecture-First Development and prevent implementation tasks from making architectural assumptions, the implementation of ATH-IMP-021 was intentionally paused until this relationship could be formally documented.

This document provides that formal architectural definition.

Following the approval of ATH-ARC-390, the Repository Foundation Integration Architecture also formally distinguishes between business feature identities and persistence identities.

Repository abstractions no longer require feature models to expose persistence-specific identity contracts directly.

Instead, Feature Persistence Identity provides the architectural alignment between feature models and the persistence architecture while preserving the independence of both layers.

# 3. Architectural Principles

The Repository Foundation Integration Architecture is governed by the following architectural principles.

## 3.1 No New Architectural Responsibility

This document introduces no new architectural layer, capability, or persistence responsibility.

Its sole purpose is to formally define the relationship between two existing architectural components.

---

## 3.2 Contract-Driven Foundation

The Repository Foundation exists to provide reusable repository behavior that fulfills the Persistence Repository Contracts.

Repository abstractions shall therefore be contract-driven rather than independently defined.

The Repository Foundation shall never redefine repository behavior outside the contracts established by the Persistence Architecture.

---

## 3.3 Single Source of Repository Behavior

The Persistence Repository Contracts define the canonical repository operations for the persistence layer.

The Repository Foundation provides reusable implementations and abstractions of those operations.

Repository behavior shall not be duplicated across multiple architectural layers.

---

## 3.4 Architectural Consistency

All repository implementations throughout the system shall derive their repository behavior from the Repository Foundation.

The Repository Foundation shall derive its contractual behavior from the Persistence Repository Contracts.

This establishes a single architectural chain of responsibility for repository behavior.

---

## 3.5 Provider Independence

The integration defined by this document shall not introduce any dependency on:

- Database technologies
- ORM frameworks
- Runtime implementations
- Technology adapters
- Business entities

The relationship exists entirely within the architectural foundations of the persistence layer.

---

## 3.6 Implementation Neutrality

This document defines architectural rules only.

It does not prescribe implementation techniques, programming language features, inheritance mechanisms, or composition strategies beyond the architectural requirements defined in the following sections.

# 4. Repository Foundation Integration Rules

The Repository Foundation shall serve as the formal architectural realization of the Persistence Repository Contracts.

The following rules are mandatory across the entire persistence architecture.

---

## 4.1 Contract Fulfillment

Every reusable repository abstraction provided by the Repository Foundation shall fulfill the corresponding Persistence Repository Contract.

Repository behavior shall originate from the contracts and shall be realized by the Repository Foundation.

---

## 4.2 No Behavioral Divergence

The Repository Foundation shall not introduce repository operations that are absent from the Persistence Repository Contracts.

Likewise, repository contracts shall not define repository operations that cannot be fulfilled by the Repository Foundation.

Both architectural components shall evolve together as a single architectural unit.

---

## 4.3 Canonical Repository Contract

The Persistence Repository Contracts remain the canonical definition of repository capabilities.

The Repository Foundation is responsible only for providing reusable architectural implementations and abstractions of those capabilities.

Authority over repository behavior belongs to the contracts, not to the foundation.

---

## 4.4 Foundation Dependency Direction

The Repository Foundation depends on the Persistence Repository Contracts.

The reverse dependency is strictly prohibited.

Persistence Repository Contracts shall remain completely independent from any reusable implementation abstractions.

---

## 4.5 Architectural Evolution

Future architectural extensions involving repository behavior shall be introduced by extending the Persistence Repository Contracts first.

Only after repository capabilities are formally defined may the Repository Foundation evolve to provide reusable implementations of those capabilities.

Repository implementations, providers, or technology adapters shall never become the origin of new repository behavior.

## 4.6 Feature Persistence Identity

Repository Foundation abstractions shall operate on persistence identities rather than directly depending on feature model identity implementations.

Feature models remain responsible for their own business identities.

Feature Persistence Identity provides the architectural bridge that aligns feature models with repository contracts without introducing direct coupling between the Business Domain and the Persistence Foundation.

This separation preserves provider neutrality, repository generic consistency, and architectural independence.

# 5. Dependency and Generic Constraints

The integration between the Persistence Repository Contracts and the Repository Foundation shall comply with the following architectural constraints.

---

## 5.1 Dependency Hierarchy

The architectural dependency direction shall remain:

Business Domain
↓
Persistence Repository Contracts
↓
Repository Foundation
↓
Repository Implementation Foundation
↓
Concrete Repository Implementation
↓
Repository Resolution
↓
Runtime Resolution
↓
Persistence Execution
↓
Technology Adapter
↓
Concrete Provider
↓
Database

No component may introduce a dependency that violates this architectural direction.

---

## 5.2 Generic Consistency

Generic repository abstractions provided by the Repository Foundation shall preserve the generic contracts defined by the Persistence Repository Contracts.

The Repository Foundation shall not alter, weaken, or reinterpret the generic semantics established by the contracts.

---

## 5.3 Type Safety

Repository abstractions shall preserve compile-time type safety throughout the persistence architecture.

Architectural integration shall never require unsafe casting or implementation-specific type assumptions.

---

## 5.4 Provider Neutrality

The Repository Foundation shall remain completely independent of any persistence provider.

No repository abstraction shall reference:

- Supabase
- PostgreSQL
- SQLite
- MongoDB
- ORM-specific APIs
- Database drivers

Technology-specific behavior belongs exclusively to provider implementations.

---

## 5.5 Business Independence

The Repository Foundation shall not depend on business entities, aggregates, services, or application workflows.

Business knowledge remains exclusively within the Business Domain.

Repository abstractions shall remain reusable across all business modules.

---

## 5.6 Architectural Stability

Future provider implementations, runtime improvements, or mapping enhancements shall not require modification of the Repository Foundation solely to satisfy provider-specific behavior.

Provider evolution shall occur below the Repository Foundation within the persistence architecture.

## 5.7 Identity Separation

Repository generic abstractions shall depend only on persistence identity contracts.

Feature models shall not be required to implement persistence contracts directly.

Identity alignment between feature models and persistence abstractions is governed exclusively by ATH-ARC-390.

This guarantees that repository contracts remain reusable across independent feature modules.

# 6. Architectural Consequences

The formal integration defined by this document establishes a stable architectural contract between the Persistence Repository Contracts and the Repository Foundation.

The following architectural consequences are expected.

---

## 6.1 Unified Repository Behavior

Repository behavior throughout the persistence architecture is now governed by a single authoritative contract.

This eliminates ambiguity regarding repository responsibilities and prevents behavioral divergence between repository abstractions and repository contracts.

---

## 6.2 Foundation Consistency

The Repository Foundation now has a formally defined architectural responsibility.

Future modifications to repository abstractions shall remain synchronized with the Persistence Repository Contracts.

Repository Foundations are no longer permitted to evolve independently of their contracts.

---

## 6.3 Implementation Predictability

Concrete repository implementations may rely on the Repository Foundation without making architectural assumptions regarding repository capabilities.

Implementation tasks are therefore relieved from interpreting repository behavior, allowing them to focus solely on implementation concerns.

---

## 6.4 Governance Preservation

Architecture-first development is preserved by ensuring that repository capabilities originate from architectural contracts rather than implementation decisions.

Future implementation tasks shall never introduce new repository behavior without prior architectural approval.

---

## 6.5 Long-Term Maintainability

The persistence architecture becomes easier to evolve because repository contracts remain the single architectural source of truth while the Repository Foundation remains the reusable realization of those contracts.

This separation enables independent evolution of implementations without compromising architectural consistency.

---

## 6.6 Architectural Baseline

From the approval of this document onward, the formal relationship between the Persistence Repository Contracts and the Repository Foundation becomes part of the official architectural baseline of ARK Trade Hub.

All future repository-related architecture, documentation, and implementation activities shall comply with the rules established by this document.

# 7. Compliance

This architecture shall be interpreted together with the following architectural documents:

- ATH-ARC-320 — Data Persistence Architecture
- ATH-ARC-330 — Infrastructure Architecture
- ATH-ARC-340 — Application Architecture
- ATH-ARC-350 — Repository Resolution Architecture
- ATH-ARC-360 — Runtime Resolution Architecture
- ATH-ARC-380 — Persistence Execution Architecture
- ATH-ARC-390 — Feature Persistence Identity Architecture

This document complements the existing persistence architecture and does not replace or invalidate any previously approved architectural responsibility.

Its purpose is solely to formalize the architectural relationship between the Persistence Repository Contracts and the Repository Foundation.

## Relationship with ATH-ARC-380

ATH-ARC-370 governs the architectural integration between Repository Contracts and the Repository Foundation.

ATH-ARC-380 governs the execution of persistence operations beneath Repository Implementations.

Repository Foundation defines reusable repository behavior.

Persistence Execution performs persistence operations after runtime coordination has completed.

The two architectures complement one another while preserving strict architectural separation and provider independence.

ATH-ARC-390 complements both architectures by defining how feature identities participate in repository integration without exposing persistence contracts directly to feature models.

Repository Foundation continues to consume persistence contracts, while Feature Persistence Identity preserves the architectural separation between business models and persistence abstractions

---

# Related Documentation

The following documentation and implementation tasks directly depend on this architecture:

- ATH-DOC-007 — Repository Foundation Integration Synchronization
- ATH-IMP-022 — Repository Foundation Integration
- ATH-IMP-021 — Customer Repository Foundation

Future repository implementations shall assume this architectural relationship as part of the official persistence architecture.

---

# Architectural Decision

The Repository Foundation is hereby established as the formal architectural realization of the Persistence Repository Contracts.

Repository Contracts remain the authoritative definition of repository behavior.

Repository Foundation remains the reusable architectural realization of those contracts.

This relationship becomes mandatory across all current and future repository implementations within ARK Trade Hub.

---

# Final Statement

With the approval of ATH-ARC-370, the Persistence Architecture reaches a fully governed architectural state.

The architectural responsibilities of the persistence layer, their dependency direction, and their formal relationships are now explicitly documented.

Future implementation work may proceed without introducing architectural assumptions regarding repository behavior.

This document completes the architectural governance of the Repository Foundation and establishes a stable baseline for all subsequent persistence development.



