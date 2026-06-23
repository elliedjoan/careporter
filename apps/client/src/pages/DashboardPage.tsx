import {
  Calendar,
  CreditCard,
  Download,
  FileText,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DashboardShell, DashboardTopActions } from "../components/DashboardShell";
import { services } from "../data/mockData";

const transportImage = services.find((service) => service.id === "transport")?.image ?? "/images/services/transport.png";
const cleaningImage = services.find((service) => service.id === "cleaning")?.image ?? "/images/services/cleaning.png";
const gardeningImage = services.find((service) => service.id === "gardening")?.image ?? "/images/services/gardening.png";
const mealsImage = services.find((service) => service.id === "meals")?.image ?? "/images/services/meals.png";

const upcomingServices = [
  {
    day: "18",
    month: "Jun",
    service: "Transport",
    serviceName: "Kindway Transport",
    status: "Confirmed",
    time: "9:15 am",
    note: "Door-to-door appointment trip",
  },
  {
    day: "22",
    month: "Jun",
    service: "Garden maintenance",
    serviceName: "Coast & Garden Support",
    status: "Scheduled",
    time: "10:00 am",
    note: "Seasonal tidy-up and safety check",
  },
  {
    day: "28",
    month: "Jun",
    service: "Home cleaning",
    serviceName: "Northside Home Care",
    status: "Pending",
    time: "11:00 am",
    note: "Awaiting provider approval",
  },
];

const recentUpdates = [
  {
    sender: "Northside Home Care",
    summary: "Maggie's regular cleaning service can attend next Friday once approval is confirmed.",
    time: "2h ago",
    image: cleaningImage,
    action: "Review",
  },
  {
    sender: "Coast & Garden Support",
    summary: "Garden tidy-up completed. Photos, progress note and follow-up recommendations were added.",
    time: "Yesterday",
    image: gardeningImage,
    action: "Open progress note",
  },
  {
    sender: "BrightPath Care",
    summary: "Package-provider approval request received for the upcoming transport booking.",
    time: "2 days ago",
    image: null,
    action: "View approval",
  },
];

const activeServices = [
  { name: "Kindway Transport", category: "Transport", rating: "4.9", last: "2 days ago", next: "18 Jun", image: transportImage },
  { name: "Northside Home Care", category: "Cleaning", rating: "4.8", last: "5 days ago", next: "28 Jun", image: cleaningImage },
  { name: "Coast & Garden Support", category: "Gardening", rating: "4.9", last: "1 week ago", next: "22 Jun", image: gardeningImage },
];

const approvals = [
  {
    title: "Transport service approval",
    service: "Kindway Transport",
    packageProvider: "BrightPath Care",
    requested: "2 days ago",
    amount: "$84 estimated",
    status: "Awaiting confirmation",
  },
  {
    title: "Home cleaning approval",
    service: "Northside Home Care",
    packageProvider: "BrightPath Care",
    requested: "Yesterday",
    amount: "$116 estimated",
    status: "Draft saved",
  },
];

const messages = [
  {
    sender: "Northside Home Care",
    type: "Cleaning service",
    message: "Maggie's regular cleaning service is available next Friday if the provider approval is confirmed.",
    time: "2h ago",
    unread: true,
    image: cleaningImage,
  },
  {
    sender: "BrightPath Care",
    type: "Provider",
    message: "Approval request received for the upcoming transport service. Please confirm the service details.",
    time: "2 days ago",
    unread: true,
    image: null,
  },
  {
    sender: "Coast & Garden Support",
    type: "Gardening service",
    message: "The garden tidy-up is complete. Notes and follow-up photos have been added to Documents.",
    time: "Yesterday",
    unread: false,
    image: gardeningImage,
  },
];

const invoices = [
  { id: "INV-1084", service: "Transport", serviceName: "Kindway Transport", date: "18 Jun 2026", amount: "$84.00", status: "Upcoming" },
  { id: "INV-1077", service: "Gardening", serviceName: "Coast & Garden Support", date: "07 Jun 2026", amount: "$132.00", status: "Paid" },
  { id: "INV-1069", service: "Cleaning", serviceName: "Northside Home Care", date: "31 May 2026", amount: "$116.00", status: "Paid" },
];

const documents = [
  { title: "Transport progress note", source: "Kindway Transport", updated: "2 days ago", type: "Progress note" },
  { title: "Garden tidy-up photos", source: "Coast & Garden Support", updated: "Yesterday", type: "Photos" },
  { title: "June provider approvals", source: "BrightPath Care", updated: "2 days ago", type: "Approval record" },
  { title: "Maggie's care preferences", source: "CarePorter", updated: "14 Jun 2026", type: "Profile" },
];

const dashboardTiles = [
  { title: "Dashboard", to: "/dashboard" },
  { title: "Bookings", to: "/dashboard/bookings" },
  { title: "Messages", to: "/dashboard/messages" },
  { title: "Approvals", to: "/dashboard/approvals" },
  { title: "Saved", to: "/dashboard/services" },
  { title: "Profile", to: "/dashboard/profile" },
];

export function DashboardPage() {
  return (
    <DashboardShell>
      <h1 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[#111411] sm:text-[2.35rem]">
        Dashboard
      </h1>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardTiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="flex min-h-[8.5rem] items-end rounded-lg border border-black/[0.08] bg-[#fffaf4] p-5 text-xl font-semibold tracking-[-0.035em] text-[#111411] shadow-[0_14px_34px_rgba(89,50,95,0.045)] transition hover:border-[#d8aecf] hover:bg-white"
          >
            {tile.title}
          </Link>
        ))}
      </section>
    </DashboardShell>
  );
}

export function DashboardBookingsPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Bookings"
        description="Track confirmed, scheduled, private pay, and provider-managed services in one place."
        action={
          <Link
            to="/services"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#111411] px-4 text-sm font-medium text-white"
          >
            Book a service
          </Link>
        }
      />

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_0.75fr]">
        <Card className="p-4 sm:p-5">
          <PanelHeading title="Upcoming bookings" action="View calendar" />
          <div className="mt-4 divide-y divide-black/[0.07]">
            {upcomingServices.map((item) => (
              <BookingRow key={`${item.day}-${item.service}`} item={item} />
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <PanelHeading title="Booking CP-1042" />
          <img src={transportImage} alt="" className="mt-4 h-44 w-full rounded-lg object-cover" />
          <div className="mt-4 grid gap-2.5">
            <Detail icon={<Calendar className="h-4 w-4" />} label="When" text="Wed, 18 Jun 2026, 9:15-10:00 am" />
            <Detail icon={<MapPin className="h-4 w-4" />} label="Where" text="123 Main Street, Drummoyne NSW" />
            <Detail icon={<CreditCard className="h-4 w-4" />} label="Pathway" text="Pay privately" />
          </div>
          <p className="mt-4 rounded-lg border border-black/[0.07] bg-[#fbfaf7] p-3 text-sm leading-6 text-slate-700">
            Maggie's return trip preferences are attached. The driver will call Sarah if there is a delay longer than 10 minutes.
          </p>
          <button className="mt-4 min-h-10 w-full rounded-full bg-[#111411] text-sm font-medium text-white">Open booking</button>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <MiniMetric title="Next service" value="18 Jun" detail="Transport at 9:15 am" />
        <MiniMetric title="Needs action" value="1" detail="Package-provider approval" />
        <MiniMetric title="This month" value="4" detail="Services booked" />
      </div>
    </DashboardShell>
  );
}

export function DashboardMessagesPage() {
  return (
    <DashboardShell>
      <PageHeader title="Messages" description="Vendor and provider updates that need Maggie or Sarah's attention." />

      <div className="mt-5 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-3">
          <div className="grid gap-2">
            {messages.map((message) => (
              <button
                key={`${message.sender}-${message.time}`}
                className={[
                  "grid grid-cols-[42px_1fr_auto] gap-3 rounded-lg border p-3 text-left transition",
                  message.unread ? "border-black/[0.12] bg-white shadow-[0_10px_26px_rgba(15,23,42,0.04)]" : "border-transparent hover:bg-[#fbfaf7]",
                ].join(" ")}
              >
                <Avatar image={message.image} fallback={message.sender.slice(0, 2)} />
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-[#151917]">{message.sender}</span>
                    {message.unread && <span className="h-1.5 w-1.5 rounded-full bg-[#7a3f8f]" />}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">{message.type}</span>
                  <span className="mt-1 block truncate text-[13px] text-slate-600">{message.message}</span>
                </span>
                <span className="text-xs text-slate-500">{message.time}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-[-0.03em] text-[#111411]">Northside Home Care</h2>
              <p className="mt-1 text-sm text-slate-600">Cleaning service, 2h ago</p>
            </div>
            <StatusPill status="Unread" />
          </div>
          <div className="mt-5 rounded-lg border border-black/[0.07] bg-[#fbfaf7] p-4">
            <p className="text-sm leading-7 text-slate-700">
              Maggie's regular cleaning service can attend next Friday at 10:00 am if the provider approval is confirmed.
              Linen refresh and kitchen clean-up are included in the request.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button className="min-h-10 rounded-full bg-[#111411] text-sm font-medium text-white">Reply</button>
            <button className="min-h-10 rounded-full border border-black/[0.1] bg-white text-sm font-medium text-[#151917]">
              Mark as handled
            </button>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

export function DashboardApprovalsPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Approvals"
        description="Provider approval requests for bookings that need care-package confidence before the vendor confirms."
        action={
          <button className="min-h-10 rounded-full border border-black/[0.1] bg-white px-4 text-sm font-medium text-[#151917]">
            Approval history
          </button>
        }
      />

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="p-4 sm:p-5">
          <PanelHeading title="Awaiting confirmation" />
          <div className="mt-4 grid gap-3">
            {approvals.map((approval) => (
              <div key={approval.title} className="rounded-lg border border-black/[0.08] bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold tracking-[-0.02em] text-[#111411]">{approval.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{approval.service}</p>
                  </div>
                  <StatusPill status={approval.status} />
                </div>
                <div className="mt-4 grid gap-2 text-sm md:grid-cols-3">
                  <FieldLabel label="Provider" value={approval.packageProvider} />
                  <FieldLabel label="Requested" value={approval.requested} />
                  <FieldLabel label="Amount" value={approval.amount} />
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button className="min-h-10 rounded-full bg-[#111411] px-4 text-sm font-medium text-white">View approval</button>
                  <button className="min-h-10 rounded-full border border-black/[0.1] bg-white px-4 text-sm font-medium text-[#151917]">
                    Ask a question
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <PanelHeading title="Approval context" />
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
            <p className="rounded-lg border border-black/[0.08] bg-white p-3">
              BrightPath Care manages Maggie's package budget. Private pay services do not need provider approval.
            </p>
            <p className="rounded-lg border border-black/[0.07] bg-[#fbfaf7] p-3">
              The transport request has been waiting 2 days. Confirming it keeps the 18 Jun booking on schedule.
            </p>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

export function DashboardServicesPage() {
  return (
    <DashboardShell>
      <PageHeader
        title="Services"
        description="The services Maggie has booked, used recently or saved for repeat care."
        action={
          <Link
            to="/services"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#111411] px-4 text-sm font-medium text-white"
          >
            Browse services
          </Link>
        }
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {activeServices.map((item) => (
          <Card key={item.name} className="overflow-hidden">
            <img src={item.image} alt="" className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold tracking-[-0.02em] text-[#111411]">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.category}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                  <Star className="h-3.5 w-3.5 fill-[#b76b08] text-[#b76b08]" />
                  {item.rating}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <FieldLabel label="Next service" value={item.next} />
                <FieldLabel label="Last service" value={item.last} />
              </div>
                <button className="mt-4 min-h-10 w-full rounded-full border border-black/[0.1] bg-white text-sm font-medium text-[#151917]">
                Message service
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 p-4 sm:p-5">
        <PanelHeading title="Recommended next steps" action="Browse all" />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Recommendation image={mealsImage} title="Meal preparation" body="Add weekly meal prep when cleaning is confirmed." />
          <Recommendation image={transportImage} title="Appointment transport" body="Save return-trip preferences for repeat bookings." />
          <Recommendation image={gardeningImage} title="Seasonal garden care" body="Schedule safety checks before the next heatwave." />
        </div>
      </Card>
    </DashboardShell>
  );
}

export function DashboardInvoicesPage() {
  return (
    <DashboardShell>
      <PageHeader title="Invoices" description="Private pay charges, provider-managed invoices and upcoming payment status." />

      <div className="mt-5 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-4 sm:p-5">
          <PanelHeading title="Next charge" />
          <p className="mt-5 text-3xl font-bold tracking-[-0.05em] text-[#111411]">$84.00</p>
          <p className="mt-2 text-sm text-slate-600">Kindway Transport, due after the 18 Jun service.</p>
          <div className="mt-5 grid gap-2.5">
            <Detail icon={<CreditCard className="h-4 w-4" />} label="Pathway" text="Pay privately" />
            <Detail icon={<Calendar className="h-4 w-4" />} label="Service" text="Wed, 18 Jun 2026" />
          </div>
          <button className="mt-5 min-h-10 w-full rounded-full bg-[#111411] text-sm font-medium text-white">Manage payment</button>
        </Card>

        <Card className="p-4 sm:p-5">
          <PanelHeading title="Invoice history" action="Download CSV" />
          <div className="mt-4 divide-y divide-black/[0.07]">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="grid gap-3 py-3.5 md:grid-cols-[1fr_120px_90px_auto] md:items-center">
                <div>
                  <h3 className="text-sm font-semibold text-[#111411]">{invoice.service}</h3>
                  <p className="mt-0.5 text-[13px] text-slate-600">{invoice.serviceName}</p>
                </div>
                <p className="text-[13px] text-slate-600">{invoice.date}</p>
                <p className="text-sm font-semibold text-[#111411]">{invoice.amount}</p>
                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <StatusPill status={invoice.status} />
                  <Download className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

export function DashboardDocumentsPage() {
  return (
    <DashboardShell>
      <PageHeader title="Documents" description="Progress notes, approvals, receipts and care records collected for Maggie." />

      <Card className="mt-5 p-4 sm:p-5">
        <PanelHeading title="Recent documents" action="Upload" />
        <div className="mt-4 grid gap-3">
          {documents.map((document) => (
            <div key={document.title} className="grid gap-3 rounded-lg border border-black/[0.08] p-3 md:grid-cols-[42px_1fr_160px_auto] md:items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3f0ea] text-slate-700">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-[#111411]">{document.title}</h2>
                <p className="mt-0.5 text-[13px] text-slate-600">{document.source}</p>
              </div>
              <FieldLabel label={document.type} value={document.updated} />
              <button className="min-h-9 rounded-full border border-black/[0.1] bg-white px-3 text-sm font-medium text-[#151917]">
                Open
              </button>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  );
}

export function DashboardProfilePage() {
  return (
    <DashboardShell>
      <PageHeader title="Profile" description="Maggie's details, provider information and care preferences." />

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <ProfilePanel title="Personal information" icon={<UserRound className="h-4 w-4" />}>
          <Field label="Full name" value="Margaret Thompson" />
          <Field label="Preferred name" value="Maggie" />
          <Field label="Date of birth" value="14 March 1947" />
          <Field label="Suburb" value="New Farm, QLD" />
        </ProfilePanel>
        <ProfilePanel title="Provider" icon={<ShieldCheck className="h-4 w-4" />}>
          <Field label="Company" value="BrightPath Care Packages" />
          <Field label="Contact" value="Emma Wilson" />
          <Field label="Approval email" value="approvals@brightpath.com.au" />
          <Field label="Accounts email" value="finance@brightpath.com.au" />
        </ProfilePanel>
      </div>
    </DashboardShell>
  );
}

export function DashboardSettingsPage() {
  return (
    <DashboardShell>
      <PageHeader title="Settings" description="Notification, privacy and booking preferences for Maggie's CarePorter account." />

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <PanelHeading title="Notifications" />
          <div className="mt-4 grid gap-3">
            <SettingRow title="Approval alerts" body="Notify Sarah when provider approval is needed." checked />
            <SettingRow title="Service reminders" body="Send a reminder the day before each confirmed service." checked />
            <SettingRow title="New progress notes" body="Email a summary when a progress note is added after a service." checked />
          </div>
        </Card>
        <Card className="p-4 sm:p-5">
          <PanelHeading title="Account preferences" />
          <div className="mt-4 grid gap-3">
            <SettingRow title="Family copied on updates" body="Copy Sarah on booking and document updates." checked />
            <SettingRow title="Show provider-managed services first" body="Prioritise services that can use Maggie's package." />
            <SettingRow title="Require confirmation before private pay bookings" body="Ask before confirming any direct payment service." checked />
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[#111411] sm:text-[2.35rem]">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="flex items-center gap-2.5">
        {action}
        <div className="hidden lg:block">
          <DashboardTopActions />
        </div>
      </div>
    </header>
  );
}

function UpcomingServicesCard() {
  return (
    <Card className="p-4 sm:p-5">
      <PanelHeading title="Upcoming services" action="View all" />
      <div className="mt-4 grid gap-4">
        {upcomingServices.map((item, index) => (
          <div key={`${item.day}-${item.service}`} className="grid grid-cols-[42px_1fr_auto] gap-3">
            <div className="text-center">
              <span
                className={[
                  "mx-auto block h-2 w-2 rounded-full",
                  index === 0 ? "bg-emerald-700" : index === 1 ? "bg-slate-400" : "bg-amber-600",
                ].join(" ")}
              />
              <p className="mt-1.5 text-sm font-semibold text-[#151917]">{item.day}</p>
              <p className="text-[11px] font-semibold uppercase text-slate-500">{item.month}</p>
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-[#151917]">{item.service}</h3>
              <p className="mt-0.5 truncate text-[13px] text-slate-600">{item.serviceName}</p>
              <p className="mt-1 text-xs text-slate-500">{item.note}</p>
            </div>
            <div className="text-right">
              <StatusPill status={item.status} />
              <p className="mt-1.5 text-[13px] text-slate-600">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard/bookings"
        className="mt-5 flex min-h-10 w-full items-center justify-center rounded-full border border-black/[0.1] bg-white text-sm font-medium text-[#151917]"
      >
        View all bookings
      </Link>
    </Card>
  );
}

function RecentUpdatesCard() {
  return (
    <Card className="p-4 sm:p-5">
      <PanelHeading title="Recent updates" action="View all" />
      <div className="mt-2 divide-y divide-black/[0.07]">
        {recentUpdates.map((update) => (
          <div key={`${update.sender}-${update.time}`} className="flex gap-3 py-3.5 first:pt-1 last:pb-0">
            <Avatar image={update.image} fallback={update.sender.slice(0, 2)} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="truncate text-sm font-semibold text-[#151917]">{update.sender}</h3>
                <span className="shrink-0 text-xs text-slate-500">{update.time}</span>
              </div>
              <p className="mt-1 text-[13px] leading-5 text-slate-600">{update.summary}</p>
              <button className="mt-2 text-[13px] font-semibold text-[#151917]">{update.action}</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function YourServicesCard() {
  return (
    <Card className="p-4 sm:p-5">
      <PanelHeading title="Your services" action="View all" />
      <div className="mt-2 divide-y divide-black/[0.07]">
        {activeServices.map((service) => (
          <div key={service.name} className="flex items-center gap-3 py-3.5 first:pt-1 last:pb-0">
            <img src={service.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-[#151917]">{service.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-[13px] text-slate-600">
                <span>{service.category}</span>
                <Star className="h-3 w-3 fill-[#b76b08] text-[#b76b08]" />
                <span>{service.rating}</span>
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Last service: {service.last}</p>
            </div>
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.1] bg-white text-slate-700">
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <Link
        to="/services"
        className="mt-5 flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-black/[0.1] bg-white text-sm font-medium text-[#151917]"
      >
        <Search className="h-4 w-4" />
        Browse services
      </Link>
    </Card>
  );
}

function BookingRow({ item }: { item: (typeof upcomingServices)[number] }) {
  return (
    <div className="grid gap-3 py-4 md:grid-cols-[70px_1fr_120px_120px_auto] md:items-center">
      <div>
        <p className="text-sm font-semibold text-[#151917]">{item.day} {item.month}</p>
        <p className="mt-0.5 text-xs text-slate-500">{item.time}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#111411]">{item.service}</h3>
        <p className="mt-0.5 text-[13px] text-slate-600">{item.serviceName}</p>
      </div>
      <p className="text-[13px] text-slate-600">{item.note}</p>
      <StatusPill status={item.status} />
      <button className="min-h-9 rounded-full border border-black/[0.1] bg-white px-3 text-sm font-medium text-[#151917]">Open</button>
    </div>
  );
}

function MiniMetric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111411]">{value}</p>
      <p className="mt-1 text-[13px] text-slate-500">{detail}</p>
    </Card>
  );
}

function SimpleCard({
  title,
  body,
  action,
  to,
  tone,
}: {
  title: string;
  body: string;
  action: string;
  to: string;
  tone: "amber" | "sea" | "slate";
}) {
  const dotClass = {
    amber: "bg-[#d49a2e]",
    sea: "bg-[#35665b]",
    slate: "bg-slate-400",
  }[tone];

  return (
    <Card className="bg-[#fffaf4] p-4 shadow-[0_14px_34px_rgba(89,50,95,0.045)]">
      <span className={`block h-2 w-2 rounded-full ${dotClass}`} />
      <h2 className="mt-4 text-base font-semibold tracking-[-0.03em] text-[#111411]">{title}</h2>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{body}</p>
      <Link
        to={to}
        className="mt-4 inline-flex min-h-9 items-center justify-center rounded-full border border-black/[0.1] bg-white px-3 text-sm font-medium text-[#151917]"
      >
        {action}
      </Link>
    </Card>
  );
}

function Recommendation({ image, title, body }: { image: string; title: string; body: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-black/[0.08] bg-white">
      <img src={image} alt="" className="h-28 w-full object-cover" />
      <div className="p-3">
        <h3 className="text-sm font-semibold text-[#111411]">{title}</h3>
        <p className="mt-1 text-[13px] leading-5 text-slate-600">{body}</p>
      </div>
    </div>
  );
}

function ProfilePanel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f0ea] text-slate-700">{icon}</span>
        <h2 className="text-base font-bold tracking-[-0.02em] text-[#111411]">{title}</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">{children}</div>
    </Card>
  );
}

function SettingRow({ title, body, checked = false }: { title: string; body: string; checked?: boolean }) {
  return (
    <label className="flex min-h-[68px] items-center justify-between gap-4 rounded-lg border border-black/[0.08] bg-white p-3">
      <span>
        <span className="block text-sm font-semibold text-[#151917]">{title}</span>
        <span className="mt-0.5 block text-[13px] text-slate-600">{body}</span>
      </span>
      <input type="checkbox" defaultChecked={checked} className="h-4 w-4 accent-[#d8aecf]" />
    </label>
  );
}

function Avatar({ image, fallback }: { image: string | null; fallback: string }) {
  if (image) {
    return <img src={image} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />;
  }

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f0ea] text-xs font-semibold text-slate-700">
      {fallback}
    </span>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={["rounded-lg border border-black/[0.08] bg-white shadow-[0_14px_36px_rgba(89,50,95,0.035)]", className].join(" ")}>
      {children}
    </section>
  );
}

function PanelHeading({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h2 className="text-base font-bold tracking-[-0.02em] text-[#111411]">{title}</h2>
      {action && <button className="shrink-0 text-[13px] font-semibold text-slate-700">{action}</button>}
    </div>
  );
}

function Detail({ icon, label, text }: { icon: ReactNode; label: string; text: string }) {
  return (
    <div className="grid grid-cols-[20px_72px_1fr] items-start gap-2 text-sm">
      <span className="mt-0.5 text-slate-500">{icon}</span>
      <span className="font-medium text-slate-500">{label}</span>
      <span className="min-w-0 text-slate-800">{text}</span>
    </div>
  );
}

function FieldLabel({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="block text-xs font-medium text-slate-500">{label}</span>
      <span className="mt-1 block text-sm font-semibold text-[#151917]">{value}</span>
    </p>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-2 text-xs font-medium text-slate-500">
      {label}
      <input
        className="min-h-10 rounded-lg border border-black/[0.08] bg-white px-3 text-sm font-medium text-[#151917] outline-none focus:border-[#111411]"
        defaultValue={value}
      />
    </label>
  );
}

function StatusPill({ status }: { status: string }) {
  const dot =
    status === "Confirmed" || status === "Paid"
      ? "bg-emerald-600"
      : status === "Pending" || status === "Awaiting confirmation" || status === "Upcoming"
        ? "bg-[#d49a2e]"
        : status === "Unread"
          ? "bg-[#7a3f8f]"
          : "bg-slate-400";

  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-2.5 py-1 text-[11px] font-medium text-[#17211f]">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
