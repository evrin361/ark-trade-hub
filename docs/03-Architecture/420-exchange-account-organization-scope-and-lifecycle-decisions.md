# ATH-ADR-420 — Exchange Account Organization Scope and Lifecycle Decisions

**Document ID:** ATH-ADR-420

**Repository:** `evrin361/ark-trade-hub`

**Status:** ARCHITECTURE DECISIONS APPROVED — TECHNICAL EVIDENCE OPEN

**Related Mission:** ATH-IMP-036 — Organization-Scoped Exchange Account Workflow

**Related Follow-ups:** ATH-IMP-036-FU-01, ATH-IMP-036-FU-02

**Implementation Authorization:** NOT AUTHORIZED

## 1. Purpose

This ADR consolidates the architecture decisions governing Organization-scoped Exchange Account access, ownership validation, lifecycle behavior, historical data retention, operation outcomes, and acceptance evidence.

It establishes binding architectural requirements while distinguishing confirmed decisions from implementation details that require further technical evidence.

This ADR records approved architectural decisions but does not authorize implementation, deployment, data mutation, or changes to persistence infrastructure.

## 2. Architectural Context and Evidence

The approved architecture documents establish the following relevant principles:

- **Document 302 — Authentication and Authorization Architecture:** each authenticated operational User belongs to exactly one Organization. Identity, business entities, and permissions are separate concepts. Authentication alone does not grant business-resource access.
- **Document 311 — Business Ownership and Lifecycle Architecture:** business ownership follows Organization → Customer → Portfolio → Exchange Account → Assets. Portfolio owns assets. Business records and historical trading records must be retained according to the defined lifecycle and audit requirements.
- **Document 410 — Repository Boundary Translation Architecture:** feature-level repository contracts and persistence-level contracts are separated by a translation boundary. Persistence-specific contracts and errors must not leak directly into feature-level contracts.
- **Document 004 — ARK Document Naming Convention:** ADR document identifiers and filenames must follow the repository's document naming conventions.

Read-only follow-up investigations FU-01 and FU-02 identified unresolved technical evidence concerning trusted identity, authorization enforcement, ownership-chain validation, lifecycle enforcement, persistence wiring, deletion behavior, and test execution.

These findings are limited to the inspected paths. They do not establish that a control is absent throughout the entire application merely because it was not found in one file or path.

## 3. Scope

This ADR governs the architectural requirements for supported Exchange Account operations, including:

- Organization-scoped reads and writes.
- Ownership-chain validation.
- Parent-entity lifecycle restrictions.
- Internal Exchange Account lifecycle state.
- Historical record retention and archival.
- Operation result and error contracts.
- Acceptance criteria and verification evidence.

## 4. Non-Goals

Unless separately reviewed and authorized, this ADR does not define or authorize:

- Selection or replacement of an authentication provider.
- A new authentication or persistence infrastructure.
- Exchange API integration or real external connection management.
- Credential creation, storage, rotation, or revocation.
- New business lifecycle exceptions beyond the approved rules.
- A specific HTTP API design or exact error-code taxonomy.
- Implementation, deployment, or unrelated repository changes.

## 5. Principle A — Trusted Identity and Organization Context (D1)

1. User identity must originate from a trusted authentication source at a trusted application boundary. A client-supplied identifier alone is not proof of identity.
2. The applicable Organization must be resolved through a valid relationship with the authenticated identity, rather than by blindly trusting a client-supplied `organizationId` or resource identifier.
3. Preserve Document 302's rule that each authenticated operational User belongs to exactly one Organization.
4. Missing, invalid, or ambiguous identity or Organization context must fail closed.
5. Authentication does not itself establish permission to access or modify a business resource.
6. Customer Portal identities and operational User identities must not be assumed to be interchangeable without evidence and an explicit architectural basis.
7. The authentication provider and exact runtime enforcement point remain open technical questions.

## 6. Principle B — Organization-Scoped Authorization (D2)

1. Every supported Exchange Account operation must validate trusted identity, permission for the requested operation, and the resource's Organization ownership before disclosing protected data or performing a mutation.
2. The requirement applies to reads as well as writes, including direct resource-ID access.
3. Client-side filtering or UI selection is not an authorization boundary.
4. Client-controlled identifiers must not bypass authorization or permit cross-Organization access.
5. Unauthorized requests must be rejected without disclosing protected resource data.
6. The exact distribution of responsibilities across application, feature, domain, and repository boundaries must be determined consistently with Document 410 and the actual repository architecture. This ADR does not prescribe an unverified code-layer implementation.

## 7. Principle C — Ownership-Chain Validation (D3)

1. Validate the complete ownership chain:

   `Exchange Account → Portfolio → Customer → Organization`

2. Every required entity and relationship must exist and be valid for the requested operation.
3. Missing, inconsistent, or invalid relationships must cause the operation to be rejected.
4. The Organization derived from the validated ownership chain must match the Organization authorized for the authenticated User.
5. Parent lifecycle restrictions must also be enforced.
6. Adding a duplicate `organizationId` to Exchange Account is not a substitute for validating ownership relationships and authorization.
7. The exact validation location and repository interaction pattern require technical review.

## 8. Principle D — Parent Lifecycle and Historical Data Retention (D4, D6)

1. Exchange Account operations must comply with the lifecycle of Customer and Portfolio.
2. `Suspended`, `Closed`, and `Archived` are distinct states and must not be treated as equivalent.
3. Disconnecting or archiving an Exchange Account must not delete its historical trades.
4. Restoring an Exchange Account must not automatically activate its Customer or Portfolio, nor imply that an external exchange connection has been re-established.
5. Business entities must follow the archival and historical-retention requirements established by Document 311.
6. Physical deletion must not be used as the ordinary lifecycle-ending path where it would violate historical-retention or audit requirements.
7. Existing deletion behavior must be inspected and reconciled with these rules. Any corrective implementation requires separate explicit execution authorization.
8. Before implementation, the approved lifecycle rules must be mapped to an operation-by-operation matrix. No additional lifecycle exceptions may be inferred without a separate architecture decision.

## 9. Principle E — Internal State Versus External Connection (D5)

1. Within ATH-IMP-036, `Connect` and `Disconnect` describe internal Exchange Account state unless external connectivity is separately evidenced and authorized.
2. A successful internal state change must not be reported as proof of a successful external exchange connection.
3. Disconnecting internally must not be reported as proof that an external session was terminated or credentials were revoked.
4. External exchange API operations, credential management, and new integrations remain outside this mission's scope unless separately reviewed and authorized.
5. Operation outcomes must describe only what the implementation has actually verified.

## 10. Principle F — Persistence and Repository Boundaries

1. Exchange Account feature operations must follow the approved repository-boundary architecture in Document 410.
2. Feature services must use feature-level repository contracts, with persistence-specific details translated at the appropriate boundary.
3. Persistence-specific result and error contracts must not leak directly into the feature layer.
4. The actual runtime persistence implementation must be established from evidence rather than inferred from placeholder providers or configuration.
5. Findings about the inspected in-memory repository or placeholder Supabase components must not be generalized to uninspected environments.
6. Any change to repository contracts or persistence wiring requires separate implementation authorization.

## 11. Principle G — Operation Result and Error Contract (D7)

1. An operation may report success only when the requested operation has actually succeeded.
2. Failed, rejected, or unapplied mutations must not be reported as successful.
3. Authorization and ownership failures must not disclose protected resource data.
4. Persistence-level errors and results must be translated into appropriate feature-level contracts consistently with Document 410.
5. Observable state changes must accurately reflect verified operation outcomes.
6. The exact `Result` structure, error categories, HTTP status codes, and division of responsibilities between layers remain subject to technical review. They are not prescribed by this ADR without supporting evidence.

## 12. Principle H — Testability and Acceptance Evidence (D8)

1. Every acceptance claim must be supported by reviewable evidence.
2. Verification must cover both permitted and denied paths.
3. Organization isolation and direct-ID access must be explicitly tested.
4. Ownership-chain validation and parent lifecycle restrictions must be tested.
5. Historical retention after disconnect and archive must be verified.
6. Operation results, authorization failures, and error translation must be verified against the approved contracts.
7. A test that has not been executed must not be reported as passing.
8. The repeatable test command, required environment, and relevant limitations must be documented before final acceptance.

## 13. Lifecycle Operation Matrix

The following matrix combines rules from Document 311 with additional lifecycle decisions explicitly approved during architecture review.

| Operation | Approved requirement |
|---|---|
| Create Exchange Account | Customer and Portfolio must both be `Active`. |
| Connect (internal state) | Customer and Portfolio must both be `Active`. This does not establish external connectivity. |
| Disconnect (internal state) | Must not delete historical records. |
| Archive | Requires valid identity, permission, and Organization ownership. Historical records must be retained. |
| Restore | Customer and Portfolio must both be `Active`. Restore must not activate parents or imply external connectivity. |
| Read historical records | Must respect authorization and ownership while supporting applicable audit and retention requirements. |
| Physical delete | Must not be the ordinary lifecycle-ending path or violate historical-retention requirements. |

### Lifecycle Clarifications

- Document 311 explicitly defines Customer, Portfolio, and Exchange Account lifecycle sequences and key historical-retention constraints.
- The operation-by-operation restrictions above are additional decisions approved during this architecture review; they must not be misrepresented as verbatim requirements from Document 311.
- Other operations, including edits to account metadata under every possible parent state, require further mapping where the approved documents do not specify the exact combination.
- No unapproved lifecycle exception may be introduced during implementation.

## 14. Acceptance Criteria

**AC-01 — Trusted identity and Organization context**

The operation uses a trusted authenticated identity and resolves the authorized Organization from a valid relationship. Missing, invalid, or ambiguous context fails closed.

**AC-02 — Organization isolation**

A permitted operation against a resource belonging to the authorized Organization succeeds when all other conditions are met. Cross-Organization access is rejected without disclosing protected resource data.

**AC-03 — Direct-ID and identifier manipulation**

Changing or supplying resource IDs cannot bypass authorization or ownership validation.

**AC-04 — Ownership-chain integrity**

The Exchange Account → Portfolio → Customer → Organization chain is validated. Missing, invalid, or inconsistent relationships cause rejection.

**AC-05 — Parent lifecycle enforcement**

Create, internal Connect, and Restore follow the approved lifecycle matrix. Restore does not reactivate parents or assert external connectivity.

**AC-06 — Historical retention**

Disconnect and Archive preserve historical trading records. Relevant deletion paths and their effects on dependent records are examined and evidenced.

**AC-07 — Accurate operation outcomes**

An operation reports success only when the expected operation actually succeeded. Failures are not converted into false success.

**AC-08 — Safe error handling**

Authorization failures do not disclose protected data. Persistence-level contracts and errors are translated consistently with Document 410.

**AC-09 — Repository and runtime evidence**

The relevant execution path and runtime persistence behavior are documented from inspectable evidence. Unverified environments and paths are explicitly identified as such.

**AC-10 — Repeatable verification**

The test command and required environment are documented. Acceptance results identify which tests were actually run, their outcomes, and any outstanding limitations.

Final acceptance remains open until sufficient evidence supports the applicable criteria.

## 15. Open Technical Evidence Questions

The following are unresolved technical investigations, not unresolved authorization of the architectural principles above.

### OQ-01 — Identity and Authorization Entry Points

Identify the actual request paths, trusted identity source, Organization-resolution path, and enforcement points for Exchange Account operations. Determine whether relevant entry points or authorization boundaries exist outside the paths already examined.

**Investigation boundary:** read-only inspection; no provider selection or code changes.

### OQ-02 — Lifecycle Mapping

Map the approved lifecycle matrix to actual service, use-case, and repository behavior. Identify operations and parent-state combinations not explicitly defined by the approved architecture.

**Investigation boundary:** report discrepancies; do not invent exceptions or implement fixes.

### OQ-03 — Historical Retention and Deletion

Trace deletion, archival, and restoration paths; inspect relationships between Exchange Account, Trade, and other historical records; establish the effect of each relevant path on dependent data.

**Investigation boundary:** inspect code and persistence definitions without executing destructive operations.

### OQ-04 — Feature-Level Result and Error Contract

Inspect existing feature-level and persistence-level contracts and identify a compatible approach consistent with Document 410.

**Investigation boundary:** recommend a contract only after evidence review; no implementation until separately authorized.

### OQ-05 — Repeatable Acceptance Tests

Identify available tests, test scripts, commands, required environment, and evidence needed to verify AC-01 through AC-10. If suitable tests or a repeatable environment are absent, report that gap explicitly.

**Investigation boundary:** establish testability first; do not claim tests passed unless actually executed.

## 16. Relationship to Decisions D1–D8

- D1 — Trusted Identity and Organization Context.
- D2 — Organization-Scoped Authorization.
- D3 — Ownership-Chain Validation.
- D4 — Parent Lifecycle and Historical Data Retention.
- D5 — Internal State Versus External Connection.
- D6 — Physical Deletion and Historical Retention.
- D7 — Operation Result and Error Contract.
- D8 — Testability and Acceptance Evidence.

This consolidated ADR records the architecture decisions approved during the architecture-review conversation. D1–D8 are approved; the outstanding technical evidence questions remain open.

## 17. Change Control and Implementation Authorization

- This ADR does not authorize implementation.
- Recording this ADR in Git does not authorize implementation or deployment.
- Any implementation must follow the approved repository architecture and must be explicitly authorized separately.
- Technical findings must distinguish verified evidence, remaining uncertainty, and recommendations.
- Any proposed change to the architectural decisions above requires explicit review rather than silent deviation.

## 18. Final Status

**Architecture decisions:** D1–D8 were approved during architecture review.

**Document status:** Architecture decisions approved; technical evidence remains open.

**Technical evidence:** Incomplete; the open questions in Section 15 remain to be investigated.

**Implementation:** NOT AUTHORIZED.

**Repository publication:** Documentation only; implementation remains unauthorized.
