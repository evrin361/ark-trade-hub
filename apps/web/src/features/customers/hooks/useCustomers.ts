"use client";

import { useEffect, useState } from "react";

import { customerService } from "../services/customer.service.instance";
import type { Customer } from "../types/customer";


export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  code: string;
}


export function useCustomers() {

  const [customers, setCustomers] =
    useState<Customer[]>([]);


  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function loadCustomers() {

      const data =
        await customerService.getAll();

      setCustomers(data);

      setLoading(false);
    }


    loadCustomers();

  }, []);



  async function createCustomer(
    data: CreateCustomerDto
  ) {

    const customer =
      await customerService.create(data);


    setCustomers((current) => [
      ...current,
      customer,
    ]);
  }



  async function updateCustomer(
    id: string,
    data: CreateCustomerDto
  ) {

    const updated =
      await customerService.update(
        id,
        data
      );


    if (!updated) return;


    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? updated
          : customer
      )
    );
  }



  async function archiveCustomer(
    id: string
  ) {

    const updated =
      await customerService.archive(id);


    if (!updated) return;


    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? updated
          : customer
      )
    );
  }



  async function restoreCustomer(
    id: string
  ) {

    const updated =
      await customerService.restore(id);


    if (!updated) return;


    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? updated
          : customer
      )
    );
  }



  async function toggleCustomerStatus(
    id: string
  ) {

    const customer =
      customers.find(
        (item) => item.id === id
      );


    if (customer?.archived) {

      alert(
        "مشتری آرشیو شده است و امکان تغییر وضعیت ندارد. ابتدا مشتری را بازگردانی کنید."
      );

      return;
    }


    const updated =
      await customerService.toggleStatus(id);


    if (!updated) return;


    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? updated
          : customer
      )
    );
  }



  return {
    customers,
    loading,

    createCustomer,
    updateCustomer,
    archiveCustomer,
    restoreCustomer,
    toggleCustomerStatus,
  };
}