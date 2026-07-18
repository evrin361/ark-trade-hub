ATH-ARC-340-Application Architecture
1. Purpose
1.1 Objective

The Application Layer coordinates business use cases.

It does not contain business knowledge.

It does not implement technical infrastructure.

Its sole responsibility is to orchestrate interactions between architectural layers while preserving their independence.

1.2 Architectural Role

Application exists to translate external requests into business interactions.

It receives requests from the outside world.

It coordinates the required business operations.

It delegates technical concerns to Infrastructure.

It returns results to external consumers.

Application never owns business rules.

Application never owns infrastructure behavior.

1.3 Architectural Position

The Application Layer sits between external interfaces and the Business Domain.

Presentation
        │
        ▼
Application
        │
        ▼
Business Domain
        │
        ▼
Persistence Contracts
        │
        ▼
Infrastructure

This diagram illustrates the high-level application interaction only. The complete persistence architecture is defined in ATH-ARC-320 together with ATH-ARC-350, ATH-ARC-360, ATH-ARC-370, and ATH-ARC-380.

Application serves as the coordination boundary of the system.

1.4 Responsibility Statement

Application is responsible for answering one question only:

"How should this business use case be coordinated?"

It never answers:

What is correct business behavior?
How data is stored?
Which database is used?
Which external technology executes the request?

Those responsibilities belong to other architectural layers

2. Application Responsibilities
2.1 Primary Responsibility

The Application Layer is responsible for coordinating business use cases.

It orchestrates the sequence of interactions required to fulfill a request while preserving the independence of every architectural layer.

Application coordinates.

Business decides.

Infrastructure executes.

2.2 Request Coordination

Every external request enters the system through the Application Layer.

Application determines:

Which use case should execute.
Which Business services should participate.
Which persistence operations are required.
Which technical capabilities should be invoked.
When the use case has completed.

Application never determines business correctness.

2.3 Use Case Orchestration

Each Application component should represent one business use case.

Examples include:

Create Customer
Create Portfolio
Execute Trade
Synchronize Exchange
Launch Campaign

Each use case coordinates existing business capabilities.

It does not redefine them.

2.4 Transaction Coordination

Application coordinates transactional boundaries.

Business does not manage transactions.

Infrastructure executes transactions.

Application determines the transactional scope required by a use case.

2.5 Cross-Domain Coordination

When multiple Business Domains participate in a single business process, Application coordinates their collaboration.

Business Domains remain independent.

Application manages their interaction.

This preserves loose coupling between domains.

2.6 Result Coordination

Application collects results produced by Business operations.

It transforms them into responses suitable for external consumers.

Business should never contain presentation-oriented response models.

2.7 Error Coordination

Application coordinates error propagation.

Business reports business failures.

Infrastructure reports technical failures.

Application determines how those failures are returned to external consumers.

Application does not reinterpret business rules.

2.8 Dependency Direction

Application depends on:

Business Domain
Architectural Contracts
Infrastructure Contracts

No lower architectural layer depends on Application.

Dependency direction remains strictly one-way

3. Application Boundaries
3.1 Architectural Boundary

The Application Layer coordinates architectural interactions.

It does not own business knowledge.

It does not own technical implementations.

Its boundary exists to preserve the separation of responsibilities.

3.2 What Belongs to Application

Application owns:

Use Case coordination
Workflow orchestration
Transaction boundaries
Cross-domain collaboration
Request handling
Response coordination
Interaction sequencing

These responsibilities describe how a business capability is executed.

They never define what the business capability means.

3.3 What Never Belongs to Application

Application must never contain:

Business rules
Domain decisions
Entity validation
Business calculations
Pricing logic
Risk calculations
Portfolio calculations
Persistence implementations
SQL
Database queries
HTTP infrastructure
UI rendering
External API implementations
Vendor-specific code

These belong to other architectural layers.

3.4 Business Boundary

Whenever Application needs to determine whether something is correct from a business perspective, it must delegate that decision to the Business Domain.

Application never evaluates business correctness.

Business always owns business truth.

3.5 Infrastructure Boundary

Whenever Application requires technical capabilities, it delegates them through architectural contracts.

Application never communicates directly with infrastructure technologies.

Infrastructure implementations remain invisible.

3.6 Presentation Boundary

Application does not render user interfaces.

Application does not understand pages, components, screens, or layouts.

Presentation remains entirely outside the Application Layer.

3.7 Persistence Boundary

Application may request persistence capabilities through architectural contracts. Repository Resolution, Runtime Resolution, and Persistence Execution coordinate how those persistence operations are ultimately performed.

Application never determines how persistence is performed.

Persistence remains completely encapsulated behind architectural contracts.

3.8 Independence

Application remains independent of:

Database technologies
Cloud providers
Messaging platforms
Storage systems
External vendors
UI frameworks

Its behavior is defined only by business use cases

4. Application Composition
4.1 Composition Philosophy

The Application Layer is composed of small, purpose-specific components.

Each component owns one architectural responsibility.

Responsibilities must never overlap.

Composition should maximize clarity rather than minimize the number of classes.

4.2 Use Cases

A Use Case represents one business interaction initiated by an external consumer.

Each Use Case coordinates exactly one business objective.

Examples include:

Create Customer
Create Portfolio
Execute Trade
Import Exchange Accounts
Launch Campaign

A Use Case is the primary building block of the Application Layer.

4.3 Coordinators

Coordinators orchestrate the execution of a Use Case.

Their responsibilities include:

Invoking Business capabilities.
Coordinating persistence requests.
Managing transactional boundaries.
Coordinating cross-domain interactions.
Producing the final application result.

Coordinators never contain business rules.

4.4 Commands and Queries

Application separates state-changing requests from read-only requests.

Commands represent operations that modify the system.

Queries represent operations that retrieve information.

Both remain coordinators of business interactions.

Neither owns business knowledge.

4.5 Application Services

Application Services provide reusable coordination capabilities shared by multiple Use Cases.

They exist only when coordination logic is legitimately reusable.

Application Services must never become containers for business rules.

4.6 Workflows

Some business processes span multiple Use Cases or long-running interactions.

Application Workflows coordinate these processes while keeping individual Use Cases independent.

Workflow orchestration remains an Application responsibility.

Business decisions remain within the Business Domain.

4.7 Public Surface

The public surface of the Application Layer should expose only:

Use Cases
Commands
Queries
Coordinators

Internal helper components remain private.

5. Application Collaboration
5.1 Collaboration Philosophy

The Application Layer collaborates with every architectural layer while preserving their independence.

It serves as the coordination point rather than the ownership point.

Every interaction should reinforce architectural separation.

5.2 Collaboration with Presentation

Presentation submits requests to the Application Layer.

Application exposes business use cases through well-defined interfaces.

Presentation never coordinates business workflows.

Presentation never accesses Business Domain directly.

5.3 Collaboration with Business Domain

Application invokes Business capabilities to execute business behavior.

Business evaluates correctness.

Business protects business invariants.

Application never bypasses Business decisions.

5.4 Collaboration with Persistence

Application requests persistence capabilities through architectural contracts. Repository Resolution, Runtime Resolution, Repository Foundation, and Persistence Execution collaborate beneath those contracts while remaining invisible to the Application Layer.

It never communicates with repository implementations directly.

Persistence fulfills requests without exposing implementation details.

5.5 Collaboration with Infrastructure

Application delegates technical capabilities to Infrastructure.

Examples include:

Messaging
Notifications
External integrations
File storage
Scheduling
Logging

Infrastructure provides technical execution.

Application coordinates when those capabilities are needed.

5.6 Collaboration Across Domains

Application may coordinate multiple Business Domains during one Use Case.

Domains remain independent.

Application becomes the collaboration boundary.

No Domain should directly orchestrate another Domain.

5.7 Dependency Rule

Every collaboration follows the same architectural direction.

Presentation
        │
        ▼
Application
        │
        ▼
Business
        │
        ▼
Persistence Contracts
        │
        ▼
Infrastructure

Detailed persistence layering is defined by the Persistence Architecture documents.

No reverse dependency is permitted.

Architectural direction must remain stable throughout the lifetime of the system.

6. Application Architectural Principles
6.1 Coordination Over Implementation

Application coordinates work.

It does not implement business behavior.

Whenever business knowledge appears inside the Application Layer, responsibilities have been misplaced.

6.2 One Use Case, One Coordinator

Each business use case should have exactly one coordinating component.

The complete lifecycle of a use case should be understandable by reading a single coordinator.

Coordination responsibilities must not be scattered across multiple components.

6.3 Explicit Workflows

Application workflows should always be explicit.

The execution order of business operations should be visible directly in the coordinator.

Business interactions should never be hidden behind implicit side effects.

6.4 Stateless Design

Application components should remain stateless.

All state belongs to:

Business Entities
Persistence
External Systems

Application exists only for the duration of request coordination.

6.5 Dependency Through Contracts

Application depends only on architectural contracts.

Concrete implementations remain invisible.

Technology choices must never affect Application behavior.

6.6 Small Coordinators

Application components should remain small and focused.

Whenever a coordinator begins handling multiple unrelated responsibilities, it should be decomposed into smaller use cases.

Complexity should be reduced through composition rather than accumulation.

6.7 Predictable Execution

A use case should execute in a predictable sequence.

Reading a coordinator should immediately reveal:

What happens first.
What happens next.
Which business capabilities participate.
Where the workflow ends.

Hidden execution paths should be avoided.

6.8 Long-Term Readability

Application code should optimize for readability rather than cleverness.

Future maintainers should understand the entire coordination flow without reverse engineering complex abstractions.

Readable orchestration is considered an architectural quality.

7. Application Governance
7.1 Governance Philosophy

The long-term quality of the Application Layer depends on preserving its original responsibility.

Every implementation should reinforce architectural boundaries rather than weaken them.

Convenience must never replace architectural discipline.

7.2 Architectural Review

Every new Application component should be evaluated against the following questions:

Does it coordinate rather than decide?
Does it own exactly one use case?
Does it avoid business knowledge?
Does it avoid technical implementation?
Does it preserve dependency direction?
Does it remain small and understandable?

If any answer is negative, the design should be reconsidered.

7.3 Evolution

The Application Layer is expected to evolve as business capabilities grow.

However, architectural responsibilities must remain stable.

New use cases should be introduced by adding new coordinators rather than expanding existing ones beyond their intended responsibility.

7.4 Naming Consistency

Application components should use names that clearly communicate their architectural role.

Examples include:

CreateCustomerUseCase
ExecuteTradeCommand
GetPortfolioQuery
CampaignWorkflow

Generic names such as:

Manager
Processor
Helper
Engine
Utility

should be avoided because they hide architectural intent.

7.5 Simplicity

Application should remain simple.

Complexity belongs to business problems.

Application coordinates complexity.

It should never become the source of complexity.

7.6 Architectural Integrity

Whenever a business rule appears inside the Application Layer, the architecture has already begun to erode.

Architectural integrity is preserved by continuously moving business knowledge back to the Business Domain.

7.7 Long-Term Sustainability

Application should remain understandable years after its original implementation.

Future developers should be able to understand an entire use case by reading a single coordinator.

Long-term clarity is considered an architectural asset.

8. Conclusion
8.1 Summary

The Application Layer exists to coordinate business use cases while preserving the independence of every architectural layer.

It owns neither business knowledge nor technical implementation.

Its purpose is to transform external requests into coordinated business interactions through clear, predictable, and maintainable workflows.

8.2 Architectural Vision

The Application Layer should remain a transparent coordinator throughout the lifetime of the system.

Business knowledge belongs to the Business Domain.

Technical execution belongs to Infrastructure.

Persistence belongs to the Persistence Architecture, including Repository Resolution, Runtime Resolution, Repository Foundation Integration, Persistence Execution, Technology Adapters, and Providers.

Application exists only to connect these architectural responsibilities without absorbing them.

Its value is measured not by how much logic it contains, but by how clearly it orchestrates the system.

8.3 Long-Term Objective

As ARK Trade Hub evolves, the number of business capabilities will continue to grow.

The Application Layer must grow by increasing the number of independent use cases rather than increasing the complexity of existing ones.

Architectural scalability is achieved through composition, not accumulation.

This principle ensures that the system remains understandable, maintainable, and adaptable for many years.
