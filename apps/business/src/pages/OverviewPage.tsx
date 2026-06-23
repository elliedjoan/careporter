import { Link } from "react-router-dom";

const overviewTiles = [
  { title: "Overview", to: "/" },
  { title: "Service profile", to: "/service-profile" },
  { title: "Availability", to: "/availability" },
  { title: "Requests", to: "/requests" },
  { title: "Messages", to: "/messages" },
  { title: "Verification", to: "/verification" },
  { title: "Invoices", to: "/invoices" },
];

export function OverviewPage() {
  return (
    <div>
      <h1 className="text-[2.1rem] font-semibold leading-[1] tracking-[-0.055em] text-business-ink sm:text-[2.75rem]">
        Overview
      </h1>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {overviewTiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="flex min-h-[8.5rem] items-end rounded-lg border border-business-line bg-business-cream p-5 text-xl font-semibold tracking-[-0.035em] text-business-ink shadow-business transition hover:border-[#d8aecf] hover:bg-white"
          >
            {tile.title}
          </Link>
        ))}
      </section>
    </div>
  );
}
