import { CalendarCheck, Home, Search, UserRound } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { cx } from "../lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Search },
  { to: "/dashboard", label: "Dashboard", icon: CalendarCheck },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f4ecde] text-porter-ink">
      <header className="sticky top-0 z-40 bg-[#f4ecde]/94 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src="/images/careporter-logo.png"
              alt="CarePorter"
              className="h-8 w-auto object-contain sm:h-10"
            />
          </NavLink>
          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    "rounded-lg px-5 py-3 text-base font-semibold transition",
                    isActive ? "bg-[#d8aecf] text-[#111411]" : "text-porter-ink/82 hover:bg-white/55 hover:text-porter-ink",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f4ecde]/94 px-2 pb-2 pt-1 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-4">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold",
                    isActive ? "bg-[#d8aecf] text-[#111411]" : "text-porter-ink/65",
                  )
                }
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
