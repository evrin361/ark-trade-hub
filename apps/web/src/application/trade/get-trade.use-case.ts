import type {
  TradeServiceResult,
} from "@/features/trade";

import type { EntityId } from "@/contracts/persistence";
import type { Trade } from "@/features/trade";

import { tradeRepository } from "@/features/trade/repositories/trade.repository.instance";

import { TradeService } from "@/features/trade";

export class GetTradeUseCase {
  private readonly service: TradeService;

  constructor() {
    this.service = new TradeService(
      tradeRepository
    );
  }

  async execute(
    id: EntityId
  ): Promise<TradeServiceResult<Trade | undefined>> {
    return this.service.getById(id);
  }
}
