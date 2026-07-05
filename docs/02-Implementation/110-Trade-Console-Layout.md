# ATH-IMP-110

# Trade Console Layout

---

## Objective

Create the first visual page of ARK Trade Hub.

This phase focuses only on the page layout.

No backend integration.

No database.

No API calls.

No business logic.

---

## Main Sections

The Trade Console consists of five major areas.

### 1. Header

Contains:

- Page title
- Environment indicator
- Active exchange
- Current market

---

### 2. Trade Configuration

Contains:

- Exchange
- Market
- Trade Type
- Symbol
- Entry Price
- Take Profit
- Stop Trigger
- Stop Price
- Capital Percentage

---

### 3. Target Selection

Contains:

- Send to All
- Send to Groups
- Manual Customer Selection

---

### 4. Dispatch Result

Shows:

- Successful Orders
- Failed Orders
- Pending Orders

---

### 5. Active Campaigns

Shows currently active trade campaigns.

Allows:

- Cancel Campaign
- Modify TP
- Modify SL
- Close Position

---

## Design Principles

- One screen operation
- Minimum clicks
- Clear operator feedback
- Large readable controls
- Dark theme first
- Keyboard friendly

---

# Design Impact

This document directly affects:

- Trade Console UI
- Campaign Management
- Dispatch Engine
- Exchange Adapter