"use client";

import { useEffect, useState } from "react";

import { customerService } from "../services/customer.service.instance";
import type { Customer } from "../types/customer";
import type { EntityId } from "@/contracts/persistence";

export interface CreateCustomerDto {
  organizationId: string;

  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  code: string;
}

export interface UpdateCustomerDto {
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

      const result =
  await customerService.refresh();

if (result.success) {
  setCustomers(result.data);
}

setLoading(false);
    }


    loadCustomers();

  }, []);



  async function createCustomer(
    data: CreateCustomerDto
  ) {
const DEFAULT_ORGANIZATION_ID = "default-organization";

const result =
  await customerService.create(data);

if (!result.success) {
  return;
}

setCustomers((current) => [
  ...current,
  result.data,
]);  }



  async function updateCustomer(
  id: EntityId,
  data: UpdateCustomerDto
) {

const result =
  await customerService.update(
    id,
    data
  );


if (!result.success) {
  return;
}


setCustomers((current) =>
  current.map((customer) =>
    customer.id === id
      ? result.data
      : customer
  )
);
  }



  async function archiveCustomer(
    id: EntityId
  ) {

const result =
  await customerService.archive(id);


if (!result.success) {
  return;
}


setCustomers((current) =>
  current.map((customer) =>
    customer.id === id
      ? result.data
      : customer
  )
);
  }



  async function restoreCustomer(
  id: EntityId
) {

  const result =
    await customerService.restore(id);


  if (!result.success) {
    return;
  }


  setCustomers((current) =>
    current.map((customer) =>
      customer.id === id
        ? result.data
        : customer
    )
  );
}



  async function toggleCustomerStatus(
    id: EntityId
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


    const result =
  await customerService.toggleStatus(id);


if (!result.success) {
  return;
}


setCustomers((current) =>
  current.map((customer) =>
    customer.id === id
      ? result.data
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