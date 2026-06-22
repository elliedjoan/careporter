import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Provider, Service } from "../data/mockData";
import { heroImage } from "../data/mockData";
import { formatCurrency } from "../lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]"
    >
      <div
        className="relative h-28 bg-cover"
        style={{ backgroundImage: `url(${service.image})`, backgroundPosition: service.imagePosition }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-[-0.03em]">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-porter-ink/68">{service.short}</p>
        <div className="mt-5 flex items-center justify-between text-sm font-medium">
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
      className="group overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]"
    >
      <div
        className="h-44 bg-cover"
        style={{ backgroundImage: `url(${image ?? heroImage})`, backgroundPosition: imagePosition ?? provider.imagePosition }}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold tracking-[-0.02em]">{provider.name}</h3>
            <p className="mt-1 text-sm text-porter-ink/60">{provider.suburb}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-porter-butter text-porter-butter" />
            {provider.rating}
          </span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-porter-ink/68">{provider.bio}</p>
        <div className="mt-5 flex items-center justify-between text-sm font-medium">
          <span>{formatCurrency(provider.price)}/hr</span>
          <span className="text-[#111411]">Book</span>
        </div>
      </div>
    </Link>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const dot =
    status === "Completed"
      ? "bg-emerald-600"
      : status === "Pending approval"
        ? "bg-[#d49a2e]"
        : status === "Cancelled"
          ? "bg-[#ef7f6d]"
          : "bg-[#35665b]";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-2.5 py-1 text-xs font-medium text-[#17211f]">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
