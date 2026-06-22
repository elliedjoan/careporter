import type { ReactNode } from "react";
import { ArrowRight, ExternalLink, MapPinned, Navigation } from "lucide-react";
import { cx } from "../lib/utils";

type Tone = "sea" | "amber" | "coral" | "lavender" | "slate" | "green";

const badgeTone: Record<Tone, string> = {
  sea: "border-black/[0.1] bg-white text-business-ink",
  amber: "border-black/[0.1] bg-white text-business-ink",
  coral: "border-black/[0.1] bg-white text-business-ink",
  lavender: "border-black/[0.1] bg-white text-business-ink",
  slate: "border-black/[0.1] bg-white text-slate-700",
  green: "border-black/[0.1] bg-white text-business-ink",
};

const badgeDot: Record<Tone, string> = {
  sea: "bg-business-sea",
  amber: "bg-business-amber",
  coral: "bg-business-coral",
  lavender: "bg-[#7a3f8f]",
  slate: "bg-slate-400",
  green: "bg-emerald-600",
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
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-business-sea">{eyebrow}</p>}
        <h1 className="mt-1 text-[2.1rem] font-semibold leading-[1] tracking-[-0.055em] text-business-ink sm:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">{description}</p>
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
    <section className={cx("overflow-hidden rounded-lg border border-business-line bg-business-cream shadow-business", className)}>
      {(title || action) && (
        <div className="flex min-h-14 items-center justify-between gap-4 border-b border-business-line bg-white px-4">
          {title && <h2 className="text-sm font-semibold text-business-ink">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusBadge({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={cx("inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium", badgeTone[tone])}>
      <span className={cx("h-1.5 w-1.5 rounded-full", badgeDot[tone])} />
      {children}
    </span>
  );
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
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-3.5 text-sm font-medium transition",
        variant === "primary"
          ? "bg-business-ink text-white shadow-[0_10px_24px_rgba(11,13,12,0.12)] hover:bg-business-graphite"
          : "border border-black/[0.12] bg-white text-business-ink hover:border-black/20 hover:bg-[#fbfaf7]",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function TextAction({ children }: { children: ReactNode }) {
  return (
    <button type="button" className="inline-flex items-center gap-1 text-[13px] font-medium text-business-ink">
      {children}
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}

export function FieldLabel({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">{label}</span>
      <span className="mt-1 block text-sm font-semibold text-business-ink">{value}</span>
    </p>
  );
}

export function MapPreview({
  title,
  subtitle,
  googleMapsUrl,
  className,
}: {
  title: string;
  subtitle: string;
  googleMapsUrl: string;
  className?: string;
}) {
  return (
    <section className={cx("overflow-hidden rounded-lg border border-business-line bg-white shadow-business", className)}>
      <div className="relative min-h-[18rem] p-4">
        <div className="absolute inset-0 bg-business-mist">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(23,33,31,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(23,33,31,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
        <div className="absolute left-[10%] top-[26%] h-2 w-[76%] -rotate-12 rounded-full bg-business-lavender" />
        <div className="absolute left-[30%] top-[12%] h-2 w-[52%] rotate-45 rounded-full bg-business-mint" />
        <div className="absolute bottom-[24%] left-[16%] h-2 w-[66%] rotate-6 rounded-full bg-white" />
        <span className="absolute left-[20%] top-[36%] flex h-10 w-10 items-center justify-center rounded-full bg-white text-business-ink shadow-lift">
          <MapPinned className="h-5 w-5" />
        </span>
        <span className="absolute right-[20%] top-[48%] flex h-10 w-10 items-center justify-center rounded-full bg-[#111411] text-white shadow-lift">
          <Navigation className="h-5 w-5" />
        </span>

        <div className="relative flex min-h-[16rem] flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-business-sea">Map placeholder</p>
            <h2 className="mt-2 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.04em] text-business-ink">{title}</h2>
            <p className="mt-3 max-w-sm rounded-lg bg-white/88 p-3 text-sm leading-6 text-business-ink/72 shadow-sm">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm rounded-lg bg-white/88 p-3 text-xs font-medium leading-5 text-business-ink/56 shadow-sm">
              Supabase later stores service-area polygons, request coordinates, and the Google Maps deep link.
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#111411] px-3.5 text-sm font-medium text-white"
            >
              Open in Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
