import type { Customer } from "../types/customer";
import { customerSeed } from "../seed/customers";
import type {
  CustomerRepository,
} from "./customer.repository";

import type {
  EntityId,
} from "@/contracts/persistence";

export class MockCustomerRepository
  implements CustomerRepository {

  private customers: Customer[];

  constructor() {
    this.customers = [...customerSeed];
  }
  async getAll(): Promise<Customer[]> {
    return [...this.customers];
  }

  async getById(
    id: EntityId
  ): Promise<Customer | undefined> {
    return this.customers.find(
      (customer) => customer.id.value === id.value
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
        item.id.value === customer.id.value
          ? customer
          : item
    );

    return customer;
  }

  async delete(
    id: EntityId
  ): Promise<void> {
    this.customers =
      this.customers.filter(
        (customer) =>
          customer.id.value !== id.value
      );
  }
}