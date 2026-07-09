import { customerRepository } from "../repositories/customer.repository.instance";
import type { Customer } from "../types/customer";

export const CustomerService = {

  async getAll(): Promise<Customer[]> {
    return customerRepository.getAll();
  },


  async getEnabled(): Promise<Customer[]> {
    const customers =
      await this.getAll();

    return customers.filter(
      (customer) => customer.enabled
    );
  },


  async getById(
    id: string
  ): Promise<Customer | undefined> {

    return customerRepository.getById(id);
  },


  async create(
    data: {
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      code: string;
    }
  ): Promise<Customer> {

    const now = new Date();

    const newCustomer: Customer = {
      id: crypto.randomUUID(),

      firstName: data.firstName,

      lastName: data.lastName,

      mobile: data.mobile,

      email: data.email,

      code: data.code,

      enabled: true,

      archived: false,

      createdAt: now,

      updatedAt: now,
    };


    return customerRepository.create(
      newCustomer
    );
  },


  async update(
    id: string,
    data: {
      firstName: string;
      lastName: string;
      mobile: string;
      email: string;
      code: string;
    }
  ): Promise<Customer | undefined> {

    const customer =
      await customerRepository.getById(id);


    if (!customer) {
      return undefined;
    }


    const updatedCustomer: Customer = {
      ...customer,

      firstName: data.firstName,

      lastName: data.lastName,

      mobile: data.mobile,

      email: data.email,

      code: data.code,

      updatedAt: new Date(),
    };


    return customerRepository.update(
      updatedCustomer
    );
  },


  async delete(
    id: string
  ): Promise<void> {

    return customerRepository.delete(id);
  },


  async archive(
    id: string
  ): Promise<Customer | undefined> {

    const customer =
      await customerRepository.getById(id);


    if (!customer) {
      return undefined;
    }


    const updatedCustomer: Customer = {
      ...customer,

      archived: true,

      enabled: false,

      updatedAt: new Date(),
    };


    return customerRepository.update(
      updatedCustomer
    );
  },


  async restore(
    id: string
  ): Promise<Customer | undefined> {

    const customer =
      await customerRepository.getById(id);


    if (!customer) {
      return undefined;
    }


    const updatedCustomer: Customer = {
      ...customer,

      archived: false,

      updatedAt: new Date(),
    };


    return customerRepository.update(
      updatedCustomer
    );
  },


  async toggleStatus(
    id: string
  ): Promise<Customer | undefined> {

    const customer =
      await customerRepository.getById(id);


    if (!customer) {
      return undefined;
    }


    const updatedCustomer: Customer = {
      ...customer,

      enabled: !customer.enabled,

      updatedAt: new Date(),
    };


    return customerRepository.update(
      updatedCustomer
    );
  },
};