import type { ExecutionContext } from "../context";
import type { ExecutionResult } from "./execution-result";

export interface Execution<
  TRequest = unknown,
  TResult = unknown,
> {
  execute(
    request: TRequest,
    context: ExecutionContext,
  ): Promise<ExecutionResult<TResult>>;
}