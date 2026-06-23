import { CalendarCheck, Search, UserRound } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cx } from "../lib/utils";

const nav = [
  { to: "/services", label: "Book", icon: Search, active: ["/services", "/book"] },
  { to: "/dashboard", label: "Dashboard", icon: CalendarCheck, active: ["/dashboard"] },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f4ecde] text-porter-ink">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[#f4ecde]/94 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src="/images/careporter-logo.png"
              alt="CarePorter"
              className="h-8 w-auto object-contain"
            />
          </NavLink>
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const isActive = item.active?.some((path) => location.pathname.startsWith(path)) ?? location.pathname === item.to;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cx(
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "border-[#d8aecf] bg-[#d8aecf]/65 text-[#111411] shadow-[0_10px_26px_rgba(89,50,95,0.08)]"
                      : "border-transparent text-porter-ink/72 hover:bg-white/70 hover:text-porter-ink",
                  )}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f4ecde]/94 px-2 pb-2 pt-1 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = item.active?.some((path) => location.pathname.startsWith(path)) ?? location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cx(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-full text-xs font-medium",
                  isActive ? "bg-[#d8aecf] text-[#111411]" : "text-porter-ink/65",
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
