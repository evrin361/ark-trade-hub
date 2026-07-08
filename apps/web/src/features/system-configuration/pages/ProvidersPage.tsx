"use client";
import { AppPage } from "@/components/ui/AppPage";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

import { ProviderService } from "../providers/services/provider.service";
import { useProviders } from "../providers/hooks/useProviders";

export function ProvidersPage() {
    const { providers } = useProviders();

  return (
    <AppPage
      title="مدیریت پراوایدرها"
description="صرافی‌ها و سرویس‌های متصل به سیستم"
actions={

<Button disabled>
  افزودن پراوایدر
</Button>
}
    >
      <div className="space-y-4">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">
                  {provider.name}
                </h2>

                <p className="text-sm opacity-70">
                  {provider.code}
                </p>


<p className="text-xs opacity-50">
  Market: {provider.marketId}
</p>



                <StatusBadge active={provider.enabled} />
              </div>

<Button
  variant="secondary"
  disabled
>
  ویرایش
</Button>            </div>
          </Card>
        ))}
      </div>
    </AppPage>
  );
}