import {
  Bell,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ClipboardList,
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
  { to: "/services", label: "Services", icon: Store },
  { to: "/availability", label: "Availability", icon: CalendarDays },
  { to: "/bookings", label: "Bookings", icon: CalendarCheck, badge: "12" },
  { to: "/messages", label: "Messages", icon: Inbox, badge: "3" },
  { to: "/documents", label: "Documents", icon: FileCheck2 },
  { to: "/billing", label: "Billing", icon: Receipt },
];

const mobileNav = primaryNav.slice(0, 5);

export function BusinessShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-business-mist text-business-ink lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-business-line bg-white lg:block">
        <div className="flex h-20 items-center border-b border-business-line px-5">
          <img
            src="/images/careporter-for-business-logo.png"
            alt="CarePorter for Business"
            className="h-auto w-full max-w-[172px] object-contain"
          />
        </div>

        <nav className="grid gap-1 px-3 py-4">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === "/" ? location.pathname === item.to : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cx(
                  "flex min-h-10 items-center justify-between rounded-lg px-3 text-sm font-bold transition",
                  isActive ? "bg-business-mint text-business-ink" : "text-slate-600 hover:bg-business-mist hover:text-business-ink",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] text-business-sea">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mx-3 mt-4 rounded-lg border border-business-line bg-business-mist p-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Workspace</p>
          <p className="mt-2 text-sm font-black">{businessProfile.name}</p>
          <p className="mt-1 text-xs font-semibold text-slate-600">{businessProfile.suburb}</p>
        </div>
      </aside>

      <div className="min-w-0 pb-24 lg:pb-0">
        <header className="sticky top-0 z-40 border-b border-business-line bg-white/95 backdrop-blur-xl">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-7">
            <NavLink to="/" className="mr-auto flex items-center lg:hidden">
              <img
                src="/images/careporter-for-business-logo.png"
                alt="CarePorter for Business"
                className="h-auto w-[170px] object-contain"
              />
            </NavLink>
            <label className="hidden min-h-10 min-w-0 flex-1 max-w-xl items-center gap-2 rounded-lg border border-business-line bg-business-mist px-3 md:flex">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500"
                placeholder="Search bookings, clients, invoices..."
              />
            </label>
            <button
              type="button"
              title="Create"
              aria-label="Create"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-business-ink text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Notifications"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-business-line bg-white text-slate-700"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-business-coral px-1 text-[10px] font-black text-white">
                3
              </span>
            </button>
            <button
              type="button"
              className="hidden min-h-10 items-center gap-2 rounded-lg border border-business-line bg-white px-2 text-sm font-bold text-business-ink sm:flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-business-mint text-xs">AH</span>
              {businessProfile.owner}
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>
            <button
              type="button"
              title="Settings"
              aria-label="Settings"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-business-line bg-white text-slate-700 lg:flex"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 lg:px-7 lg:py-7">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-business-line bg-white px-2 py-2 lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === "/" ? location.pathname === item.to : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cx(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-bold",
                  isActive ? "bg-business-mint text-business-ink" : "text-slate-500",
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
