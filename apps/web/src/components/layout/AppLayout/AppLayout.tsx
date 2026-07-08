import { Sidebar } from "../Sidebar";
import type { AppLayoutProps } from "./AppLayout.types";
import {
  ChartCandlestick,
  Plug,
  Brain,
  Users,
} from "lucide-react";



const navigation = [
  {
  id: "markets",
  label: "بازارها",
  href: "/system-configuration/markets",
  icon: <ChartCandlestick size={18} />,
},

  {
  id: "providers",
  label: "پراوایدرها",
  href: "/system-configuration/providers",
  icon: <Plug size={18} />,
},
{
  id: "customers",
  label: "مشتریان",
  href: "/customers",
  icon: <Users size={18} />,
},


  {
  id: "strategies",
  label: "استراتژی‌ها",
  href: "#",
  icon: <Brain size={18} />,
},

 {
  id: "users",
  label: "کاربران",
  href: "#",
  icon: <Users size={18} />,
},
];

export function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--background)]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          gap-6
          p-6
        "
      >
        <Sidebar items={navigation} />

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}