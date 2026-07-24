import { CustomerRepositoryImpl } from "./customer.repository.impl";

import { MockCustomerRepository } from "@/infrastructure/persistence/repositories/customer/mock-customer-repository";

import type { CustomerRepository } from "./customer.repository";

export const customerRepository: CustomerRepository =
  new CustomerRepositoryImpl(
    new MockCustomerRepository()
  );