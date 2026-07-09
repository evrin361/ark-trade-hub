import { createCustomerService } from "./customer.service";
import { customerRepository } from "../repositories/customer.repository.instance";

export const customerService =
  createCustomerService(customerRepository);