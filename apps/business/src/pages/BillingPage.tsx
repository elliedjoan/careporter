import { CreditCard, Download, ReceiptText } from "lucide-react";
import { FieldLabel, PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { invoices } from "../data/businessData";
import { formatCurrency } from "../lib/utils";

function invoiceTone(status: string) {
  if (status === "Paid" || status === "Approved") return "green" as const;
  return "amber" as const;
}

export function BillingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Revenue"
        title="Billing"
        description="Self-funded payments, package-funded invoices, payout readiness, and weekly revenue reconciliation."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-business-line bg-white px-3.5 text-sm font-bold">
            <Download className="h-4 w-4" />
            Export
          </button>
        }
      />

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { title: "Ready for payout", value: "$4,840", icon: CreditCard },
          { title: "Awaiting approval", value: "$1,216", icon: ReceiptText },
          { title: "Self-funded collected", value: "$2,392", icon: CreditCard },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-lg border border-business-line bg-white p-4 shadow-business">
              <Icon className="h-4 w-4 text-business-sea" />
              <p className="mt-4 text-3xl font-black">{item.value}</p>
              <h2 className="mt-1 text-sm font-black text-slate-600">{item.title}</h2>
            </article>
          );
        })}
      </section>

      <Panel className="mt-5" title="Recent invoices">
        <div className="divide-y divide-business-line">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="grid gap-4 px-4 py-4 md:grid-cols-[110px_1fr_150px_110px_auto] md:items-center">
              <FieldLabel label="Invoice" value={invoice.id} />
              <div>
                <h2 className="font-black text-business-ink">{invoice.client}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">{invoice.service}</p>
              </div>
              <FieldLabel label="Date" value={invoice.date} />
              <p className="text-sm font-black text-business-ink">{formatCurrency(invoice.amount)}</p>
              <StatusBadge tone={invoiceTone(invoice.status)}>{invoice.status}</StatusBadge>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
