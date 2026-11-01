import type { TradeRepository as FeatureTradeRepository } from "./repositories/trade.repository";
import type { TradeService } from "./services/trade.service";
import type { TradeRepository as PersistenceTradeRepository } from "@/infrastructure/persistence/repositories/trade/trade-repository";

type AssertFalse<T extends false> = T;

type FeatureRepositoryDoesNotExposeDelete = AssertFalse<
  "delete" extends keyof FeatureTradeRepository ? true : false
>;

type PersistenceRepositoryDoesNotExposeDelete = AssertFalse<
  "delete" extends keyof PersistenceTradeRepository ? true : false
>;

type TradeServiceDoesNotExposeDelete = AssertFalse<
  "delete" extends keyof TradeService ? true : false
>;

export type TradeDeletionContractChecks = [
  FeatureRepositoryDoesNotExposeDelete,
  PersistenceRepositoryDoesNotExposeDelete,
  TradeServiceDoesNotExposeDelete,
];
