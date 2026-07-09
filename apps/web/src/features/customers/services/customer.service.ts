import type { Customer } from "../types/customer";
import type { CustomerRepository } from "../repositories/customer.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createCustomerService(
  repository: CustomerRepository
) {
  return {

  async getAll(): Promise<ServiceResult<Customer[]>> {
  try {
    const customers = await repository.getAll();

    return {
      success: true,
      data: customers,
    };
  } catch {
    return {
      success: false,
      error: "Failed to load customers",
    };
  }
},


  async getEnabled(): Promise<ServiceResult<Customer[]>> {
    const result =
  await this.getAll();

if (!result.success) {
  return result;
}

return {
  success: true,
  data: result.data.filter(
    (customer) => customer.enabled
  ),
};
  },


  async getById(
  id: string
): Promise<ServiceResult<Customer>> {

  try {
    const customer =
      await repository.getById(id);

    if (!customer) {
      return {
        success: false,
        error: "Customer not found",
      };
    }

    return {
      success: true,
      data: customer,
    };

  } catch {
    return {
      success: false,
      error: "Failed to get customer",
    };
  }
},

  async create(
    data: {
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      code: string;
    }
  ): Promise<ServiceResult<Customer>> {

      try {

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


const customer =
      await repository.create(
        newCustomer
      );
return {
      success: true,
      data: customer,
    };

      } catch {


            return {
      success: false,
      error: "Failed to create customer",
    };

  }
},

  async update(
    id: string,
    data: {
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      code: string;
    }
  ): Promise<ServiceResult<Customer>> {

    const existingCustomer =
  await repository.getById(id);


if (!existingCustomer) {
  return {
    success: false,
    error: "Customer not found",
  };
}


    const updatedCustomer: Customer = {
  ...existingCustomer,

      firstName: data.firstName,

      lastName: data.lastName,

      mobile: data.mobile,

      email: data.email,

      code: data.code,

      updatedAt: new Date(),
    };


    const updated =
  await repository.update(
    updatedCustomer
  );

return {
  success: true,
  data: updated,
};
  },


  async delete(
    id: string
  ): Promise<void> {

    return repository.delete(id);
  },


  async archive(
    id: string
  ): Promise<ServiceResult<Customer>> {

    const customer =
      await repository.getById(id);


    if (!customer) {
  return {
    success: false,
    error: "Customer not found",
  };
}


    const updatedCustomer: Customer = {
      ...customer,

      archived: true,

      enabled: false,

      updatedAt: new Date(),
    };


    const updated =
  await repository.update(
    updatedCustomer
  );

return {
  success: true,
  data: updated,
};
  },


  async restore(
    id: string
  ): Promise<ServiceResult<Customer>> {

    const customer =
      await repository.getById(id);


    if (!customer) {
return {
  success: false,
  error: "Customer not found",
};    }


    const updatedCustomer: Customer = {
      ...customer,

      archived: false,

      updatedAt: new Date(),
    };


    const updated =
  await repository.update(
    updatedCustomer
  );

return {
  success: true,
  data: updated,
};
  },


  async toggleStatus(
    id: string
  ): Promise<ServiceResult<Customer>> {

    const customer =
      await repository.getById(id);


    if (!customer) {
  return {
    success: false,
    error: "Customer not found",
  };
}


    const updatedCustomer: Customer = {
      ...customer,

      enabled: !customer.enabled,

      updatedAt: new Date(),
    };


   const updated =
  await repository.update(
    updatedCustomer
  );

return {
  success: true,
  data: updated,
};
  },


async refresh(): Promise<ServiceResult<Customer[]>> {
  try {
    const customers = await repository.getAll();

    return {
      success: true,
      data: customers,
    };
  } catch {
    return {
      success: false,
      error: "Failed to refresh customers",
    };
  }
},

  };
}