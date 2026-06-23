import type { ReactNode } from "react";
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
}: {
  appName: string;
  workspace: string;
  navItems: Array<{ label: string; to: string; end?: boolean }>;
  children: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
}) {
  return (
    <div className="min-h-screen bg-[#f4ecde] text-[#17211f]">
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] border-r border-black/[0.08] bg-[#fbfaf7] px-4 py-5 lg:block">
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
                  "rounded-full border px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "border-[#d8aecf] bg-[#d8aecf]/62 text-[#111411] shadow-[0_10px_26px_rgba(89,50,95,0.08)]"
                    : "border-transparent text-slate-600 hover:bg-white/70 hover:text-[#111411]",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-[264px]">
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
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium",
                    isActive ? "border-[#d8aecf] bg-[#d8aecf] text-[#111411]" : "border-black/[0.08] bg-white text-slate-700",
                  )
                }
              >
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
