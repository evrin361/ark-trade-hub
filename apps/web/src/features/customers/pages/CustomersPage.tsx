"use client";
import { useEffect, useState } from "react";
import { AppPage } from "@/components/ui/AppPage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CustomersTable } from "../components/CustomersTable";
import type { EntityId } from "@/contracts/persistence";
import type { Organization } from "@/features/organization";
import { createListOrganizationsUseCase } from "@/application/organization/list-organizations.use-case";

import {
  UserPlus,
  X,
  Save,
} from "lucide-react";

import { useCustomers } from "../hooks/useCustomers";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";

export function CustomersPage() {

  const {
  customers,
  createCustomer,
  updateCustomer,
  toggleCustomerStatus,
  archiveCustomer,
  restoreCustomer,
} = useCustomers();

const [organizations, setOrganizations] = useState<Organization[]>([]);
const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
const [organizationError, setOrganizationError] = useState("");

useEffect(() => {
  let active = true;

  async function loadOrganizations() {
    try {
      const result = await createListOrganizationsUseCase().execute();
      if (!active) return;

      if (result.success) {
        setOrganizations(result.data);
        setOrganizationError("");
      } else {
        setOrganizationError(result.error);
      }
    } catch {
      if (active) setOrganizationError("بارگیری سازمان‌ها انجام نشد.");
    }
  }

  void loadOrganizations();
  return () => { active = false; };
}, []);

const selectedOrganization = organizations.find(
  (organization) => organization.id.value === selectedOrganizationId
);

const visibleCustomers = customers.filter(
  (customer) => customer.organizationId.value === selectedOrganizationId
);

const [showForm, setShowForm] = useState(false);

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [mobile, setMobile] = useState("");
const [email, setEmail] = useState("");
const [code, setCode] = useState("");
const [editingId, setEditingId] = useState<EntityId | null>(null);
  const [customerError, setCustomerError] = useState("");

  return (
    <AppPage

      title="مدیریت مشتریان"

      description="مشتریان متصل به سیستم"

      actions={
<Button
  className="flex items-center gap-2"
  onClick={() => setShowForm((v) => !v)}
>
          {showForm ? (
  <X size={18} />
) : (
  <UserPlus size={18} />
)}

{showForm ? "بستن" : "افزودن مشتری"}

        </Button>
      }

    >


<div className="mb-6">

  <label className="mb-2 block text-sm font-medium text-right" htmlFor="customer-organization">
    سازمان فعال
  </label>
  <select
    id="customer-organization"
    dir="rtl"
     style={{ colorScheme: "dark" }}
    className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-right text-[var(--text-primary)]"
    value={selectedOrganizationId}
    onChange={(event) => {
      setSelectedOrganizationId(event.target.value);
      setEditingId(null);
      setShowForm(false);
      setFirstName("");
      setLastName("");
      setMobile("");
      setEmail("");
      setCode("");
    }}
  >
    <option value=""  className="bg-[var(--surface)] text-[var(--text-primary)]">
      یک سازمان را انتخاب کنید
    </option>
    {organizations.filter((organization) => organization.enabled && !organization.archived).map((organization) => (
      <option
        key={organization.id.value}
        value={organization.id.value}
        className="bg-[var(--surface)] text-[var(--text-primary)]">
        {organization.name} ({organization.code})
      </option>
    ))}
  </select>
  {organizationError && <p role="alert" className="mt-2 text-sm text-red-600">{organizationError}</p>}
  {!organizationError && organizations.length === 0 && (
    <p className="mt-2 text-sm opacity-70">
      پیش از افزودن مشتری، ابتدا یک سازمان ایجاد کنید.
    </p>
  )}
</div>

{showForm && (
  <Card className="mb-6">
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-white">
  {editingId ? "ویرایش مشتری" : "مشتری جدید"}
</h2>

      <div className="grid gap-4 md:grid-cols-2">

        <FormField
          label="نام"
          required
        >
          <Input
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            placeholder="مثلاً ابراهیم"
          />
        </FormField>


        <FormField
          label="نام خانوادگی"
          required
        >
          <Input
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            placeholder="مثلاً غفاری"
          />
        </FormField>


        <FormField
          label="موبایل"
          required
        >
          <Input
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
            placeholder="09xxxxxxxxx"
          />
        </FormField>


        <FormField
          label="ایمیل"
          required
        >
          <Input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="example@email.com"
          />
        </FormField>


        <FormField
          label="کد مشتری"
          required
        >
          <Input
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            placeholder="مثلاً ebrahim"
          />
        </FormField>

      </div>


       {customerError && <p role="alert" className="mb-3 text-sm text-red-600">{customerError}</p>}
      <div className="flex justify-end pt-2">

       <Button
  className="flex items-center gap-2"
  onClick={async () => {
    setCustomerError("");

    if (!firstName.trim() || !lastName.trim() || !mobile.trim() || !email.trim() || !code.trim()) {
      setCustomerError("لطفاً همهٔ فیلدهای ضروری مشتری را تکمیل کنید.");
      return;
    }

    if (editingId) {
      const result = await updateCustomer(editingId, {
        firstName,
        lastName,
        mobile,
        email,
        code,
      });

      if (!result.success) {
        setCustomerError(result.error);
        return;
      }
    } else {
      if (!selectedOrganization) {
        setCustomerError("پیش از ایجاد مشتری، یک سازمان انتخاب کنید.");
        return;
      }

      const result = await createCustomer({
        organizationId: selectedOrganization.id,
        firstName,
        lastName,
        mobile,
        email,
        code,
      });

      if (!result.success) {
        setCustomerError(result.error);
        return;
      }
    }

    setFirstName("");
    setLastName("");
    setMobile("");
    setEmail("");
    setCode("");
    setEditingId(null);
    setShowForm(false);
  }}
>
  <Save size={16} />
  ذخیره مشتری
</Button>

      </div>

    </div>
  </Card>
)}

<CustomersTable
  customers={visibleCustomers}

  onEdit={(customer) => {

    setEditingId(customer.id);

    setFirstName(customer.firstName);
    setLastName(customer.lastName);
    setMobile(customer.mobile);
    setEmail(customer.email);
    setCode(customer.code);

    setShowForm(true);

  }}

  onToggleStatus={(id) => {

    const customer = visibleCustomers.find(
      (item) => item.id.value === id.value
    );

    if (!customer) return;


    if (customer.archived) {

      alert(
        "مشتری آرشیو شده است و امکان تغییر وضعیت ندارد. ابتدا بازگردانی کنید."
      );

      return;

    }


    const actionText = customer.enabled
      ? "غیرفعال"
      : "فعال";


    const confirmed = window.confirm(
      `آیا مطمئن هستید؟\n\nمشتری ${actionText} خواهد شد و اطلاعات حفظ خواهد شد.`
    );


    if (!confirmed) return;


    toggleCustomerStatus(id);

  }}


  onArchive={(id) => {

    const confirmed = window.confirm(
      "آیا مطمئن هستید؟\n\nمشتری آرشیو و غیرفعال خواهد شد.\nاطلاعات مشتری حفظ خواهد شد."
    );


    if (!confirmed) return;


    archiveCustomer(id);

  }}


  onRestore={(id) => {

    const confirmed = window.confirm(
      "آیا مطمئن هستید؟\n\nمشتری از حالت آرشیو خارج خواهد شد."
    );


    if (!confirmed) return;


    restoreCustomer(id);

  }}
/>


    </AppPage>


  );
}