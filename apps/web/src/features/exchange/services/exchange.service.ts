import type { EntityId } from "@/contracts/persistence";

import type { ExchangeRepository } from "../repositories/exchange.repository";
import type { Exchange } from "../types/exchange";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export type CreateExchangeInput = {
  name: string;
  code: string;
};

export type UpdateExchangeInput = {
  id: EntityId;
  name: string;
  code: string;
};

export function createExchangeService(
  repository: ExchangeRepository
) {
  return {
    async getAll(): Promise<
      ServiceResult<Exchange[]>
    > {
      try {
        const exchanges =
          await repository.getAll();

        return {
          success: true,
          data: exchanges,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load exchanges",
        };
      }
    },

    async getById(
      id: EntityId
    ): Promise<
      ServiceResult<Exchange>
    > {
      try {
        const exchange =
          await repository.getById(id);

        if (!exchange) {
          return {
            success: false,
            error: "Exchange not found",
          };
        }

        return {
          success: true,
          data: exchange,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load exchange",
        };
      }
    },

    async create(
      input: CreateExchangeInput
    ): Promise<
      ServiceResult<Exchange>
    > {
      try {
        const now = new Date();

        const exchange: Exchange = {
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
          await repository.create(exchange);

        return {
          success: true,
          data: created,
        };
      } catch {
        return {
          success: false,
          error: "Failed to create exchange",
        };
      }
    },

    async update(
      input: UpdateExchangeInput
    ): Promise<
      ServiceResult<Exchange>
    > {
      try {
        const existing =
          await repository.getById(input.id);

        if (!existing) {
          return {
            success: false,
            error: "Exchange not found",
          };
        }

        const updated: Exchange = {
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
          error: "Failed to update exchange",
        };
      }
    },

    async archive(
      id: EntityId
    ): Promise<
      ServiceResult<Exchange>
    > {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Exchange not found",
          };
        }

        const updated: Exchange = {
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
          error: "Failed to archive exchange",
        };
      }
    },

    async restore(
      id: EntityId
    ): Promise<
      ServiceResult<Exchange>
    > {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Exchange not found",
          };
        }

        const updated: Exchange = {
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
          error: "Failed to restore exchange",
        };
      }
    },

    async toggleStatus(
      id: EntityId
    ): Promise<
      ServiceResult<Exchange>
    > {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Exchange not found",
          };
        }

        const updated: Exchange = {
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
          error: "Failed to toggle exchange status",
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
            error: "Exchange not found",
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
          error: "Failed to delete exchange",
        };
      }
    },
  };
}
