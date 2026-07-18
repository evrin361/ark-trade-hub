ATH-ARC-380 — Persistence Execution Architecture
1. Purpose
1.1 Objective

This document formally defines the architectural responsibility for Persistence Execution within the ARK Trade Hub persistence architecture.

The purpose of this architecture is to establish the missing execution boundary that allows Repository Implementations to perform persistence operations while preserving the dependency hierarchy, provider independence, and technology neutrality established by the existing persistence foundations.

This document does not redesign any existing architectural component.

Instead, it complements the existing architecture by defining the execution responsibility that was intentionally left unspecified during the construction of the Persistence Foundation.

1.2 Scope

This architecture applies exclusively to the execution of persistence operations initiated by Repository Implementations.

It defines:

the architectural ownership of persistence execution,
the execution boundary beneath Repository Implementations,
the relationship between Repository Implementations and persistence providers,
the dependency rules governing persistence execution.

This document does not define:

Business Domain behavior,
Repository Contracts,
Repository Foundation,
Repository Resolution,
Runtime Resolution,
Mapping Architecture,
Technology Adapter responsibilities,
Provider-specific implementations,
database technologies,
query languages,
SQL generation,
transaction behavior,
authentication,
authorization,
caching,
or business logic.

Those responsibilities remain governed by their respective architectural documents.

1.3 Architectural Context

It complements the persistence architecture defined by:

ATH-ARC-320 — Data Persistence Architecture

ATH-ARC-350 — Repository Resolution Architecture

ATH-ARC-360 — Runtime Resolution Architecture

ATH-ARC-370 — Repository Foundation Integration Architecture

It introduces the architectural execution boundary beneath Repository Implementations without modifying the responsibilities defined by those documents.

Instead, it defines the architectural responsibility that connects Repository Implementations with provider execution while preserving the existing architectural layering and dependency.direction

2. Architectural Problem
2.1 Background

The persistence architecture established through ATH-ARC-320, ATH-ARC-350, ATH-ARC-360, and ATH-ARC-370 successfully defines:

Persistence Contracts
Repository Foundation
Repository Implementation Foundation
Persistence Mapping Foundation
Persistence Runtime Foundation
Technology Adapter Foundation
Repository Resolution
Runtime Resolution
Repository Foundation Integration

These architectural layers collectively establish the structural foundation required for provider-independent persistence.

2.2 Architectural Observation

During implementation of ATH-IMP-021 — Customer Repository Foundation, the first concrete Repository Implementation reached the point where persistence operations required execution against a persistence provider.

At that stage, an architectural investigation confirmed that:

Repository Contracts correctly define persistence operations.
Repository Foundation correctly realizes the Repository Contracts.
Repository Implementation Foundation correctly extends the Repository Foundation.
Runtime Foundation intentionally provides lifecycle and resolution abstractions only.
Technology Adapter Foundation intentionally remains execution-neutral.
Provider implementations currently expose lifecycle behavior only.

No architectural component currently owns the responsibility for executing persistence operations requested by Repository Implementations.

2.3 Architectural Gap

The existing architecture defines:

what Repository Implementations are expected to do,
how providers are resolved,
how providers are initialized,
and how persistence technologies remain isolated.

However, it does not define the architectural contract through which a Repository Implementation delegates the execution of persistence operations to the persistence infrastructure.

Consequently, Repository Implementations have no approved architectural execution boundary for operations such as:

retrieving entities,
persisting entities,
updating entities,
removing entities,
or executing provider-backed persistence behavior.

This gap is architectural rather than implementation-specific.

2.4 Architectural Objective

The objective of this document is therefore to establish the formal architectural ownership of Persistence Execution.

The architecture shall define:

where persistence execution responsibility resides,
how Repository Implementations access execution capabilities,
and how execution responsibilities remain independent from business logic, provider technologies, and repository abstractions.

This definition completes the persistence architecture without altering the responsibilities of the existing architectural foundations.

3. Architectural Principles
3.1 Single Responsibility

Persistence Execution shall own only the responsibility of executing persistence operations.

It shall not:

define repository behavior,
resolve providers,
perform entity mapping,
implement business rules,
manage runtime lifecycle,
or expose provider-specific functionality.

Its sole responsibility is the execution of persistence requests delegated by Repository Implementations.

3.2 Provider Independence

Persistence Execution shall remain completely independent from any concrete persistence technology.

It shall not depend directly upon:

Supabase,
PostgreSQL,
SQLite,
MongoDB,
or any future provider implementation.

Concrete providers shall implement the execution contract without modifying higher architectural layers.

3.3 Repository Independence

Repository Implementations shall remain unaware of provider-specific execution details.

A Repository Implementation may request persistence operations, but it shall never:

construct provider clients,
invoke provider SDKs,
generate provider-specific queries,
or access provider configuration directly.

All execution shall occur through the architectural execution boundary defined by this document.

3.4 Runtime Independence

Runtime Foundation remains responsible for:

provider lifecycle,
provider resolution,
provider discovery,
runtime coordination.

Persistence Execution shall not duplicate or replace these responsibilities.

Instead, it shall consume the Runtime Foundation according to the dependency hierarchy established by ATH-ARC-360.

3.5 Mapping Independence

Entity Mapping remains exclusively responsible for translating between:

Business Models
Persistence Models

Persistence Execution shall operate only on persistence-ready representations.

It shall neither perform mapping nor contain mapping knowledge.

3.6 Architectural Dependency Direction

The dependency direction established by previous architectural documents shall remain unchanged.

Persistence Execution may depend only upon lower architectural layers.

Higher layers shall never depend upon concrete providers or execution technologies.

The architectural dependency flow therefore remains strictly one-directional.

3.7 Technology Neutrality

Persistence Execution shall define behavior, not technology.

It shall expose architectural capabilities that remain valid regardless of:

database engine,
communication protocol,
persistence SDK,
deployment environment,
or infrastructure provider.

Technology-specific behavior belongs exclusively to concrete provider implementations.

4. Persistence Execution Architecture
4.1 Architectural Responsibility

Persistence Execution is introduced as the architectural boundary responsible for executing persistence operations requested by Repository Implementations.

It provides the execution capability that was intentionally absent from the previous persistence foundations.

Persistence Execution does not replace:

Repository Contracts,
Repository Foundation,
Runtime Foundation,
Technology Adapter Foundation,
or Provider implementations.

Instead, it complements them by introducing the missing execution responsibility between Repository Implementations and persistence providers.

4.2 Architectural Position

The persistence architecture is therefore extended as follows:

Business Domain
↓
Persistence Contracts
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

This extension preserves all previously established dependency rules while introducing a dedicated execution boundary.

4.3 Execution Boundary

Repository Implementations shall delegate persistence operations exclusively to the Persistence Execution Foundation.

Persistence Execution becomes the only architectural component responsible for invoking persistence providers.

Repository Implementations shall never execute provider operations directly.

Likewise, provider implementations shall never become directly visible to Repository Implementations.

4.4 Execution Contract

Persistence Execution shall expose a provider-neutral execution contract.

This contract represents persistence behavior rather than provider technology.

Its responsibilities include executing persistence requests while remaining independent from:

provider SDKs,
query languages,
storage engines,
and infrastructure technologies.

Concrete providers shall implement this execution contract according to their own technology without altering higher architectural layers.

Persistence Execution consumes the Runtime Foundation after repository resolution has completed.

It never performs provider discovery, lifecycle management, or repository selection.

Those responsibilities remain owned by Repository Resolution and Runtime Resolution.

4.5 Architectural Ownership

The ownership of persistence execution is therefore defined as:

Repository Implementations own repository behavior.
Persistence Execution owns persistence execution behavior.
Runtime owns provider lifecycle and resolution.
Technology Adapters own provider abstraction.
Concrete Providers own technology-specific implementation.

Each architectural responsibility remains isolated within its designated layer.

5. Component Responsibilities
5.1 Repository Implementation

Repository Implementations remain responsible for repository semantics.

Their responsibilities include:

exposing repository operations,
coordinating business persistence workflows,
invoking entity mapping,
delegating persistence execution.

Repository Implementations shall not:

execute provider operations,
construct provider clients,
access provider SDKs,
manage provider lifecycle,
or implement persistence technologies.

5.2 Persistence Execution Foundation

Persistence Execution Foundation owns the execution of persistence operations.

Its responsibilities include:

receiving execution requests from Repository Implementations,
delegating execution to the appropriate persistence provider,
preserving provider independence,
exposing a provider-neutral execution contract.

Persistence Execution Foundation shall not:
contain business rules,
perform entity mapping,
resolve providers,
manage provider lifecycle,
expose provider-specific APIs,
or define repository behavior.

5.3 Persistence Runtime Foundation

Persistence Runtime Foundation continues to own runtime coordination.

Its responsibilities remain:

provider lifecycle,
provider registration,
provider resolution,
runtime coordination.

Runtime Foundation shall not execute persistence operations.

Execution responsibility belongs exclusively to the Persistence Execution Foundation.

5.4 Technology Adapter Foundation

Technology Adapter Foundation remains responsible for abstracting persistence technologies.

It defines:

provider-neutral adapter contracts,
adapter abstractions,
provider integration boundaries.

Technology Adapter Foundation does not execute repository operations.

5.5 Concrete Provider

Concrete Providers implement persistence execution using provider-specific technologies.

They may use:

SDKs,
database drivers,
query builders,
transport protocols,
or infrastructure-specific mechanisms.

These implementation details remain completely isolated from higher architectural layers.

5.6 Business Domain

Business Domain remains completely unaware of persistence execution.

Business entities, services, and use cases continue to interact only with repository abstractions.

No persistence technology, execution mechanism, or provider implementation may become visible within the Business Domain.

5.7 Responsibility Matrix
Architectural Layer	Primary Responsibility
Business Domain	Business behavior
Repository Implementation	Repository behavior
Persistence Execution	Persistence execution
Runtime Foundation	Provider lifecycle & resolution
Technology Adapter	Provider abstraction
Concrete Provider	Technology-specific persistence
Database	Data storage

This separation ensures that every architectural layer owns exactly one primary responsibility while preserving the dependency hierarchy established throughout the persistence architecture.

6. Dependency Rules
6.1 Approved Dependency Direction

The persistence execution architecture preserves the one-directional dependency model established by the previous architectural documents.

The approved dependency flow is:

 Business Domain
        ↓
Persistence Contracts
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

No dependency may violate this direction.

6.2 Upward Dependencies

No lower architectural layer may depend upon any higher layer.

Specifically:

Providers shall never depend upon Repository Implementations.
Technology Adapters shall never depend upon Repository behavior.
Runtime Foundation shall never depend upon Business Domain.
Persistence Execution shall never depend upon Business Services.

The dependency hierarchy is strictly hierarchical.

6.3 Provider Isolation

Concrete providers remain fully isolated beneath the Technology Adapter Foundation.

Neither Repository Implementations nor Persistence Execution may expose provider-specific APIs, SDKs, or infrastructure behavior.

Replacing one provider with another shall require changes only within the provider implementation itself.

6.4 Execution Isolation

Persistence Execution serves exclusively as the execution boundary.

It shall not become:

a repository,
a mapper,
a provider,
a runtime coordinator,
or a business service.

Execution responsibility shall remain isolated from all other architectural concerns.

6.5 Architectural Stability

Future persistence technologies, execution engines, or infrastructure providers shall integrate by implementing the established execution contracts.

Higher architectural layers shall remain unchanged.

Consequently:

Repository Contracts remain stable.
Repository Foundation remains stable.
Repository Implementations remain stable.
Business Domain remains stable.

Architectural evolution shall occur through extension rather than modification.

6.6 Architectural Compliance

All future persistence implementations shall comply with the architectural responsibilities defined by:

ATH-ARC-320 — Data Persistence Architecture
ATH-ARC-350 — Repository Resolution Architecture
ATH-ARC-360 — Runtime Resolution Architecture
ATH-ARC-370 — Repository Foundation Integration Architecture
ATH-ARC-380 — Persistence Execution Architecture

These documents collectively define the canonical persistence architecture of ARK Trade Hub.


7. Summary
7.1 Architectural Outcome

ATH-ARC-380 completes the persistence architecture by formally defining the architectural ownership of Persistence Execution.

The architecture now distinguishes three independent responsibilities:

Repository behavior,
Runtime coordination,
Persistence execution.

Repository Resolution remains responsible for repository identification.

Runtime Resolution remains responsible for runtime orchestration.

Persistence Execution becomes responsible exclusively for persistence execution.

These responsibilities are intentionally independent and sequential.

Each responsibility is assigned to a dedicated architectural layer, preserving the separation of concerns established throughout the persistence architecture.

7.2 Architectural Completion

With the introduction of the Persistence Execution Foundation, the persistence architecture now provides complete architectural coverage for:

persistence contracts,
repository abstractions,
repository implementations,
entity mapping,
runtime coordination,
repository resolution,
runtime resolution,
repository foundation integration,
persistence execution,
technology adaptation,
provider implementations.

No architectural responsibility remains undefined within the persistence execution lifecycle.

7.3 Architectural Stability

This document introduces no modifications to previously approved architectural responsibilities.

Instead, it extends the existing architecture by defining the execution responsibility that was intentionally left outside the scope of earlier architectural documents.

All existing dependency rules, architectural boundaries, and provider independence principles remain unchanged.

7.4 Implementation Impact

The architectural clarification provided by ATH-ARC-380 enables the continuation of implementation tasks that require persistence execution capabilities.

In particular, it establishes the architectural foundation required for:

ATH-IMP-023 — Persistence Execution Foundation
ATH-DOC-008 — Persistence Execution Synchronization

Resumption and completion of ATH-IMP-021 — Customer Repository Foundation

No implementation shall introduce persistence execution behavior outside the boundaries defined by this document.

7.5 Governance

Future architectural evolution shall preserve the responsibility boundaries established by this document.

Any modification affecting:

execution ownership,
dependency direction,
provider isolation,
or execution contracts

shall require an explicit architectural review before implementation.

This document therefore becomes the canonical architectural reference governing persistence execution within ARK Trade Hub.

Document Status

Status: Approved Architecture Baseline

Architecture Identifier: ATH-ARC-380

Title: Persistence Execution Architecture

Classification: Core Persistence Architecture