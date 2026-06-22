import { bookingPathways, type BookingPathway } from "@careporter/domain";
import { Check, ChevronLeft, ClipboardCheck, CreditCard, ShieldCheck } from "lucide-react";
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

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <section className="rounded-lg border border-black/[0.08] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:p-7">
        <Link to={`/services/${service.id}`} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#111411]">
          <ChevronLeft className="h-4 w-4" /> Back to {service.name}
        </Link>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-porter-ink/45">Request service</p>
          <h1 className="mt-2 text-[2.25rem] font-semibold leading-[1] tracking-[-0.055em] text-[#111411] sm:text-[3rem]">
            Book {service.name.toLowerCase()}.
          </h1>
          <p className="mt-4 text-base leading-7 text-porter-ink/68">
            Choose who helps, pick a time, add what they need to know, and send the request.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-lg border border-black/[0.08] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111411] text-white">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
              {selectedPathway.requiresProviderApproval ? "Request sent for approval" : "Request sent"}
            </h2>
            <p className="mt-3 leading-7 text-porter-ink/70">
              {selectedPathway.requiresProviderApproval
                ? "BrightPath Care gets the request first. Once it is approved, the vendor can confirm the visit."
                : "The vendor receives the request now and will confirm the visit time."}
            </p>
            <Link to="/dashboard" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-porter-ink px-5 font-medium text-white">
              Track request
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8">
            <Step number="1" title="Choose who helps">
              <div className="grid gap-3 md:grid-cols-2">
                {matchingProviders.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProviderId(item.id)}
                    className={cx(
                      "rounded-lg border p-4 text-left transition",
                      providerId === item.id
                        ? "border-[#111411] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
                        : "border-black/[0.08] bg-white hover:border-black/20",
                    )}
                  >
                    <div className="font-semibold tracking-[-0.02em]">{item.name}</div>
                    <div className="mt-1 text-sm text-porter-ink/60">{item.suburb} - {formatCurrency(item.price)}/hr</div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.specialties.slice(0, 3).map((specialty) => (
                        <span key={specialty} className="rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11px] font-medium text-porter-ink/65">
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
                    className={cx("min-h-12 rounded-full border px-3 text-sm font-medium", selectedDate === date ? "border-porter-ink bg-porter-ink text-white" : "border-black/[0.08] bg-white")}
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
                    className={cx("min-h-12 rounded-full border px-3 text-sm font-medium", selectedTime === time ? "border-porter-ink bg-porter-ink text-white" : "border-black/[0.08] bg-white")}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Step>

            <Step number="3" title="Add the basics">
              <div className="grid gap-3 rounded-lg border border-black/[0.08] bg-[#fbfaf7] p-4 md:grid-cols-2">
                <Input label="Address" placeholder="123 Main Street, Drummoyne" />
                <Input label="Access notes" placeholder="Side gate, key safe, call Sarah on arrival" />
                <Input label="Anything important" placeholder="Uses walker, avoid steep garden path" />
                <Input label="Contact on the day" placeholder="Sarah, 0400 000 000" />
              </div>
            </Step>

            <Step number="4" title="Payment or approval">
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
                <div className="mt-4 grid gap-3 rounded-lg border border-black/[0.08] bg-white p-4 md:grid-cols-2">
                  <Input label="Provider contact name" placeholder="Emma Wilson" />
                  <Input label="Provider organisation" placeholder="BrightPath Care Packages" />
                  <Input label="Email address" placeholder="approvals@brightpath.com.au" />
                  <Input label="Finance email" placeholder="finance@brightpath.com.au" />
                </div>
              )}
            </Step>

            <button
              onClick={() => setSubmitted(true)}
              className="min-h-14 rounded-full bg-porter-ink px-6 text-base font-medium text-white"
            >
              {selectedPathway.requiresProviderApproval ? "Send for approval" : "Send request"}
            </button>
          </div>
        )}
      </section>

      <aside className="h-fit rounded-lg border border-black/[0.08] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] lg:sticky lg:top-24">
        <div className="h-44 rounded-lg bg-cover" style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: provider.imagePosition }} />
        <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{provider.name}</h2>
        <p className="mt-1 text-sm text-porter-ink/60">{service.name} - {provider.suburb}</p>
        <div className="mt-5 grid gap-3 rounded-lg border border-black/[0.08] bg-[#fbfaf7] p-4 text-sm">
          <Row label="Date" value={selectedDate} />
          <Row label="Time" value={selectedTime} />
          <Row label="Pathway" value={selectedPathway.shortLabel} />
          <Row label="Estimate" value={`${formatCurrency(provider.price)} / hr`} />
        </div>
        <div className="mt-4 rounded-lg border border-black/[0.08] bg-white p-4">
          <h3 className="text-sm font-semibold text-[#111411]">What happens next</h3>
          <div className="mt-3 grid gap-3 text-sm text-porter-ink/68">
            <NextStep label="Request sent" active />
            <NextStep label={selectedPathway.requiresProviderApproval ? "Provider approves" : "Vendor reviews"} active={false} />
            <NextStep label="Visit confirmed" active={false} />
          </div>
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
        <h2 className="text-lg font-semibold tracking-[-0.03em]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FundingOption({ active, icon, title, body, onClick }: { active: boolean; icon: React.ReactNode; title: string; body: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-lg border bg-white p-4 text-left transition",
        active ? "border-[#111411] shadow-[0_14px_34px_rgba(15,23,42,0.08)]" : "border-black/[0.08] hover:border-black/20",
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#111411]">{icon}</span>
      <span className="mt-4 block font-semibold tracking-[-0.02em]">{title}</span>
      <span className="mt-2 block text-sm leading-6 text-porter-ink/65">{body}</span>
    </button>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-porter-ink/70">
      {label}
      <input className="min-h-12 rounded-lg border border-black/[0.08] bg-white px-3 text-porter-ink outline-none focus:border-[#111411]" placeholder={placeholder} />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-porter-ink/55">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

function NextStep({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="grid grid-cols-[18px_1fr] items-center gap-3">
      <span className={cx("h-2.5 w-2.5 rounded-full", active ? "bg-[#111411]" : "bg-slate-300")} />
      <span className={active ? "font-medium text-[#111411]" : "text-slate-500"}>{label}</span>
    </div>
  );
}
