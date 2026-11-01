import { describe, expect, it } from "vitest";

import type { EntityId } from "@/contracts/persistence";
import type { Trade } from "@/features/trade/types/trade";
import { TradeRepositoryImpl } from "./trade-repository.impl";

const id = (value: string): EntityId => ({ value }) as EntityId;

const makeTrade = (): Trade => {
  const now = new Date("2026-01-01T00:00:00.000Z");
  return {
    id: id("trade-1"),
    campaignId: id("campaign-1"),
    exchangeAccountId: id("exchange-account-1"),
    portfolioId: id("portfolio-1"),
    name: "Original trade",
    code: "TRD-001",
    enabled: true,
    archived: false,
    createdAt: now,
    updatedAt: now,
  };
};

describe("Trade persistence repository", () => {
  it("creates and retrieves a trade", async () => {
    const repository = new TradeRepositoryImpl();
    const trade = makeTrade();

    const created = await repository.create(trade);
    expect(created).toEqual({ success: true, data: trade });

    const fetched = await repository.getById(trade.id);
    expect(fetched).toEqual({ success: true, data: trade });

    const all = await repository.getAll();
    expect(all).toEqual({ success: true, data: [trade] });
  });

  it("updates a trade without removing its historical record", async () => {
    const repository = new TradeRepositoryImpl();
    const trade = makeTrade();
    await repository.create(trade);

    const updated = { ...trade, name: "Updated trade" };
    const result = await repository.update(updated);

    expect(result).toEqual({ success: true, data: updated });
    expect(await repository.getById(trade.id)).toEqual({
      success: true,
      data: updated,
    });
    expect(await repository.getAll()).toEqual({
      success: true,
      data: [updated],
    });
  });

  it("does not expose ordinary deletion", () => {
    const repository = new TradeRepositoryImpl();
    expect("delete" in repository).toBe(false);
  });
});
