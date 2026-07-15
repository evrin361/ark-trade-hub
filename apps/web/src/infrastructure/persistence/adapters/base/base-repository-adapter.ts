import { BaseAdapter } from "./base-adapter";
import type { RepositoryAdapter } from "../contracts";

export abstract class BaseRepositoryAdapter
  extends BaseAdapter
  implements RepositoryAdapter {}