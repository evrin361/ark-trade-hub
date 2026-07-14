# ARK Authentication and Authorization Architecture

## 1. Overview

This document defines the authentication and authorization architecture of ARK Trade Hub.

Authentication is independent from the business domain.

The business domain is defined by ATH-ARC-310 (Business Domain Architecture).

The purpose of this document is to define how authenticated users interact with business entities while preserving ownership boundaries.

- System Users
- Business Customers
- Customer Portal Accounts
- Roles and Permissions

ARK follows the principle:

> Identity, Business Entity, and Access Permission are separate concepts.


---

# 2. Core Concepts

## 2.1 Organization

An Organization represents an independent business operating on the platform.

Each authenticated User belongs to exactly one Organization.

Authentication never crosses Organization boundaries.

Organizations are isolated from one another.

Business ownership is enforced at the Organization level.

---

## 2.2 Users

Users represent people who can authenticate into the system.

Examples:

- ARK administrators
- Employees
- Customer representatives

Users are responsible for:

- Login
- Authentication
- Personal identity

Users operate on behalf of their Organization.

Users do not own business assets.

Business ownership is defined separately by the Business Domain Architecture.

---

## 2.3 Customers

Customers are business entities.

Customers own investment Portfolios.

Customers are not authentication identities.

Customers may later receive access to the Customer Portal through one or more Customer Accounts.

A Customer belongs to exactly one Organization.

The same real-world individual or company may exist as independent Customers in multiple Organizations without sharing business data.

---

## 2.4 Customer Portal Accounts

Customer Accounts represent authentication identities for Customers.

A Customer may have one or more Customer Portal Accounts.

These accounts are used only for accessing the Customer Portal.

Customer Portal Accounts do not own business data.

They inherit access to the Customer's business entities through authorization rules.

---

## 2.5 Roles & Permissions

System permissions determine what authenticated Users and Customer Portal Accounts are allowed to do.

Permissions never define business ownership.

Ownership is defined exclusively by the Business Domain Architecture.

---

## 2.6 Business Domain

The business domain consists of:

Organization
    ↓
Customer
    ↓
Portfolio
    ↓
Exchange Account
    ↓
Asset

Campaigns operate on Portfolios.

Trades are executed through Exchange Accounts.

Authentication and authorization interact with this domain but never redefine its ownership structure.
---

# 3. Authentication Model


Authentication will be handled separately from business data.


Future architecture:



Authentication Provider

    |
    |

User Identity

    |
    |

Customer Account

    |
    |

Customer Entity



---

# 4. Database Separation

Organization

↓

Users

↓

Customer Accounts

↓

Customers

↓

Portfolios

↓

Exchange Accounts

↓

Campaigns

↓

Trades
---

# 5. Authorization


ARK will use role-based access control.


Example roles:


## System Roles


SUPER_ADMIN
ADMIN
STAFF



## Customer Roles


CUSTOMER_OWNER
CUSTOMER_MANAGER
CUSTOMER_VIEWER

Permissions determine what a User may do.

Ownership determines what business data exists.

Permissions never redefine ownership.

---

# 6. Password Management


Passwords will not be stored manually inside customer tables.


Password management belongs to authentication provider.


Responsibilities:

- Password hashing
- Reset password
- Email verification
- Sessions


---

# 7. Future Customer Portal


When customer portal is introduced:


Customer:


ABC Trading



Can have:



Owner Account

Manager Account

Viewer Account



Each account receives controlled permissions.

Customer Portal users authenticate independently.

Their permissions are limited to their own Customer entity and related Portfolios.

Operational Users continue managing business operations on behalf of their Organization.

---

# 8. Design Principles


ARK follows:

- Separation of concerns
- Least privilege access
- Scalable user management
- Database security
- Auditability


---

# 9. Future Expansion


This architecture supports:

- Multi-Tenant Organizations
- Multiple Users per Organization
- Customer Portal
- Multiple Customer Accounts
- Role-Based Access Control
- Independent Business Ownership
- Dedicated Organization Deployments
- Hybrid Infrastructure