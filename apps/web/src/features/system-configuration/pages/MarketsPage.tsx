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
import {
  Plus,
  Pencil,
  Save,
  X,
} from "lucide-react";

export function MarketsPage() {
const { markets, createMarket } = useMarkets();

const [name, setName] = useState("");

const [code, setCode] = useState("");

const [showForm, setShowForm] = useState(false);

const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <AppPage
      title="مدیریت بازارها"
      description="بازارهای قابل پشتیبانی سیستم"
actions={
<Button
  className="flex items-center gap-2"
  onClick={() => setShowForm((v) => !v)}
>
  {showForm ? <X size={18} /> : <Plus size={18} />}

  {showForm ? "بستن" : "افزودن بازار"}
</Button>
}    >

{showForm && (
<Card className="text-right">
        <div className="space-y-6">

      <h2 className="text-xl font-bold text-white">
{editingId ? "ویرایش بازار" : "بازار جدید"}      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <FormField
          label="نام بازار"
          required
        >
<Input
    className="text-left ltr"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="مثلاً: Cryptocurrency"
/>
        </FormField>

        <FormField
          label="کد بازار"
          required
        >
<Input
    className="text-left ltr"
    value={code}
    onChange={(e) => setCode(e.target.value)}
    placeholder="مثلاً: crypto"
/>
        </FormField>

      </div>

      <div className="flex justify-end pt-2">





        

<Button
  className="min-w-[150px] flex items-center gap-2"
  onClick={() => {

        if (!name.trim()) return;

        if (!code.trim()) return;

if (editingId) {
  // فعلاً خالی
} else {
  createMarket({
    name,
    code,
  });
}

setName("");

setCode("");

setEditingId(null);

setShowForm(false);
   }}
>
  <Save size={16} />
  {editingId ? "ذخیره تغییرات" : "ذخیره بازار"}
</Button>
      </div>

    </div>
  </Card>
)}

      <div className="space-y-6">

        {markets.map((market) => (
<Card
  key={market.id}
  className="
    px-8
    py-8
    flex
    flex-col
    min-h-[300px]
  "
>
   
      <div className="space-y-6">
             <div className="space-y-5">

  <div>
    <div className="mb-1 text-xs uppercase tracking-[0.25em] text-cyan-300/70">
      بازار
    </div>

    <h2 className="text-2xl font-bold text-white">
      {market.name}
    </h2>
  </div>

  <div>

    <div className="mb-1 text-xs uppercase tracking-[0.25em] text-slate-500">
      کد
    </div>

    <div
      className="
        inline-flex
        rounded-lg
        bg-black/20
        px-3
        py-1.5

        font-mono
        text-sm
        tracking-wider
        text-cyan-300

        ltr
      "
    >
      {market.code}
    </div>

  </div>

  <div>

    <div className="mb-1 text-xs uppercase tracking-[0.25em] text-slate-500">
      Status
    </div>

    <StatusBadge active={market.enabled} />
  </div>




</div>

<div
  className="
    mt-auto
    pt-6
    border-t
    border-white/5
    flex
    justify-end
  "
>
<Button
  variant="secondary"
  className="shrink-0 px-5 flex items-center gap-2"
  onClick={() => {
    setEditingId(market.id);
    setName(market.name);
    setCode(market.code);
    setShowForm(true);
  }}
>
  <Pencil size={16} />
  ویرایش
</Button></div>

            </div>
          </Card>
        ))}
      </div>
    </AppPage>
  );
}