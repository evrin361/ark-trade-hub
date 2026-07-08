# ATH-IMP-103

# ARK Theme Builder

---

Document ID: ATH-IMP-103

Title: ARK Theme Builder

Status: Approved

Version: 1.0

Owner: ARK Engineering

Project: ARK Trade Hub (ATH)

---

# Purpose

This document defines the build process that converts ARK Foundation Tokens into CSS Theme Tokens.

The Theme Builder is responsible for generating framework-independent CSS variables from the Foundation layer.

---

# Motivation

Foundation Tokens are currently defined in TypeScript.

Example:

- colors.ts
- spacing.ts
- radius.ts
- typography.ts

However, CSS cannot consume TypeScript directly.

Duplicating values inside CSS would violate the Single Source of Truth principle.

The Theme Builder eliminates duplication.

---

# Architecture

```
Foundation Tokens (TypeScript)
            │
            ▼
      Theme Builder
            │
            ▼
Generated theme.css
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

---

# Responsibilities

Theme Builder is responsible for:

- Reading Foundation Tokens
- Generating CSS Variables
- Keeping CSS synchronized
- Producing deterministic output

Theme Builder is NOT responsible for:

- UI rendering
- Tailwind configuration
- Component styling

---

# Generated Output

Example:

```css
:root {

    --ark-color-surface-primary: #111827;

    --ark-color-surface-secondary: #1f2937;

    --ark-color-text-primary: #ffffff;

    --ark-radius-md: 10px;

}
```

The generated file becomes the single CSS source consumed by Tailwind.

---

# Single Source of Truth

The only editable files are:

- colors.ts
- spacing.ts
- radius.ts
- typography.ts

Generated CSS must never be edited manually.

---

# Future Extensions

The Theme Builder will later support:

- Multiple Brands
- Dark Theme
- Light Theme
- Theme Packages
- Figma Export
- React Native Export
- Flutter Export

without changing the Foundation Tokens.

---

# Output Philosophy

Foundation describes meaning.

Theme Builder translates meaning.

CSS exposes meaning.

Components consume meaning.

No visual value should exist outside the Foundation layer.

---

# Success Criteria

A successful Theme Builder guarantees:

- Zero duplicated design tokens.
- One editable source.
- One generated CSS output.
- Framework independence.
- Deterministic builds.

---

# Design Impact

This document directly affects:

- Theme Foundation
- Tailwind Integration
- Build Pipeline
- UI Components
- Future Design System
- Future ARK Packages

---

# ARK Design Quotes

> "Generate artifacts. Never duplicate knowledge."

> "Source files are edited. Generated files are disposable."

> "Foundation defines truth. Builders distribute truth."

> "Every framework consumes the same design language."