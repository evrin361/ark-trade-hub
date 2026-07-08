# ATH-IMP-113

# ARK Widget Architecture

---

Document ID: ATH-IMP-113

Title: ARK Widget Architecture

Status: Approved

Version: 1.0

Owner: ARK Engineering

Project: ARK Trade Hub (ATH)

---

# Purpose

This document defines the architecture of Widgets in ARK.

Widgets represent business information.

They are not UI primitives.

---

# Philosophy

UI components know how to render.

Widgets know what to render.

This separation keeps business logic independent from reusable UI.

---

# Widget Hierarchy

Foundation

↓

Theme

↓

UI Components

- Button
- Card
- Panel

↓

Business Widgets

↓

Workspace

---

# Responsibilities

A Widget is responsible for:

- Preparing business data
- Selecting the appropriate UI
- Presenting one business concept

A Widget is NOT responsible for:

- Global layout
- Navigation
- Theme
- Foundation

---

# Widget Structure

Each Widget lives inside its Feature.

Example:

src/features/dashboard/widgets/

---

Example:

BitcoinPrice/

├── BitcoinPriceWidget.tsx

├── BitcoinPriceWidget.types.ts

└── index.ts

---

# Widget Composition

A Widget should consume UI Components.

Example:

BitcoinPriceWidget

↓

Panel

↓

Card

---

# One Widget

One Business Concept

Examples:

- Bitcoin Price
- Free Balance
- Active Orders
- Customer Capital
- Daily Profit

Never combine unrelated concepts.

---

# Reusability

Widgets may be reused across:

- Dashboard
- Workspace
- Future Mobile Application
- Future Desktop Application

Business logic should remain inside the Widget.

---

# Future Evolution

Widgets may later contain:

- API Calls
- Live Updates
- Loading State
- Error State
- Refresh Logic

without changing the UI Components.

---

# Success Criteria

A successful Widget:

- Represents one business concept.
- Uses reusable UI Components.
- Contains no duplicated UI.
- Can evolve independently.

---

# ARK Design Quotes

> "Widgets speak the language of the business."

> "UI shows. Widgets know."

> "One widget. One business concept."

> "Business belongs above the UI."