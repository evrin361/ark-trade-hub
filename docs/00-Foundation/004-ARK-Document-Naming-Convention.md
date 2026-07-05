# ARK-STD-004

# ARK Document Naming Convention

---

Document ID: ARK-STD-004

Title: ARK Document Naming Convention

Status: Approved

Version: 1.0

Owner: ARK Engineering

Applies To: All ARK Projects

---

# 1. Purpose

This document defines the naming and identification rules for all engineering documents produced within the ARK ecosystem.

Its objective is to ensure consistency, discoverability and long-term maintainability.

Every document must be uniquely identifiable.

---

# 2. General Principles

Document names must be:

- Predictable
- Sequential
- Human-readable
- Machine-friendly
- Stable over time

Document names are considered permanent identifiers.

They should not change after publication unless absolutely necessary.

---

# 3. File Naming Format

Every document follows this structure:

XXX-Document-Title.md

Example:

000-ARK-Engineering-Documentation-Standard.md

011-Workspace-Philosophy.md

120-Exchange-Adapter.md

---

# 4. Numbering Rules

Numbers always contain three digits.

Examples:

000

001

002

010

011

099

100

999

---

# 5. Number Allocation

Document numbers are assigned sequentially.

Numbers are never skipped intentionally.

Reserved numbers should be completed before assigning new ones.

Numbers should never be reused for different documents.

---

# 6. Document Categories

Different document categories use different Document ID prefixes.

### Engineering Standards

Prefix:

ARK-STD

Example:

ARK-STD-000

---

### Business Documents

Prefix:

ATH-BUS

Example:

ATH-BUS-011

---

### Technical Standards

Prefix:

ATH-STD

Example:

ATH-STD-002

---

### Implementation Documents

Prefix:

ATH-IMP

Example:

ATH-IMP-110

---

### Architecture Decision Records (Future)

Prefix:

ATH-ADR

Example:

ATH-ADR-001

---

# 7. Relationship Between File Name and Document ID

The document number inside the filename must always match the numeric portion of the Document ID.

Example:

Filename:

003-ARK-Foundation-UI.md

Document ID:

ARK-STD-003

---

# 8. Folder Organization

Foundation

docs/00-Foundation/

Business

docs/01-Business/

Implementation

docs/02-Implementation/

Additional folders may be introduced as the project evolves.

---

# 9. Renaming Policy

Published documents should not be renamed unless required by engineering decisions.

When a rename occurs:

- References must be updated.
- Changelog should record the change.
- Git history should preserve the rename.

---

# 10. Engineering Principles

Document organization must favor:

- Clarity
- Stability
- Predictability
- Long-term maintenance

Documentation is considered part of the software architecture.

---

# ARK Design Quotes

> "Documentation is architecture."

> "A document should be easy to find before it is easy to write."

> "Consistency reduces cognitive load."

---

# Design Impact

This document directly affects:

- All Engineering Documents
- Repository Structure
- Documentation Standards
- Future ARK Projects