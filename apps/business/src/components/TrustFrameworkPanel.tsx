import { CheckCircle2, ShieldCheck } from "lucide-react";
import { vendorVerificationLevels } from "../data/businessData";
import { Panel, StatusBadge, TextAction } from "./Primitives";

function RequirementList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-business-ink">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-business-sea" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrustFrameworkPanel({ className = "" }: { className?: string }) {
  const [verifiedLevel, agedCareReadyLevel] = vendorVerificationLevels;

  return (
    <Panel
      title="Trust framework"
      action={<TextAction>Upload documents</TextAction>}
      className={["bg-[#fffaf4]", className].filter(Boolean).join(" ")}
    >
      <div className="grid gap-4 p-4 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-lg border border-business-line bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-business-mint text-business-sea">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Level 1</p>
                <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-business-ink">
                  {verifiedLevel.name}
                </h2>
              </div>
            </div>
            <StatusBadge tone={verifiedLevel.tone}>{verifiedLevel.status}</StatusBadge>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">{verifiedLevel.summary}</p>
          <RequirementList items={verifiedLevel.checks} />
        </article>

        <article className="rounded-lg border border-[#d8aecf] bg-[#fbf7fb] p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8aecf] text-business-ink">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#7a3f8f]">Level 2</p>
                <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-business-ink">
                  {agedCareReadyLevel.name}
                </h2>
              </div>
            </div>
            <StatusBadge tone={agedCareReadyLevel.tone}>{agedCareReadyLevel.status}</StatusBadge>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">{agedCareReadyLevel.summary}</p>
          <RequirementList items={agedCareReadyLevel.checks} />
          <button className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-business-ink px-3.5 text-sm font-medium text-white">
            Start Aged Care Ready
          </button>
        </article>

        <article className="rounded-lg border border-dashed border-[#d8aecf] bg-white p-5 xl:col-span-2">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#7a3f8f]">Future</p>
              <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-business-ink">
                CarePorter Preferred
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Complete Aged Care Ready to build provider confidence now. Preferred will become the future badge for
              high-performing vendors with strong completion, review, and response history.
            </p>
          </div>
        </article>
      </div>
    </Panel>
  );
}
