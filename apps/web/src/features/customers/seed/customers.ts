import type { Customer } from "../types/customer";

export const customerSeed: Customer[] = [
  {
    id: "customer-ebrahim",

    organizationId: "organization-default",
    
    firstName: "ابراهیم",

    lastName: "غفاری",

    mobile: "09120000000",

    email: "ebrahim@example.com",

    code: "ebrahim",

    enabled: true,
    
archived: false,

    createdAt: new Date(),

    updatedAt: new Date(),
  },
];