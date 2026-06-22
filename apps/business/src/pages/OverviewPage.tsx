import { CalendarPlus, CheckCircle2, Clock3, FileUp, ReceiptText, Send } from "lucide-react";
import { actionQueue, dashboardMetrics, invoices, serviceProfile, serviceRequests, todaySchedule } from "../data/businessData";
import { FieldLabel, Panel, PageHeader, StatusBadge, TextAction } from "../components/Primitives";

const metricIcon = [CalendarPlus, CheckCircle2, ReceiptText, FileUp];

function requestTone(status: string) {
  if (status === "New request") return "coral" as const;
  if (status === "In progress") return "sea" as const;
  if (status === "Approved to proceed") return "green" as const;
  return "slate" as const;
}

export function OverviewPage() {
  const overdueInvoices = invoices.filter((invoice) => invoice.status === "Overdue");

  return (
    <div>
      <PageHeader
        eyebrow="Vendor dashboard"
        title={serviceProfile.name}
        description="Confirm client requests, keep your availability current, complete services, and follow up invoices sent to care-provider finance contacts."
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
            <article key={metric.label} className="rounded-lg border border-business-line bg-white p-4 shadow-business">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-bold text-slate-600">{metric.label}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-business-sea">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 text-3xl font-black tracking-normal text-business-ink">{metric.value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{metric.detail}</p>
            </article>
          );
        })}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Needs your attention" action={<TextAction>View requests</TextAction>}>
          <div className="divide-y divide-business-line">
            {actionQueue.map((item) => (
              <div key={item.id} className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_150px_110px_auto] md:items-center">
                <div>
                  <h2 className="font-black text-business-ink">{item.title}</h2>
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
                  <h3 className="truncate text-sm font-black">{item.service}</h3>
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
                    <h3 className="font-black">{request.client}</h3>
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
                    <h3 className="font-black text-business-ink">{invoice.id} is overdue</h3>
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
              <h3 className="mt-2 font-black">When a service is complete</h3>
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
