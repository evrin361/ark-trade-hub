# ATH-STD-007

# ARK Localization & Direction Standard

---

Document ID: ATH-STD-007

Title: ARK Localization & Direction Standard

Status: Approved

Version: 1.0

Owner: ARK Engineering

Project: ARK Trade Hub (ATH)

---

# Purpose

This document defines the localization and layout direction standards for ARK.

Localization is not limited to language translation.

It defines how the operator experiences the entire interface.

---

# Philosophy

Language defines layout.

Changing language may change:

- Reading direction
- Alignment
- Navigation order
- Component placement
- Icon direction
- Typography
- Number presentation

Localization is part of the Foundation.

---

# Operator First

ARK always follows the operator.

The interface must adapt to the user's language and reading habits.

The operator should never adapt to the interface.

---

# Direction Rules

Current primary language:

- Persian (fa-IR)

Current direction:

- Right-to-Left (RTL)

Future supported directions:

- RTL
- LTR

Direction must be configurable.

---

# Layout Rules

RTL affects:

- Grid order
- Flex order
- Navigation flow
- Panel placement
- Sidebar placement
- Drawer direction
- Animation direction

Applying `direction: rtl` alone is insufficient.

Components must be designed with RTL in mind.

---

# Text Alignment

Persian UI:

- Right aligned by default.

English UI:

- Left aligned by default.

Alignment must follow language.

---

# Numbers

Numbers remain Left-to-Right.

Examples:

Price:

```
قیمت بیت‌کوین: 108,350 دلار
```

Balance:

```
موجودی آزاد: 24,200 تتر
```

Wallets, IDs, hashes, URLs, emails and codes preserve their natural direction.

---

# Icons

Directional icons follow interface direction.

Example:

LTR

→

RTL

←

Icons representing concepts remain unchanged.

Example:

✓

⚠

💰

---

# Logical Spacing

Avoid physical spacing.

Prefer logical layout.

Preferred:

- margin-inline-start
- margin-inline-end
- padding-inline
- inset-inline

Avoid:

- margin-left
- margin-right
- padding-left
- padding-right

---

# Component Rules

Every reusable component must:

- Support RTL.
- Support LTR.
- Avoid hard-coded alignment.
- Avoid fixed direction assumptions.

---

# Localization

Future versions will support:

- Persian
- English

Additional languages may be added without changing component APIs.

---

# Foundation Principle

Localization affects architecture.

It is not a cosmetic feature.

---

# Success Criteria

A successful localization system ensures:

- Natural reading order.
- Natural layout.
- Correct number rendering.
- Correct icon direction.
- Consistent behavior across the application.

---

# ARK Design Quotes

> "Language defines layout."

> "RTL is architecture, not styling."

> "The operator comes first."

> "Interfaces should speak the user's language."