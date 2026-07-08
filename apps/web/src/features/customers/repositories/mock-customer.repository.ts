import type { CustomerRepository } from "./customer.repository";
import type { Customer } from "../types/customer";
import { customerSeed } from "../seed/customers";

export class MockCustomerRepository implements CustomerRepository {

  async getAll(): Promise<Customer[]> {
    return [...customerSeed];
  }

  async getById(
    id: string
  ): Promise<Customer | undefined> {
    return customerSeed.find(
      (customer) => customer.id === id
    );
  }

  async create(
    customer: Customer
  ): Promise<Customer> {
    return customer;
  }

  async update(
    customer: Customer
  ): Promise<Customer> {
    return customer;
  }

  async delete(
    id: string
  ): Promise<void> {
    return;
  }
}
