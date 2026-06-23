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
            className="relative flex min-h-[7rem] items-center justify-center rounded-xl border border-[#e6c7e3] bg-[#fff9fe] p-4 text-center text-lg font-semibold tracking-[-0.03em] text-business-ink shadow-[0_12px_30px_rgba(89,50,95,0.05)] transition hover:-translate-y-0.5 hover:border-[#d8aecf] hover:bg-white"
          >
            {tile.title}
            {tile.badge && (
              <span className="absolute bottom-3 right-3 rounded-full border border-[#d8aecf] bg-[#f1dced] px-2.5 py-1 text-[11px] font-semibold tracking-normal text-[#633475] shadow-sm">
                {tile.badge}
              </span>
            )}
          </Link>
        ))}
      </section>
    </div>
  );
}
