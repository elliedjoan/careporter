import { Clock, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ProviderCard } from "../components/Cards";
import { ServiceSearchBar } from "../components/ServiceSearchBar";
import { providers, services } from "../data/mockData";
import { formatCurrency } from "../lib/utils";

export function ServiceDetailPage() {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const service = services.find((item) => item.id === id);
  const serviceId = service?.id ?? "";
  const matches = useMemo(
    () => providers.filter((provider) => provider.serviceIds.includes(serviceId)),
    [serviceId],
  );
  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    return matches.filter((provider) => {
      const matchesLocation = normalizedLocation.length === 0 || provider.suburb.toLowerCase().includes(normalizedLocation);
      const searchable = [provider.name, provider.suburb, provider.bio, ...provider.specialties].join(" ").toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchable.includes(normalizedQuery);

      return matchesLocation && matchesQuery;
    });
  }, [location, matches, query]);
  if (!service) return <Navigate to="/services" replace />;
  const Icon = service.icon;

  return (
    <div className="pb-24 md:pb-0">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#111411]">
                <Icon className="h-7 w-7" />
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.055em] md:text-5xl">{service.name} services</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-porter-ink/70">{service.description}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-black/[0.08] bg-white p-5">
                  <p className="text-sm font-medium text-porter-ink/55">Typical price</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">From {formatCurrency(service.priceFrom)}/hr</p>
                </div>
                <div className="rounded-lg border border-black/[0.08] bg-white p-5">
                  <p className="text-sm font-medium text-porter-ink/55">Session length</p>
                  <p className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-[-0.04em]"><Clock className="h-5 w-5" /> {service.duration}</p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-porter-mist shadow-sm">
              <div
                className="h-52 bg-cover md:h-64"
                style={{ backgroundImage: `url(${service.image})`, backgroundPosition: service.imagePosition }}
              />
              <div className="p-4 md:p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-[#111411]">
                <SlidersHorizontal className="h-4 w-4" />
                Find the right service
              </div>
              <ServiceSearchBar
                className="mt-4"
                serviceValue={query}
                locationValue={location}
                servicePlaceholder="Service name or specialty"
                locationPlaceholder="Suburb or postcode"
                onServiceChange={setQuery}
                onLocationChange={setLocation}
              />
              <p className="mt-4 text-sm font-medium text-porter-ink/62">
                Showing {filteredServices.length} of {matches.length} available services
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Available {service.name.toLowerCase()} services</h2>
            <p className="mt-2 text-porter-ink/65">Choose a service, then select a date, time, and funding option.</p>
          </div>
          <Link to="/services" className="font-medium text-[#111411]">Browse all categories</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              serviceId={service.id}
              image={service.image}
              imagePosition={service.imagePosition}
            />
          ))}
        </div>
        {filteredServices.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-black/[0.16] bg-white p-8 text-center">
            <h3 className="text-xl font-semibold">No services match those filters</h3>
            <p className="mt-2 text-porter-ink/65">Try another suburb or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}
