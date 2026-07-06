import type { ReactNode } from "react";

import { Panel } from "../Panel";
import { PageHeader } from "../PageHeader";

interface AppPageProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AppPage({
  title,
  description,
  actions,
  children,
}: AppPageProps) {
  return (
    <main className="space-y-6">

      <PageHeader
        title={title}
        description={description}
        actions={actions}
      />

      <Panel>
        {children}
      </Panel>

    </main>
  );
}