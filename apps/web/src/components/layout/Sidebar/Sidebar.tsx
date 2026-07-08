"use client";
import type { SidebarProps } from "./Sidebar.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({
  items,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="
  w-72
  shrink-0

  rounded-2xl

  border
  border-white/10

  bg-white/[0.04]
  backdrop-blur-xl

  shadow-[0_8px_30px_rgba(0,0,0,0.25)]

  p-6
"
    >
      <div className="mb-4 text-center">
        <h2
  className="
    text-xl
    font-bold
    tracking-wide
    text-cyan-300
  "
>
          ARK Trade Hub
        </h2>
      </div>

<nav className="mt-2 space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;

  return (
<Link
  key={item.id}
  href={item.href}
  className={`
    group
    flex
    items-center
    gap-3

    rounded-xl

    px-3
    py-2.5

    text-sm

    ${
      isActive
  ? "bg-white/5 text-white border-r-2 border-cyan-400"
        : "text-[var(--text-secondary)]"
    }

    transition-all
    duration-200

    hover:bg-white/5
    hover:text-white
  `}
>
  <span
    className="
      flex
      h-5
      w-5
      items-center
      justify-center

      text-slate-500

      transition-colors

      group-hover:text-cyan-300
    "
  >
    {item.icon}
  </span>

  <span className="font-medium">
    {item.label}
  </span>
</Link>
);
})}
        
      </nav>
    </aside>
  );
}