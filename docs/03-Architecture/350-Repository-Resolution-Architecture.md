ATH-ARC-350 — Repository Resolution Architecture
1. Purpose
1.1 Objective

The purpose of this document is to define the architectural mechanism through which Business Repositories obtain access to persistence providers without introducing technology coupling or violating the dependency direction established by the ARK architecture.

This document completes the Persistence Architecture by introducing the missing architectural resolution point between Repository implementations and Technology Providers.

It does not introduce any persistence technology, dependency injection framework, service locator, or repository implementation.

It defines only the architectural responsibilities and interaction model.

1.2 Architectural Context

After completing ATH-ARC-320, ATH-ARC-330 and ATH-ARC-340, the persistence architecture reached the following structure:

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
Technology Adapter Foundation
        ↓
Technology Provider
        ↓
Database

This architecture successfully separates business concerns from infrastructure concerns.

However, one architectural question intentionally remained unanswered:

How does a Repository obtain the appropriate persistence provider while remaining completely independent from the underlying technology?

This document answers that question.

1.3 Problem Statement

A concrete Repository cannot directly create a persistence provider because doing so would violate the architectural dependency rules.

Likewise, the Runtime Foundation cannot create repositories because Runtime is responsible only for provider lifecycle management.

Similarly, Technology Providers must not know about Business Repositories because Providers belong exclusively to the infrastructure layer.

Therefore, a dedicated architectural resolution mechanism is required.

Its sole responsibility is to connect existing architectural components without allowing any of them to become aware of implementation details outside their own responsibilities.

1.4 Design Goal

The Repository Resolution Architecture exists to satisfy four architectural goals simultaneously:

Preserve Business independence.
Preserve Provider independence.
Preserve Runtime independence.
Allow Repository implementations to remain completely reusable.

This mechanism must act purely as an architectural bridge.

It must never become a new business layer, infrastructure service, or dependency container.

1.5 Scope

This document defines:

Repository resolution responsibilities.
Architectural ownership.
Resolution lifecycle.
Dependency direction.
Resolution boundaries.
Future extensibility rules.

It deliberately does not define:

Dependency Injection containers.
Framework-specific registration.
Service Locators.
IoC implementations.
Runtime execution.
Repository implementations.

Those concerns belong to implementation, not architecture.

2. Architectural Principles
2.1 Resolution Is a Coordination Mechanism

Repository Resolution is not a business component.

It is not a persistence provider.

It is not part of the Runtime.

It is not part of any Repository.

Its sole responsibility is to coordinate the interaction between architectural layers while preserving the dependency direction defined by the system architecture.

It owns no business rules, no persistence logic, and no provider-specific behavior.

2.2 Business Must Never Resolve Infrastructure

Business components must never locate, create, select, or configure persistence providers.

A Repository may request persistence capabilities only through architectural contracts.

The decision of which provider satisfies those contracts belongs exclusively to the infrastructure side of the architecture.

This guarantees that Business remains completely independent from persistence technologies.

2.3 Providers Must Never Know Business

Technology Providers must remain unaware of Business concepts.

A Provider serves persistence capabilities.

It does not understand Customers, Trades, Portfolios, Campaigns, or any other domain concepts.

Its responsibility ends at exposing persistence functionality through architectural contracts.

Business semantics must never flow downward into Provider implementations.

2.4 Resolution Owns No Lifecycle

Repository Resolution is not responsible for creating application lifecycles.

Application startup, provider initialization, runtime state management, and provider disposal remain responsibilities of the Runtime Foundation.

Resolution merely connects existing architectural participants.

It neither owns nor extends their lifecycle.

2.5 Resolution Must Remain Technology Neutral

The resolution mechanism must never depend on a specific database technology, framework, ORM, or dependency injection container.

Whether the system uses Supabase, PostgreSQL, SQLite, MongoDB, or any future provider, the architectural resolution process must remain identical.

Technology-specific behavior belongs exclusively inside the corresponding Technology Provider.

2.6 Resolution Exists to Preserve Separation

The existence of the Repository Resolution Architecture serves a single architectural purpose:

to preserve the separation between Business, Runtime, Providers, and Infrastructure while allowing them to collaborate safely.

If introducing a resolution mechanism increases coupling between architectural layers, then the mechanism has failed its purpose regardless of whether it functions correctly.

Architectural correctness always takes precedence over implementation convenience.

2.7 Architectural Rule

The Repository Resolution Architecture must always reduce knowledge, never increase it.

Each architectural layer should know only the minimum information required to fulfill its own responsibility.

No participant may gain awareness of another layer merely because a resolution mechanism exists.

The resolution mechanism exists to hide relationships, not to expose them.

3. Repository Resolution Model
3.1 Architectural Position

The Repository Resolution Architecture is positioned between the Repository Implementation Foundation and the Persistence Runtime Foundation.

Its purpose is to provide the single architectural interaction point through which Repository implementations obtain persistence capabilities.

The resulting architecture becomes:

Business Domain
        ↓
Persistence Contracts
        ↓
Repository Foundation
        ↓
Repository Implementation Foundation
        ↓
Repository Resolution Architecture
        ↓
Persistence Mapping Foundation
        ↓
Persistence Runtime Foundation
        ↓
Technology Adapter Foundation
        ↓
Technology Provider
        ↓
Database

The Resolution layer does not replace any existing architectural component.

Instead, it completes the interaction chain by introducing the missing coordination point between Repository implementations and the Persistence Runtime.

3.2 Architectural Responsibility

Repository Resolution has exactly one responsibility:

Resolve an appropriate persistence capability for a Repository without exposing provider-specific knowledge to the Repository itself.

Resolution neither performs persistence operations nor manages provider lifecycle.

It simply connects already existing architectural participants according to the dependency rules established by the architecture.

3.3 Dependency Direction

The dependency direction remains strictly one-way.

Repository
        ↓
Resolution
        ↓
Runtime
        ↓
Technology Adapter
        ↓
Provider

No dependency may ever point upward.

In particular:

Runtime must never know concrete Repositories.
Providers must never know Business Repositories.
Business must never know Providers.
Resolution must never introduce reverse dependencies.

The Repository Resolution Architecture preserves the original architectural direction without modification.

3.4 Architectural Ownership

Each participant owns a single architectural concern.

Repository

Owns persistence behavior required by the Business Domain.

Repository Resolution

Owns repository-to-runtime coordination.

Runtime

Owns provider lifecycle and runtime state.

Technology Adapter

Owns provider abstraction.

Provider

Owns technology-specific persistence behavior.

No responsibility overlaps another.

Every participant remains independently replaceable.

3.5 Resolution Flow

The architectural interaction follows this sequence:

A Repository requires persistence capabilities.
The Repository communicates only with the Resolution layer.
Resolution requests the appropriate runtime capability.
Runtime supplies the active provider through architectural contracts.
The Provider performs technology-specific persistence operations.
Results propagate back through the same architectural chain.

Throughout this process:

Business remains unaware of infrastructure.
Repository remains unaware of provider technology.
Provider remains unaware of business concepts.
Runtime remains unaware of repository implementations.

Each layer observes only the contracts immediately adjacent to it.

3.6 Architectural Outcome

Repository Resolution does not introduce a new execution layer.

It introduces a new architectural boundary.

Its existence ensures that Repository implementations consume persistence capabilities through a stable architectural contract rather than by depending directly on runtime services or technology providers.

By centralizing this responsibility, the architecture gains a single, controlled extension point for all future persistence technologies while preserving the independence of every existing layer.

3.7 Architectural Principle

The Repository Resolution Architecture exists to resolve capabilities, not implementations.

Repositories request what they need, never who provides it.

This distinction guarantees that architectural decisions remain independent from technology decisions, allowing persistence technologies to evolve without affecting Business or Repository implementations

4. Architectural Components
4.1 Overview

The Repository Resolution Architecture is intentionally minimal.

It introduces only the architectural components required to establish communication between Repository implementations and the Persistence Runtime.

Every component has a single responsibility.

No component performs persistence operations.

No component owns business behavior.

No component introduces technology-specific knowledge.

This ensures that the Resolution layer remains an architectural coordinator rather than becoming an execution framework.

4.2 Repository Resolution Contract

The Resolution Contract defines the only architectural capability visible to Repository implementations.

Repositories communicate exclusively through this contract.

The contract exposes persistence capabilities without revealing:

runtime implementation,
provider implementation,
database technology,
provider lifecycle,
infrastructure configuration.

It represents the stable architectural boundary consumed by every Repository.

4.3 Resolution Context

The Resolution Context carries the architectural information required during repository resolution.

It does not contain business state.

It does not contain persistence data.

It does not contain provider-specific configuration.

Its responsibility is limited to describing the architectural environment in which resolution occurs.

The context exists only for coordination purposes.

4.4 Resolution Strategy

The Resolution Strategy defines how an appropriate persistence capability is selected.

Importantly, it does not decide which technology should be used.

Technology selection belongs to Runtime configuration.

Resolution Strategy merely defines the architectural process by which a Repository request is matched to an available persistence capability.

This separation prevents architectural decisions from becoming technology decisions.

4.5 Resolution Result

Every resolution attempt produces a Resolution Result.

The result represents an architectural capability, not a concrete implementation.

A successful result guarantees that the Repository can perform persistence operations through architectural contracts.

An unsuccessful result communicates only architectural failure information.

It never exposes provider internals.

4.6 Resolution Boundary

The Repository Resolution layer forms the final architectural boundary before entering the Runtime Foundation.

From this point downward:

Runtime manages execution.
Technology Adapters manage abstraction.
Providers manage persistence technologies.

From this point upward:

Repositories remain completely unaware of all infrastructure concerns.

The Resolution Boundary therefore protects both sides simultaneously.

4.7 Component Relationships

The interaction between architectural components follows this model:

Repository
        │
        ▼
Repository Resolution Contract
        │
        ▼
Resolution Context
        │
        ▼
Resolution Strategy
        │
        ▼
Resolution Result
        │
        ▼
Persistence Runtime

Each component communicates only with its immediate neighbor.

No component may bypass another.

This restriction guarantees that architectural responsibilities remain explicit and independently replaceable.

4.8 Architectural Principle

The Repository Resolution Architecture consists entirely of architectural contracts, not architectural services.

Its components define how layers collaborate, not how persistence is executed.

Execution belongs to Runtime.

Technology belongs to Providers.

Business belongs to Repositories.

Resolution exists only to preserve the architectural separation between them

5. Resolution Lifecycle
5.1 Architectural Lifecycle

Repository Resolution defines an architectural interaction lifecycle rather than an execution lifecycle.

Its purpose is to coordinate the movement of architectural capabilities across layers while preserving complete separation of responsibilities.

The lifecycle neither executes persistence operations nor manages runtime resources.

Execution begins only after architectural resolution has successfully completed.

5.2 Resolution Sequence

Every repository interaction follows the same architectural sequence.

Repository
        │
        ▼
Repository Resolution
        │
        ▼
Resolution Context
        │
        ▼
Resolution Strategy
        │
        ▼
Persistence Runtime
        │
        ▼
Technology Adapter
        │
        ▼
Technology Provider
        │
        ▼
Persistence Capability Returned
        │
        ▼
Repository Operation Begins

Architectural resolution always completes before any persistence operation starts.

This guarantees that execution never influences architectural decisions.

5.3 Repository Perspective

From the Repository point of view, persistence appears as a single architectural capability.

A Repository never asks:

Which database is being used?
Which provider is active?
Which runtime created the provider?
Which adapter performs the communication?

Instead, it simply requests the persistence capability required to fulfill its responsibility.

The Repository therefore remains completely independent from infrastructure evolution.

5.4 Runtime Perspective

From the Runtime perspective, Repository Resolution represents only a capability request.

Runtime neither understands business concepts nor repository implementations.

Its responsibility begins only after Resolution has translated the architectural request into a runtime request.

This separation allows Runtime implementations to evolve independently from Repository implementations.

5.5 Provider Perspective

Technology Providers participate only after Runtime has selected the active provider.

Providers never interact directly with Repository Resolution.

They receive requests exclusively through Runtime contracts.

Consequently:

Providers remain unaware of Business.
Providers remain unaware of Repository implementations.
Providers remain replaceable without affecting architectural resolution.
5.6 Failure Handling

Architectural failures and persistence failures belong to different architectural concerns.

Repository Resolution reports only architectural failures such as:

no compatible persistence capability,
invalid architectural configuration,
unavailable runtime capability.

Persistence failures, such as connection errors or database exceptions, remain responsibilities of the active Technology Provider and Runtime.

Separating these failure categories prevents architectural concerns from becoming infrastructure concerns.

5.7 Lifecycle Stability

The Repository Resolution lifecycle must remain stable regardless of future architectural evolution.

Adding new providers, new databases, new adapters, or new runtime implementations must never alter the Repository Resolution process itself.

Only participating components may change.

The lifecycle remains constant.

This stability ensures that architectural evolution does not require Repository evolution.

5.8 Architectural Principle

The Resolution Lifecycle resolves architectural capabilities exactly once.

After a Repository has obtained the required persistence capability, all subsequent persistence interactions occur through the already established architectural contracts.

Resolution is therefore an entry point into the persistence architecture—not a participant in every persistence operation.

This keeps the architecture efficient, predictable, and free from unnecessary coordination overhead .

6. Architectural Constraints & Evolution Rules
6.1 Architectural Stability

The Repository Resolution Architecture is a foundational architectural component.

Once established, its responsibility must remain stable throughout the lifetime of the system.

Future architectural evolution may extend the Resolution layer.

It must never redefine its core responsibility.

Architectural stability takes precedence over implementation convenience.

6.2 Business Independence Is Immutable

Under no circumstances may Business components obtain knowledge about:

persistence providers,
runtime implementations,
technology adapters,
infrastructure configuration,
database technologies.

Repository Resolution exists specifically to preserve this independence.

Any architectural evolution that weakens this separation shall be considered an architectural regression.

6.3 Technology Evolution Must Be Isolated

New persistence technologies may be introduced at any time.

Examples include:

PostgreSQL
Supabase
SQLite
MongoDB
Distributed persistence systems
Future persistence technologies not yet known

The introduction of a new provider must never require changes to:

Business Domain
Repository Contracts
Repository Implementations
Resolution Architecture

Only the Technology Adapter and Provider layers are allowed to evolve.

6.4 Resolution Is Closed for Business Logic

Business behavior must never enter the Repository Resolution layer.

Resolution may coordinate.

Resolution may resolve.

Resolution may validate architectural contracts.

Resolution must never perform:

business validation,
authorization,
domain decisions,
persistence execution,
provider-specific optimization.

Its responsibility remains strictly architectural.

6.5 Resolution Is Open for Extension

Although its responsibility is fixed, the Resolution Architecture may evolve through architectural extensions.

Future extensions may introduce:

new resolution strategies,
new capability types,
additional architectural metadata,
enhanced runtime coordination.

Such extensions are acceptable only when they preserve every architectural principle defined in this document.

Extension must never become modification.

6.6 Architectural Dependency Is Permanent

The dependency direction established by the Persistence Architecture is permanent.

No future implementation may introduce reverse dependencies.

The following direction is immutable:

Business
        ↓
Repository
        ↓
Resolution
        ↓
Runtime
        ↓
Technology Adapter
        ↓
Provider
        ↓
Database

Architectural evolution may add new layers.

It may never reverse existing dependencies.

6.7 Architectural Review Requirement

Every future modification affecting Repository Resolution must be evaluated from an architectural perspective before implementation begins.

The primary review question shall always be:

Does this change preserve the separation of architectural responsibilities?

If the answer is uncertain, implementation must pause until the architectural implications are fully understood.

Architecture guides implementation—not the other way around.

6.8 Architectural Principle

A successful architecture is measured not by how easily new features are added, but by how rarely existing architectural boundaries need to change.

The Repository Resolution Architecture is considered successful when future persistence technologies can be integrated without modifying the architectural responsibilities defined in this document.

Its greatest achievement is not enabling today's implementation.

Its greatest achievement is protecting tomorrow's architecture .

7. Architectural Summary
7.1 Architectural Achievement

The Repository Resolution Architecture completes the Persistence Architecture introduced throughout the previous architectural phases.

With the addition of this architectural boundary, every major responsibility within the persistence subsystem now has a clearly defined owner.

The architecture no longer contains implicit relationships or undefined interaction points.

Every collaboration between architectural layers is now governed by explicit contracts and responsibilities.

7.2 Completed Persistence Architecture

The persistence subsystem now consists of the following architectural layers:

Business Domain
        ↓
Persistence Contracts
        ↓
Repository Foundation
        ↓
Repository Implementation Foundation
        ↓
Repository Resolution Architecture
        ↓
Persistence Mapping Foundation
        ↓
Persistence Runtime Foundation
        ↓
Technology Adapter Foundation
        ↓
Technology Provider
        ↓
Database

Each layer owns exactly one architectural responsibility.

Each layer communicates only through defined architectural contracts.

Each layer remains independently replaceable.

7.3 Architectural Guarantees

The completed architecture guarantees that:

Business remains permanently independent from persistence technologies.
Repository implementations remain reusable across different providers.
Runtime remains independent from Business behavior.
Technology Providers remain isolated from domain knowledge.
New persistence technologies can be introduced without modifying existing architectural responsibilities.
Future architectural evolution occurs through extension rather than modification.

These guarantees establish the long-term stability of the persistence subsystem.

7.4 Future Evolution

Future implementation work will no longer focus on establishing architectural foundations.

Instead, future work will concentrate on implementing concrete capabilities on top of the architectural foundation established by:

ATH-ARC-320
ATH-ARC-330
ATH-ARC-340
ATH-ARC-350

Future Technology Providers, Repository implementations, Runtime extensions, and persistence features shall consume these architectural foundations without redefining them.

This transition marks the movement from architectural construction to architectural utilization.

7.5 Architectural Legacy

The value of this architecture is not measured by the number of persistence providers it supports today.

Its value is measured by its ability to support persistence technologies that do not yet exist.

A successful architecture survives technological evolution because it depends on responsibilities rather than implementations.

This document therefore represents not merely the completion of a persistence architecture, but the establishment of a durable architectural contract for the future evolution of ARK Trade Hub.

7.6 Final Architectural Principle

The ultimate objective of the Persistence Architecture is not to connect a Repository to a database.

Its objective is to ensure that no future database decision can compromise the integrity of the Business Domain.

Technology is expected to evolve.

Business knowledge must endure.

Therefore, the architecture is designed to protect business permanence against technological change.

Closing Statement

The Repository Resolution Architecture completes the architectural foundation of the Persistence subsystem.

Together with the previous architectural documents, it establishes a cohesive, provider-independent, and evolution-oriented persistence architecture.

From this point forward, persistence implementations are expected to conform to the architecture, not redefine it.

The architecture is considered complete when future implementations require no architectural reinterpretation to introduce new persistence capabilities.
