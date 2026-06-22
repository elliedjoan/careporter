import {
  Bell,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  FileCheck2,
  Inbox,
  LayoutDashboard,
  Plus,
  Receipt,
  Search,
  Settings,
  Store,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { businessProfile } from "../data/businessData";
import { cx } from "../lib/utils";

const primaryNav = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/service-profile", label: "Service profile", icon: Store },
  { to: "/availability", label: "Availability", icon: CalendarDays },
  { to: "/requests", label: "Requests", icon: CalendarCheck, badge: "5" },
  { to: "/messages", label: "Messages", icon: Inbox, badge: "4" },
  { to: "/documents", label: "Documents", icon: FileCheck2 },
  { to: "/invoices", label: "Invoices", icon: Receipt, badge: "2" },
];

const mobileNav = primaryNav.slice(0, 5);

export function BusinessShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-business-ink lg:grid lg:grid-cols-[252px_1fr]">
      <aside className="hidden border-r border-black/10 bg-[#fbfaf7] lg:block">
        <div className="flex h-24 items-center border-b border-black/10 px-5">
          <img
            src="/images/careporter-for-business-logo.png"
            alt="CarePorter for Business"
            className="h-auto w-full max-w-[178px] object-contain"
          />
        </div>

        <nav className="grid gap-1.5 px-3 py-4">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === "/" ? location.pathname === item.to : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cx(
                  "flex min-h-11 items-center justify-between rounded-full border px-3 text-sm font-medium transition",
                  isActive
                    ? "border-black/[0.08] bg-white text-business-ink shadow-[0_10px_26px_rgba(15,23,42,0.05)]"
                    : "border-transparent text-business-ink/68 hover:bg-white/72 hover:text-business-ink",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.badge && (
                  <span className={cx(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-black",
                    isActive ? "bg-[#111411] text-white" : "bg-white text-business-sea",
                  )}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mx-3 mt-4 rounded-lg border border-black/10 bg-white p-3 shadow-business">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-business-ink/48">Workspace</p>
            <span className="rounded-full border border-black/[0.1] bg-white px-2 py-1 text-[10px] font-semibold text-business-sea">
              {businessProfile.verificationStatus}
            </span>
          </div>
          <p className="mt-3 text-sm font-black">{businessProfile.name}</p>
          <p className="mt-1 text-xs font-semibold text-business-ink/62">{businessProfile.service} - {businessProfile.suburb}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <span className="rounded-lg border border-black/[0.06] bg-white p-2">
              <span className="block font-black">{businessProfile.rating}</span>
              <span className="text-business-ink/48">rating</span>
            </span>
            <span className="rounded-lg border border-black/[0.06] bg-white p-2">
              <span className="block font-black">{businessProfile.responseTime}</span>
              <span className="text-business-ink/48">reply</span>
            </span>
          </div>
        </div>
      </aside>

      <div className="min-w-0 pb-24 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f5ef]/95 backdrop-blur-xl">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-7">
            <NavLink to="/" className="mr-auto flex items-center lg:hidden">
              <img
                src="/images/careporter-for-business-logo.png"
                alt="CarePorter for Business"
                className="h-auto w-[170px] object-contain"
              />
            </NavLink>
            <label className="hidden min-h-11 min-w-0 flex-1 max-w-xl items-center gap-2 rounded-lg border border-black/10 bg-white/85 px-3 shadow-sm md:flex">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500"
                placeholder="Search requests, clients, invoices..."
              />
            </label>
            <button
              type="button"
              title="Create"
              aria-label="Create"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111411] text-white shadow-[0_12px_28px_rgba(17,20,17,0.14)]"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Notifications"
              aria-label="Notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-slate-700 shadow-sm"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#111411] px-1 text-[10px] font-semibold text-white">
                4
              </span>
            </button>
            <button
              type="button"
              className="hidden min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-2.5 text-sm font-medium text-business-ink shadow-sm sm:flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111411] text-xs text-white">BC</span>
              {businessProfile.owner}
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>
            <button
              type="button"
              title="Settings"
              aria-label="Settings"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-slate-700 shadow-sm lg:flex"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1320px] px-4 py-5 sm:px-6 lg:px-7 lg:py-8">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f7f5ef]/95 px-2 py-2 shadow-[0_-16px_36px_rgba(31,51,46,0.08)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === "/" ? location.pathname === item.to : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cx(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-full text-[11px] font-medium",
                  isActive ? "bg-[#111411] text-white" : "text-business-ink/58",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
