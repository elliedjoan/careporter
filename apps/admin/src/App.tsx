import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AlertTriangle, Banknote, Building2, CalendarCheck, FileCheck2, House } from "lucide-react";
import { adminVerificationQueue } from "@careporter/domain";
import { AppFrame, FieldLabel, PageHeader, PrimaryButton, SecondaryButton, StatusPill, Surface } from "@careporter/ui";

const navItems = [
  { label: "Home", to: "/", end: true, icon: <House className="h-4 w-4" />, homeIconOnly: true },
  { label: "Verification", to: "/verification", icon: <FileCheck2 className="h-4 w-4" />, badge: "3" },
  { label: "Bookings", to: "/bookings", icon: <CalendarCheck className="h-4 w-4" /> },
  { label: "Providers", to: "/providers", icon: <Building2 className="h-4 w-4" /> },
  { label: "Payments", to: "/payments", icon: <Banknote className="h-4 w-4" />, badge: "2" },
  { label: "Risks", to: "/risks", icon: <AlertTriangle className="h-4 w-4" />, badge: "3" },
];

const overviewTiles = [
  { title: "Verification", to: "/verification", badge: "Action required" },
  { title: "Bookings", to: "/bookings", badge: "3 active" },
  { title: "Providers", to: "/providers" },
  { title: "Payments", to: "/payments", badge: "Action required" },
  { title: "Risks", to: "/risks", badge: "Action required" },
];

const adminBookings = [
  { id: "CP-1042", client: "Maggie Thompson", pathway: "Provider managed", vendor: "Kindway Transport", status: "Provider approved", risk: "Low" },
  { id: "CP-1038", client: "Joan Wallace", pathway: "Private pay", vendor: "Northside Home Care", status: "Vendor confirmed", risk: "Low" },
  { id: "CP-1025", client: "Anne Morris", pathway: "Provider managed", vendor: "Coast & Garden Support", status: "Invoice overdue", risk: "High" },
];

const providerPilots = [
  { name: "BrightPath Care Packages", plan: "Free", clients: "18", status: "Pilot active" },
  { name: "Harbour Care Services", plan: "Growth trial", clients: "32", status: "Contract review" },
  { name: "Sunrise Home Care", plan: "Free", clients: "9", status: "Onboarding" },
];

const paymentEvents = [
  { id: "PAY-884", amount: "$198", source: "BrightPath Care", destination: "Coast & Garden Support", commission: "$17.82", status: "Overdue" },
  { id: "PAY-883", amount: "$132", source: "Harbour Care", destination: "Coast & Garden Support", commission: "$11.88", status: "Pending payout" },
  { id: "PAY-882", amount: "$216", source: "Private pay", destination: "Northside Home Care", commission: "$19.44", status: "Paid" },
];

export function App() {
  return (
    <AppFrame
      appName="CarePorter Admin"
      workspace="Internal operations"
      navItems={navItems}
      searchPlaceholder="Search vendors, bookings, providers..."
      profileName="CarePorter Admin"
      profileInitials="CP"
      notificationCount="3"
    >
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/risks" element={<RisksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppFrame>
  );
}

function OverviewPage() {
  return (
    <div>
      <section className="grid max-w-4xl gap-3 sm:grid-cols-2">
        {overviewTiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="relative flex min-h-[8.75rem] items-center justify-center overflow-hidden rounded-lg border border-white/80 bg-[linear-gradient(135deg,#fffbf4_0%,#f8efe3_52%,#f4e5ef_100%)] p-6 text-center text-[#111411] shadow-[0_22px_58px_rgba(89,50,95,0.105)] transition duration-200 before:absolute before:inset-0 before:bg-[linear-gradient(145deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0)_48%)] before:content-[''] hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(89,50,95,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aecf]"
          >
            <span className="relative z-10 flex flex-col items-center justify-center gap-3">
              <span className="text-[1.35rem] font-semibold leading-none tracking-[-0.045em] sm:text-[1.5rem]">{tile.title}</span>
              {tile.badge && (
                <span className="rounded-full border border-[#decdb8] bg-white/65 px-3 py-1 text-[11px] font-semibold leading-none tracking-normal text-[#6b5848] shadow-[0_8px_18px_rgba(89,50,95,0.07)]">
                  {tile.badge}
                </span>
              )}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

function VerificationPage() {
  return (
    <div>
      <PageHeader title="Vendor verification" description="ABN, insurance, police check, Aged Care Ready review, onboarding call, and ongoing monitoring." />
      <Surface className="mt-6 p-4 sm:p-5">
        <div className="grid gap-3">
          {adminVerificationQueue.map((item) => (
            <article key={item.id} className="rounded-xl border border-black/[0.08] bg-white p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-[-0.03em]">{item.business}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.category}</p>
                </div>
                <div className="flex gap-2">
                  <PrimaryButton>Approve</PrimaryButton>
                  <SecondaryButton>Request info</SecondaryButton>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <FieldLabel label="Case" value={item.id} />
                <FieldLabel label="Checks" value={item.checks} />
                <FieldLabel label="Status" value={item.status} />
                <StatusPill tone={item.risk === "High" ? "coral" : item.risk === "Medium" ? "amber" : "green"}>{item.risk} risk</StatusPill>
              </div>
            </article>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function BookingsPage() {
  return (
    <div>
      <PageHeader title="Bookings" description="Marketplace booking state across clients, providers, vendors, approvals, progress notes, invoices, and payments." />
      <Surface className="mt-6 p-4 sm:p-5">
        <div className="divide-y divide-black/[0.07]">
          {adminBookings.map((booking) => (
            <div key={booking.id} className="grid gap-3 py-4 md:grid-cols-[110px_1fr_170px_150px_90px] md:items-center">
              <FieldLabel label="Booking" value={booking.id} />
              <div>
                <h2 className="text-sm font-semibold">{booking.client}</h2>
                <p className="mt-0.5 text-xs text-slate-500">{booking.vendor}</p>
              </div>
              <p className="text-sm font-semibold">{booking.pathway}</p>
              <p className="text-sm text-slate-600">{booking.status}</p>
              <StatusPill tone={booking.risk === "High" ? "coral" : "green"}>{booking.risk}</StatusPill>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function ProvidersPage() {
  return (
    <div>
      <PageHeader title="Provider pilots" description="Care/package provider organizations using the free or paid CarePorter provider workflow." action={<PrimaryButton>Add provider</PrimaryButton>} />
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {providerPilots.map((provider) => (
          <Surface key={provider.name} className="p-4">
            <Building2 className="h-5 w-5 text-[#35665b]" />
            <h2 className="mt-4 text-lg font-semibold tracking-[-0.03em]">{provider.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{provider.clients} clients</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatusPill tone={provider.plan === "Free" ? "slate" : "lavender"}>{provider.plan}</StatusPill>
              <StatusPill tone="sea">{provider.status}</StatusPill>
            </div>
          </Surface>
        ))}
      </section>
    </div>
  );
}

function PaymentsPage() {
  return (
    <div>
      <PageHeader title="Payments and commission" description="Stripe Connect payout status, Provider SaaS subscriptions, marketplace commission, and failed payments." />
      <Surface className="mt-6 p-4 sm:p-5">
        <div className="divide-y divide-black/[0.07]">
          {paymentEvents.map((event) => (
            <div key={event.id} className="grid gap-3 py-4 md:grid-cols-[100px_120px_1fr_120px_140px] md:items-center">
              <FieldLabel label="Payment" value={event.id} />
              <p className="text-sm font-semibold">{event.amount}</p>
              <div>
                <h2 className="text-sm font-semibold">{event.source}</h2>
                <p className="mt-0.5 text-xs text-slate-500">to {event.destination}</p>
              </div>
              <FieldLabel label="Commission" value={event.commission} />
              <StatusPill tone={event.status === "Paid" ? "green" : event.status === "Overdue" ? "coral" : "amber"}>{event.status}</StatusPill>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function RisksPage() {
  return (
    <div>
      <PageHeader title="Risk and complaints" description="Operational items needing human review before launch scale." action={<SecondaryButton>Export queue</SecondaryButton>} />
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <RiskCard title="Late payment follow-up" body="Vendor has followed up BrightPath finance twice without payment confirmation." tone="coral" />
        <RiskCard title="Safeguarding note" body="Progress note contains a mobility concern flagged for admin review." tone="amber" />
        <RiskCard title="Policy review" body="Non-circumvention and commission clauses need legal approval before provider pilot scale." tone="lavender" />
      </section>
    </div>
  );
}

function VerificationRow({ item }: { item: (typeof adminVerificationQueue)[number] }) {
  return (
    <div className="grid gap-3 py-4 md:grid-cols-[1fr_150px_120px_auto] md:items-center">
      <div>
        <h3 className="text-sm font-semibold text-[#111411]">{item.business}</h3>
        <p className="mt-0.5 text-xs text-slate-500">{item.checks}</p>
      </div>
      <p className="text-sm text-slate-600">{item.category}</p>
      <StatusPill tone={item.risk === "High" ? "coral" : item.risk === "Medium" ? "amber" : "green"}>{item.risk}</StatusPill>
      <PrimaryButton>Open</PrimaryButton>
    </div>
  );
}

function RiskCard({ title, body, tone }: { title: string; body: string; tone: "coral" | "amber" | "lavender" }) {
  const Icon = tone === "coral" ? AlertTriangle : tone === "amber" ? FileCheck2 : Banknote;
  return (
    <Surface className="p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3f0ea] text-[#111411]">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <StatusPill tone={tone}>{tone === "coral" ? "High" : tone === "amber" ? "Medium" : "Watch"}</StatusPill>
          <h2 className="mt-3 text-base font-semibold tracking-[-0.03em]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
        </div>
      </div>
    </Surface>
  );
}
