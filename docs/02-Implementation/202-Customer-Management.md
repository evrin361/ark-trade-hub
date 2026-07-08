# ARK Customer Management Module

## Overview

Customer Management is responsible for managing business customers inside ARK Trade Hub.

## Current Implementation

Version: v1

Features:

- Create Customer
- Update Customer
- Customer Status Management
- Customer Archive
- Customer Restore
- Status Badge
- Archive Badge

## Current Architecture

CustomersPage
    |
CustomersTable
    |
useCustomers Hook
    |
CustomerService
    |
Seed Data


## Future Architecture

CustomersPage
    |
CustomersTable
    |
useCustomers
    |
CustomerService
    |
CustomerRepository
    |
Database


## Customer Entity

Current:

- id
- firstName
- lastName
- mobile
- email
- code
- enabled
- archived
- createdAt
- updatedAt


## Future Account Separation

Customer information and user authentication are separate concepts.

Customer:

Business entity.

CustomerAccount:

Authentication entity.

Future:

Customer
    |
CustomerAccount


## Future Features

- Search
- List View
- Customer Portal
- User Account Management
- Permissions