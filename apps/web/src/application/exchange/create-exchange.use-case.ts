import type { Exchange } from "@/features/exchange";
import {
  createExchangeService,
  type CreateExchangeInput,
} from "@/features/exchange/services/exchange.service";

import { exchangeRepository } from "@/features/exchange/repositories/exchange.repository.instance";

export type CreateExchangeResult =
  | {
      success: true;
      data: Exchange;
    }
  | {
      success: false;
      error: string;
    };

export function createExchangeUseCase() {
  const service =
    createExchangeService(
      exchangeRepository
    );

  return {
    async execute(
      input: CreateExchangeInput
    ): Promise<CreateExchangeResult> {
      return service.create(input);
    },
  };
}
