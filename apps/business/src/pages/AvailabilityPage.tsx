import { CalendarClock, Clock, ExternalLink, MapPinned } from "lucide-react";
import { FieldLabel, MapPreview, PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { availabilityRules, serviceProfile } from "../data/businessData";

function availabilityTone(status: string) {
  if (status === "Healthy") return "green" as const;
  if (status === "Tight") return "amber" as const;
  return "coral" as const;
}

export function AvailabilityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Bookable times"
        title="Availability"
        description="Control when clients can request your service and which travel areas are available on each day."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-business-ink px-3.5 text-sm font-medium text-white">
            <CalendarClock className="h-4 w-4" />
            Add availability
          </button>
        }
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.24fr_0.76fr]">
        <Panel title="Weekly availability">
          <div className="divide-y divide-business-line">
            {availabilityRules.map((rule) => (
              <div key={rule.day} className="grid gap-3 px-4 py-4 md:grid-cols-[70px_1fr_120px_96px_96px_auto] md:items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-sm font-semibold text-business-sea">
                  {rule.day}
                </span>
                <div>
                  <FieldLabel label="Window" value={rule.window} />
                  <p className="mt-1 text-xs font-semibold text-slate-500">{rule.travelArea}</p>
                </div>
                <FieldLabel label="Team" value={`${rule.workers} available`} />
                <FieldLabel label="Slots" value={`${rule.openSlots}`} />
                <a
                  href={rule.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-business-ink"
                >
                  Map
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <StatusBadge tone={availabilityTone(rule.status)}>{rule.status}</StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-5">
          <MapPreview
            title="Service area"
            subtitle="Preview the areas clients can request. Supabase will later power editable service zones and saved map links."
            googleMapsUrl={serviceProfile.serviceAreaMapUrl}
          />

          <Panel title="Client-facing next slot">
            <div className="p-4">
              <Clock className="h-4 w-4 text-business-sea" />
              <p className="mt-3 text-2xl font-semibold">{serviceProfile.nextOpenSlot}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This is the next time clients see when they request {serviceProfile.name.toLowerCase()}.
              </p>
            </div>
          </Panel>

          <Panel title="Travel notes">
            <div className="space-y-3 p-4 text-sm font-bold">
              {["Avoid long cross-city jobs after 2 pm", "Green-waste removal available Monday to Thursday", "Friday is reserved for shorter local jobs"].map((note) => (
                <div key={note} className="flex gap-3 rounded-lg border border-black/[0.08] bg-white p-3">
                  <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-business-coral" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
