import type { ReactNode } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
}