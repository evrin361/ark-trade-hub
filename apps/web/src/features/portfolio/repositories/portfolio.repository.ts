import type { EntityId } from "@/contracts/persistence";
import type { Portfolio } from "../types/portfolio";

export interface PortfolioRepository {
  getAll(): Promise<Portfolio[]>;

  getById(
    id: EntityId
  ): Promise<Portfolio | undefined>;

  create(
    portfolio: Portfolio
  ): Promise<Portfolio>;

  update(
    portfolio: Portfolio
  ): Promise<Portfolio>;

  delete(
    id: EntityId
  ): Promise<void>;
}