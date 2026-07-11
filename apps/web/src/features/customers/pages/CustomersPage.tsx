"use client";
import { useState } from "react";
import { AppPage } from "@/components/ui/AppPage";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { CustomersTable } from "../components/CustomersTable";

import {
  Pencil,
  Archive,
  Power,
  UserPlus,
  Plus,
  X,
  Save,
} from "lucide-react";

import { useCustomers } from "../hooks/useCustomers";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { ArchiveBadge } from "@/components/ui/ArchiveBadge/ArchiveBadge";

export function CustomersPage() {

  const {
  customers,
  createCustomer,
  updateCustomer,
  toggleCustomerStatus,
  archiveCustomer,
  restoreCustomer,
} = useCustomers();

const [showForm, setShowForm] = useState(false);

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [mobile, setMobile] = useState("");
const [email, setEmail] = useState("");
const [code, setCode] = useState("");
const [editingId, setEditingId] = useState<string | null>(null);
const DEFAULT_ORGANIZATION_ID =
  "default-organization";

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


      <div className="flex justify-end pt-2">

       <Button
  className="flex items-center gap-2"
  onClick={() => {

    if (!firstName.trim()) return;
    if (!lastName.trim()) return;
    if (!mobile.trim()) return;
    if (!email.trim()) return;
    if (!code.trim()) return;


    if (editingId) {
  updateCustomer(
    editingId,
    {
      firstName,
      lastName,
      mobile,
      email,
      code,
    }
  );
} else {
  createCustomer({
  organizationId: DEFAULT_ORGANIZATION_ID,
  firstName,
  lastName,
  mobile,
  email,
  code,
});
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
  customers={customers}

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

    const customer = customers.find(
      (item) => item.id === id
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