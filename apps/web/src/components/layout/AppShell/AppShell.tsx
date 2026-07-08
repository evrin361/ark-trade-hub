import type { ReactNode } from "react";
import { AppHeader } from "../AppHeader";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <main
      className="
        min-h-screen
        bg-background
        text-foreground
      "
    >
      <AppHeader />

      <div
  className="
    mx-auto
    w-full
    max-w-7xl
    px-8
    py-10
  "
>
  {children}
</div>
    </main>
  );
}