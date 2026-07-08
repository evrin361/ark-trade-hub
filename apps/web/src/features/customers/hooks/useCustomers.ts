"use client";

import { useState } from "react";

import { CustomerService } from "../services/customer.service";

export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  code: string;
}

export function useCustomers() {
  const [customers, setCustomers] = useState(() =>
    CustomerService.getAll()
  );


  function createCustomer(data: CreateCustomerDto) {
    setCustomers((current) =>
      CustomerService.create(current, data)
    );
  }


  function updateCustomer(
    id: string,
    data: CreateCustomerDto
  ) {
    setCustomers((current) =>
      CustomerService.update(
        current,
        id,
        data
      )
    );
  }


  function archiveCustomer(id: string) {
  setCustomers((current) =>
    CustomerService.archive(
      current,
      id
    )
  );
}


function restoreCustomer(id: string) {
  setCustomers((current) =>
    CustomerService.restore(
      current,
      id
    )
  );
}

  function toggleCustomerStatus(id: string) {

  const customer = customers.find(
    (item) => item.id === id
  );

  if (customer?.archived) {
    alert(
      "مشتری آرشیو شده است و امکان تغییر وضعیت ندارد. ابتدا مشتری را بازگردانی کنید."
    );

    return;
  }

  setCustomers((current) =>
    CustomerService.toggleStatus(
      current,
      id
    )
  );
}


  return {
    customers,

    createCustomer,

    updateCustomer,

archiveCustomer,

restoreCustomer,

    toggleCustomerStatus,
  };
}