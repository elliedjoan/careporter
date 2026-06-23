import { Link } from "react-router-dom";

const overviewTiles = [
  { title: "Service profile", to: "/service-profile" },
  { title: "Availability", to: "/availability" },
  { title: "Requests", to: "/requests", badge: "5 new" },
  { title: "Messages", to: "/messages", badge: "4 new" },
  { title: "Verification", to: "/verification", badge: "Action required" },
  { title: "Invoices", to: "/invoices", badge: "2 overdue" },
];

export function OverviewPage() {
  return (
    <div>
      <h1 className="text-[2.1rem] font-semibold leading-[1] tracking-[-0.055em] text-business-ink sm:text-[2.75rem]">
        Home
      </h1>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {overviewTiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="relative flex min-h-[8.5rem] items-center justify-center rounded-lg border border-business-line bg-business-cream p-5 text-center text-xl font-semibold tracking-[-0.035em] text-business-ink shadow-business transition hover:border-[#d8aecf] hover:bg-white"
          >
            {tile.title}
            {tile.badge && (
              <span className="absolute bottom-4 right-4 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11px] font-semibold tracking-normal text-business-sea shadow-sm">
                {tile.badge}
              </span>
            )}
          </Link>
        ))}
      </section>
    </div>
  );
}
