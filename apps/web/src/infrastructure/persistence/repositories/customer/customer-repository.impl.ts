import type { Customer } from "@/features/customers/types/customer";

import type { CustomerRepository } from "./customer-repository";

import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

export class CustomerRepositoryImpl
  implements CustomerRepository {

  private customers: Customer[] = [];

  async getAll(): Promise<
    CollectionResult<Customer, PersistenceError>
  > {
    return {
      success: true,
      data: [...this.customers],
    };
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<Customer | undefined, PersistenceError>
  > {
    return {
      success: true,
      data: this.customers.find(
        customer => customer.id.value === id.value
      ),
    };
  }

  async create(
    customer: Customer
  ): Promise<
    Result<Customer, PersistenceError>
  > {
    this.customers.push(customer);

    return {
      success: true,
      data: customer,
    };
  }

  async update(
    customer: Customer
  ): Promise<
    Result<Customer, PersistenceError>
  > {
    const index =
      this.customers.findIndex(
        current =>
          current.id.value === customer.id.value
      );

    if (index >= 0) {
      this.customers[index] = customer;
    }

    return {
      success: true,
      data: customer,
    };
  }

  async delete(
    id: EntityId
  ): Promise<
    Result<void, PersistenceError>
  > {
    this.customers =
      this.customers.filter(
        customer =>
          customer.id.value !== id.value
      );

    return {
      success: true,
      data: undefined,
    };
  }
}
