/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Execution Foundation
 * ------------------------------------------------------------
 * Execution Result Contract
 * ============================================================
 */

import type { Result } from "@/contracts/persistence";

export type ExecutionResult<TResult = unknown> = Result<TResult, Error>;