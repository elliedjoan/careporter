import { Navigate, Route, Routes } from "react-router-dom";
import { CheckCircle2, Download, LockKeyhole, MessageSquare, ReceiptText, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { launchMetrics, providerApprovalQueue, providerFeatureGates } from "@careporter/domain";
import { AppFrame, FieldLabel, MetricCard, PageHeader, PrimaryButton, SecondaryButton, StatusPill, Surface } from "@careporter/ui";

const navItems = [
  { label: "Overview", to: "/", end: true },
  { label: "Approvals", to: "/approvals" },
  { label: "Clients", to: "/clients" },
  { label: "Invoices", to: "/invoices" },
  { label: "Plan", to: "/plan" },
  { label: "Audit trail", to: "/audit" },
];

const providerInvoices = [
  { id: "INV-2052", client: "Joan Wallace", vendor: "Coast & Garden Support", amount: "$132", due: "27 Jun", status: "Ready to pay" },
  { id: "INV-2048", client: "Anne Morris", vendor: "Coast & Garden Support", amount: "$198", due: "Overdue 4 days", status: "Follow-up sent" },
  { id: "INV-2042", client: "Graham Reid", vendor: "Northside Home Care", amount: "$216", due: "Paid 19 Jun", status: "Paid" },
];

const providerClients = [
  { name: "Maggie Thompson", plan: "Home Care Package", bookings: "4 active", next: "Garden tidy-up awaiting approval" },
  { name: "Joan Wallace", plan: "Private care coordination", bookings: "2 active", next: "Transport confirmed" },
  { name: "Graham Reid", plan: "Self-managed package", bookings: "1 active", next: "Progress note pending" },
];

const auditEvents = [
  { time: "8 min ago", actor: "Emma Wilson", action: "Asked vendor a question", context: "APR-2401" },
  { time: "42 min ago", actor: "System", action: "Invoice status changed to ready", context: "INV-2052" },
  { time: "Yesterday", actor: "Noah Patel", action: "Approved provider-managed booking", context: "APR-2394" },
];

export function App() {
  return (
    <AppFrame appName="CarePorter for Providers" workspace="BrightPath Care Packages" navItems={navItems}>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppFrame>
  );
}

function OverviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Provider workspace"
        title="Approve care with confidence"
        description="Review provider-managed service requests, check progress, pay invoices, and upgrade when the provider team needs shared workflow controls."
        action={<PrimaryButton>Review urgent approvals</PrimaryButton>}
      />

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        {launchMetrics.provider.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} tone={index === 0 ? "coral" : index === 1 ? "sea" : "lavender"} />
        ))}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <Surface className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-[-0.03em] text-[#111411]">Approval queue</h2>
            <StatusPill tone="amber">Free workflow</StatusPill>
          </div>
          <div className="mt-4 divide-y divide-black/[0.07]">
            {providerApprovalQueue.map((approval) => (
              <ApprovalRow key={approval.id} approval={approval} />
            ))}
          </div>
        </Surface>

        <Surface className="p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-4 w-4 text-[#7a3f8f]" />
            <h2 className="text-lg font-semibold tracking-[-0.03em] text-[#111411]">Paid plan unlocks</h2>
          </div>
          <div className="mt-4 grid gap-3">
            <FeatureLock title="Team seats" body="Route approvals to finance, care coordinators, and managers." />
            <FeatureLock title="Bulk approvals" body="Approve repeat low-risk services without opening every booking." />
            <FeatureLock title="Reports and exports" body="Download provider spend, audit, and invoice reports." />
          </div>
          <PrimaryButton className="mt-5 w-full">Upgrade provider workspace</PrimaryButton>
        </Surface>
      </div>
    </div>
  );
}

function ApprovalsPage() {
  return (
    <div>
      <PageHeader
        title="Approvals"
        description="Provider-managed bookings that need approval before the vendor can confirm and deliver the service."
        action={<SecondaryButton>Approval history</SecondaryButton>}
      />
      <Surface className="mt-6 p-4 sm:p-5">
        <div className="grid gap-3">
          {providerApprovalQueue.map((approval) => (
            <article key={approval.id} className="rounded-xl border border-black/[0.08] bg-white p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-[-0.03em]">{approval.client}</h2>
                    <StatusPill tone={approval.status === "Approved" ? "green" : approval.status === "Question asked" ? "amber" : "coral"}>{approval.status}</StatusPill>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{approval.service} with {approval.vendor}</p>
                </div>
                <div className="flex gap-2">
                  <PrimaryButton>Approve</PrimaryButton>
                  <SecondaryButton>Ask question</SecondaryButton>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <FieldLabel label="Approval" value={approval.id} />
                <FieldLabel label="Requested by" value={approval.requestedBy} />
                <FieldLabel label="Estimate" value={approval.amount} />
                <FieldLabel label="Due" value={approval.due} />
              </div>
            </article>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function ClientsPage() {
  return (
    <div>
      <PageHeader title="Provider clients" description="Clients and family members connected to this provider workspace." />
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {providerClients.map((client) => (
          <Surface key={client.name} className="p-4">
            <UsersRound className="h-5 w-5 text-[#35665b]" />
            <h2 className="mt-4 text-lg font-semibold tracking-[-0.03em]">{client.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{client.plan}</p>
            <div className="mt-5 grid gap-3">
              <FieldLabel label="Bookings" value={client.bookings} />
              <FieldLabel label="Next action" value={client.next} />
            </div>
          </Surface>
        ))}
      </section>
    </div>
  );
}

function InvoicesPage() {
  return (
    <div>
      <PageHeader title="Invoices" description="Invoices generated after vendor completion and progress notes." action={<PrimaryButton>Pay selected</PrimaryButton>} />
      <Surface className="mt-6 p-4 sm:p-5">
        <div className="divide-y divide-black/[0.07]">
          {providerInvoices.map((invoice) => (
            <div key={invoice.id} className="grid gap-3 py-4 md:grid-cols-[110px_1fr_130px_150px_auto] md:items-center">
              <FieldLabel label="Invoice" value={invoice.id} />
              <div>
                <h2 className="text-sm font-semibold text-[#111411]">{invoice.client}</h2>
                <p className="mt-0.5 text-xs text-slate-500">{invoice.vendor}</p>
              </div>
              <p className="text-sm font-semibold">{invoice.amount}</p>
              <p className="text-sm text-slate-600">{invoice.due}</p>
              <StatusPill tone={invoice.status === "Paid" ? "green" : invoice.status === "Follow-up sent" ? "amber" : "sea"}>{invoice.status}</StatusPill>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function PlanPage() {
  return (
    <div>
      <PageHeader title="Provider plan" description="The free plan keeps approval and payment basics open. Paid features unlock team operations and reporting." />
      <Surface className="mt-6 overflow-hidden">
        <div className="grid bg-[#111411] p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-white/60">Current plan</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-[-0.05em]">Free provider workspace</h2>
          </div>
          <PrimaryButton className="mt-4 bg-white text-[#111411] md:mt-0">Upgrade to Growth</PrimaryButton>
        </div>
        <div className="divide-y divide-black/[0.07] p-4">
          {providerFeatureGates.map((feature) => (
            <div key={feature.feature} className="grid gap-3 py-3 md:grid-cols-[1fr_120px_120px] md:items-center">
              <p className="text-sm font-semibold">{feature.feature}</p>
              <StatusPill tone={feature.free ? "green" : "slate"}>{feature.free ? "Free" : "Locked"}</StatusPill>
              <StatusPill tone="lavender">Growth</StatusPill>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function AuditPage() {
  return (
    <div>
      <PageHeader title="Audit trail" description="Approval, invoice, and care-coordination actions for provider governance." action={<SecondaryButton><Download className="mr-2 inline h-4 w-4" />Export</SecondaryButton>} />
      <Surface className="mt-6 p-4 sm:p-5">
        <div className="divide-y divide-black/[0.07]">
          {auditEvents.map((event) => (
            <div key={`${event.time}-${event.context}`} className="grid gap-3 py-4 md:grid-cols-[120px_1fr_140px] md:items-center">
              <p className="text-sm font-semibold text-slate-500">{event.time}</p>
              <div>
                <h2 className="text-sm font-semibold">{event.action}</h2>
                <p className="mt-0.5 text-xs text-slate-500">{event.actor}</p>
              </div>
              <StatusPill tone="slate">{event.context}</StatusPill>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function ApprovalRow({ approval }: { approval: (typeof providerApprovalQueue)[number] }) {
  return (
    <div className="grid gap-3 py-4 md:grid-cols-[1fr_120px_130px_auto] md:items-center">
      <div>
        <h3 className="text-sm font-semibold text-[#111411]">{approval.service}</h3>
        <p className="mt-0.5 text-xs text-slate-500">{approval.client} - {approval.vendor}</p>
      </div>
      <p className="text-sm font-semibold">{approval.amount}</p>
      <StatusPill tone={approval.status === "Approved" ? "green" : approval.status === "Question asked" ? "amber" : "coral"}>{approval.status}</StatusPill>
      <PrimaryButton>Open</PrimaryButton>
    </div>
  );
}

function FeatureLock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[#ead8ec] bg-[#fbf7fb] p-3">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-4 w-4 text-[#7a3f8f]" />
        <div>
          <h3 className="text-sm font-semibold text-[#111411]">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">{body}</p>
        </div>
      </div>
    </div>
  );
}
