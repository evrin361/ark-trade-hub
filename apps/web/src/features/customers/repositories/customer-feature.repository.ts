import type { Customer } from "../types/customer";

import type {
  CustomerRepository,
} from "./customer.repository";

import type {
  EntityId,
} from "@/contracts/persistence";

import {
  CustomerRepository as InfrastructureCustomerRepository,
} from "@/infrastructure/persistence/repositories/customer";

export class CustomerFeatureRepository
  implements CustomerRepository {

    constructor(
  private readonly repository:
    InfrastructureCustomerRepository
) {}


async getAll(): Promise<Customer[]> {
  const result =
    await this.repository.getAll();

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
}
  async getById(
    id: EntityId
  ): Promise<Customer | undefined> {
    throw new Error("Not implemented");
  }

  async create(
    customer: Customer
  ): Promise<Customer> {
    throw new Error("Not implemented");
  }

  async update(
    customer: Customer
  ): Promise<Customer> {
    throw new Error("Not implemented");
  }

  async delete(
    id: EntityId
  ): Promise<void> {
    throw new Error("Not implemented");
  }

  
}