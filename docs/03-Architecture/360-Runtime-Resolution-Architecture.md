1. Purpose
1.1 Background

The persistence architecture established throughout ATH-ARC-320, ATH-ARC-330, ATH-ARC-340, and ATH-ARC-350 defines a complete separation between the Business Domain and persistence technologies.

The architecture now provides:

Persistence Contracts
Repository Foundation
Repository Implementation Foundation
Persistence Mapping Foundation
Persistence Runtime Foundation
Persistence Execution Foundation
Technology Adapter Foundation
Repository Resolution Architecture

These architectural layers collectively establish a provider-independent persistence platform.

During the architectural validation performed for ATH-IMP-021 (Customer Repository Foundation), an additional architectural dependency was identified.

Although Repository Resolution Architecture defines how repositories are identified and resolved conceptually, the Persistence Runtime Foundation does not yet define how runtime components consume those repository resolution capabilities.

Consequently, the Runtime Foundation currently lacks the architectural responsibilities required to coordinate repository resolution between runtime services and persistence providers.

This architectural gap intentionally prevented implementation from continuing, preserving the project's Architecture-First Development methodology.

1.2 Purpose of this Architecture

ATH-ARC-360 establishes the Runtime Resolution Architecture.

Its purpose is to define the Runtime responsibilities required to coordinate Repository Resolution and Persistence Execution. without introducing provider-specific behavior or implementation details.

This architecture specifies how runtime services participate in repository resolution while preserving the complete separation between architectural layers.

It introduces the architectural contracts through which runtime components coordinate repository discovery, repository activation, provider interaction, and repository lifecycle management.

1.3 Architectural Goal

The primary goal of this architecture is to complete the persistence execution chain by defining the runtime responsibilities that bridge Repository Resolution and Persistence Execution Foundation.

After completion of ATH-ARC-360, the persistence architecture will provide a complete architectural pathway from the Business Domain to concrete persistence providers without requiring architectural assumptions during implementation.

This architecture continues the project's guiding principle:

Architecture defines responsibilities. Implementation fulfills them. Runtime coordinates them

2. Architectural Problem
2.1 Current Architectural State

Following the completion of ATH-ARC-350, Repository Resolution is now defined as an independent architectural responsibility.

The architecture specifies how repositories are identified, selected, and conceptually resolved while preserving complete independence from persistence technologies.

At the same time, the Persistence Runtime Foundation provides the runtime environment responsible for coordinating persistence services.

However, these two architectural responsibilities currently exist independently.

No runtime responsibility has been defined for consuming repository resolution.

2.2 Identified Architectural Gap

The Runtime Foundation currently exposes architectural placeholders such as:

PersistenceProvider
ProviderFactory
ProviderRegistry

These abstractions establish the existence of runtime participants but intentionally leave their responsibilities undefined.

As a result, no architectural contract currently specifies:

how runtime components request repository resolution,
how resolved repositories are obtained,
how providers expose repository capabilities,
or how repository lifecycle is coordinated during runtime execution.

Repository Resolution therefore exists conceptually but cannot yet participate in runtime behavior.

2.3 Why This Gap Matters

Without Runtime Resolution Architecture, concrete repository implementations would have to introduce their own repository activation mechanisms.

Such implementation-defined behavior would violate the project's architectural principles by allowing implementation to invent runtime responsibilities that have never been formally defined.

This would create inconsistent repository activation strategies across future persistence providers and weaken the provider-independent architecture established throughout previous phases.

For this reason, ATH-IMP-021 was intentionally suspended.

The implementation correctly identified that repository execution requires an architectural responsibility which had not yet been established.

2.4 Architectural Responsibility

This architecture does not introduce repository implementations.

It does not introduce provider behavior.

It does not define repository execution logic.

Instead, it defines the runtime responsibilities that coordinate the interaction between Repository Resolution and future persistence providers.

Runtime becomes responsible for orchestration.

Resolution remains responsible for repository discovery.

Providers remain responsible for persistence technology.

Each architectural layer preserves a single responsibility while collaborating through explicitly defined contracts.

3. Runtime Resolution Responsibilities
3.1 Runtime as the Orchestrator

The Persistence Runtime is responsible for coordinating persistence activities during application execution.

It does not perform persistence operations itself.

It does not implement repositories.

It does not execute provider-specific logic.

Instead, Runtime acts as the orchestration layer that coordinates the interaction between architectural participants.

Within Runtime Resolution Architecture, Runtime becomes responsible for managing the repository resolution process while remaining independent of repository implementations and persistence technologies.

3.2 Repository Resolution Consumption

Repository Resolution Architecture defines how repositories are conceptually discovered.

Runtime Resolution Architecture defines how that discovery process is consumed during execution.

Runtime therefore becomes the architectural consumer of Repository Resolution.

It requests repository resolution, coordinates the resolution process, and exposes resolved repository instances to higher architectural layers without introducing provider-specific knowledge.

3.3 Provider Coordination

Runtime coordinates persistence providers without becoming a persistence provider itself.

Its responsibilities include:

coordinating provider participation,
selecting the appropriate provider through architectural contracts,
delegating provider-specific behavior to Technology Adapter implementations,
maintaining provider independence.

Runtime never executes database operations directly.

Every persistence operation remains delegated to the selected provider.

3.4 Repository Lifecycle Coordination

Runtime becomes responsible for coordinating the lifecycle of repository instances.

This responsibility includes defining when repositories become available, how they participate in runtime execution, and how their lifecycle remains consistent throughout application execution.

Repository lifecycle coordination is an architectural responsibility.

Repository behavior remains an implementation responsibility.

3.5 Architectural Boundary

Runtime Resolution introduces coordination responsibilities only.

It does not introduce:

repository implementations,
repository factories,
dependency injection,
provider execution,
repository caching,
transaction management,
business behavior.

These concerns remain within their respective architectural layers.

Runtime Resolution only coordinates the interaction between them.

3.6 Single Responsibility Preservation

Following ATH-ARC-360, architectural responsibilities become clearly separated:

Repository Resolution determines what repository is required.
Runtime Resolution determines how repository resolution participates during execution.
Technology Adapters determine which persistence technology fulfills the request.
Persistence Providers determine how persistence operations are executed.

Each architectural layer owns exactly one responsibility while collaborating exclusively through architectural contracts.

3.7 Relationship with ATH-ARC-380

Runtime Resolution and Persistence Execution own complementary architectural responsibilities.

Runtime Resolution coordinates provider selection, repository activation, and execution orchestration.

Persistence Execution performs persistence operations after runtime coordination has completed.

Runtime Resolution never performs CRUD behavior.

Persistence Execution never resolves providers or coordinates runtime responsibilities.

This separation preserves the single responsibility of both architectural layers while completing the persistence execution chain.

4. Runtime Resolution Flow
4.1 Architectural Execution Flow

Runtime Resolution establishes the execution pathway through which repository requests travel across the persistence architecture.

The flow remains strictly layered.

Each architectural participant communicates only with its immediate responsibility and never bypasses architectural boundaries.

The execution sequence is defined as follows:

Business
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

Each layer contributes a single architectural responsibility while remaining independent of implementation details.

4.2 Repository Request Lifecycle

A repository request begins within the Business Domain.

The Business Domain expresses only its repository requirement.

It possesses no knowledge of:

runtime behavior,
persistence providers,
persistence technologies,
database infrastructure.

Repository Resolution identifies the requested repository.

Runtime Resolution then coordinates how that repository becomes available during execution.

Technology Adapters delegate the request to the appropriate persistence provider.

Finally, the selected provider performs the persistence operation.

4.3 Responsibility Transition

During execution, architectural responsibility transitions progressively between layers.

The transition follows this sequence:

Repository Resolution

→ identifies the required repository.

Runtime Resolution

→ coordinates repository activation.

Persistence Execution

→ performs persistence execution

Technology Adapter

→ translates runtime coordination into provider interaction.

Persistence Provider

→ performs persistence operations.

Database

→ stores and retrieves persistent data.

No layer performs responsibilities owned by another architectural layer.

4.4 Architectural Independence

The execution flow intentionally prevents architectural leakage.

Runtime Resolution never acquires database knowledge.

Technology Adapters never acquire business knowledge.

Providers never acquire repository selection responsibilities.

Repository Resolution never performs runtime coordination.

Each participant collaborates exclusively through architectural contracts.

4.5 Extensibility

Because Runtime Resolution coordinates architectural interaction rather than provider behavior, future persistence providers participate without requiring architectural modification.

Adding a new provider affects only the Technology Adapter and Provider layers.

Repository Resolution and Runtime Resolution remain unchanged.

This guarantees long-term architectural stability while supporting future persistence technologies.

4.6 Architectural Stability

Runtime Resolution completes the execution pathway without introducing execution behavior.

It defines how architectural responsibilities collaborate.

Implementation remains responsible for realizing those responsibilities.

As a result, architectural evolution remains independent from provider evolution, allowing the persistence platform to expand without violating established architectural boundaries.

5. Architectural Contracts
5.1 Purpose

Runtime Resolution Architecture establishes a set of architectural contracts that enable runtime coordination without coupling higher architectural layers to persistence technologies.

These contracts define responsibilities only.

They do not prescribe implementation details, execution strategies, or provider-specific behavior.

Every future runtime implementation shall conform to these architectural responsibilities.

5.2 Runtime Resolution Contract

The Runtime Resolution Contract defines the architectural responsibility responsible for coordinating repository resolution during application execution.

Its responsibility includes:

initiating repository resolution,
coordinating repository availability,
delegating repository activation,
preserving architectural boundaries throughout the execution process.

It does not resolve repositories itself.

It coordinates the process through architectural collaboration.

5.3 Provider Resolution Contract

The Provider Resolution Contract defines the architectural responsibility responsible for selecting the appropriate persistence provider.

Provider selection is performed using architectural information rather than business knowledge.

This contract guarantees that runtime coordination remains independent of concrete persistence technologies.

5.4 Repository Activation Contract

The Repository Activation Contract defines the architectural responsibility responsible for making resolved repositories available to runtime execution.

Repository activation represents an architectural transition.

It does not introduce repository creation, dependency injection, lifecycle implementation, or provider initialization.

Those concerns remain implementation responsibilities.

5.5 Provider Participation Contract

The Provider Participation Contract defines how persistence providers participate in runtime coordination.

Every provider must expose its capabilities through architectural contracts defined by the Runtime Foundation and Technology Adapter Foundation.

Providers never communicate directly with Business or Repository Resolution.

Their participation always occurs through Runtime Resolution.

5.6 Contract Independence

All Runtime Resolution contracts remain independent from:

database technologies,
persistence providers,
dependency injection frameworks,
runtime containers,
service locators,
repository implementations,
business services.

These contracts establish architectural collaboration only.

Implementation remains free to realize those contracts using any future technology that respects the established architectural boundaries.

5.7 Architectural Outcome

Collectively, these contracts complete the architectural interaction between:

Repository Resolution,
Runtime Foundation,
Technology Adapter Foundation,
Persistence Providers.

They establish a stable collaboration model without introducing implementation assumptions.

Future runtime evolution may extend implementations, but these architectural responsibilities should remain stable over time.

6. Design Principles
6.1 Coordination over Execution

Runtime Resolution coordinates architectural interaction.

It does not execute persistence behavior.

Execution remains the responsibility of persistence providers.

This separation preserves the distinction between architectural orchestration and implementation.

6.2 Resolution before Activation

Repository resolution shall always precede repository activation.

A repository cannot participate in runtime execution until it has been resolved through the Repository Resolution Architecture.

This guarantees a deterministic execution pathway across all persistence technologies.

6.3 Provider Transparency

Runtime Resolution must remain completely unaware of provider-specific implementation details.

Whether persistence is performed by Supabase, PostgreSQL, MongoDB, SQLite, or any future provider must not influence runtime coordination.

Provider substitution shall never require modifications to Runtime Resolution.

6.4 Layer Isolation

Every architectural layer remains responsible only for its own concerns.

Business expresses repository requirements.

Repository Resolution identifies repositories.

Runtime Resolution coordinates execution.

Technology Adapters translate architectural coordination.

Providers execute persistence operations.

No layer may assume responsibilities belonging to another layer.

6.5 Contract Stability

Architectural contracts should remain significantly more stable than their implementations.

Runtime implementations may evolve.

Persistence providers may change.

Technologies may be replaced.

Architectural responsibilities should remain consistent throughout the lifetime of the platform.

6.6 Extensibility without Architectural Change

Future persistence capabilities should be introduced by extending implementations rather than modifying architectural responsibilities.

New providers.

New databases.

New deployment models.

New runtime environments.

All should integrate by conforming to existing contracts instead of redefining them.

Architecture evolves intentionally.

Implementations evolve continuously.

6.7 Architecture before Convenience

Implementation convenience shall never justify architectural shortcuts.

Whenever implementation requires a responsibility that has not been formally defined, architecture must be extended before implementation continues.

This principle preserves long-term consistency and prevents architectural drift.

It is the governing principle that led directly to the creation of ATH-ARC-360.

6.8 Long-Term Architectural Integrity

Runtime Resolution is designed to complete the persistence architecture without increasing coupling.

Its purpose is not to simplify implementation.

Its purpose is to preserve architectural integrity while allowing implementations to grow independently.

Architectural integrity always takes precedence over short-term implementation efficiency.

7. Architectural Summary
7.1 Architectural Completion

ATH-ARC-360 completes the Runtime Resolution responsibilities within the persistence architecture.

With the introduction of Runtime Resolution Architecture, every architectural responsibility required to coordinate persistence execution is now formally defined.

The persistence architecture now provides a continuous architectural pathway from the Business Domain to concrete persistence providers without requiring implementation to invent missing responsibilities.

7.2 Completed Persistence Architecture

Following ATH-ARC-360, the persistence architecture is composed of the following architectural layers:

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

Repository Resolution Architecture and Runtime Resolution Architecture are capability architectures.

They define architectural responsibilities that operate across the persistence architecture but do not introduce additional dependency layers.

Each architectural layer owns a single architectural responsibility and collaborates exclusively through explicitly defined architectural contracts.

7.3 Architectural Integrity

The introduction of Runtime Resolution Architecture preserves every architectural principle established throughout previous architecture phases.

No existing architectural responsibility has been expanded beyond its intended scope.

No implementation concern has been promoted into architecture.

No persistence technology has influenced architectural design.

Instead, ATH-ARC-360 completes an intentionally missing architectural responsibility discovered through implementation validation.

This reinforces the project's Architecture-Validated Development methodology.

7.4 Impact on Future Implementations

Future implementations may now introduce concrete repository behavior without extending or redefining the persistence architecture.

Repository implementations, runtime components, technology adapters, and persistence providers all possess clearly defined architectural responsibilities.

Future development is therefore expected to extend implementations while preserving architectural stability.

7.5 Final Architectural Principle

The persistence architecture is now governed by the following principles:

Architecture defines responsibilities.
Contracts define collaboration.
Runtime coordinates execution.
Adapters isolate technologies.
Providers execute persistence.
Implementations fulfill architecture.
Business remains independent.

Together, these principles establish a persistence platform designed for long-term maintainability, provider independence, and controlled architectural evolution.

7.6 Closing Statement

ATH-ARC-360 concludes the architectural definition of the persistence execution model for ARK Trade Hub.

From this point forward, implementation is expected to consume the established architectural contracts rather than introduce new architectural responsibilities.

Future architectural evolution should occur only when implementation validation demonstrates the existence of a genuinely missing responsibility.

Architecture remains intentional.

Implementation remains disciplined.

The architecture evolves by design, never by accident.

---

# Related Architecture

This architecture is complemented by the following architectural documents:

- ATH-ARC-350 — Repository Resolution Architecture
- ATH-ARC-370 — Repository Foundation Integration Architecture
- ATH-ARC-380 — Persistence Execution Architecture

ATH-ARC-370 formally defines how the Repository Foundation integrates with the Runtime Resolution Architecture without changing the runtime responsibilities established by ATH-ARC-360.

ATH-ARC-380 formally defines the architectural execution boundary beneath Runtime Resolution.

Runtime Resolution coordinates execution.

Persistence Execution performs persistence operations.

Neither architecture assumes the responsibilities of the other.

Together they complete the persistence execution chain while preserving strict architectural separation.

ATH-ARC-360 remains the authoritative document for Runtime Resolution Architecture.
