import { AlertTriangle, CalendarPlus, CheckCircle2, Clock3, MessageSquare, TrendingUp } from "lucide-react";
import { actionQueue, dashboardMetrics, serviceListings, todaySchedule } from "../data/businessData";
import { Panel, PageHeader, StatusBadge, TextAction } from "../components/Primitives";

const metricIcon = [CalendarPlus, TrendingUp, AlertTriangle, CheckCircle2];

export function OverviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Business dashboard"
        title="Northside Home Care"
        description="Booking demand, roster coverage, listing quality, and package-provider actions for today."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-business-ink px-3.5 text-sm font-bold text-white">
            <CalendarPlus className="h-4 w-4" />
            Add availability
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
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-business-mist text-business-sea">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 text-3xl font-black tracking-normal text-business-ink">{metric.value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{metric.detail}</p>
            </article>
          );
        })}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Action queue" action={<TextAction>View all</TextAction>}>
          <div className="divide-y divide-business-line">
            {actionQueue.map((item) => (
              <div key={item.id} className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_160px_110px_auto] md:items-center">
                <div>
                  <h2 className="font-black text-business-ink">{item.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.subject}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{item.meta}</p>
                </div>
                <p className="text-sm font-bold text-business-ink">{item.due}</p>
                <StatusBadge tone={item.tone}>{item.priority}</StatusBadge>
                <button className="min-h-9 rounded-lg border border-business-line bg-white px-3 text-sm font-bold text-business-ink">
                  Open
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Today's schedule">
          <div className="divide-y divide-business-line">
            {todaySchedule.map((item) => (
              <div key={`${item.time}-${item.client}`} className="grid grid-cols-[54px_1fr_auto] gap-3 px-4 py-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-business-mist text-xs font-black text-business-sea">
                  {item.time}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-black">{item.service}</h3>
                  <p className="mt-0.5 truncate text-xs font-semibold text-slate-600">{item.client} · {item.worker}</p>
                </div>
                <StatusBadge tone={item.status === "Needs worker" ? "coral" : item.status === "In progress" ? "sea" : "slate"}>
                  {item.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <Panel title="Listing health">
          <div className="space-y-3 p-4">
            {serviceListings.slice(0, 3).map((listing) => (
              <div key={listing.id} className="rounded-lg border border-business-line bg-business-mist p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black">{listing.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-600">{listing.coverage}</p>
                  </div>
                  <StatusBadge tone={listing.status === "Published" ? "green" : "amber"}>{listing.status}</StatusBadge>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <span className="block h-2 rounded-full bg-business-sea" style={{ width: `${listing.utilisation}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Operational model">
          <div className="grid gap-3 p-4 md:grid-cols-3">
            {[
              { title: "Listings", body: "Services carry coverage, rates, funding rules, credentials, and publish states." },
              { title: "Bookings", body: "Requests move through confirmation, worker allocation, approval, visit, and invoice states." },
              { title: "Compliance", body: "Credentials and documents gate which listings can be published or package-funded." },
            ].map((item) => (
              <article key={item.title} className="min-h-36 rounded-lg border border-business-line bg-white p-4">
                <MessageSquare className="h-4 w-4 text-business-coral" />
                <h3 className="mt-3 font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
