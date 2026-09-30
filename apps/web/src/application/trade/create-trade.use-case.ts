import type {
  CreateTradeInput,
  TradeServiceResult,
} from "@/features/trade";

import type { Trade } from "@/features/trade";

import { tradeRepository } from "@/features/trade/repositories/trade.repository.instance";

import { TradeService } from "@/features/trade";

export class CreateTradeUseCase {
  private readonly service: TradeService;

  constructor() {
    this.service = new TradeService(
      tradeRepository
    );
  }

  async execute(
    input: CreateTradeInput
  ): Promise<TradeServiceResult<Trade>> {
    return this.service.create(input);
  }
}
