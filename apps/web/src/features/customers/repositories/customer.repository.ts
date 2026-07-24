import type { Customer } from "../types/customer";

import type { EntityId } from "@/contracts/persistence";

export interface CustomerRepository {
  getAll(): Promise<Customer[]>;

  getById(
    id: EntityId
  ): Promise<Customer | undefined>;

  create(
    customer: Customer
  ): Promise<Customer>;

  update(
    customer: Customer
  ): Promise<Customer>;

  delete(
    id: EntityId
  ): Promise<void>;
}