Document Information
Field	Value
Document ID	ATH-STD-009
Category	Foundation
Title	ATH Feature Public API Standard
Version	1.0.0
Status	Approved
Owner	ARKAVERSE
Project	ARK Trade Hub (ATH)
1. Purpose

This document defines the mandatory architectural standard for exposing Feature public APIs inside ARK Trade Hub.

Its objective is to ensure that every business feature exposes a stable, explicit and maintainable public contract while keeping internal implementation fully encapsulated.

2. Motivation

Features evolve.

Internal folder structures change.

Implementation details change.

External modules should never depend on those internal changes.

Every Feature must therefore expose a single stable public boundary.

3. Principle

Every Feature owns exactly one public entry point.

Example:

features/customers/index.ts

This file represents the only public interface of the feature.

4. Public API Responsibilities

The public entry point is responsible for exposing approved contracts only.

Typical exports include:

Pages
Public Hooks
Public Services
Public Domain Types
Public DTOs

Example:

export { CustomersPage };

export { useCustomers };

export { customerService };

export type { Customer };

export type { CreateCustomerDto };
5. Internal Implementation

Internal implementation details remain private.

Examples:

repositories/

seed/

utils/

internal components/

private hooks/

These directories are implementation details and must not be imported directly outside the feature.

6. Allowed Imports

External modules must import only through the feature entry point.

Allowed:

import {
  useCustomers,
  customerService,
  type Customer,
} from "@/features/customers";
7. Forbidden Imports

The following are architectural violations:

import { useCustomers }
from "@/features/customers/hooks/useCustomers";
import { MockCustomerRepository }
from "@/features/customers/repositories/mock-customer.repository";
import { customerSeed }
from "@/features/customers/seed/customers";
8. Design Goals

This standard enforces:

Feature Isolation
Explicit Public Contracts
Stable Dependencies
Low Coupling
Encapsulation
Maintainability
9. Future Evolution

Future Features must follow exactly the same structure.

Examples:

features/campaigns/

features/trades/

features/workspaces/

features/auth/

Each feature must expose a single public entry point.

10. Compliance

Every new Feature introduced into ATH must comply with this standard.

Architectural reviews should reject direct imports from internal Feature folders.

Design Impact

This standard directly affects:

Feature Architecture
Module Boundaries
Dependency Management
Future Feature Development
Long-term Maintainability