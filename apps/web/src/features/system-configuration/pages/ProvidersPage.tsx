import { AppPage } from "@/components/ui/AppPage";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

import { MarketService } from "../markets/services/market.service";

export function MarketsPage() {
  const markets = MarketService.getAll();

  return (
    <AppPage
      title="مدیریت بازارها"
      description="بازارهای قابل پشتیبانی سیستم"
      actions={<Button>افزودن بازار</Button>}
    >
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