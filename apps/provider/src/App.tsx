import { Link, Navigate, Route, Routes } from "react-router-dom";
import { ClipboardCheck, CreditCard, Download, History, House, Receipt, UsersRound } from "lucide-react";
import { getTimeOfDayGreeting, providerApprovalQueue, providerFeatureGates } from "@careporter/domain";
import { AppFrame, FieldLabel, PageHeader, PrimaryButton, SecondaryButton, StatusPill, Surface } from "@careporter/ui";

const navItems = [
  { label: "Home", to: "/", end: true, icon: <House className="h-4 w-4" />, homeIconOnly: true },
  { label: "Approvals", to: "/approvals", icon: <ClipboardCheck className="h-4 w-4" />, badge: "3" },
  { label: "Clients", to: "/clients", icon: <UsersRound className="h-4 w-4" /> },
  { label: "Invoices", to: "/invoices", icon: <Receipt className="h-4 w-4" />, badge: "2" },
  { label: "Plan", to: "/plan", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Audit trail", to: "/audit", icon: <History className="h-4 w-4" /> },
];

const overviewTiles = [
  { title: "Approvals", to: "/approvals", badge: "Action required" },
  { title: "Clients", to: "/clients" },
  { title: "Invoices", to: "/invoices", badge: "2 due" },
  { title: "Plan", to: "/plan" },
  { title: "Audit trail", to: "/audit", badge: "3 new" },
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
    <AppFrame
      appName="CarePorter for Providers"
      workspace="BrightPath Care Packages"
      navItems={navItems}
      logoSrc="/images/careporter-for-providers-logo.png"
      logoAlt="CarePorter for Providers"
      searchPlaceholder="Search approvals, clients, invoices..."
      profileName="BrightPath"
      profileInitials="BC"
      notificationCount="3"
    >
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
      <h1 className="text-[1.8rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[#111411] sm:text-[2.2rem]">
        {getTimeOfDayGreeting()}, BrightPath Care Packages
      </h1>

      <section className="mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
        {overviewTiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="relative flex min-h-[7.5rem] items-center justify-center overflow-hidden rounded-lg border border-white/80 bg-[linear-gradient(135deg,#fffaf1_0%,#f3eadb_56%,#e9dcc8_100%)] p-5 text-center text-[1.05rem] font-semibold tracking-[-0.025em] text-[#111411] shadow-[0_18px_48px_rgba(89,50,95,0.065)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(89,50,95,0.1)]"
          >
            <span className="relative z-10">{tile.title}</span>
            {tile.badge && (
              <span className="absolute bottom-3 right-3 z-10 rounded-full border border-[#d8c7ad] bg-white/82 px-2.5 py-1 text-[11px] font-semibold tracking-normal text-[#5c4b39] shadow-sm">
                {tile.badge}
              </span>
            )}
          </Link>
        ))}
      </section>
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

