import { describe, expect, it, vi } from "vitest";

import type { EntityId } from "@/contracts/persistence";
import type { Trade } from "../types/trade";
import type { TradeRepository } from "../repositories/trade.repository";
import { TradeService } from "./trade.service";

const id = (value: string): EntityId => ({ value }) as EntityId;

const makeTrade = (overrides: Partial<Trade> = {}): Trade => {
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
    ...overrides,
  };
};

const makeRepository = (initial: Trade[] = []) => {
  let trades = [...initial];
  const repository: TradeRepository = {
    getAll: vi.fn(async () => [...trades]),
    getById: vi.fn(async (tradeId) =>
      trades.find((trade) => trade.id.value === tradeId.value)
    ),
    create: vi.fn(async (trade) => {
      trades.push(trade);
      return trade;
    }),
    update: vi.fn(async (trade) => {
      const index = trades.findIndex(
        (current) => current.id.value === trade.id.value
      );
      if (index >= 0) trades[index] = trade;
      return trade;
    }),
  };
  return { repository, read: () => trades };
};

describe("TradeService", () => {
  it("creates and retrieves a trade", async () => {
    const { repository } = makeRepository();
    const service = new TradeService(repository);

    const created = await service.create({
      campaignId: id("campaign-1"),
      exchangeAccountId: id("exchange-account-1"),
      portfolioId: id("portfolio-1"),
      name: "New trade",
      code: "TRD-NEW",
    });

    expect(created.success).toBe(true);
    if (!created.success) return;
    expect(created.data.name).toBe("New trade");
    expect(created.data.enabled).toBe(true);
    expect(created.data.archived).toBe(false);

    const fetched = await service.getById(created.data.id);
    expect(fetched).toEqual({ success: true, data: created.data });
    expect(repository.create).toHaveBeenCalledOnce();
  });

  it("updates trade business information", async () => {
    const existing = makeTrade();
    const { repository, read } = makeRepository([existing]);
    const result = await new TradeService(repository).update({
      id: existing.id,
      name: "Updated trade",
      code: "TRD-002",
    });

    expect(result.success).toBe(true);
    expect(read()[0].name).toBe("Updated trade");
    expect(read()[0].code).toBe("TRD-002");
  });

  it("preserves archive, restore, enable and disable lifecycle operations", async () => {
    const existing = makeTrade();
    const { repository, read } = makeRepository([existing]);
    const service = new TradeService(repository);

    const archived = await service.archive(existing.id);
    expect(archived.success).toBe(true);
    expect(read()[0].archived).toBe(true);
    expect(read()[0].enabled).toBe(false);

    const restored = await service.restore(existing.id);
    expect(restored.success).toBe(true);
    expect(read()[0].archived).toBe(false);
    expect(read()[0].enabled).toBe(false);

    const enabled = await service.enable(existing.id);
    expect(enabled.success).toBe(true);
    expect(read()[0].enabled).toBe(true);

    const disabled = await service.disable(existing.id);
    expect(disabled.success).toBe(true);
    expect(read()[0].enabled).toBe(false);
  });

  it("returns not-found results for update and lifecycle operations", async () => {
    const { repository } = makeRepository();
    const service = new TradeService(repository);
    const missing = id("missing");

    await expect(service.update({
      id: missing,
      name: "Missing",
      code: "NONE",
    })).resolves.toEqual({ success: false, error: "Trade not found." });

    await expect(service.archive(missing)).resolves.toEqual({
      success: false,
      error: "Trade not found.",
    });
    await expect(service.restore(missing)).resolves.toEqual({
      success: false,
      error: "Trade not found.",
    });
    await expect(service.enable(missing)).resolves.toEqual({
      success: false,
      error: "Trade not found.",
    });
    await expect(service.disable(missing)).resolves.toEqual({
      success: false,
      error: "Trade not found.",
    });
  });

  it("translates repository failures into service failures", async () => {
    const repository = makeRepository().repository;
    vi.mocked(repository.getAll).mockRejectedValueOnce(new Error("storage unavailable"));

    await expect(new TradeService(repository).getAll()).resolves.toEqual({
      success: false,
      error: "storage unavailable",
    });
  });

  it("does not expose ordinary deletion", () => {
    const repository = makeRepository().repository;
    const service = new TradeService(repository);

    expect("delete" in repository).toBe(false);
    expect("delete" in service).toBe(false);
  });
});
