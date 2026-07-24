import type { Customer } from "../types/customer";
import type { CustomerRepository } from "./customer.repository";

import type {
  CustomerRepository as InfrastructureCustomerRepository,
} from "@/infrastructure/persistence/repositories/customer";

export class CustomerRepositoryImpl
  implements CustomerRepository {

  constructor(
    private readonly repository:
      InfrastructureCustomerRepository
  ) {}

async getAll(): Promise<Customer[]> {
  const result =
    await this.repository.getAll();

  if (!result.success) {
    throw new Error(
      result.error.message
    );
  }

  return result.data;
}
async getById(
  id: Customer["id"]
): Promise<Customer | undefined> {
  const result =
    await this.repository.getById(id);

  if (!result.success) {
    throw new Error(
      result.error.message
    );
  }

  return result.data;
}
async create(
  customer: Customer
): Promise<Customer> {
  const result =
    await this.repository.create(
      customer
    );

  if (!result.success) {
    throw new Error(
      result.error.message
    );
  }

  return result.data;
}
async update(
  customer: Customer
): Promise<Customer> {
  const result =
    await this.repository.update(
      customer
    );

  if (!result.success) {
    throw new Error(
      result.error.message
    );
  }

  return result.data;
}
async delete(
  id: Customer["id"]
): Promise<void> {
  const result =
    await this.repository.delete(id);

  if (!result.success) {
    throw new Error(
      result.error.message
    );
  }
}
}