# ARK Supabase Integration Plan


## 1. Overview


This document defines the migration plan from frontend mock data to a real backend architecture using Supabase.


Current stage:

Frontend-first architecture


Future stage:

Production database architecture


---

# 2. Why Supabase


Supabase provides:


- PostgreSQL Database
- Authentication
- Row Level Security
- Storage
- API Layer


Benefits:

- Fast development
- Free tier availability
- PostgreSQL standard
- Easy migration path


---

# 3. Current Architecture


Current:
React Components

    |

Custom Hooks

    |

Services

    |

Seed Data



Example:



customers.ts
customer.service.ts
useCustomers.ts



---

# 4. Future Architecture


Target:



React Components

    |

Custom Hooks

    |

Repositories / Services

    |

Supabase Client

    |

PostgreSQL Database



---

# 5. Database Migration Strategy


The migration will happen gradually.


Phase 1:

Create database schema


Phase 2:

Create Supabase client


Phase 3:

Replace seed services


Phase 4:

Add authentication


Phase 5:

Enable permissions


---

# 6. Initial Tables


First database entities:



customers

users

customer_accounts

roles

audit_logs



---

# 7. Customer Migration


Current:



features/customers/seed/customers.ts



Future:



customers table



The UI should remain unchanged.


Only data source changes.


---

# 8. Security


Supabase Row Level Security will control:


- Customer visibility
- User permissions
- Data ownership


---

# 9. Deployment Strategy


Current:


Local Development



Future:



Vercel

|

Supabase



---

# 10. Migration Principles


ARK follows:


- No big rewrite
- Incremental migration
- Stable UI contracts
- Database-first thinking
- Clean architecture


---

# 11. Future Improvements


Possible additions:


- File storage
- Notifications
- Background jobs
- API access
- Analytics
