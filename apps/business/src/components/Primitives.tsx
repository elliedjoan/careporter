import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "../lib/utils";

type Tone = "sea" | "amber" | "coral" | "lavender" | "slate" | "green";

const badgeTone: Record<Tone, string> = {
  sea: "border-[#b9d8d0] bg-[#eef8f5] text-[#24594f]",
  amber: "border-[#efd7a3] bg-[#fff7e8] text-[#8a5a13]",
  coral: "border-[#f0c2ba] bg-[#fff1ee] text-[#9c3b2d]",
  lavender: "border-[#d8cce8] bg-[#f7f2fb] text-[#654b80]",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

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
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-business-sea">{eyebrow}</p>}
        <h1 className="mt-1 text-[2rem] font-black leading-tight tracking-normal text-business-ink sm:text-[2.35rem]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </header>
  );
}

export function Panel({
  children,
  className,
  title,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}) {
  return (
    <section className={cx("rounded-lg border border-business-line bg-white shadow-business", className)}>
      {(title || action) && (
        <div className="flex min-h-14 items-center justify-between gap-4 border-b border-business-line px-4">
          {title && <h2 className="text-sm font-black text-business-ink">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusBadge({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return <span className={cx("w-fit rounded-full border px-2.5 py-1 text-[11px] font-bold", badgeTone[tone])}>{children}</span>;
}

export function IconTextButton({
  children,
  icon,
  variant = "primary",
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-bold transition",
        variant === "primary"
          ? "bg-business-ink text-white hover:bg-business-graphite"
          : "border border-business-line bg-white text-business-ink hover:bg-business-mist",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function TextAction({ children }: { children: ReactNode }) {
  return (
    <button type="button" className="inline-flex items-center gap-1 text-[13px] font-bold text-business-sea">
      {children}
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}

export function FieldLabel({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <span className="mt-1 block text-sm font-bold text-business-ink">{value}</span>
    </p>
  );
}
