import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge/StatusBadge";
import { ArchiveBadge } from "@/components/ui/ArchiveBadge/ArchiveBadge";

import {
  Pencil,
  Power,
  Archive,
  RotateCcw,
} from "lucide-react";

import type { Customer } from "../types/customer";


interface CustomersTableProps {
  customers: Customer[];

  onEdit: (customer: Customer) => void;

  onToggleStatus: (id: string) => void;

  onArchive: (id: string) => void;

  onRestore: (id: string) => void;
}


export function CustomersTable({
  customers,
  onEdit,
  onToggleStatus,
  onArchive,
  onRestore,
}: CustomersTableProps) {

  return (
    <div className="space-y-6">

      {customers.map((customer) => (

        <Card
          key={customer.id}
          className="
            px-8
            py-8
          "
        >

          <div className="space-y-5">


            <div>

              <div
                className="
                  mb-1
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-cyan-300/70
                "
              >
                مشتری
              </div>


              <h2
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {customer.firstName} {customer.lastName}
              </h2>

            </div>


            <div className="space-y-2 text-sm opacity-80">

              <p>
                موبایل:
                <span className="mr-2">
                  {customer.mobile}
                </span>
              </p>


              <p>
                ایمیل:
                <span className="mr-2">
                  {customer.email}
                </span>
              </p>

            </div>


            <div className="flex gap-2">

              <StatusBadge
                active={customer.enabled}
              />

              <ArchiveBadge
                archived={customer.archived}
              />

            </div>


          </div>



          <div
            className="
              mt-8
              pt-5
              border-t
              border-white/5
              flex
              justify-end
              gap-3
            "
          >


            <Button
              variant="secondary"
              onClick={() =>
                onEdit(customer)
              }
            >
              <Pencil size={16} />
              ویرایش
            </Button>



            <Button
              variant="secondary"
              onClick={() =>
                onToggleStatus(customer.id)
              }
            >
              <Power size={16} />
              تغییر وضعیت
            </Button>



            {customer.archived ? (

              <Button
                variant="secondary"
                onClick={() =>
                  onRestore(customer.id)
                }
              >
                <RotateCcw size={16} />
                بازگردانی
              </Button>

            ) : (

              <Button
                variant="secondary"
                onClick={() =>
                  onArchive(customer.id)
                }
              >
                <Archive size={16} />
                آرشیو
              </Button>

            )}


          </div>


        </Card>

      ))}

    </div>
  );
}