import type { Portfolio } from "../types/portfolio";

export interface PortfolioRepository {
  getAll(): Promise<Portfolio[]>;

  getById(
    id: string
  ): Promise<Portfolio | undefined>;

  create(
    portfolio: Portfolio
  ): Promise<Portfolio>;

  update(
    portfolio: Portfolio
  ): Promise<Portfolio>;

  delete(
    id: string
  ): Promise<void>;
}