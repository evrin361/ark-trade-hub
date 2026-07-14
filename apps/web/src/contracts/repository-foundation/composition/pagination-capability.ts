import type {
  PageRequest,
  PageResult,
} from "../../persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Pagination Capability Contract
 * ============================================================
 */

export interface PaginationCapability<
  TResult,
> {
  getPage(
    request: PageRequest
  ): Promise<PageResult<TResult>>;
}