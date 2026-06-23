import { ServiceCard } from "../components/Cards";
import { ServiceSearchBar } from "../components/ServiceSearchBar";
import { services } from "../data/mockData";

export function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-[-0.055em]">Book support</h1>
        </div>
        <ServiceSearchBar actionTo="/services" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>
    </div>
  );
}
