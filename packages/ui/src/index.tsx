import type { ReactNode } from "react";
import { Bell, ChevronDown, Search, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type Tone = "ink" | "sea" | "lavender" | "coral" | "amber" | "green" | "slate";

const badgeTone: Record<Tone, string> = {
  ink: "border-[#111411]/20 bg-white text-[#111411]",
  sea: "border-black/[0.1] bg-white text-[#17211f]",
  lavender: "border-black/[0.1] bg-white text-[#17211f]",
  coral: "border-black/[0.1] bg-white text-[#17211f]",
  amber: "border-black/[0.1] bg-white text-[#17211f]",
  green: "border-black/[0.1] bg-white text-[#17211f]",
  slate: "border-black/[0.1] bg-white text-slate-700",
};

const badgeDot: Record<Tone, string> = {
  ink: "bg-[#111411]",
  sea: "bg-[#35665b]",
  lavender: "bg-[#7a3f8f]",
  coral: "bg-[#ef7f6d]",
  amber: "bg-[#d49a2e]",
  green: "bg-emerald-600",
  slate: "bg-slate-400",
};

export function StatusPill({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium", badgeTone[tone])}>
      <span className={cn("h-1.5 w-1.5 rounded-full", badgeDot[tone])} />
      {children}
    </span>
  );
}

export function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-black/[0.08] bg-white shadow-[0_14px_36px_rgba(15,23,42,0.045)]", className)}>
      {children}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b746f]">{eyebrow}</p>}
        <h1 className="mt-1 text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#111411] sm:text-[2.75rem]">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </header>
  );
}

export function MetricCard({ label, value, detail, tone = "sea" }: { label: string; value: string; detail: string; tone?: Tone }) {
  return (
    <Surface className="p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <span className={cn("mt-1 h-2 w-2 rounded-full", badgeDot[tone])} />
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[#111411]">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{detail}</p>
    </Surface>
  );
}

export function FieldLabel({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="block text-xs font-medium text-slate-500">{label}</span>
      <span className="mt-1 block text-sm font-semibold text-[#151917]">{value}</span>
    </p>
  );
}

export function PrimaryButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <button className={cn("min-h-10 rounded-full bg-[#111411] px-4 text-sm font-medium text-white transition hover:bg-[#2a302b]", className)}>{children}</button>;
}

export function SecondaryButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button className={cn("min-h-10 rounded-full border border-black/[0.12] bg-white px-4 text-sm font-medium text-[#151917] transition hover:border-black/20 hover:bg-[#fbfaf7]", className)}>
      {children}
    </button>
  );
}

export function AppFrame({
  appName,
  workspace,
  navItems,
  children,
  logoSrc,
  logoAlt,
  searchPlaceholder = "Search...",
  profileName,
  profileInitials = "CP",
  notificationCount,
}: {
  appName: string;
  workspace: string;
  navItems: Array<{ label: string; to: string; end?: boolean; icon?: ReactNode; homeIconOnly?: boolean; badge?: string }>;
  children: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  searchPlaceholder?: string;
  profileName?: string;
  profileInitials?: string;
  notificationCount?: string;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8f1e8_0%,#fffaf5_48%,#f7edf8_100%)] text-[#17211f]">
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] border-r border-black/[0.06] bg-white/70 px-4 py-5 shadow-[18px_0_60px_rgba(89,50,95,0.05)] backdrop-blur-xl lg:block">
        <div className={cn("flex", logoSrc ? "flex-col items-start gap-3" : "items-center gap-3")}>
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt ?? appName} className="h-auto w-full max-w-[178px] object-contain" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111411] text-sm font-semibold text-white">CP</span>
          )}
          <div>
            {!logoSrc && <p className="text-sm font-semibold text-[#111411]">{appName}</p>}
            <p className="text-xs font-medium text-slate-500">{workspace}</p>
          </div>
        </div>
        <nav className="mt-8 grid gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex min-h-10 items-center rounded-lg border text-sm font-medium transition",
                  item.homeIconOnly ? "w-10 justify-center px-0" : "justify-between px-3",
                  isActive
                    ? "border-[#ead2e8] bg-white text-[#111411] shadow-[0_12px_32px_rgba(89,50,95,0.08)]"
                    : "border-transparent text-slate-600 hover:bg-white/70 hover:text-[#111411]",
                )
              }
              title={item.homeIconOnly ? item.label : undefined}
              aria-label={item.homeIconOnly ? item.label : undefined}
            >
              <span className="flex items-center gap-2.5">
                {item.icon}
                {!item.homeIconOnly && item.label}
              </span>
              {item.badge && !item.homeIconOnly && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f1dced] px-1.5 text-[11px] font-semibold text-[#633475]">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 hidden border-b border-black/[0.06] bg-[#f8f1e8]/82 px-4 py-3 backdrop-blur-xl lg:block">
          <div className="mx-auto flex min-h-12 max-w-7xl items-center gap-3 lg:px-4">
            <label className="flex min-h-11 min-w-0 flex-1 max-w-2xl items-center gap-3 rounded-full border border-white/80 bg-white/86 px-4 shadow-[0_14px_38px_rgba(89,50,95,0.07)]">
              <Search className="h-4 w-4 text-[#7a3f8f]" />
              <input
                aria-label={searchPlaceholder}
                className="w-full bg-transparent text-sm font-medium text-[#111411] outline-none placeholder:text-slate-500"
                placeholder={searchPlaceholder}
              />
            </label>
            <button
              type="button"
              title="Notifications"
              aria-label="Notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/86 text-slate-700 shadow-[0_12px_30px_rgba(89,50,95,0.07)]"
            >
              <Bell className="h-4 w-4" />
              {notificationCount && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#111411] px-1 text-[10px] font-semibold text-white">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="hidden min-h-11 items-center gap-2 rounded-full border border-white/80 bg-white/86 px-2.5 text-sm font-medium text-[#111411] shadow-[0_12px_30px_rgba(89,50,95,0.07)] xl:flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111411] text-xs font-semibold text-white">{profileInitials}</span>
              {profileName ?? workspace}
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>
            <button
              type="button"
              title="Settings"
              aria-label="Settings"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/86 text-slate-700 shadow-[0_12px_30px_rgba(89,50,95,0.07)]"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>
        <header className="sticky top-0 z-10 border-b border-black/[0.08] bg-[#f4ecde]/92 px-4 py-3 backdrop-blur lg:hidden">
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt ?? appName} className="h-auto w-[176px] object-contain" />
          ) : (
            <p className="text-sm font-semibold">{appName}</p>
          )}
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium",
                    isActive ? "border-[#d8aecf] bg-white text-[#111411]" : "border-black/[0.08] bg-white/80 text-slate-700",
                  )
                }
              >
                {item.icon && <span className="mr-1 inline-flex align-middle">{item.icon}</span>}
                {item.label}
              </NavLink>
            ))}
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export function Timeline({
  items,
  activeIndex,
}: {
  items: Array<{ label: string; description: string }>;
  activeIndex: number;
}) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item.label} className="grid grid-cols-[28px_1fr] gap-3">
          <span
            className={cn(
              "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
              index <= activeIndex ? "border-[#111411] bg-[#111411] text-white" : "border-black/[0.12] bg-white text-slate-500",
            )}
          >
            {index + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-[#111411]">{item.label}</p>
            <p className="mt-0.5 text-xs leading-5 text-slate-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
