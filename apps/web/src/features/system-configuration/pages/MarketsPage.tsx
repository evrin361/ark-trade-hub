"use client";
import { useState } from "react";

import { AppPage } from "@/components/ui/AppPage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { MarketService } from "../markets/services/market.service";
import { useMarkets } from "../markets/hooks/useMarkets";
import { Input } from "@/components/ui/Input";

export function MarketsPage() {
const { markets, addMarket } = useMarkets();

const [name, setName] = useState("");

const [code, setCode] = useState("");

const [showForm, setShowForm] = useState(false);

  return (
    <AppPage
      title="مدیریت بازارها"
      description="بازارهای قابل پشتیبانی سیستم"
actions={
  <Button onClick={() => setShowForm((v) => !v)}>
    {showForm ? "بستن" : "افزودن بازار"}
  </Button>
}    >

{showForm && (
  <Card>
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">
        بازار جدید
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <FormField
          label="نام بازار"
          required
        >
<Input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="مثلاً: بازار ارزهای دیجیتال"
/>
        </FormField>

        <FormField
          label="کد بازار"
          required
        >
<Input
    value={code}
    onChange={(e) => setCode(e.target.value)}
    placeholder="مثلاً: crypto"
/>
        </FormField>

      </div>

      <div className="flex justify-end">

<Button
    onClick={() => {

        if (!name.trim()) return;

        if (!code.trim()) return;

        addMarket({
            name,
            code,
        });

        setName("");

        setCode("");

        setShowForm(false);

    }}
>
    ذخیره بازار
</Button>

      </div>

    </div>
  </Card>
)}

      <div className="space-y-4">

        {markets.map((market) => (
          <Card key={market.id}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  {market.name}
                </h2>

                <p className="text-sm opacity-70">
                  {market.code}
                </p>

                <StatusBadge active={market.enabled} />
              </div>

              <Button variant="secondary">
                ویرایش
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AppPage>
  );
}