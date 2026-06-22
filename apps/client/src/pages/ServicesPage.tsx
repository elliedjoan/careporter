import { Search } from "lucide-react";
import { ServiceCard } from "../components/Cards";
import { services } from "../data/mockData";

export function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-[-0.055em]">Book support</h1>
        </div>
        <label className="flex min-h-14 items-center gap-3 rounded-full border border-black/[0.08] bg-white px-4 shadow-sm">
          <Search className="h-5 w-5 text-[#111411]" />
          <input className="w-full outline-none placeholder:text-porter-ink/40" placeholder="Search support services" />
        </label>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>
    </div>
  );
}
