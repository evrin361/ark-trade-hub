import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Portfolio } from "@/features/portfolio/types/portfolio";

export interface PortfolioRepository {
  getAll(): Promise<
    CollectionResult<
      Portfolio,
      PersistenceError
    >
  >;

  getById(
    id: EntityId
  ): Promise<
    Result<
      Portfolio | undefined,
      PersistenceError
    >
  >;

  create(
    portfolio: Portfolio
  ): Promise<
    Result<
      Portfolio,
      PersistenceError
    >
  >;

  update(
    portfolio: Portfolio
  ): Promise<
    Result<
      Portfolio,
      PersistenceError
    >
  >;

  delete(
    id: EntityId
  ): Promise<
    Result<
      void,
      PersistenceError
    >
  >;
}