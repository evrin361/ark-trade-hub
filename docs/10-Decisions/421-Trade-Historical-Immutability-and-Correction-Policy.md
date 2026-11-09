# ATH-ADR-421 — Trade Historical Immutability and Correction Policy

## Document Information

| Field | Value |
|---|---|
| Document ID | ATH-ADR-421 |
| Category | Architecture Decision Record |
| Title | Trade Historical Immutability and Correction Policy |
| Version | 1.0.0 |
| Status | Architecture Approved — Published |
| Owner | ARK Engineering |
| Project | ARK Trade Hub (`ark-trade-hub`) |
| Repository | `evrin361/ark-trade-hub` |
| Related ADR | ATH-ADR-420 |
| Related Evidence | ATH-IMP-046, ATH-IMP-047, ATH-IMP-048, ATH-IMP-049 |
| Implementation Authorization | NOT AUTHORIZED |

> **Canonical path:**
> `docs/10-Decisions/421-Trade-Historical-Immutability-and-Correction-Policy.md`
>
> This ADR follows the current documentation convention for new ADRs. ADR-420 remains in its existing legacy location. This ADR is registered at the canonical path shown above and was published on `main` in commit f9899483478055ba1ad41a48d21df442aed36f3e.

## Revision History

| Version | Date | Description |
|---|---|---|
| 1.0.0 | 2026-10-22 | Initial decision package for Trade historical immutability and correction policy; published on main in commit f9899483478055ba1ad41a48d21df442aed36f3e. |
| 1.1.0 | 2026-11-09 | Recorded approved ADQ-01 and ADQ-02 architecture decisions; implementation remains unauthorized. |

## Table of Contents

1.  Purpose
2.  Context and Evidence
3.  Decision
4.  Options Considered
5.  Consequences
6.  Acceptance Criteria for Future Implementation
7.  Relationship to ADR-420
8.  Scope and Authorization
9.  Publication and Documentation-Convention Note
10. Final Decision Status
11. Architecture Decision Register — Trade Identity and Lifecycle

## 1. Purpose

This ADR records the architectural direction for resolving GAP-07: the
conflict between the existing Trade deletion capability and the approved
requirement to preserve historical Trade records.

It complements ADR-420 and does not replace, amend, or reopen its
approved decisions D1–D8.

## 2. Context and Evidence

Evidence documented in ATH-IMP-047 and ATH-IMP-048 confirms that the
inspected code contains an internal deletion chain:

`TradeService.delete()` → Feature Trade Repository → Infrastructure
Trade Repository.

The inspected infrastructure implementation removes a Trade from the
in-memory `this.trades` array.

The inspected static evidence did not establish a complete runtime
entry-point chain that invokes `TradeService.delete()`. It also did not
prove that all possible indirect or dynamic entry points are absent.

The following architecture documents are relevant:

-   `docs/03-Architecture/310-Business-Domain-Architecture.md`
-   `docs/03-Architecture/311-Business-Ownership-and-Lifecycle-Architecture.md`
-   `docs/03-Architecture/420-exchange-account-organization-scope-and-lifecycle-decisions.md`

The approved architecture requires historical Trade records to be
retained and corrected without deleting or rewriting the original
history. Archive and Disconnect must not delete Trade history.

The implementation conflict is confirmed even though runtime
reachability remains unproven.

## 3. Decision

### D-TRADE-01 — Prohibit deletion of historical Trade records

Historical Trade records must not be deleted or rewritten through
ordinary Trade domain operations.

Trade deletion must not be offered as an allowed capability through the
approved Trade service and repository contracts.

The exact code-change scope, all affected consumers, and the final
implementation changes require a separate authorized execution mission.

### D-TRADE-02 — Correct business errors without deleting the original Trade

Business corrections must use a separate, traceable correction mechanism
that preserves the original Trade record.

The detailed correction model remains open for design. It must define
the permitted correction types, their relationship to the original
Trade, business semantics, effects on derived state and reports, and
required audit evidence.

This decision does not, by itself, approve a complete Event Sourcing
architecture or a specific event-storage technology.

### D-TRADE-03 — Preserve identity, authorization, and ownership requirements

Any future correction operation must comply with ADR-420 and its
approved decisions D1–D8, including trusted identity,
Organization-scoped authorization, ownership-chain validation, lifecycle
requirements, accurate operation outcomes, and testability.

A Trade identifier or correction event alone does not establish
permission to perform an operation.

### D-TRADE-04 — Preserve Trade history across account lifecycle operations

Archive, Disconnect, and the end of an Exchange Account lifecycle must
not cause historical Trade records to be deleted or rewritten.

Claims about persistence, recovery, and auditability must be supported
by evidence from the actual storage and runtime behavior.

## 4. Options Considered

### Option A — Remove Trade deletion capability from approved contracts

**Disposition:** Approved as an architectural direction.

The deletion capability must be removed from the approved Trade
contracts and implementation. The actual changes require a separate
execution mission, dependency analysis, and explicit implementation
authorization.

### Option B — Define a business correction mechanism

**Disposition:** Approved as an architectural direction; detailed design
remains open.

Business corrections must preserve the original Trade and provide
traceability to the original record. The precise domain rules and
execution model are not yet approved.

### Option C — Temporarily retain the deletion capability as the solution

**Disposition:** Not accepted as the target architecture.

Unproven runtime reachability is not sufficient justification to treat
the conflicting capability as safe or to consider the architectural
conflict resolved. Any transitional state must have an owner, explicit
restrictions, exit criteria, and a review deadline.

## 5. Consequences

### Expected benefits

-   Aligns Trade contracts with the historical-retention requirement.
-   Separates business correction from physical deletion.
-   Establishes a basis for tests that verify historical immutability.
-   Preserves the identity, authorization, and ownership requirements in
    ADR-420.

### Costs and risks

-   Direct and indirect consumers of deletion must be identified.
-   Exports, factories, wrappers, mocks, tests, and related
    documentation may require updates.
-   The correction mechanism requires domain design and assessment of
    impacts on reports and derived calculations.
-   Persistence and auditability require independent evidence; removing
    a method alone does not prove either property.

## 6. Acceptance Criteria for Future Implementation

These are proposed criteria for future execution missions. They become
formal execution acceptance criteria only when approved in the relevant
implementation scope.

1.  All Trade deletion references and consumers within the defined
    investigation scope are identified and reported.
2.  No unauthorized Trade deletion operation remains in the approved
    contracts or execution paths.
3.  Tests demonstrate that correction operations do not delete or
    rewrite the original Trade.
4.  Correction rules and links to the original Trade are explicit and
    testable.
5.  Reports and dependent calculations are compatible with the approved
    correction model.
6.  Identity, authorization, Organization scope, and ownership
    requirements comply with ADR-420.
7.  Archive and Disconnect preserve Trade history.
8.  Success, failure, authorization rejection, duplicate requests, and
    partial operations are distinguishable and testable.
9.  Persistence, recovery, and audit claims are supported by evidence
    from actual storage and runtime behavior.
10. Appropriate controls and tests prevent the conflicting deletion
    capability from being reintroduced.

## 7. Relationship to ADR-420

This ADR complements ADR-420 and does not replace or modify decisions
D1–D8.

The requirements for trusted identity, Organization-scoped
authorization, ownership-chain validation, parent lifecycle, internal
state versus external connection, historical retention, operation
results and errors, and acceptance evidence remain in force.

Any implementation details must remain consistent with those
requirements.

## 8. Scope and Authorization

This ADR approves an architectural direction only. It does not authorize implementation.

Under ATH-IMP-060, the authorized documentation actions are limited to updating this ADR's approval and publication status, making the necessary scope clarifications in Sections 8–9, moving this ADR to `docs/10-Decisions/`, and registering it in `docs/10-Decisions/README.md`.

Until separate explicit implementation authorization is issued:

- No application code may be modified as implementation.
- ADR-420 and its approved decisions D1–D8 must remain unchanged.
- No unrelated repository files may be modified under this mission.
- No commit, push, merge, pull request, or deployment is authorized.
- No build, test, lint, migration, or deployment activity is authorized by this ADR registration mission.
- No operational data mutation or exchange connection operation is authorized.
- The detailed design of Option B remains open.
- Implementation Authorization remains `NOT AUTHORIZED`.

The earlier documentation-registration scope did not itself authorize Git publication. Publication was subsequently completed under separate explicit authorization in commit f9899483478055ba1ad41a48d21df442aed36f3e. This does not authorize implementation.

## 9. Publication and Documentation-Convention Note

The current documentation convention places new ADRs under `docs/10-Decisions/`. ADR-420 remains under `docs/03-Architecture/` as an existing legacy-location exception; its location does not establish the canonical location for new ADRs.

Under ATH-IMP-060, this ADR is authorized to be moved to `docs/10-Decisions/421-Trade-Historical-Immutability-and-Correction-Policy.md` and registered in `docs/10-Decisions/README.md`.

The Architecture Index (`docs/03-Architecture/312-Architecture-Index.md`) is already aligned with the convention and must not be modified under this mission.

ATH-ADR-421 is registered at its canonical path and published on `main` in commit f9899483478055ba1ad41a48d21df442aed36f3e. Publication does not authorize implementation, changes to ADR-420, or unrelated repository changes.



## 11. Architecture Decision Register — Trade Identity and Lifecycle

This section records subsequent Architecture Command Center decisions
that refine the principles in this ADR. These approvals are architecture
principles only. They do not authorize implementation, repository
changes, schema or persistence changes, tests, dependency changes, or
Git operations beyond the separately authorized publication of this
decision record.

### ADQ-01 — Immutable Trade Identity and Ownership References

**Status: APPROVED**

The following Trade references are immutable after Trade creation:

- Trade ID
- Campaign ID
- Exchange Account ID
- Portfolio ID

These references must not be changed through ordinary
`TradeService.update()` or direct mutation of the original Trade.
Any future correction to attribution or ownership may only be considered
through a separate, authorized, traceable correction mechanism that is
compatible with ADR-420 and preserves the original historical record.

The correction mechanism, its storage model, and its implementation
remain undecided and require separate design and authorization.

**Open domain semantics:** `Trade.name` and `Trade.code` remain
unresolved. Their business meanings have not been established.
No immutability or mutability classification, deletion, renaming, or
other semantic decision is made for these fields by ADQ-01.

### ADQ-02 — Trade Lifecycle Representation

**Status: CLOSED — APPROVED WITH CONDITIONS**

ADQ-02 establishes three independent business concepts:

1. Execution Lifecycle
2. Operational Availability
3. Administrative Lifecycle

The following six decisions are approved:

#### ADQ-02 / D1 — Administrative Archive Semantics

Archive and Restore are purely administrative operations on the Trade
record's Administrative Lifecycle. Archive must not change Execution
Lifecycle or imply that execution has stopped or closed. Restore changes
only Administrative Lifecycle from Archived to Active. Restore must not
automatically Enable the Trade. Archive and Restore must not rewrite
historical information or execution outcomes. Archived Trades remain
preserved and reviewable as historical records.

#### ADQ-02 / D2 — Enable/Disable Restrictions

Enable and Disable are permitted only while Administrative Lifecycle
is Active. They are not permitted while the Trade is Archived. To change
Operational Availability while Archived, the Trade must first be
Restored. Restore alone does not Enable the Trade. Administrative
Lifecycle and Operational Availability remain separate concepts.

#### ADQ-02 / D3 — Closed as a Terminal Execution State

Closed is terminal in Execution Lifecycle. Enable, Disable, Archive,
and Restore must not move Execution Lifecycle from Closed back to a
prior execution state. Closure is distinct from Archive and Disable.
If a Closed Trade requires correction, that correction must use an
independent Correction process rather than artificially reopening
execution. This decision does not define every Execution Lifecycle
transition.

#### ADQ-02 / D4 — Repeated and Concurrent Lifecycle Requests

Repeating a request when its target state already holds must not create
a false change or corrupt state or history. The operation must return a
truthful outcome and must not claim that a new change occurred.
Contradictory or concurrent requests must be handled in a controlled
manner, and the outcome must reflect the actual persisted state.
Failures and conflicts must not be reported as success. Technical
concurrency, retry, and idempotency details remain deferred to
technical design.

#### ADQ-02 / D5 — Lifecycle Independence

Execution Lifecycle, Operational Availability, and Administrative
Lifecycle are independent business concepts. A change in any one must
not implicitly change either of the other two.
Archived does not mean Disabled; Disabled does not mean Archived;
Closed does not mean Archived or Disabled. Each change must use an
operation consistent with its own business meaning.

#### ADQ-02 / D6 — Restore Eligibility

Restore requires valid identity, required authorization, and valid
ownership and access, consistent with ADR-420. Restore is independent
of whether the Trade is Enabled or Disabled and whether execution is
Open or Closed. A Closed and Archived Trade may be administratively
Restored. Restore changes only Administrative Lifecycle from Archived
to Active; it does not change Execution Lifecycle or Operational
Availability.

**Condition for closure:** Detailed Execution Lifecycle state
transitions must be completed in later domain or technical design.
This condition does not suspend or reopen the six approved decisions.

### Authorization Boundary

ADQ-01 and ADQ-02 are architecture approvals only. They do not grant
implementation authorization. No Trade model, service, repository,
persistence, schema, migration, correction mechanism, test, dependency,
or application code change is authorized by recording these decisions.
Implementation Authorization remains **NOT AUTHORIZED** and requires
a separate explicit authorization.

## 10. Final Decision Status

Option A and Option B have been approved as architectural direction by the Architecture Command Center. The Architecture Command Center has granted final architecture approval for this ADR. Option B's detailed design remains open. No formal decision ID is recorded here, and none is inferred. Registration and Git publication are complete. Implementation remains subject to separate explicit authorization.

`GAP-07: ARCHITECTURAL CONFLICT CONFIRMED`

`ARCHITECTURE DIRECTION: OPTION A + OPTION B APPROVED`

`OPTION A: APPROVED AS ARCHITECTURAL DIRECTION`

`OPTION B: APPROVED AS ARCHITECTURAL DIRECTION — DETAILED DESIGN OPEN`

`ADR-420: APPROVED — D1–D8 UNCHANGED`

`PUBLICATION: PUBLISHED`

`IMPLEMENTATION AUTHORIZATION: NOT AUTHORIZED`
