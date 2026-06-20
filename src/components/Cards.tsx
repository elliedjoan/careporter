import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Provider, Service } from "../data/mockData";
import { heroImage } from "../data/mockData";
import { formatCurrency } from "../lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div
        className="relative h-28 bg-cover"
        style={{ backgroundImage: `url(${service.image})`, backgroundPosition: service.imagePosition }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-black">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-porter-ink/68">{service.short}</p>
        <div className="mt-5 flex items-center justify-between text-sm font-bold">
          <span>From {formatCurrency(service.priceFrom)}</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export function ProviderCard({ provider, serviceId, image, imagePosition }: { provider: Provider; serviceId?: string; image?: string; imagePosition?: string }) {
  return (
    <Link
      to={`/book/${serviceId ?? provider.serviceIds[0]}?provider=${provider.id}`}
      className="group overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div
        className="h-44 bg-cover"
        style={{ backgroundImage: `url(${image ?? heroImage})`, backgroundPosition: imagePosition ?? provider.imagePosition }}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black">{provider.name}</h3>
            <p className="mt-1 text-sm text-porter-ink/60">{provider.suburb}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-porter-butter/35 px-2.5 py-1 text-sm font-bold">
            <Star className="h-4 w-4 fill-porter-butter text-porter-butter" />
            {provider.rating}
          </span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-porter-ink/68">{provider.bio}</p>
        <div className="mt-5 flex items-center justify-between text-sm font-bold">
          <span>{formatCurrency(provider.price)}/hr</span>
          <span className="text-[#7a3f8f]">Book service</span>
        </div>
      </div>
    </Link>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Completed"
      ? "bg-emerald-100 text-emerald-800"
      : status === "Pending approval"
        ? "bg-amber-100 text-amber-800"
        : status === "Cancelled"
          ? "bg-rose-100 text-rose-800"
          : "bg-sky-100 text-sky-800";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${tone}`}>{status}</span>;
}
