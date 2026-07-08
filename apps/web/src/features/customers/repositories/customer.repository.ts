import type { Customer } from "../types/customer";

export interface CustomerRepository {
  getAll(): Promise<Customer[]>;

  getById(
    id: string
  ): Promise<Customer | undefined>;

  create(
    customer: Customer
  ): Promise<Customer>;

  update(
    customer: Customer
  ): Promise<Customer>;

  delete(
    id: string
  ): Promise<void>;
}