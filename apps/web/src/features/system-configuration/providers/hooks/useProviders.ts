"use client";

import { useState } from "react";

import { ProviderService } from "../services/provider.service";

export interface CreateProviderDto {
  name: string;
  code: string;
  marketId: string;
}

export function useProviders() {
  const [providers, setProviders] = useState(() =>
    ProviderService.getAll()
  );

  function createProvider(data: CreateProviderDto) {
    setProviders((current) =>
      ProviderService.create(current, data)
    );
  }

  return {
    providers,
    createProvider,
  };
}