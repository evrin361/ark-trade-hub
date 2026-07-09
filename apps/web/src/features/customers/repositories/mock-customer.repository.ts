import type { CustomerRepository } from "./customer.repository";
import type { Customer } from "../types/customer";
import { customerSeed } from "../seed/customers";

export class MockCustomerRepository implements CustomerRepository {
  private customers: Customer[];

  constructor() {
    this.customers = [...customerSeed];
  }

  async getAll(): Promise<Customer[]> {
    return [...this.customers];
  }

  async getById(
    id: string
  ): Promise<Customer | undefined> {
    return this.customers.find(
      (customer) => customer.id === id
    );
  }

  async create(
    customer: Customer
  ): Promise<Customer> {
    this.customers.push(customer);

    return customer;
  }

  async update(
    customer: Customer
  ): Promise<Customer> {
    this.customers = this.customers.map(
      (item) =>
        item.id === customer.id
          ? customer
          : item
    );

    return customer;
  }

  async delete(
    id: string
  ): Promise<void> {
    this.customers =
      this.customers.filter(
        (customer) =>
          customer.id !== id
      );
  }
}