import { CheckCircle2, ExternalLink, MessageSquare, Send, SlidersHorizontal } from "lucide-react";
import { FieldLabel, PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { serviceRequests } from "../data/businessData";

function requestTone(status: string) {
  if (status === "New request") return "coral" as const;
  if (status === "Needs reply") return "amber" as const;
  if (status === "Approved to proceed") return "green" as const;
  if (status === "In progress") return "sea" as const;
  return "slate" as const;
}

export function RequestsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Client work"
        title="Requests"
        description="Review client service requests, confirm the visit, reply to notes, and mark completed services so invoices are generated."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-business-line bg-white px-3.5 text-sm font-bold">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        }
      />

      <Panel className="mt-6" title="Request queue">
        <div className="divide-y divide-business-line">
          {serviceRequests.map((request) => (
            <article key={request.id} className="px-4 py-4">
              <div className="grid gap-4 xl:grid-cols-[110px_1fr_190px_220px_auto] xl:items-start">
                <FieldLabel label="Request" value={request.id} />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-black text-business-ink">{request.client}</h2>
                    <StatusBadge tone={requestTone(request.status)}>{request.status}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    {request.service} - requested by {request.requestedBy}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{request.notes}</p>
                </div>
                <FieldLabel label="When" value={`${request.date}, ${request.time}`} />
                <div>
                  <FieldLabel label="Invoice recipient" value={request.careProvider} />
                  <p className="mt-1 text-xs font-semibold text-slate-500">{request.financeEmail}</p>
                </div>
                <button className="min-h-9 rounded-lg bg-business-ink px-3 text-sm font-bold text-white">{request.action}</button>
              </div>

              <div className="mt-4 grid gap-3 rounded-lg border border-business-line bg-business-mist p-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
                <FieldLabel label="Address area" value={request.address} />
                <FieldLabel label="Approval contact" value={request.approvalEmail} />
                <FieldLabel label="Finance contact" value={request.financeEmail} />
                <a
                  href={request.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#111411] px-3 text-xs font-black text-white"
                >
                  Open map
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          { label: "Confirm", value: "2", body: "New requests waiting for you", icon: CheckCircle2 },
          { label: "Reply", value: "1", body: "Client note needs an answer", icon: MessageSquare },
          { label: "Complete", value: "1", body: "Ready to create invoice", icon: Send },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-lg border border-business-line bg-white p-4 shadow-business">
              <Icon className="h-4 w-4 text-business-coral" />
              <p className="mt-3 text-3xl font-black">{item.value}</p>
              <h2 className="mt-1 text-sm font-black">{item.label}</h2>
              <p className="mt-1 text-xs font-semibold text-slate-500">{item.body}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
