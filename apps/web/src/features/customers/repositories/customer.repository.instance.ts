import { MockCustomerRepository } from "./mock-customer.repository";
import type { CustomerRepository } from "./customer.repository";

export const customerRepository: CustomerRepository =
  new MockCustomerRepository();