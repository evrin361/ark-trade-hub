export interface Adapter {
  readonly name: string;

  readonly version: string;

  initialize(): Promise<void>;

  dispose(): Promise<void>;
}