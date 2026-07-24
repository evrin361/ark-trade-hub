Document Information
Field	Value
Architecture ID	ATH-ARC-400
Category	Architecture
Layer	Business Foundation
Owner	Architecture Board
Depends On	ATH-ARC-310, ATH-ARC-320, ATH-ARC-390
Required By	ATH-IMP-021 and all future Entity implementations
Last Updated	2026-07-19
1. Purpose

The purpose of this document is to establish the canonical architectural definition of Entity Identity throughout ARK Trade Hub.

This architecture defines the nature, responsibilities, lifecycle, construction rules, and behavioral guarantees of entity identities independently of any specific business feature, persistence provider, or implementation technology.

Entity Identity is treated as a fundamental architectural concept rather than a persistence detail.

It exists to provide a consistent, immutable, and provider-independent mechanism for identifying entities across the entire system.

This document completes the architectural foundation introduced by ATH-ARC-390 by defining not only the identity contract but also the architectural model governing the identity itself.

All current and future entities within ARK Trade Hub shall comply with the architectural rules established by this document

2. Architectural Background

The architectural treatment of entity identity within ARK Trade Hub has evolved incrementally as the persistence architecture matured.

Earlier architectural foundations established:

Business Domain Architecture
Persistence Architecture
Repository Foundation
Repository Integration
Persistence Execution
Feature Persistence Identity Alignment

Each of these architectures deliberately addressed a specific architectural responsibility while preserving strict separation of concerns.

During the implementation of ATH-IMP-021 (Customer Repository Foundation), the architectural relationship defined by ATH-ARC-390 was applied by aligning the Customer feature model with the Persistence Repository Contracts through the EntityId abstraction.

This successfully eliminated the architectural mismatch between Feature Models and Persistence Contracts.

However, the implementation validation exposed an additional architectural omission.

The architecture defined what an entity identity must be represented as, but it never formally defined what an Entity Identity actually is.

Specifically, the architecture provided an identity contract while intentionally leaving the identity itself undefined.

As a result, implementation reached a point where entity identities were required during:

entity creation,
repository interaction,
seed initialization,
and future entity construction,

without any architectural definition governing how an identity should be constructed, validated, compared, or represented.

This was not considered an implementation problem.

It was identified as an architectural responsibility that had not yet been formalized.

Rather than allowing implementation tasks to invent identity behavior, the implementation of ATH-IMP-021 was intentionally paused in accordance with the Architecture-First Development process.

This document completes that missing architectural responsibility.

It establishes Entity Identity as a first-class architectural concept independent of:

business features,
persistence providers,
repository implementations,
infrastructure technologies,
and application workflows.

From this point onward, every entity within ARK Trade Hub shall share a single architectural definition of identity governed by this document.

3. Architectural Principles

The Entity Identity Architecture is governed by the following architectural principles.

3.1 Identity as a Value Object

Entity Identity shall be treated as a Value Object.

It represents the architectural identity of an entity rather than a business attribute.

Its purpose is to uniquely identify an entity throughout its lifetime.

Entity Identity does not describe business state.

It describes entity identity only.

3.2 Identity Immutability

Entity Identity shall be immutable.

Once an identity has been assigned to an entity, it shall never change during the lifetime of that entity.

Identity replacement is prohibited.

Entity recreation results in a new identity rather than modification of an existing one.

3.3 Identity Independence

Entity Identity shall remain independent from:

Business Features
Persistence Providers
Repository Implementations
Infrastructure Technologies
Application Workflows
Presentation Models

Identity is an architectural concept shared across the entire system.

Its definition shall not vary between architectural layers.

3.4 Provider Neutrality

The structure and behavior of Entity Identity shall not depend on any persistence provider or external technology.

No identity implementation shall expose knowledge of:

PostgreSQL
Supabase
MongoDB
SQLite
Database-generated identifiers
ORM-specific identity types

Persistence providers may store identities.

They shall never define them.

3.5 No Business Meaning

Entity Identity carries no business meaning.

It shall never encode:

business classifications,
ownership,
timestamps,
organizational information,
feature-specific semantics,
or operational behavior.

Business meaning belongs exclusively to business attributes.

Identity exists solely for identification.

3.6 Architectural Consistency

Every entity within ARK Trade Hub shall follow the same architectural identity model.

Feature-specific identity implementations are prohibited.

Identity behavior shall remain consistent across all domains and features.

3.7 Identity Before Persistence

Entity Identity exists independently of persistence.

Persistence stores identities.

It does not create their architectural meaning.

An entity possesses an identity before any persistence operation occurs.

3.8 Single Identity Model

A single architectural identity model shall exist throughout the entire system.

Multiple identity abstractions representing the same architectural responsibility are prohibited.

All entities shall derive their identity behavior from the same architectural definition established by this document.

3.9 Identity as Part of the Entity

Entity Identity is part of the entity itself.

It is neither an infrastructure concern nor a persistence concern.

Its lifecycle follows the lifecycle of the entity.

It shall therefore be governed by the Business Foundation rather than by technical implementations.

4. Entity Identity Architecture
4.1 Architectural Role

The Entity Identity Value Object provides the concrete architectural realization of the EntityId abstraction defined by ATH-ARC-390.

ATH-ARC-390 established that every persistent entity must expose an architectural identity rather than a primitive identifier.

This document defines how that architectural identity is represented, created, validated, and preserved.

The Entity Identity Value Object therefore becomes the canonical implementation of the EntityId abstraction.

4.2 Value Object Semantics

Entity Identity is a Value Object.

It possesses no lifecycle independent of the entity it identifies.

It carries no business behavior.

It represents only immutable identity.

Two Entity Identity instances are considered equal when their underlying identifier value is equal.

Entity Identity therefore follows standard Value Object semantics while serving as the persistent identity abstraction for entities.

4.3 Immutable Identity

An Entity Identity shall be immutable.

After construction:

the identifier value shall never change,
no mutation operations shall exist,
no setter shall be provided,
identity replacement shall never occur.

Changing an entity's identity would represent a different entity rather than a modification of an existing one.

4.4 Identity Encapsulation

The internal identifier value shall remain encapsulated inside the Value Object.

Consumers interact with the Entity Identity abstraction rather than directly manipulating primitive identifiers.

The architectural representation therefore becomes:

Primitive Identifier

↓

Entity Identity Value Object

↓

Business Entity

Primitive identifiers shall never again become the architectural identity of persistent entities.

4.5 Equality

Entity Identity equality shall be based exclusively on identifier value.

No other attributes participate in equality.

The following concepts are explicitly excluded from identity comparison:

entity state,
timestamps,
persistence provider,
creation source,
runtime instance.

Identity equality depends solely on the identifier value.

4.6 Serialization Boundary

Entity Identity may expose its primitive identifier value when serialization or persistence requires it.

However, this exposure does not change the architectural abstraction.

Serialization is considered a technical concern.

The architectural identity remains the Value Object itself.

4.7 No Business Responsibility

The Entity Identity Value Object shall not contain:

business validation,
authorization logic,
persistence logic,
repository behavior,
domain workflows,
business calculations.

Its responsibility is strictly limited to representing immutable architectural identity.

5. Entity Identity Construction
5.1 Construction Responsibility

The creation of an Entity Identity shall occur exclusively through the Entity Identity Value Object.

No architectural layer shall construct Entity Identity instances by directly assembling implementation details.

Entity identity construction is therefore centralized within the Value Object itself.

5.2 Primitive-to-Identity Conversion

The Entity Identity Value Object shall provide the canonical mechanism for converting a primitive identifier into an architectural identity.

Typical primitive sources include:

generated identifiers,
persisted identifiers,
imported identifiers,
seed data,
externally supplied identifiers.

Regardless of origin, all identifiers shall become Entity Identity instances before entering the Business Model.

5.3 Canonical Construction

All entity identities shall be created using the same architectural construction mechanism.

The system shall not allow multiple independent approaches for constructing Entity Identity instances.

A single construction mechanism guarantees architectural consistency across all features.

5.4 Validation During Construction

Construction is responsible for ensuring that every Entity Identity instance satisfies the architectural requirements of a valid identity.

Invalid primitive identifiers shall never produce valid Entity Identity instances.

Validation therefore occurs during construction rather than after creation.

5.5 Construction Independence

Entity Identity construction shall remain independent of:

persistence providers,
repositories,
application services,
runtime execution,
business entities,
external frameworks.

Construction depends only on the Entity Identity abstraction itself.

5.6 Architectural Factory Boundary

The construction mechanism defined by this document represents an architectural factory boundary rather than a business factory.

Its responsibility is limited to creating valid identity objects.

It does not create entities.

It does not initialize aggregates.

It does not coordinate business workflows.

Its sole responsibility is producing valid Entity Identity instances.

5.7 Identity Generation

When a new entity requires a newly generated identifier, the generation process shall remain separate from identity representation.

Identifier generation produces a primitive identifier.

Entity Identity construction transforms that primitive identifier into the architectural identity.

This separation preserves the single responsibility of both concerns.

5.8 Architectural Consistency

Every persistent entity throughout ARK Trade Hub shall obtain its identity using the construction rules defined by this document.

Feature modules shall not introduce alternative identity construction mechanisms.

This guarantees that Entity Identity behaves consistently across the entire architecture.

6. Architectural Dependency and Placement
6.1 Architectural Placement

The Entity Identity Value Object belongs to the Business Foundation.

It is part of the shared architectural model used by all business features.

Entity Identity is not a persistence component.

It is not an infrastructure component.

It is not an application component.

Its architectural home is the Business Foundation because identity is an inherent property of every business entity.

6.2 Dependency Direction

The architectural dependency direction shall remain:

Business Features

↓

Business Foundation

↓

Persistence Contracts

↓

Repository Foundation

↓

Repository Implementations

↓

Infrastructure

↓

Technology Adapters

↓

External Technologies

The Entity Identity Value Object shall exist entirely above the persistence architecture.

Lower architectural layers may consume Entity Identity.

They shall never define it.

6.3 Feature Dependency

Business features shall depend on the Entity Identity Value Object through the shared Business Foundation.

Feature modules shall not introduce feature-specific identity abstractions.

Every feature shares the same architectural identity model.

6.4 Persistence Dependency

Persistence Contracts may reference the Entity Identity abstraction.

However, they shall never provide its implementation.

Persistence consumes identity.

It does not define identity.

6.5 Repository Dependency

Repository abstractions operate on entities that already possess architectural identity.

Repositories neither generate nor own identities.

Their responsibility begins only after valid Entity Identity instances already exist.

6.6 Infrastructure Independence

Infrastructure shall remain completely independent of the implementation of Entity Identity.

Infrastructure stores identity values.

It does not understand their architectural semantics.

Infrastructure therefore treats Entity Identity as opaque business data.

6.7 Provider Neutrality

Technology Adapters and Persistence Providers shall interact only with the serialized representation of Entity Identity when persistence is required.

No provider-specific behavior shall influence the architectural representation of identity.

The architectural definition always remains above provider implementations.

6.8 Architectural Stability

Future additions to the persistence architecture, repository implementations, or provider integrations shall not require modification of the Entity Identity Value Object solely because technical infrastructure evolves.

Architectural identity remains stable while technical implementations continue to evolve independently.

7. Architectural Consequences
7.1 Unified Identity Model

The introduction of the Entity Identity Value Object establishes a single architectural identity model across ARK Trade Hub.

All persistent entities now share the same architectural representation of identity.

This eliminates ambiguity regarding how entity identity is represented throughout the system.

7.2 Architectural Completeness

ATH-ARC-390 introduced the architectural requirement that persistent entities expose EntityId instead of primitive identifiers.

ATH-ARC-400 completes that architecture by providing the canonical realization of EntityId.

Together, the two architectures define both:

the architectural requirement,
the architectural implementation.

The identity model is therefore complete.

7.3 Elimination of Primitive Identity Leakage

Business entities no longer expose primitive identifier values as their architectural identity.

Primitive identifiers become implementation details hidden behind the Entity Identity Value Object.

This strengthens encapsulation and preserves architectural consistency.

7.4 Repository Foundation Compatibility

Repository Foundation generic constraints now operate on a concrete architectural identity model rather than an abstract contract without implementation.

Persistent entities satisfy Repository Foundation requirements without requiring implementation-specific assumptions.

Repository integration therefore becomes fully deterministic.

7.5 Feature Consistency

Every feature module now follows the same identity architecture.

Customer, Organization, Portfolio, Campaign, Trade, Exchange Account, Asset, and future business entities all adopt the same architectural identity representation.

Feature-specific identity implementations are prohibited.

7.6 Persistence Independence

Persistence continues to depend only on architectural identity.

It does not own identity creation.

It does not define identity behavior.

Persistence responsibilities remain unchanged while architectural completeness is achieved.

7.7 Long-Term Maintainability

Future architectural evolution becomes significantly simpler because entity identity is now governed by a single reusable Value Object.

Enhancements to identity behavior, validation, or construction occur centrally without requiring modifications across every feature.

7.8 Resolution of ATH-IMP-021

The architectural gap discovered during ATH-IMP-021 has now been resolved.

Repository integration, feature entities, and persistence contracts all operate on a common architectural identity model.

Implementation may therefore continue without introducing architectural assumptions regarding EntityId construction or representation.

8. Compliance

This architecture shall be interpreted together with the following architectural documents:

ATH-ARC-300 — Architecture Principles
ATH-ARC-310 — Business Domain Architecture
ATH-ARC-320 — Data Persistence Architecture
ATH-ARC-330 — Infrastructure Architecture
ATH-ARC-340 — Application Architecture
ATH-ARC-350 — Repository Resolution Architecture
ATH-ARC-360 — Runtime Resolution Architecture
ATH-ARC-370 — Repository Foundation Integration Architecture
ATH-ARC-380 — Persistence Execution Architecture

This document extends the architectural model introduced by ATH-ARC-390 and completes the identity architecture required by the persistence foundation.

Relationship with ATH-ARC-390

ATH-ARC-390 establishes that every persistent business entity exposes EntityId as its architectural identity.

ATH-ARC-400 defines the canonical implementation of that architectural identity.

Together, the two documents establish the complete Feature Persistence Identity architecture.

ATH-ARC-390 defines what entity identity must be.

ATH-ARC-400 defines how that identity is represented within the Business Foundation.

Related Documentation

The following documentation and implementation activities directly depend on this architecture:

ATH-DOC-009 — Feature Persistence Identity Synchronization
ATH-IMP-021 — Customer Repository Foundation
Future Repository Implementations
Future Business Entity Foundations

All future persistent business entities shall adopt the Entity Identity Value Object defined by this architecture.

Architectural Decision

The Entity Identity Value Object is hereby established as the canonical architectural representation of persistent business identity within ARK Trade Hub.

Business entities shall expose EntityId as their architectural identity.

The Entity Identity Value Object resides within the Business Foundation.

Persistence, repositories, infrastructure, runtime coordination, and technology adapters consume this architectural identity but shall never define or own it.

This architectural rule becomes mandatory across all current and future persistent entities.

Final Statement

With the approval of ATH-ARC-400, the architectural identity model of ARK Trade Hub becomes fully defined.

Persistent business entities now share a common architectural identity representation.

The Business Foundation owns identity.

Persistence consumes identity.

Infrastructure stores identity.

Technology serializes identity.

This completes the architectural identity chain introduced by ATH-ARC-390 and removes the final architectural ambiguity identified during the implementation of ATH-IMP-021.

Future repository implementations may proceed using a complete, provider-independent, business-owned identity model while preserving the architectural principles of ARK Trade Hub.