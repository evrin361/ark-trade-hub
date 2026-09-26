import type { EntityId } from "@/contracts/persistence";
import type { Exchange } from "@/features/exchange";

import {
  createExchangeService,
} from "@/features/exchange/services/exchange.service";

import { exchangeRepository } from "@/features/exchange/repositories/exchange.repository.instance";

export type GetExchangeResult =
  | {
      success: true;
      data: Exchange;
    }
  | {
      success: false;
      error: string;
    };

export function createGetExchangeUseCase() {
  const service =
    createExchangeService(
      exchangeRepository
    );

  return {
    async execute(
      id: EntityId
    ): Promise<GetExchangeResult> {
      return service.getById(id);
    },
  };
}
