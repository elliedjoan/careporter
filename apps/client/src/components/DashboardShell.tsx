import {
  Bell,
  Calendar,
  ChevronDown,
  FileCheck2,
  Headphones,
  House,
  MapPin,
  MessageCircle,
  Search,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

const sidebarItems = [
  { to: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { to: "/dashboard/messages", label: "Messages", icon: MessageCircle, badge: "2" },
  { to: "/dashboard/approvals", label: "Approvals", icon: FileCheck2, badge: "1" },
  { to: "/dashboard/services", label: "Saved", icon: UsersRound },
  { to: "/dashboard/profile", label: "Profile", icon: UserRound },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8f1e8] pb-24 text-[#151917] lg:pb-0">
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] flex-col border-r border-black/[0.06] bg-white/70 shadow-[18px_0_60px_rgba(89,50,95,0.05)] backdrop-blur-xl lg:flex">
        <div className="flex h-[112px] items-center border-b border-black/[0.06] px-4">
          <img src="/images/careporter-logo.png" alt="CarePorter" className="h-auto w-full max-w-[188px] object-contain object-left" />
        </div>

        <nav className="grid gap-1.5 px-3 py-5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === "/dashboard" ? location.pathname === item.to : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={[
                  "flex min-h-10 items-center justify-between rounded-lg border px-3 text-left text-sm font-medium transition",
                  isActive
                    ? "border-[#ead2e8] bg-white text-[#151917] shadow-[0_12px_32px_rgba(89,50,95,0.08)]"
                    : "border-transparent text-slate-600 hover:bg-white/70 hover:text-[#151917]",
                ].join(" ")}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {item.label}
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

        <div className="mx-3 mb-5 mt-auto rounded-lg border border-white/80 bg-white/82 p-3 shadow-[0_14px_40px_rgba(89,50,95,0.06)]">
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

      <main className="min-w-0 lg:pl-[264px]">
        <header className="sticky top-0 z-20 hidden h-[112px] border-b border-black/[0.06] bg-[#f8f1e8]/82 backdrop-blur-xl lg:block">
          <div className="mx-auto flex h-full max-w-[1180px] items-center gap-3 px-4 sm:px-6 lg:px-7">
            <ClientServiceSearch />
            <DashboardTopActions />
          </div>
        </header>
        <header className="sticky top-0 z-30 border-b border-black/[0.08] bg-[#f8f1e8]/92 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <img src="/images/careporter-logo.png" alt="CarePorter" className="h-7 w-auto object-contain" />
            <DashboardTopActions compact />
          </div>
          <ClientServiceSearch compact />
        </header>
        <div className="mx-auto max-w-[1180px] px-4 py-4 sm:px-6 lg:px-7 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function ClientServiceSearch({ compact = false }: { compact?: boolean }) {
  return (
    <form
      action="/services"
      className={
        compact
          ? "mt-3 grid gap-2 rounded-2xl border border-white/80 bg-white/88 p-2 shadow-[0_12px_30px_rgba(89,50,95,0.07)]"
          : "hidden min-h-11 min-w-0 flex-1 max-w-2xl items-center overflow-hidden rounded-full border border-white/80 bg-white/86 shadow-[0_14px_38px_rgba(89,50,95,0.07)] md:flex"
      }
    >
      <label className={compact ? "flex min-h-10 items-center gap-2.5 px-2" : "flex min-w-0 flex-1 items-center gap-3 px-4"}>
        <Search className="h-4 w-4 shrink-0 text-[#7a3f8f]" />
        <span className="sr-only">Search support services</span>
        <input
          name="service"
          aria-label="Search support services"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111411] outline-none placeholder:text-slate-500"
          placeholder="Search support services"
        />
      </label>
      <span className={compact ? "h-px bg-black/[0.08]" : "h-6 w-px bg-black/[0.08]"} />
      <label className={compact ? "flex min-h-10 items-center gap-2.5 px-2" : "flex min-w-0 flex-[0.72] items-center gap-3 px-4"}>
        <MapPin className="h-4 w-4 shrink-0 text-[#7a3f8f]" />
        <span className="sr-only">Location</span>
        <input
          name="location"
          aria-label="Location"
          defaultValue="New Farm, QLD"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111411] outline-none placeholder:text-slate-500"
        />
      </label>
    </form>
  );
}

export function DashboardTopActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <NavLink
        to="/dashboard"
        end
        title="Home"
        aria-label="Home"
        className={({ isActive }) => [
          "flex h-11 w-11 items-center justify-center rounded-full border text-slate-700 shadow-[0_12px_30px_rgba(89,50,95,0.07)] transition hover:bg-white",
          isActive ? "border-[#d8aecf] bg-white text-[#111411]" : "border-white/80 bg-white/86",
        ].join(" ")}
      >
        <House className="h-4 w-4" />
      </NavLink>
      <button
        type="button"
        title="Notifications"
        aria-label="Notifications"
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/86 text-slate-700 shadow-[0_12px_30px_rgba(89,50,95,0.07)]"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7a3f8f] px-1 text-[10px] font-medium text-white">
          2
        </span>
      </button>
      <button
        type="button"
        className={[
          "min-h-11 items-center gap-2 rounded-full border border-white/80 bg-white/86 px-2.5 text-sm font-medium text-[#151917] shadow-[0_12px_30px_rgba(89,50,95,0.07)]",
          compact ? "hidden" : "hidden sm:flex",
        ].join(" ")}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d8aecf] text-xs font-medium text-[#111411]">MG</span>
        <span>Maggie</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
      </button>
      <button
        type="button"
        title="Settings"
        aria-label="Settings"
        className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/86 text-slate-700 shadow-[0_12px_30px_rgba(89,50,95,0.07)] lg:flex"
      >
        <Settings className="h-4 w-4" />
      </button>
    </div>
  );
}
