import type { Adapter } from "@/infrastructure/persistence/adapters";

import { SupabaseClient } from "../client";
import type { SupabaseConfiguration } from "../configuration";

export class SupabaseProvider implements Adapter {
  public readonly name = "supabase";

  public readonly version = "1.0.0";

  public constructor(
    private readonly configuration: SupabaseConfiguration,
    private readonly client: SupabaseClient,
  ) {}

  public async initialize(): Promise<void> {
    void this.configuration;
    void this.client;
  }

  public async dispose(): Promise<void> {}
}