/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Public API
 * ============================================================
 */

export type {
  EntityId,
  Identifiable,
} from "./identity";

export type {
  PersistenceError,
  EntityNotFoundError,
  DuplicateEntityError,
  ValidationFailureError,
  PersistenceFailureError,
  ConcurrencyConflictError,
} from "./errors";

export type {
  Result,
  Optional,
  CollectionResult,
} from "./results";

export type {
  Repository,
} from "./repositories";

export type {
  PageRequest,
  PageMetadata,
  PageResult,
} from "./pagination";