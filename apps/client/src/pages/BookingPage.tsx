import { bookingLifecycle, bookingPathways, type BookingPathway } from "@careporter/domain";
import { Check, ChevronLeft, ClipboardCheck, CreditCard, MailCheck, MessageSquareText, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { heroImage, providers, services } from "../data/mockData";
import { cx, formatCurrency } from "../lib/utils";

const dates = ["Tue 16 Jun", "Wed 17 Jun", "Thu 18 Jun", "Fri 19 Jun", "Mon 22 Jun"];
const times = ["8:30 am", "10:00 am", "12:30 pm", "2:30 pm", "4:00 pm"];

export function BookingPage() {
  const { serviceId } = useParams();
  const [searchParams] = useSearchParams();
  const service = services.find((item) => item.id === serviceId);
  const initialProvider = searchParams.get("provider");
  const matchingProviders = useMemo(
    () => providers.filter((provider) => provider.serviceIds.includes(serviceId ?? "")),
    [serviceId],
  );
  const [providerId, setProviderId] = useState(initialProvider ?? matchingProviders[0]?.id);
  const [selectedDate, setSelectedDate] = useState(dates[1]);
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [pathway, setPathway] = useState<BookingPathway>("provider_managed");
  const [submitted, setSubmitted] = useState(false);

  if (!service || matchingProviders.length === 0) return <Navigate to="/services" replace />;
  const provider = matchingProviders.find((item) => item.id === providerId) ?? matchingProviders[0];
  const selectedPathway = bookingPathways.find((item) => item.id === pathway) ?? bookingPathways[0];
  const lifecyclePreview = bookingLifecycle.filter((item) =>
    pathway === "provider_managed"
      ? ["draft", "pending_provider_approval", "provider_approved", "vendor_confirmed", "completed", "invoice_sent"].includes(item.status)
      : ["draft", "vendor_confirmed", "completed", "invoice_sent", "paid"].includes(item.status),
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <section className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-7">
        <Link to={`/services/${service.id}`} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7a3f8f]">
          <ChevronLeft className="h-4 w-4" /> Back to {service.name}
        </Link>
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-porter-ink/45">Clients choose. Providers approve. Vendors deliver.</p>
          <h1 className="mt-2 text-[2.25rem] font-bold leading-[1] tracking-[-0.055em] text-[#111411] sm:text-[3rem]">
            Book {service.name.toLowerCase()} without losing the care trail.
          </h1>
          <p className="mt-4 text-base leading-7 text-porter-ink/68">
            Choose the vendor, capture care preferences, select the funding pathway, and keep approval, confirmation, progress notes, invoices, and payment status in one place.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-[-0.04em]">
              {selectedPathway.requiresProviderApproval ? "Booking sent for provider approval" : "Booking request sent to the vendor"}
            </h2>
            <p className="mt-3 leading-7 text-porter-ink/70">
              {selectedPathway.requiresProviderApproval
                ? "BrightPath Care will receive the approval request with the service scope, care preferences, vendor details, and finance contact. Once approved, the vendor can confirm the visit."
                : "The vendor receives the request now. CarePorter will keep the progress note, invoice, and payment status attached to this booking."}
            </p>
            <Link to="/dashboard" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-porter-ink px-5 font-semibold text-white">
              View dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8">
            <Step number="1" title="Choose the vendor">
              <div className="grid gap-3 md:grid-cols-2">
                {matchingProviders.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProviderId(item.id)}
                    className={cx(
                      "rounded-xl border p-4 text-left transition",
                      providerId === item.id ? "border-[#d8aecf] bg-[#fbf7fb]" : "border-black/8 bg-white hover:border-[#d8aecf]",
                    )}
                  >
                    <div className="font-semibold tracking-[-0.02em]">{item.name}</div>
                    <div className="mt-1 text-sm text-porter-ink/60">{item.suburb} - {formatCurrency(item.price)}/hr</div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.specialties.slice(0, 3).map((specialty) => (
                        <span key={specialty} className="rounded-full bg-porter-mist px-2.5 py-1 text-[11px] font-semibold text-porter-ink/65">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </Step>

            <Step number="2" title="Pick a date and time">
              <div className="grid gap-3 sm:grid-cols-5">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={cx("min-h-12 rounded-lg border px-3 text-sm font-semibold", selectedDate === date ? "border-porter-ink bg-porter-ink text-white" : "border-black/8 bg-white")}
                  >
                    {date}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-5">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cx("min-h-12 rounded-lg border px-3 text-sm font-semibold", selectedTime === time ? "border-[#d8aecf] bg-[#d8aecf] text-[#111411]" : "border-black/8 bg-white")}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Step>

            <Step number="3" title="Add care preferences">
              <div className="grid gap-3 rounded-xl border border-black/[0.08] bg-[#faf9f5] p-4 md:grid-cols-2">
                <Input label="Access notes" placeholder="Side gate, key safe, call Sarah on arrival" />
                <Input label="Mobility or safety notes" placeholder="Uses walker, avoid steep garden path" />
                <Input label="Progress note request" placeholder="Add photos and a short completion note" />
                <Input label="Coordinator note" placeholder="Anything the provider or vendor should know" />
              </div>
            </Step>

            <Step number="4" title="Choose the funding pathway">
              <div className="grid gap-3 lg:grid-cols-3">
                {bookingPathways.map((item) => (
                  <FundingOption
                    key={item.id}
                    active={pathway === item.id}
                    icon={item.id === "private_pay" ? <CreditCard className="h-5 w-5" /> : item.id === "provider_managed" ? <ShieldCheck className="h-5 w-5" /> : <ClipboardCheck className="h-5 w-5" />}
                    title={item.label}
                    body={item.description}
                    onClick={() => setPathway(item.id)}
                  />
                ))}
              </div>
              {pathway === "provider_managed" && (
                <div className="mt-4 grid gap-3 rounded-xl border border-[#ead8ec] bg-[#fbf7fb] p-4 md:grid-cols-2">
                  <Input label="Provider contact name" placeholder="Emma Wilson" />
                  <Input label="Provider organisation" placeholder="BrightPath Care Packages" />
                  <Input label="Email address" placeholder="approvals@brightpath.com.au" />
                  <Input label="Finance email" placeholder="finance@brightpath.com.au" />
                </div>
              )}
            </Step>

            <Step number="5" title="Review the booking trail">
              <div className="grid gap-3 rounded-xl border border-black/[0.08] bg-white p-4 md:grid-cols-2">
                {lifecyclePreview.map((item, index) => (
                  <div key={item.status} className="grid grid-cols-[30px_1fr] gap-3">
                    <span className={cx("flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold", index === 0 ? "bg-[#111411] text-white" : "bg-porter-mist text-porter-ink/65")}>
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#111411]">{item.label}</span>
                      <span className="mt-0.5 block text-xs leading-5 text-porter-ink/58">{item.description}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Step>

            <button
              onClick={() => setSubmitted(true)}
              className="min-h-14 rounded-lg bg-porter-ink px-6 text-base font-semibold text-white"
            >
              {selectedPathway.requiresProviderApproval ? "Send for provider approval" : "Send booking request"}
            </button>
          </div>
        )}
      </section>

      <aside className="h-fit rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:sticky lg:top-24">
        <div className="h-44 rounded-xl bg-cover" style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: provider.imagePosition }} />
        <h2 className="mt-5 text-xl font-bold tracking-[-0.03em]">{provider.name}</h2>
        <p className="mt-1 text-sm text-porter-ink/60">{service.name} - {provider.suburb}</p>
        <div className="mt-5 grid gap-3 rounded-xl bg-porter-mist p-4 text-sm">
          <Row label="Date" value={selectedDate} />
          <Row label="Time" value={selectedTime} />
          <Row label="Pathway" value={selectedPathway.shortLabel} />
          <Row label="Estimate" value={`${formatCurrency(provider.price)} / hr`} />
        </div>
        <div className="mt-4 rounded-xl border border-[#ead8ec] bg-[#fbf7fb] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#7a3f8f]">
            <MessageSquareText className="h-4 w-4" />
            Progress note ready
          </div>
          <p className="mt-2 text-xs leading-5 text-porter-ink/62">
            After completion, the vendor adds the progress note and CarePorter connects it to the invoice and booking history.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111411] text-xs font-semibold text-white">{number}</span>
        <h2 className="text-lg font-bold tracking-[-0.03em]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FundingOption({ active, icon, title, body, onClick }: { active: boolean; icon: React.ReactNode; title: string; body: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cx("rounded-xl border p-4 text-left", active ? "border-[#d8aecf] bg-[#fbf7fb]" : "border-black/8 bg-white")}>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d8aecf] text-[#111411]">{icon}</span>
      <span className="mt-4 block font-semibold tracking-[-0.02em]">{title}</span>
      <span className="mt-2 block text-sm leading-6 text-porter-ink/65">{body}</span>
    </button>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-porter-ink/70">
      {label}
      <input className="min-h-12 rounded-lg border border-black/8 bg-white px-3 text-porter-ink outline-none focus:border-[#d8aecf]" placeholder={placeholder} />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-porter-ink/55">{label}</span>
      <span className="font-black text-right">{value}</span>
    </div>
  );
}
