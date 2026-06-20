import { Check, ChevronLeft, CreditCard, MailCheck } from "lucide-react";
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
  const [funding, setFunding] = useState<"self" | "package">("self");
  const [submitted, setSubmitted] = useState(false);

  if (!service || matchingProviders.length === 0) return <Navigate to="/services" replace />;
  const provider = matchingProviders.find((item) => item.id === providerId) ?? matchingProviders[0];

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <section className="rounded-lg bg-white p-5 shadow-sm md:p-7">
        <Link to={`/services/${service.id}`} className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#7a3f8f]">
          <ChevronLeft className="h-4 w-4" /> Back to {service.name}
        </Link>
        <h1 className="text-3xl font-black tracking-normal">Book {service.name.toLowerCase()}</h1>
        <p className="mt-2 text-porter-ink/65">A simple selection flow with service, date, time, and funding details.</p>

        {submitted ? (
          <div className="mt-8 rounded-lg bg-emerald-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-black">
              {funding === "package" ? "Booking submitted for approval" : "Booking request received"}
            </h2>
            <p className="mt-3 leading-7 text-porter-ink/70">
              {funding === "package"
                ? "This booking is now pending approval. The package-provider contact will receive a secure approval link by email in the future backend workflow."
                : "The placeholder payment step is ready for future Stripe integration. Your booking is shown as confirmed in this prototype."}
            </p>
            <Link to="/dashboard" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-porter-ink px-5 font-black text-white">
              View dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8">
            <Step title="1. Choose a service">
              <div className="grid gap-3 md:grid-cols-2">
                {matchingProviders.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProviderId(item.id)}
                    className={cx(
                      "rounded-lg border p-4 text-left transition",
                      providerId === item.id ? "border-[#d8aecf] bg-[#fbf7fb]" : "border-black/8 bg-white hover:border-[#d8aecf]",
                    )}
                  >
                    <div className="font-black">{item.name}</div>
                    <div className="mt-1 text-sm text-porter-ink/60">{item.suburb} - {formatCurrency(item.price)}/hr</div>
                  </button>
                ))}
              </div>
            </Step>

            <Step title="2. Pick a date and time">
              <div className="grid gap-3 sm:grid-cols-5">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={cx("min-h-12 rounded-lg border px-3 font-bold", selectedDate === date ? "border-porter-ink bg-porter-ink text-white" : "border-black/8 bg-white")}
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
                    className={cx("min-h-12 rounded-lg border px-3 font-bold", selectedTime === time ? "border-[#d8aecf] bg-[#d8aecf] text-[#111411]" : "border-black/8 bg-white")}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Step>

            <Step title="3. Choose payment method">
              <div className="grid gap-3 md:grid-cols-2">
                <FundingOption
                  active={funding === "self"}
                  icon={<CreditCard className="h-5 w-5" />}
                  title="Self-funded"
                  body="Proceed with a placeholder payment step for future Stripe checkout."
                  onClick={() => setFunding("self")}
                />
                <FundingOption
                  active={funding === "package"}
                  icon={<MailCheck className="h-5 w-5" />}
                  title="Package provider funded"
                  body="Collect contact details and submit booking as pending approval."
                  onClick={() => setFunding("package")}
                />
              </div>
              {funding === "package" && (
                <div className="mt-4 grid gap-3 rounded-lg bg-porter-mist p-4 md:grid-cols-2">
                  <Input label="Package provider contact name" placeholder="Emma Wilson" />
                  <Input label="Company name" placeholder="BrightPath Care Packages" />
                  <Input label="Email address" placeholder="approvals@brightpath.com.au" />
                  <Input label="Optional notes" placeholder="Please include client reference CP-221" />
                </div>
              )}
            </Step>

            <button
              onClick={() => setSubmitted(true)}
              className="min-h-14 rounded-lg bg-porter-ink px-6 text-base font-black text-white"
            >
              Submit booking
            </button>
          </div>
        )}
      </section>

      <aside className="h-fit rounded-lg bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <div className="h-44 rounded-lg bg-cover" style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: provider.imagePosition }} />
        <h2 className="mt-5 text-xl font-black">{provider.name}</h2>
        <p className="mt-1 text-sm text-porter-ink/60">{service.name} - {provider.suburb}</p>
        <div className="mt-5 grid gap-3 rounded-lg bg-porter-mist p-4 text-sm">
          <Row label="Date" value={selectedDate} />
          <Row label="Time" value={selectedTime} />
          <Row label="Funding" value={funding === "self" ? "Self-funded" : "Package provider funded"} />
          <Row label="Estimate" value={`${formatCurrency(provider.price)} / hr`} />
        </div>
      </aside>
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-black">{title}</h2>
      {children}
    </section>
  );
}

function FundingOption({ active, icon, title, body, onClick }: { active: boolean; icon: React.ReactNode; title: string; body: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cx("rounded-lg border p-4 text-left", active ? "border-[#d8aecf] bg-[#fbf7fb]" : "border-black/8 bg-white")}>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d8aecf] text-[#111411]">{icon}</span>
      <span className="mt-4 block font-black">{title}</span>
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
