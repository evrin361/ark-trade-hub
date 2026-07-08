# ARK Authentication and Authorization Architecture

## 1. Overview

This document defines the authentication and authorization architecture of ARK Trade Hub.

The purpose is to separate:

- System Users
- Business Customers
- Customer Portal Accounts
- Roles and Permissions

ARK follows the principle:

> Identity, Business Entity, and Access Permission are separate concepts.


---

# 2. Core Concepts


## 2.1 Users

Users represent people who can authenticate into the system.

Examples:

- ARK administrators
- Employees
- Customer representatives


Users are responsible for:

- Login
- Authentication
- Personal identity


---

## 2.2 Customers

Customers represent business entities.

Examples:

- Trading companies
- Suppliers
- Buyers
- Organizations


A customer is not a user.


Example:

Customer:
ABC Trading Company



Users:


Ali - CEO
Sara - Purchase Manager
Reza - Accountant



One customer can have multiple users.


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


## Customers Table

Responsible for business information.


Example:


customers

id
name
mobile
email
status
archived
created_at
updated_at



---

## Users Table

Responsible for identities.


Example:


users

id
email
name
created_at



---

## Customer Accounts Table


Connects users with customers.


Example:



customer_accounts

id
customer_id
user_id
role
created_at



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

- Multi-user customers
- Multiple organizations
- Permission management
- Customer self-service portal
- API access