# ATH-IMP-001

# Customer Repository Integration

---

## Document Information

| Field | Value |
|---|---|
| Document ID | ATH-IMP-001 |
| Category | Implementation |
| Title | Customer Repository Integration |
| Version | 1.0.0 |
| Status | Draft |
| Project | ARK Trade Hub (ATH) |
| Owner | ARK Engineering |

---

# 1. Purpose

This implementation task introduces repository-based data access into the Customer feature.

The goal is to replace direct dependency on customer data sources with an explicit repository abstraction.

This establishes the foundation for future migration from mock data sources to real persistence layers such as Supabase.

---

# 2. Background

The Customer feature currently contains:

- Customer types
- Customer seed data
- Customer service logic
- React hooks consuming services

The architecture requires business logic to remain independent from data storage.

Therefore:

Feature Logic

↓

Repository Interface

↓

Data Source Implementation


---

# 3. Current State

Implemented:

✓ CustomerRepository interface

Location:


features/customers/repositories/customer.repository.ts



Implemented:

✓ MockCustomerRepository

Location:


features/customers/repositories/mock-customer.repository.ts



Current limitation:

CustomerService and useCustomers still directly depend on:


customerSeed



---

# 4. Objective

Refactor Customer feature so that:

CustomerService

does not know:

- Seed files
- Database
- External storage


CustomerService should communicate only through:


CustomerRepository


---

# 5. Target Architecture


Before:



useCustomers

↓

CustomerService

↓

customerSeed



After:



useCustomers

↓

CustomerService

↓

CustomerRepository

↓

MockCustomerRepository

↓

customerSeed



---

# 6. Implementation Requirements


## 6.1 Repository Instance

Create a repository provider.


Example:


customer.repository.instance.ts



Responsibilities:

- Create repository instance
- Hide implementation details


---

## 6.2 CustomerService Migration


CustomerService must receive repository dependency.


Forbidden:


```ts
import { customerSeed } from "../seed/customers";

Allowed:

repository.getAll()
6.3 Preserve Existing Behavior

The migration must not change:

Customer creation
Customer update
Archive behavior
Restore behavior
Status toggle behavior

Only data access mechanism changes.

7. Non Goals

This task does NOT include:

Supabase integration
Database schema changes
API development
Authentication changes
UI redesign
8. Acceptance Criteria

Task is complete when:

✓ CustomerService has no direct seed dependency

✓ Repository abstraction is the only data access path

✓ Existing customer operations continue working

✓ Mock repository remains replaceable

✓ TypeScript compilation succeeds

✓ No architecture rule is violated

9. Expected Deliverables

Developer must provide:

Changed files list
Architecture explanation
Testing result
Git commit hash
10. Commit Convention

Expected format:

refactor customer service to use repository abstraction
11. Architecture Review

Before approval verify:

Feature isolation maintained
Dependency direction preserved
Repository pattern respected
Future Supabase migration remains possible

Status:

Draft