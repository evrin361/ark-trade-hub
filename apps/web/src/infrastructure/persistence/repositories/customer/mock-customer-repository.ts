import type { Customer } from "@/features/customers/types/customer";

import type {
  CustomerRepository,
} from "./customer-repository";

import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

export class MockCustomerRepository
  implements CustomerRepository {

  async getAll(): Promise<
    CollectionResult<Customer, PersistenceError>
  > {
    throw new Error("Not implemented.");
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<Customer | undefined, PersistenceError>
  > {
    throw new Error("Not implemented.");
  }

  async create(
    customer: Customer
  ): Promise<
    Result<Customer, PersistenceError>
  > {
    throw new Error("Not implemented.");
  }

  async update(
    customer: Customer
  ): Promise<
    Result<Customer, PersistenceError>
  > {
    throw new Error("Not implemented.");
  }

  async delete(
    id: EntityId
  ): Promise<
    Result<void, PersistenceError>
  > {
    throw new Error("Not implemented.");
  }
}