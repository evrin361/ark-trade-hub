"use client";
import { useState } from "react";

import { MarketService } from "../services/market.service";

export interface CreateMarketDto {
  name: string;
  code: string;
}

export function useMarkets() {
  const [markets, setMarkets] = useState(() =>
    MarketService.getAll()
  );

  

function createMarket(data: CreateMarketDto) {
  setMarkets((current) =>
    MarketService.create(current, data)
  );
}

return {
  markets,
  createMarket,
};

}