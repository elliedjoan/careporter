import { CheckCircle2, Download, MailWarning, ReceiptText, Send } from "lucide-react";
import { FieldLabel, PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { invoices } from "../data/businessData";
import { formatCurrency } from "../lib/utils";

function invoiceTone(status: string) {
  if (status === "Paid") return "green" as const;
  if (status === "Overdue") return "coral" as const;
  if (status === "Ready after completion") return "slate" as const;
  return "amber" as const;
}

export function InvoicesPage() {
  const overdueCount = invoices.filter((invoice) => invoice.status === "Overdue").length;
  const sentTotal = invoices
    .filter((invoice) => invoice.status === "Sent" || invoice.status === "Overdue")
    .reduce((total, invoice) => total + invoice.amount, 0);
  const paidTotal = invoices.filter((invoice) => invoice.status === "Paid").reduce((total, invoice) => total + invoice.amount, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Invoices and payments"
        title="Invoices"
        description="Track where each invoice was sent, when payment is expected, and which finance contacts need follow-up."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-business-line bg-white px-3.5 text-sm font-bold">
            <Download className="h-4 w-4" />
            Export
          </button>
        }
      />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { title: "Sent and due", value: formatCurrency(sentTotal), body: "Awaiting care-provider payment", icon: ReceiptText },
          { title: "Overdue follow-ups", value: `${overdueCount}`, body: "Vendor follows up finance directly", icon: MailWarning },
          { title: "Paid this period", value: formatCurrency(paidTotal), body: "Confirmed received", icon: CheckCircle2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-lg border border-business-line bg-white p-4 shadow-business">
              <Icon className="h-4 w-4 text-business-sea" />
              <p className="mt-4 text-3xl font-black">{item.value}</p>
              <h2 className="mt-1 text-sm font-black text-business-ink">{item.title}</h2>
              <p className="mt-1 text-xs font-semibold text-slate-500">{item.body}</p>
            </article>
          );
        })}
      </section>

      <Panel className="mt-5" title="Invoice tracker">
        <div className="divide-y divide-business-line">
          {invoices.map((invoice) => (
            <article key={`${invoice.id}-${invoice.client}`} className="px-4 py-4">
              <div className="grid gap-4 xl:grid-cols-[110px_1fr_180px_190px_140px_auto] xl:items-center">
                <FieldLabel label="Invoice" value={invoice.id} />
                <div>
                  <h2 className="font-black text-business-ink">{invoice.client}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{invoice.service} - {invoice.serviceDate}</p>
                </div>
                <FieldLabel label="Sent to" value={invoice.sentTo} />
                <div>
                  <FieldLabel label="Finance email" value={invoice.financeEmail} />
                  <p className="mt-1 text-xs font-semibold text-slate-500">Due {invoice.dueDate}</p>
                </div>
                <p className="text-sm font-black text-business-ink">{formatCurrency(invoice.amount)}</p>
                <StatusBadge tone={invoiceTone(invoice.status)}>{invoice.status}</StatusBadge>
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-lg border border-business-line bg-business-mist p-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm font-bold text-business-ink">Expected payment: {invoice.expectedPayment}</p>
                <div className="flex flex-wrap gap-2">
                  {invoice.status === "Overdue" && (
                    <button className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-business-ink px-3 text-sm font-bold text-white">
                      <Send className="h-4 w-4" />
                      Follow up
                    </button>
                  )}
                  <button className="min-h-9 rounded-lg border border-business-line bg-white px-3 text-sm font-bold">Open</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
