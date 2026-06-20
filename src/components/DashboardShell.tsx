import {
  Bell,
  Calendar,
  ChevronDown,
  FileCheck2,
  FileText,
  Folder,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

const sidebarItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { to: "/dashboard/messages", label: "Messages", icon: MessageCircle, badge: "2" },
  { to: "/dashboard/approvals", label: "Approvals", icon: FileCheck2, badge: "1" },
  { to: "/dashboard/services", label: "Services", icon: UsersRound },
  { to: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { to: "/dashboard/documents", label: "Documents", icon: Folder },
  { to: "/dashboard/profile", label: "Profile", icon: UserRound },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8f6f1] pb-24 text-[#151917] lg:flex lg:pb-0">
      <aside className="hidden w-[216px] shrink-0 flex-col border-r border-black/[0.07] bg-[#fbfaf7] px-3 py-4 lg:flex">
        <nav className="grid gap-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === "/dashboard" ? location.pathname === item.to : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={[
                  "flex min-h-9 items-center justify-between rounded-lg px-2.5 text-left text-[13px] font-medium transition",
                  isActive
                    ? "border border-black/[0.06] bg-white text-[#151917] shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                    : "text-slate-600 hover:bg-white/72 hover:text-[#151917]",
                ].join(" ")}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e8d1e6] px-1.5 text-[11px] font-semibold text-[#7a3f8f]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-black/[0.07] bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f0ea] text-[#7a3f8f]">
              <Headphones className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold">Support</p>
              <p className="text-xs text-slate-500">Replies in 12 min</p>
            </div>
          </div>
          <button className="mt-3 min-h-9 w-full rounded-lg border border-black/[0.08] bg-white text-[13px] font-semibold text-[#151917]">
            Contact
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[1180px] px-4 py-4 sm:px-6 lg:px-7 lg:py-7">
          <div className="mb-5 flex items-center justify-end lg:hidden">
            <DashboardTopActions />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

export function DashboardTopActions() {
  return (
    <div className="flex items-center gap-2.5">
      <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-slate-700 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7a3f8f] px-1 text-[10px] font-semibold text-white">
          2
        </span>
      </button>
      <button className="hidden items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2 py-1.5 shadow-[0_8px_22px_rgba(15,23,42,0.05)] sm:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#d8aecf] text-xs font-semibold text-[#111411]">MG</span>
        <span className="text-[13px] font-medium text-[#151917]">Maggie Green</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
      </button>
    </div>
  );
}
