import { customerSeed } from "../seed/customers";
import type { Customer } from "../types/customer";

export const CustomerService = {
  getAll(): Customer[] {
    return [...customerSeed];
  },

  getEnabled(): Customer[] {
    return this.getAll().filter(
      (customer) => customer.enabled
    );
  },

  getById(id: string): Customer | undefined {
    return this.getAll().find(
      (customer) => customer.id === id
    );
  },


  create(
    customers: Customer[],
    data: {
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      code: string;
    }
  ): Customer[] {

    const now = new Date();

    const newCustomer: Customer = {
  id: crypto.randomUUID(),

  firstName: data.firstName,

  lastName: data.lastName,

  mobile: data.mobile,

  email: data.email,

  code: data.code,

  enabled: true,

  archived: false,

  createdAt: now,

  updatedAt: now,
};

    return [
      ...customers,
      newCustomer,
    ];
  },


  update(
    customers: Customer[],
    id: string,
    data: {
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      code: string;
    }
  ): Customer[] {
    return customers.map((customer) =>
      customer.id === id
        ? {
            ...customer,

            firstName: data.firstName,

            lastName: data.lastName,

            mobile: data.mobile,

            email: data.email,

            code: data.code,

            updatedAt: new Date(),
          }
        : customer
    );
  },


  delete(
    customers: Customer[],
    id: string
  ): Customer[] {
    return customers.filter(
      (customer) => customer.id !== id
    );
  },

archive(
  customers: Customer[],
  id: string
): Customer[] {
  return customers.map((customer) =>
    customer.id === id
      ? {
          ...customer,
          archived: true,
          enabled: false,
          updatedAt: new Date(),
        }
      : customer
  );
},



restore(
  customers: Customer[],
  id: string
): Customer[] {
  return customers.map((customer) =>
    customer.id === id
      ? {
          ...customer,
          archived: false,
          updatedAt: new Date(),
        }
      : customer
  );
},

  toggleStatus(
    customers: Customer[],
    id: string
  ): Customer[] {
    return customers.map((customer) =>
      customer.id === id
        ? {
            ...customer,

            enabled: !customer.enabled,

            updatedAt: new Date(),
          }
        : customer
    );
  },
};