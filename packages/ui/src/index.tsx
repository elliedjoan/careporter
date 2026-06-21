import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type Tone = "ink" | "sea" | "lavender" | "coral" | "amber" | "green" | "slate";

const badgeTone: Record<Tone, string> = {
  ink: "border-[#111411] bg-[#111411] text-white",
  sea: "border-[#bad5cc] bg-[#eef7f2] text-[#23554c]",
  lavender: "border-[#ead8ec] bg-[#fbf7fb] text-[#7a3f8f]",
  coral: "border-[#f0c2ba] bg-[#fff1ee] text-[#a33b2d]",
  amber: "border-[#efd58d] bg-[#fffaf0] text-[#945f08]",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
};

export function StatusPill({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return <span className={cn("w-fit rounded-full border px-2.5 py-1 text-[11px] font-semibold", badgeTone[tone])}>{children}</span>;
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
    <Surface className="p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600">{label}</p>
        <StatusPill tone={tone}>{label.split(" ")[0]}</StatusPill>
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
  return <button className={cn("min-h-10 rounded-lg bg-[#111411] px-4 text-sm font-semibold text-white", className)}>{children}</button>;
}

export function SecondaryButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button className={cn("min-h-10 rounded-lg border border-black/[0.1] bg-white px-4 text-sm font-semibold text-[#151917]", className)}>
      {children}
    </button>
  );
}

export function AppFrame({
  appName,
  workspace,
  navItems,
  children,
}: {
  appName: string;
  workspace: string;
  navItems: Array<{ label: string; to: string; end?: boolean }>;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f7f4] text-[#17211f]">
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] border-r border-black/[0.08] bg-white px-4 py-5 lg:block">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d8aecf] text-sm font-black text-[#111411]">CP</span>
          <div>
            <p className="text-sm font-semibold text-[#111411]">{appName}</p>
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
                  "rounded-lg px-3 py-2.5 text-sm font-semibold transition",
                  isActive ? "bg-[#111411] text-white" : "text-slate-600 hover:bg-[#f3f0ea] hover:text-[#111411]",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-10 border-b border-black/[0.08] bg-white/88 px-4 py-3 backdrop-blur lg:hidden">
          <p className="text-sm font-semibold">{appName}</p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold", isActive ? "bg-[#111411] text-white" : "bg-[#f3f0ea] text-slate-700")
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
