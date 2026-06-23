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
            className="relative flex min-h-[6.75rem] overflow-hidden rounded-lg border border-white/80 bg-[linear-gradient(135deg,#ffffff_0%,#fffaf5_52%,#f3e2f7_100%)] p-4 pb-9 text-center text-[1.05rem] font-semibold tracking-[-0.025em] text-business-ink shadow-[0_18px_48px_rgba(89,50,95,0.075)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(89,50,95,0.11)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,#111411_0%,#d8aecf_54%,#f7d56f_100%)] before:content-['']"
          >
            <span className="relative z-10">{tile.title}</span>
            {tile.badge && (
              <span className="absolute bottom-3 right-3 z-10 rounded-full border border-[#d8aecf] bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-normal text-[#633475] shadow-sm">
                {tile.badge}
              </span>
            )}
          </Link>
        ))}
      </section>
    </div>
  );
}
