import { BadgeCheck, Edit3, MapPin, Plus, ShieldCheck } from "lucide-react";
import { FieldLabel, MapPreview, Panel, PageHeader, StatusBadge } from "../components/Primitives";
import { serviceExamples, serviceProfile } from "../data/businessData";
import { formatCurrency } from "../lib/utils";

function exampleTone(status: string) {
  if (status === "Bookable") return "green" as const;
  if (status === "Admin review") return "amber" as const;
  return "slate" as const;
}

export function ServicesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="What clients see"
        title="Service profile"
        description="Manage the public service profile CarePorter clients use when they request your work."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-black/[0.12] bg-white px-3.5 text-sm font-medium">
            <Edit3 className="h-4 w-4" />
            Edit profile
          </button>
        }
      />

      <section className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel>
          <div className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold text-business-ink">{serviceProfile.name}</h2>
                  <StatusBadge tone="green">{serviceProfile.status}</StatusBadge>
                </div>
                <p className="mt-2 text-sm font-bold text-slate-600">{serviceProfile.category}</p>
              </div>
              <div className="rounded-lg border border-black/[0.08] bg-white p-3 text-right">
                <p className="text-2xl font-semibold text-business-ink">{formatCurrency(serviceProfile.rate)}/hr</p>
                <p className="text-xs font-bold text-business-sea">Displayed base rate</p>
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-700">{serviceProfile.description}</p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-business-line bg-white p-3">
                <MapPin className="h-4 w-4 text-business-sea" />
                <FieldLabel label="Coverage" value={serviceProfile.coverage} />
              </div>
              <div className="rounded-lg border border-business-line bg-white p-3">
                <BadgeCheck className="h-4 w-4 text-business-coral" />
                <FieldLabel label="Verification" value={serviceProfile.verification} />
              </div>
              <div className="rounded-lg border border-business-line bg-white p-3">
                <ShieldCheck className="h-4 w-4 text-business-sea" />
                <FieldLabel label="Next slot" value={serviceProfile.nextOpenSlot} />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Included</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {serviceProfile.included.map((item) => (
                  <span key={item} className="rounded-full bg-business-mint px-3 py-1.5 text-xs font-bold text-business-sea">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Verification requirements">
          <div className="grid gap-3 p-4">
            {serviceProfile.requirements.map((requirement) => (
              <div key={requirement} className="flex items-center justify-between gap-3 rounded-lg border border-business-line bg-white p-3">
                <span className="text-sm font-semibold text-business-ink">{requirement}</span>
                <StatusBadge tone={requirement === "Public liability insurance" ? "amber" : "green"}>
                  {requirement === "Public liability insurance" ? "Renew soon" : "Current"}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <MapPreview
        className="mt-5"
        title="Client coverage preview"
        subtitle="This placeholder will become the editable vendor service area once Supabase stores the coverage zones."
        googleMapsUrl={serviceProfile.serviceAreaMapUrl}
      />

      <Panel className="mt-5" title="Bookable options" action={<button className="inline-flex items-center gap-2 text-[13px] font-bold text-business-sea"><Plus className="h-3.5 w-3.5" /> Add option</button>}>
        <div className="divide-y divide-business-line">
          {serviceExamples.map((example) => (
            <div key={example.id} className="grid gap-4 px-4 py-4 md:grid-cols-[1fr_120px_120px_140px_auto] md:items-center">
              <div>
                <h3 className="font-semibold text-business-ink">{example.name}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-600">{example.availability}</p>
              </div>
              <FieldLabel label="Duration" value={example.duration} />
              <FieldLabel label="Rate" value={`${formatCurrency(example.rate)}/hr`} />
              <StatusBadge tone={exampleTone(example.status)}>{example.status}</StatusBadge>
              <button className="min-h-9 rounded-full border border-black/[0.12] bg-white px-3 text-sm font-medium">Edit</button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
