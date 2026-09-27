import type { EntityId } from "@/contracts/persistence";

import type { ExchangeAccountRepository } from "../repositories/exchange-account.repository";
import type { ExchangeAccount } from "../types/exchange-account";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createExchangeAccountService(
  repository: ExchangeAccountRepository
) {
  return {
    async getAll(): Promise<
      ServiceResult<ExchangeAccount[]>
    > {
      try {
        const exchangeAccounts =
          await repository.getAll();

        return {
          success: true,
          data: exchangeAccounts,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load exchange accounts",
        };
      }
    },

    async getById(
      id: EntityId
    ): Promise<ServiceResult<ExchangeAccount>> {
      try {
        const exchangeAccount =
          await repository.getById(id);

        if (!exchangeAccount) {
          return {
            success: false,
            error: "Exchange account not found",
          };
        }

        return {
          success: true,
          data: exchangeAccount,
        };
      } catch {
        return {
          success: false,
          error: "Failed to get exchange account",
        };
      }
    },

    async create(
      data: {
        portfolioId: EntityId;
        exchangeId: EntityId;
        name: string;
        code: string;
      }
    ): Promise<ServiceResult<ExchangeAccount>> {
      try {
        const now = new Date();

        const newExchangeAccount: ExchangeAccount = {
          id: {
            value: crypto.randomUUID(),
          },

          portfolioId: data.portfolioId,

          exchangeId: data.exchangeId,

          name: data.name,

          code: data.code,

          enabled: true,

          archived: false,

          createdAt: now,

          updatedAt: now,
        };

        const exchangeAccount =
          await repository.create(
            newExchangeAccount
          );

        return {
          success: true,
          data: exchangeAccount,
        };
      } catch {
        return {
          success: false,
          error: "Failed to create exchange account",
        };
      }
    },

    async update(
      id: EntityId,
      data: {
        name: string;
        code: string;
      }
    ): Promise<ServiceResult<ExchangeAccount>> {
      try {
        const existingExchangeAccount =
          await repository.getById(id);

        if (!existingExchangeAccount) {
          return {
            success: false,
            error: "Exchange account not found",
          };
        }

        const updatedExchangeAccount: ExchangeAccount = {
          ...existingExchangeAccount,

          name: data.name,

          code: data.code,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedExchangeAccount
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to update exchange account",
        };
      }
    },

    async connect(
      id: EntityId
    ): Promise<ServiceResult<ExchangeAccount>> {
      try {
        const exchangeAccount =
          await repository.getById(id);

        if (!exchangeAccount) {
          return {
            success: false,
            error: "Exchange account not found",
          };
        }

        const updatedExchangeAccount: ExchangeAccount = {
          ...exchangeAccount,

          enabled: true,

          archived: false,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedExchangeAccount
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to connect exchange account",
        };
      }
    },

    async disconnect(
      id: EntityId
    ): Promise<ServiceResult<ExchangeAccount>> {
      try {
        const exchangeAccount =
          await repository.getById(id);

        if (!exchangeAccount) {
          return {
            success: false,
            error: "Exchange account not found",
          };
        }

        const updatedExchangeAccount: ExchangeAccount = {
          ...exchangeAccount,

          enabled: false,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedExchangeAccount
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to disconnect exchange account",
        };
      }
    },

    async archive(
      id: EntityId
    ): Promise<ServiceResult<ExchangeAccount>> {
      try {
        const exchangeAccount =
          await repository.getById(id);

        if (!exchangeAccount) {
          return {
            success: false,
            error: "Exchange account not found",
          };
        }

        const updatedExchangeAccount: ExchangeAccount = {
          ...exchangeAccount,

          enabled: false,

          archived: true,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedExchangeAccount
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to archive exchange account",
        };
      }
    },

    async restore(
      id: EntityId
    ): Promise<ServiceResult<ExchangeAccount>> {
      try {
        const exchangeAccount =
          await repository.getById(id);

        if (!exchangeAccount) {
          return {
            success: false,
            error: "Exchange account not found",
          };
        }

        const updatedExchangeAccount: ExchangeAccount = {
          ...exchangeAccount,

          archived: false,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedExchangeAccount
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to restore exchange account",
        };
      }
    },

    async delete(
      id: EntityId
    ): Promise<ServiceResult<void>> {
      try {
        const exchangeAccount =
          await repository.getById(id);

        if (!exchangeAccount) {
          return {
            success: false,
            error: "Exchange account not found",
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
          error: "Failed to delete exchange account",
        };
      }
    },
  };
}