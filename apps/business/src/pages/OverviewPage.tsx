import { CalendarPlus, CheckCircle2, Clock3, FileUp, ReceiptText, Send, ShieldCheck } from "lucide-react";
import {
  actionQueue,
  dashboardMetrics,
  invoices,
  serviceProfile,
  serviceRequests,
  todaySchedule,
  vendorVerificationLevels,
} from "../data/businessData";
import { FieldLabel, Panel, PageHeader, StatusBadge, TextAction } from "../components/Primitives";

const metricIcon = [CalendarPlus, CheckCircle2, ReceiptText, FileUp];

function requestTone(status: string) {
  if (status === "New request") return "coral" as const;
  if (status === "In progress") return "sea" as const;
  if (status === "Approved to proceed") return "green" as const;
  return "slate" as const;
}

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

export function OverviewPage() {
  const overdueInvoices = invoices.filter((invoice) => invoice.status === "Overdue");
  const [verifiedLevel, agedCareReadyLevel] = vendorVerificationLevels;

  return (
    <div>
      <PageHeader
        eyebrow="Vendor dashboard"
        title={serviceProfile.name}
        description="Confirm client requests, keep your availability current, complete services, and level up verification to win more provider-managed work."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-business-ink px-3.5 text-sm font-medium text-white">
            <CalendarPlus className="h-4 w-4" />
            Update availability
          </button>
        }
      />

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const Icon = metricIcon[index];
          return (
            <article key={metric.label} className="rounded-lg border border-business-line bg-[#fffaf4] p-4 shadow-business">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-business-sea">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-business-ink">{metric.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{metric.detail}</p>
            </article>
          );
        })}
      </section>

      <Panel
        title="Trust framework"
        action={<TextAction>Upload documents</TextAction>}
        className="mt-5 bg-[#fffaf4]"
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Needs your attention" action={<TextAction>View requests</TextAction>}>
          <div className="divide-y divide-business-line">
            {actionQueue.map((item) => (
              <div key={item.id} className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_150px_110px_auto] md:items-center">
                <div>
                  <h2 className="font-semibold text-business-ink">{item.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.subject}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{item.meta}</p>
                </div>
                <p className="text-sm font-bold text-business-ink">{item.due}</p>
                <StatusBadge tone={item.tone}>{item.priority}</StatusBadge>
                <button className="min-h-9 rounded-full border border-black/[0.12] bg-white px-3 text-sm font-medium text-business-ink">
                  Open
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Today's services">
          <div className="divide-y divide-business-line">
            {todaySchedule.map((item) => (
              <div key={`${item.time}-${item.client}`} className="grid grid-cols-[54px_1fr_auto] gap-3 px-4 py-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-xs font-semibold text-business-sea">
                  {item.time}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{item.service}</h3>
                  <p className="mt-0.5 truncate text-xs font-semibold text-slate-600">{item.client} - {item.worker}</p>
                </div>
                <StatusBadge tone={item.status === "Needs confirmation" ? "coral" : item.status === "In progress" ? "sea" : "slate"}>
                  {item.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Latest requests">
          <div className="divide-y divide-business-line">
            {serviceRequests.slice(0, 3).map((request) => (
              <div key={request.id} className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{request.client}</h3>
                    <StatusBadge tone={requestTone(request.status)}>{request.status}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{request.service} - {request.date}, {request.time}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{request.notes}</p>
                </div>
                <button className="min-h-9 rounded-full bg-business-ink px-3 text-sm font-medium text-white">{request.action}</button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Invoice follow-up">
          <div className="grid gap-3 p-4">
            {overdueInvoices.map((invoice) => (
              <article key={invoice.id} className="rounded-lg border border-black/[0.08] bg-white p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-semibold text-business-ink">{invoice.id} is overdue</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      Sent to {invoice.sentTo} at {invoice.financeEmail}
                    </p>
                  </div>
                  <StatusBadge tone="coral">{invoice.expectedPayment}</StatusBadge>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <FieldLabel label="Client" value={invoice.client} />
                  <FieldLabel label="Due" value={invoice.dueDate} />
                  <FieldLabel label="Amount" value={`$${invoice.amount}`} />
                </div>
                <button className="mt-4 inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-business-ink px-3 text-sm font-medium text-white">
                  <Send className="h-4 w-4" />
                  Follow up finance
                </button>
              </article>
            ))}
            <article className="rounded-lg border border-business-line bg-white p-4">
              <Clock3 className="h-4 w-4 text-business-sea" />
              <h3 className="mt-2 font-semibold">When a service is complete</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tap complete, add notes or photos, and CarePorter generates the invoice using the care-provider approval and finance emails captured during the client request.
              </p>
            </article>
          </div>
        </Panel>
      </div>
    </div>
  );
}
