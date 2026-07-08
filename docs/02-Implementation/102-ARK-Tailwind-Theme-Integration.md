# ATH-IMP-102

# Tailwind Theme Integration

---

Document ID: ATH-IMP-102

Title: Tailwind Theme Integration

Status: Approved

Version: 1.0

Owner: ARK Engineering

Project: ARK Trade Hub (ATH)

---

# Purpose

This document defines how the ARK Theme Foundation integrates with Tailwind CSS.

The objective is to eliminate hard-coded visual values from UI components and establish Foundation as the single source of truth for the design language.

---

# Motivation

Current components still contain Tailwind utility classes such as:

- bg-slate-900
- text-white
- border-white/10

These values are temporary.

The target architecture is for components to consume semantic design tokens instead of implementation details.

Example:

Instead of:

```tsx
bg-slate-900
```

Future usage:

```tsx
bg-ark-surface-primary
```

---

# Architecture

```
Foundation Tokens
        │
        ▼
Tailwind Theme
        │
        ▼
Recipes
        │
        ▼
Components
```

Components must never define visual values directly.

---

# Implementation Goals

## Step 1

Connect Foundation Colors to Tailwind.

---

## Step 2

Expose semantic utility classes.

Examples:

- bg-ark-surface-primary
- bg-ark-surface-secondary
- text-ark-primary
- text-ark-secondary
- border-ark-default

---

## Step 3

Update Recipes to consume semantic utilities.

No component changes should be required.

---

## Step 4

Future components automatically inherit the design language.

---

# Responsibilities

Foundation

Responsible for:

- Color values
- Typography
- Radius
- Spacing
- Motion

---

Tailwind

Responsible for:

- Mapping semantic names
- Utility generation

---

Recipes

Responsible for:

- Combining semantic utilities

---

Components

Responsible only for:

- Rendering
- Accessibility
- Interaction

---

# Non Goals

This implementation does NOT include:

- Dark Mode
- Brand Switching
- Theme Persistence
- Runtime Theme Selection

These will be implemented in future milestones.

---

# Success Criteria

After implementation:

- No new hard-coded colors are introduced.
- Components remain unchanged.
- Recipes consume semantic utilities.
- Foundation becomes the single visual source of truth.

---

# Design Impact

This document directly affects:

- Theme Foundation
- Tailwind Configuration
- Theme Recipes
- UI Components
- Future Design System

---

# ARK Design Quotes

> "A design token is not a color; it is a meaning."

> "Components should describe intent, never appearance."

> "Foundation owns the language. Tailwind speaks it."

> "Changing the brand should never require rewriting components."