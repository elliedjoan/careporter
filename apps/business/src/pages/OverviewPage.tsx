import { getTimeOfDayGreeting } from "@careporter/domain";
import { Link } from "react-router-dom";
import { businessProfile } from "../data/businessData";

const overviewTiles = [
  { title: "Service profile", to: "/service-profile" },
  { title: "Availability", to: "/availability" },
  { title: "Requests", to: "/requests", badge: "5 new" },
  { title: "Messages", to: "/messages", badge: "4 new" },
  { title: "Verification", to: "/verification", badge: "Action required" },
  { title: "Invoices", to: "/invoices", badge: "2 overdue" },
];

export function OverviewPage() {
  const firstName = businessProfile.owner.split(" ")[0] ?? businessProfile.owner;

  return (
    <div>
      <h1 className="text-[1.8rem] font-semibold leading-[1.05] tracking-[-0.045em] text-business-ink sm:text-[2.2rem]">
        {getTimeOfDayGreeting()}, {firstName}
      </h1>

      <section className="mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
        {overviewTiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="relative flex min-h-[7.5rem] items-center justify-center overflow-hidden rounded-lg border border-white/80 bg-[linear-gradient(135deg,#fffaf1_0%,#f3eadb_56%,#e9dcc8_100%)] p-5 text-center text-[1.05rem] font-semibold tracking-[-0.025em] text-business-ink shadow-[0_18px_48px_rgba(89,50,95,0.065)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(89,50,95,0.1)]"
          >
            <span className="relative z-10">{tile.title}</span>
            {tile.badge && (
              <span className="absolute bottom-3 right-3 z-10 rounded-full border border-[#d8c7ad] bg-white/82 px-2.5 py-1 text-[11px] font-semibold tracking-normal text-[#5c4b39] shadow-sm">
                {tile.badge}
              </span>
            )}
          </Link>
        ))}
      </section>
    </div>
  );
}
