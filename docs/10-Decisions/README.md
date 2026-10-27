# Architecture Decision Records

## Purpose

This directory is the canonical location for new Architecture Decision Records (ADRs) in ARK Trade Hub. ADRs record decisions and their status; architecture design documents remain in their respective architecture-document locations.

## Naming and numbering

- Use the Document ID pattern `ATH-ADR-NNN`.
- The three-digit numeric identifier must match the numeric portion of the filename.
- Use filenames in the form `NNN-short-decision-title.md`.
- ADR numbering is independent of the `ATH-ARC` architecture-design-document sequence.
- New ADRs must be created in this directory. The historical location of ADR-420 is an exception, not a precedent for new ADRs.

## Decision register

| Document ID | Title | Status | Location |
|---|---|---|---|
| `ATH-ADR-420` | Exchange Account Organization Scope and Lifecycle Decisions | Architecture decisions approved - technical evidence open; implementation not authorized | [`ADR-420 at its existing path`](../03-Architecture/420-exchange-account-organization-scope-and-lifecycle-decisions.md) |
| `ATH-ADR-421` | Trade Historical Immutability and Correction Policy | Architecture Approved - Publication Pending; implementation not authorized | [`421-Trade-Historical-Immutability-and-Correction-Policy.md`](421-Trade-Historical-Immutability-and-Correction-Policy.md) |

## Publication status

`ATH-ADR-421` is registered in this local decision register. Git publication remains pending separate explicit authorization. This registration does not authorize implementation or change the approved status of ADR-420.


## Maintenance

The ARK Engineering documentation owner is responsible for maintaining this register when an ADR is formally approved for registration or its publication status or location changes.

For each registered ADR, verify its Document ID, filename, status, and relative link. Preserve the separation between decision records and architecture design documents. Do not register a proposed or unpublished ADR as published.

Registering or publishing an ADR does not itself authorize implementation. Implementation requires its own explicit authorization under project governance.