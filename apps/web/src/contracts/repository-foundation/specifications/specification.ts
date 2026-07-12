/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Specification Contract
 * ============================================================
 */

export interface Specification<TEntity> {
  readonly criteria: TEntity;
}