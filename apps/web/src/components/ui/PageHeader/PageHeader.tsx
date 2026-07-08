import type { PageHeaderProps } from "./PageHeader.types";
import { pageHeaderRecipe } from "@/config/theme/recipes/page-header";


export function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
<div className={pageHeaderRecipe()}>
          <div className="space-y-2 text-right">
        <h1
  className="
    text-3xl
    font-bold
    text-[var(--text-primary)]
  "
>{title}</h1>

        {description && (
<p
  className="
    text-sm
    text-[var(--text-secondary)]
  "
>      
      {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}