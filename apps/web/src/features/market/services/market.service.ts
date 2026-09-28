import type { EntityId } from "@/contracts/persistence";

import type { Market } from "../types/market";
import type { MarketRepository } from "../repositories/market.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export type CreateMarketInput = {
  name: string;
  code: string;
};

export type UpdateMarketInput = {
  id: EntityId;
  name: string;
  code: string;
};

export function createMarketService(
  repository: MarketRepository
) {
  return {
    async getAll(): Promise<
      ServiceResult<Market[]>
    > {
      try {
        const markets =
          await repository.getAll();

        return {
          success: true,
          data: markets,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load markets",
        };
      }
    },

    async getById(
      id: EntityId
    ): Promise<
      ServiceResult<Market>
    > {
      try {
        const market =
          await repository.getById(id);

        if (!market) {
          return {
            success: false,
            error: "Market not found",
          };
        }

        return {
          success: true,
          data: market,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load market",
        };
      }
    },

    async create(
      input: CreateMarketInput
    ): Promise<
      ServiceResult<Market>
    > {
      try {
        const now = new Date();

        const market: Market = {
          id: {
            value: crypto.randomUUID(),
          },
          name: input.name,
          code: input.code,
          enabled: true,
          archived: false,
          createdAt: now,
          updatedAt: now,
        };

        const created =
          await repository.create(market);

        return {
          success: true,
          data: created,
        };
      } catch {
        return {
          success: false,
          error: "Failed to create market",
        };
      }
    },

    async update(
      input: UpdateMarketInput
    ): Promise<
      ServiceResult<Market>
    > {
      try {
        const existing =
          await repository.getById(input.id);

        if (!existing) {
          return {
            success: false,
            error: "Market not found",
          };
        }

        const updated: Market = {
          ...existing,
          name: input.name,
          code: input.code,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(updated);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to update market",
        };
      }
    },

    async archive(
      id: EntityId
    ): Promise<
      ServiceResult<Market>
    > {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Market not found",
          };
        }

        const updated: Market = {
          ...existing,
          archived: true,
          enabled: false,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(updated);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to archive market",
        };
      }
    },

    async restore(
      id: EntityId
    ): Promise<
      ServiceResult<Market>
    > {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Market not found",
          };
        }

        const updated: Market = {
          ...existing,
          archived: false,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(updated);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to restore market",
        };
      }
    },

    async toggleStatus(
      id: EntityId
    ): Promise<
      ServiceResult<Market>
    > {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Market not found",
          };
        }

        const updated: Market = {
          ...existing,
          enabled: !existing.enabled,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(updated);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to toggle market status",
        };
      }
    },

    async delete(
      id: EntityId
    ): Promise<
      ServiceResult<void>
    > {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Market not found",
          };
        }

        await repository.delete(id);

        return {
          success: true,
          data: undefined,
        };
      } catch {
        return {
          success: false,
          error: "Failed to delete market",
        };
      }
    },
  };
}
