import { CircleDollarSign, Edit3, Plus, ShieldCheck } from "lucide-react";
import { Panel, PageHeader, StatusBadge } from "../components/Primitives";
import { serviceListings } from "../data/businessData";
import { formatCurrency } from "../lib/utils";

function listingTone(status: string) {
  if (status === "Published") return "green" as const;
  if (status === "Needs verification") return "amber" as const;
  return "slate" as const;
}

export function ServicesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Marketplace supply"
        title="Services and listings"
        description="Manage public service listings, package-funded eligibility, pricing, coverage, and verification gates."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-business-ink px-3.5 text-sm font-bold text-white">
            <Plus className="h-4 w-4" />
            New listing
          </button>
        }
      />

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        {serviceListings.map((listing) => (
          <article key={listing.id} className="rounded-lg border border-business-line bg-white p-4 shadow-business">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-business-ink">{listing.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">{listing.category}</p>
              </div>
              <StatusBadge tone={listingTone(listing.status)}>{listing.status}</StatusBadge>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-business-mist p-3">
                <CircleDollarSign className="h-4 w-4 text-business-sea" />
                <p className="mt-2 text-sm font-black">{formatCurrency(listing.rate)}/hr</p>
                <p className="text-xs font-semibold text-slate-500">Base rate</p>
              </div>
              <div className="rounded-lg bg-business-mist p-3">
                <ShieldCheck className="h-4 w-4 text-business-coral" />
                <p className="mt-2 text-sm font-black">{listing.funding}</p>
                <p className="text-xs font-semibold text-slate-500">Funding</p>
              </div>
              <div className="rounded-lg bg-business-mist p-3">
                <p className="text-2xl font-black text-business-ink">{listing.utilisation}%</p>
                <p className="text-xs font-semibold text-slate-500">Utilisation</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Coverage</p>
                <p className="mt-1 text-sm font-bold text-business-ink">{listing.coverage}</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">Next open slot: {listing.nextOpenSlot}</p>
              </div>
              <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-business-line px-3 text-sm font-bold">
                <Edit3 className="h-4 w-4" />
                Edit
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {listing.requirements.map((requirement) => (
                <span key={requirement} className="rounded-full bg-business-mint px-2.5 py-1 text-[11px] font-bold text-business-sea">
                  {requirement}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <Panel className="mt-5" title="Listing rules">
        <div className="grid gap-3 p-4 md:grid-cols-3">
          {["Coverage controls marketplace visibility", "Credentials gate package-funded services", "Availability controls bookable time slots"].map((rule) => (
            <div key={rule} className="rounded-lg border border-business-line bg-business-mist p-4 text-sm font-bold text-business-ink">
              {rule}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
