import {
  Bell,
  Calendar,
  ChevronDown,
  FileCheck2,
  Headphones,
  House,
  MessageCircle,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

const sidebarItems = [
  { to: "/dashboard", label: "Home", icon: House, home: true },
  { to: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { to: "/dashboard/messages", label: "Messages", icon: MessageCircle, badge: "2" },
  { to: "/dashboard/approvals", label: "Approvals", icon: FileCheck2, badge: "1" },
  { to: "/dashboard/services", label: "Saved", icon: UsersRound },
  { to: "/dashboard/profile", label: "Profile", icon: UserRound },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8f1e8] pb-24 text-[#151917] lg:flex lg:pb-0">
      <aside className="hidden w-[264px] shrink-0 flex-col border-r border-black/[0.06] bg-white/70 px-4 py-5 shadow-[18px_0_60px_rgba(89,50,95,0.05)] backdrop-blur-xl lg:flex">
        <div className="mb-8">
          <img src="/images/careporter-logo.png" alt="CarePorter" className="h-7 w-auto object-contain" />
        </div>

        <nav className="grid gap-1.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === "/dashboard" ? location.pathname === item.to : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.home ? item.label : undefined}
                aria-label={item.home ? item.label : undefined}
                className={[
                  "flex min-h-10 items-center rounded-lg border text-left text-sm font-medium transition",
                  item.home ? "w-10 justify-center px-0" : "justify-between px-3",
                  isActive
                    ? "border-[#ead2e8] bg-white text-[#151917] shadow-[0_12px_32px_rgba(89,50,95,0.08)]"
                    : "border-transparent text-slate-600 hover:bg-white/70 hover:text-[#151917]",
                ].join(" ")}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {!item.home && item.label}
                </span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f1dced] px-1.5 text-[11px] font-semibold text-[#633475]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto rounded-lg border border-white/80 bg-white/82 p-3 shadow-[0_14px_40px_rgba(89,50,95,0.06)]">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8aecf] text-[#111411]">
              <Headphones className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold">Support</p>
              <p className="text-xs text-slate-500">Replies in 12 min</p>
            </div>
          </div>
          <button className="mt-3 min-h-9 w-full rounded-full border border-black/[0.08] bg-white text-[13px] font-medium text-[#151917]">
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
      <button
        type="button"
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/86 text-slate-700 shadow-[0_12px_30px_rgba(89,50,95,0.07)]"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7a3f8f] px-1 text-[10px] font-medium text-white">
          2
        </span>
      </button>
      <button
        type="button"
        className="hidden min-h-11 items-center gap-2 rounded-full border border-white/80 bg-white/86 px-2.5 text-sm font-medium text-[#151917] shadow-[0_12px_30px_rgba(89,50,95,0.07)] sm:flex"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d8aecf] text-xs font-medium text-[#111411]">MG</span>
        <span>Maggie</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
      </button>
    </div>
  );
}
