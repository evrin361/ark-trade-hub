import type { Adapter } from "../contracts";

export abstract class BaseAdapter implements Adapter {
  abstract readonly name: string;

  abstract readonly version: string;

  abstract initialize(): Promise<void>;

  abstract dispose(): Promise<void>;
}