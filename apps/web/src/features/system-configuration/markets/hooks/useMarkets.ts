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

  function addMarket(data: CreateMarketDto) {
    setMarkets((current) => [
      ...current,
      {
    id: crypto.randomUUID(),

    name: data.name,

    code: data.code,

    enabled: true,

    order: markets.length + 1,

    createdAt: new Date(),

updatedAt: new Date(),
}
    ]);
  }

  return {
    markets,
    addMarket,
  };
}