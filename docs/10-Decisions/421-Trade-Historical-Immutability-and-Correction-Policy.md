# ATH-ADR-421 — Trade Historical Immutability and Correction Policy

## Document Information

| Field | Value |
|---|---|
| Document ID | ATH-ADR-421 |
| Category | Architecture Decision Record |
| Title | Trade Historical Immutability and Correction Policy |
| Version | 1.0.0 |
| Status | Architecture Approved — Publication Pending |
| Owner | ARK Engineering |
| Project | ARK Trade Hub (`ark-trade-hub`) |
| Repository | `evrin361/ark-trade-hub` |
| Related ADR | ATH-ADR-420 |
| Related Evidence | ATH-IMP-046, ATH-IMP-047, ATH-IMP-048, ATH-IMP-049 |
| Implementation Authorization | NOT AUTHORIZED |

> **Proposed canonical path:**
> `docs/10-Decisions/421-Trade-Historical-Immutability-and-Correction-Policy.md`
>
> This ADR follows the current documentation convention for new ADRs. ADR-420 remains in its existing legacy location. This draft has not been registered or published.

## Revision History

| Version | Date | Description |
|---|---|---|
| 1.0.0 | 2026-10-22 | Initial decision package for Trade historical immutability and correction policy; publication pending. |

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

The authorized local documentation operations do not authorize staging or publishing Git changes. A separate explicit publication authorization is required.

## 9. Publication and Documentation-Convention Note

The current documentation convention places new ADRs under `docs/10-Decisions/`. ADR-420 remains under `docs/03-Architecture/` as an existing legacy-location exception; its location does not establish the canonical location for new ADRs.

Under ATH-IMP-060, this ADR is authorized to be moved to `docs/10-Decisions/421-Trade-Historical-Immutability-and-Correction-Policy.md` and registered in `docs/10-Decisions/README.md`.

The Architecture Index (`docs/03-Architecture/312-Architecture-Index.md`) is already aligned with the convention and must not be modified under this mission.

Registration and local file relocation do not constitute Git publication. Git publication remains pending separate explicit authorization. This ADR does not authorize implementation, changes to ADR-420, or unrelated repository changes.

## 10. Final Decision Status

Option A and Option B have been approved as architectural direction by the Architecture Command Center. The Architecture Command Center has granted final architecture approval for this ADR. Option B's detailed design remains open. No formal decision ID is recorded here, and none is inferred. Registration and Git publication remain subject to the scope and authorization gates defined for the current mission.

`GAP-07: ARCHITECTURAL CONFLICT CONFIRMED`

`ARCHITECTURE DIRECTION: OPTION A + OPTION B APPROVED`

`OPTION A: APPROVED AS ARCHITECTURAL DIRECTION`

`OPTION B: APPROVED AS ARCHITECTURAL DIRECTION — DETAILED DESIGN OPEN`

`ADR-420: APPROVED — D1–D8 UNCHANGED`

`PUBLICATION: PENDING`

`IMPLEMENTATION AUTHORIZATION: NOT AUTHORIZED`
