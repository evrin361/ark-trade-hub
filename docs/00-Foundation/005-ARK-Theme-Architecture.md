# ATH-STD-005

# ARK Theme Architecture

---

Document ID: ATH-STD-005

Title: ARK Theme Architecture

Status: Approved

Version: 1.0

Owner: ARK Engineering

Project: ARK Trade Hub (ATH)

---

# Purpose

This document defines the architectural layers of the ARK Design System.

The goal is to ensure that UI components remain reusable, maintainable, and independent across all future ARK products.

Theme is not just a collection of colors.

Theme is an architectural foundation.

---

# Architecture

```
Component
      │
      ▼
Recipe
      │
      ▼
Foundation
```

Each layer has a single responsibility.

---

# Layer 1 — Foundation

Foundation contains the primitive design tokens.

Examples:

- Colors
- Radius
- Typography
- Spacing
- Transitions

Foundation never knows that Button, Card or Input exist.

Foundation only defines the visual language of ARK.

Examples:

```ts
colors.brand.primary

radius.md

spacing.lg

typography.base
```

---

# Layer 2 — Recipe

Recipe combines Foundation tokens into reusable component styles.

Examples:

```text
button.primary

button.secondary

card.default

input.outlined
```

Recipe knows Foundation.

Recipe never knows business logic.

Recipe never contains application state.

---

# Layer 3 — Component

Components consume Recipes.

Components never consume Foundation directly.

Correct:

```
Button
    │
    ▼
button.primary
```

Incorrect:

```
Button
    ├── colors
    ├── spacing
    ├── typography
    └── radius
```

---

# Responsibility

Foundation

Responsible for:

- Design Tokens
- Visual Identity
- Consistency

Never responsible for:

- Components
- Business Logic
- UI Behavior

---

Recipe

Responsible for:

- Combining Tokens
- Component Appearance
- Visual Variants

Never responsible for:

- State
- API Calls
- Domain Logic

---

Component

Responsible for:

- Rendering
- Accessibility
- Interaction
- Events

Never responsible for:

- Theme Definition
- Design Tokens

---

# Design Principles

## Single Responsibility

Every layer has one responsibility.

---

## Reusability

Foundation must be reusable across every ARK project.

Recipes may vary between projects.

---

## Independence

Foundation must never depend on Components.

Components may never bypass Recipes.

---

## Scalability

New components must require zero changes to Foundation whenever possible.

---

# Future Structure

```
theme/

├── colors.ts
├── spacing.ts
├── radius.ts
├── typography.ts
├── transitions.ts
│
├── recipes/
│   ├── button.ts
│   ├── card.ts
│   ├── input.ts
│   ├── modal.ts
│   └── ...
│
└── index.ts
```

---

# Design Impact

This document directly affects:

- Theme Foundation
- Theme Recipes
- UI Components
- Design System
- Frontend Architecture
- Future ARK Products

---

# ARK Design Quotes

> "Foundation defines the language."

> "Recipes define expression."

> "Components deliver experience."

> "A component should never invent its own design."

> "Consistency is not repetition. It is shared architecture."