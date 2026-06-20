import { CalendarCheck, Filter, UserCheck } from "lucide-react";
import { FieldLabel, PageHeader, Panel, StatusBadge } from "../components/Primitives";
import { bookings } from "../data/businessData";

function bookingTone(status: string) {
  if (status === "Confirmed" || status === "Provider approval received") return "green" as const;
  if (status === "In progress") return "sea" as const;
  return "amber" as const;
}

export function BookingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Service delivery"
        title="Bookings"
        description="Review new requests, assign workers, track approval state, and keep visit details ready for clients."
        action={
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-business-line bg-white px-3.5 text-sm font-bold">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        }
      />

      <Panel className="mt-6" title="Open and upcoming bookings">
        <div className="divide-y divide-business-line">
          {bookings.map((booking) => (
            <div key={booking.id} className="grid gap-4 px-4 py-4 xl:grid-cols-[110px_1fr_170px_150px_160px_auto] xl:items-center">
              <FieldLabel label="Booking" value={booking.id} />
              <div>
                <h2 className="font-black text-business-ink">{booking.client}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">{booking.service}</p>
              </div>
              <FieldLabel label="When" value={`${booking.date}, ${booking.time}`} />
              <FieldLabel label="Funding" value={booking.funding} />
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-business-sea" />
                <span className="text-sm font-bold text-business-ink">{booking.owner}</span>
              </div>
              <StatusBadge tone={bookingTone(booking.status)}>{booking.status}</StatusBadge>
            </div>
          ))}
        </div>
      </Panel>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          { label: "New requests", value: "4", body: "Require business confirmation" },
          { label: "Needs worker", value: "3", body: "Unassigned visits this week" },
          { label: "Approval-linked", value: "7", body: "Package-provider funded bookings" },
        ].map((item) => (
          <article key={item.label} className="rounded-lg border border-business-line bg-white p-4 shadow-business">
            <CalendarCheck className="h-4 w-4 text-business-coral" />
            <p className="mt-3 text-3xl font-black">{item.value}</p>
            <h2 className="mt-1 text-sm font-black">{item.label}</h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
