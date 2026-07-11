import type { Exchange } from "../types/exchange";

export interface ExchangeRepository {
  getAll(): Promise<Exchange[]>;

  getById(
    id: string
  ): Promise<Exchange | undefined>;

  create(
    exchange: Exchange
  ): Promise<Exchange>;

  update(
    exchange: Exchange
  ): Promise<Exchange>;

  delete(
    id: string
  ): Promise<void>;
}