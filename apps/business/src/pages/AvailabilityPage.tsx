import { CalendarClock, Clock, UserRoundPlus } from "lucide-react";
import { FieldLabel, PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { availabilityRules } from "../data/businessData";

function availabilityTone(status: string) {
  if (status === "Healthy") return "green" as const;
  if (status === "Tight") return "amber" as const;
  return "coral" as const;
}

export function AvailabilityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Capacity planning"
        title="Availability"
        description="Set service windows, worker coverage, blackout dates, and open slots that clients can book."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-business-ink px-3.5 text-sm font-bold text-white">
            <CalendarClock className="h-4 w-4" />
            Add rule
          </button>
        }
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Panel title="Weekly rules">
          <div className="divide-y divide-business-line">
            {availabilityRules.map((rule) => (
              <div key={rule.day} className="grid gap-3 px-4 py-4 md:grid-cols-[70px_1fr_110px_110px_auto] md:items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-business-mint text-sm font-black text-business-sea">
                  {rule.day}
                </span>
                <FieldLabel label="Window" value={rule.window} />
                <FieldLabel label="Workers" value={`${rule.workers}`} />
                <FieldLabel label="Open slots" value={`${rule.openSlots}`} />
                <StatusBadge tone={availabilityTone(rule.status)}>{rule.status}</StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-5">
          <Panel title="Coverage gaps">
            <div className="grid gap-3 p-4">
              {[
                { icon: Clock, title: "Friday afternoon", body: "Only one open cleaning slot remains." },
                { icon: UserRoundPlus, title: "Personal care", body: "Worker credentials required before publishing." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg border border-business-line bg-business-mist p-3">
                    <Icon className="h-4 w-4 text-business-coral" />
                    <h3 className="mt-2 text-sm font-black">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Blackout dates">
            <div className="space-y-3 p-4 text-sm font-bold">
              <div className="flex items-center justify-between rounded-lg bg-business-mist p-3">
                <span>25 Jun 2026</span>
                <span className="text-slate-500">Team training</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-business-mist p-3">
                <span>01 Jul 2026</span>
                <span className="text-slate-500">Public holiday</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
