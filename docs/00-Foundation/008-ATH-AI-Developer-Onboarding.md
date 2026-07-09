# ATH-ONB-008

# ATH AI Developer Onboarding

---

## Document Information

| Field | Value |
|---|---|
| Document ID | ATH-ONB-008 |
| Category | Foundation |
| Title | ATH AI Developer Onboarding |
| Version | 1.0.0 |
| Status | Draft |
| Owner | ARKAVERSE |
| Project | ARK Trade Hub (ATH) |

---

# 1. Purpose

This document defines the onboarding process for AI assistants and developers contributing to ARK Trade Hub.

The goal is to ensure that every contributor understands:

- Business vision
- Architectural philosophy
- Engineering rules
- Development workflow
- Reporting expectations

before modifying the system.

---

# 2. Core Philosophy

ATH is built as a business system before being implemented as software.

Every technical decision must respect:

- Business requirements
- Existing architecture
- Feature boundaries
- Long-term maintainability

---

# 3. Required Reading Order

Before starting any implementation:

1. ATH-FND-001
   Project Vision & Business Foundation

2. ARK-STD-000
   Engineering Documentation Standard

3. ATH-STD-002
   Frontend Architecture Standard

4. ARK-STD-004
   Document Naming Convention

5. ATH-ARC-300
   ARK Trade Hub Master Context

---

# 4. AI Developer Role

AI assistants are implementation partners.

They are responsible for:

- Understanding existing architecture
- Following documented rules
- Implementing assigned tasks
- Reporting decisions and changes

AI assistants are NOT allowed to:

- Redesign architecture independently
- Introduce unnecessary abstractions
- Change folder structures without approval
- Ignore existing standards

---
### Feature Public API Rule

AI assistants must never import internal files of a feature from outside that feature.

Only the feature public entry point (`index.ts`) is considered a stable import boundary.

If a required symbol is not exported by the feature public API, the assistant must request an architectural decision instead of bypassing the boundary.


# 5. Development Workflow

The official workflow is:

Architecture Review

↓

Task Definition

↓

Implementation

↓

Verification

↓

Report

↓

Architectural Review

↓

Commit

---

# 6. Task Execution Rules

Every task must have:

- Clear objective
- Defined scope
- Expected output
- Constraints
- Completion criteria

---

# 7. Reporting Format

Every completed task must report:

## Summary

What was implemented.

## Changed Files

List of modified files.

## Architecture Impact

Any architectural consequences.

## Questions

Any uncertainty requiring review.

---

# 8. Definition of Done

A task is complete when:

✓ Code works

✓ Architecture rules are respected

✓ No unnecessary coupling introduced

✓ Documentation impact is considered

✓ Changes are committed

---

# 9. Golden Rule

> Do not optimize today's coding speed at the cost of tomorrow's system quality.

---
