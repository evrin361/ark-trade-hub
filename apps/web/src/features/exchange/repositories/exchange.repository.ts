import type { EntityId } from "@/contracts/persistence";
import type { Exchange } from "../types/exchange";

export interface ExchangeRepository {
  getAll(): Promise<Exchange[]>;

  getById(
    id: EntityId
  ): Promise<Exchange | undefined>;

  create(
    exchange: Exchange
  ): Promise<Exchange>;

  update(
    exchange: Exchange
  ): Promise<Exchange>;

  delete(
    id: EntityId
  ): Promise<void>;
}
