import type { EntityId } from "@/contracts/persistence";

import type { TradeRepository } from "../repositories/trade.repository";
import type { Trade } from "../types/trade";

export type TradeServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export interface CreateTradeInput {
  campaignId: EntityId;
  exchangeAccountId: EntityId;
  portfolioId: EntityId;
  name: string;
  code: string;
}

export interface UpdateTradeInput {
  id: EntityId;
  name: string;
  code: string;
}

export class TradeService {
  constructor(
    private readonly repository: TradeRepository
  ) {}

  async getAll(): Promise<TradeServiceResult<Trade[]>> {
    try {
      return {
        success: true,
        data: await this.repository.getAll(),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get trades.",
      };
    }
  }

  async getById(
    id: EntityId
  ): Promise<TradeServiceResult<Trade | undefined>> {
    try {
      return {
        success: true,
        data: await this.repository.getById(id),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get trade.",
      };
    }
  }

  async create(
    input: CreateTradeInput
  ): Promise<TradeServiceResult<Trade>> {
    try {
      const now = new Date();

      const trade: Trade = {
        id: {
          value: crypto.randomUUID(),
        },
        campaignId: input.campaignId,
        exchangeAccountId: input.exchangeAccountId,
        portfolioId: input.portfolioId,
        name: input.name,
        code: input.code,
        enabled: true,
        archived: false,
        createdAt: now,
        updatedAt: now,
      };

      return {
        success: true,
        data: await this.repository.create(trade),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create trade.",
      };
    }
  }

  async update(
    input: UpdateTradeInput
  ): Promise<TradeServiceResult<Trade>> {
    try {
      const existing =
        await this.repository.getById(input.id);

      if (!existing) {
        return {
          success: false,
          error: "Trade not found.",
        };
      }

      const trade: Trade = {
        ...existing,
        name: input.name,
        code: input.code,
        updatedAt: new Date(),
      };

      return {
        success: true,
        data: await this.repository.update(trade),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update trade.",
      };
    }
  }

  async archive(
    id: EntityId
  ): Promise<TradeServiceResult<Trade>> {
    try {
      const existing =
        await this.repository.getById(id);

      if (!existing) {
        return {
          success: false,
          error: "Trade not found.",
        };
      }

      const trade: Trade = {
        ...existing,
        enabled: false,
        archived: true,
        updatedAt: new Date(),
      };

      return {
        success: true,
        data: await this.repository.update(trade),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to archive trade.",
      };
    }
  }

  async restore(
    id: EntityId
  ): Promise<TradeServiceResult<Trade>> {
    try {
      const existing =
        await this.repository.getById(id);

      if (!existing) {
        return {
          success: false,
          error: "Trade not found.",
        };
      }

      const trade: Trade = {
        ...existing,
        archived: false,
        updatedAt: new Date(),
      };

      return {
        success: true,
        data: await this.repository.update(trade),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to restore trade.",
      };
    }
  }

  async enable(
    id: EntityId
  ): Promise<TradeServiceResult<Trade>> {
    try {
      const existing =
        await this.repository.getById(id);

      if (!existing) {
        return {
          success: false,
          error: "Trade not found.",
        };
      }

      const trade: Trade = {
        ...existing,
        enabled: true,
        updatedAt: new Date(),
      };

      return {
        success: true,
        data: await this.repository.update(trade),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to enable trade.",
      };
    }
  }

  async disable(
    id: EntityId
  ): Promise<TradeServiceResult<Trade>> {
    try {
      const existing =
        await this.repository.getById(id);

      if (!existing) {
        return {
          success: false,
          error: "Trade not found.",
        };
      }

      const trade: Trade = {
        ...existing,
        enabled: false,
        updatedAt: new Date(),
      };

      return {
        success: true,
        data: await this.repository.update(trade),
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to disable trade.",
      };
    }
  }

  async delete(
    id: EntityId
  ): Promise<TradeServiceResult<void>> {
    try {
      const existing =
        await this.repository.getById(id);

      if (!existing) {
        return {
          success: false,
          error: "Trade not found.",
        };
      }

      await this.repository.delete(id);

      return {
        success: true,
        data: undefined,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete trade.",
      };
    }
  }
}
