# ARK Trade Hub

## Document Information

| Item | Value |
|------|-------|
| Document ID | 201 |
| Title | System Configuration |
| Layer | Implementation |
| Status | Approved |
| Owner | ARK Team |

---

# Purpose

System Configuration is the administrative layer of ARK.

It defines what services are available inside the system.

It does **NOT** represent customer data.

It represents platform capabilities.

Only System Administrators can modify this section.

---

# Philosophy

The platform may support many markets and providers.

However, customers should only see services that are enabled by the administrator.

Therefore:

Capability ≠ Visibility

The system may support something internally without exposing it to customers.

---

# Responsibilities

System Configuration is responsible for:

- Markets
- Providers
- Global Platform Configuration

It is NOT responsible for:

- Customers
- Trading Accounts
- Orders
- Signals

---

# Current Scope (Phase 1)

Phase 1 only includes:

- Markets
- Providers

Everything else will be added incrementally.

---

# Markets

Represents financial markets supported by ARK.

Examples:

- Crypto
- Forex
- Stocks
- Commodities

Each Market has:

- Name
- Code
- Display Order
- Enabled Status

---

# Providers

Represents trading providers inside a Market.

Examples:

Crypto:

- Nobitex
- Binance
- Bybit
- OKX

Forex:

- IC Markets
- Pepperstone
- Exness

Each Provider belongs to exactly one Market.

---

# Relationship

Market

↓

contains

↓

Providers

Example

Crypto

↓

Nobitex

Binance

Bybit

---

# Administrator Responsibilities

System Administrator can:

- Create Market
- Edit Market
- Enable Market
- Disable Market

and

- Create Provider
- Edit Provider
- Enable Provider
- Disable Provider

---

# Customer Experience

Customers never interact with System Configuration.

Customers only see enabled Markets.

After selecting a Market,
they only see enabled Providers.

Example

Available Markets

✓ Crypto

Available Providers

✓ Nobitex

Hidden

✗ Binance

✗ Bybit

---

# Design Rules

System Configuration must remain independent from:

- Customer
- Trading Account
- Trade

Those modules consume configuration.

They never own configuration.

---

# Future Extensions

The following modules will later become part of System Configuration:

- Signal Providers
- Trading Permissions
- Notification Channels
- Supported Assets
- Languages
- Themes

The architecture must support future growth without redesign.

---

# ARK Principle

Build once.

Extend forever.

Never redesign the foundation.