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
            className="relative flex min-h-[8.75rem] items-center justify-center overflow-hidden rounded-lg border border-white/80 bg-[linear-gradient(135deg,#fffbf4_0%,#f8efe3_52%,#f4e5ef_100%)] p-6 text-center text-business-ink shadow-[0_22px_58px_rgba(89,50,95,0.105)] transition duration-200 before:absolute before:inset-0 before:bg-[linear-gradient(145deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0)_48%)] before:content-[''] hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(89,50,95,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8aecf]"
          >
            <span className="relative z-10 flex flex-col items-center justify-center gap-3">
              <span className="text-[1.35rem] font-semibold leading-none tracking-[-0.045em] sm:text-[1.5rem]">{tile.title}</span>
              {tile.badge && (
                <span className="rounded-full border border-[#decdb8] bg-white/65 px-3 py-1 text-[11px] font-semibold leading-none tracking-normal text-[#6b5848] shadow-[0_8px_18px_rgba(89,50,95,0.07)]">
                  {tile.badge}
                </span>
              )}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
