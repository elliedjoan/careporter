import { CalendarDays, ChevronLeft, ChevronRight, MailCheck, Search, ShieldCheck, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProviderCard, ServiceCard } from "../components/Cards";
import { heroImage, providers, services } from "../data/mockData";

const homeHeroImage = "/images/careporter-hero-panel1-edited.png";

const familyReviews = [
  {
    name: "Sarah Thompson",
    role: "Daughter, Brisbane",
    quote:
      "CarePorter made it much easier to compare services for Mum. I could see what was available, understand the next step, and book without chasing people by phone.",
  },
  {
    name: "Michael Green",
    role: "Son, Sydney",
    quote:
      "The approval flow is what won me over. It is clear when something needs action and who needs to approve it, which removes so much uncertainty.",
  },
  {
    name: "Leah Martin",
    role: "Family carer, Melbourne",
    quote:
      "The service notes helped our family stay aligned. We knew what happened after each visit and could plan the next booking with confidence.",
  },
  {
    name: "Anne Wallace",
    role: "Client, Gold Coast",
    quote:
      "I liked being able to see services near me without feeling pushed. The information felt calm, clear, and easy to understand.",
  },
  {
    name: "Priya Shah",
    role: "Daughter, Adelaide",
    quote:
      "The dashboard feels like it was designed for real families. It shows what is next, what needs attention, and what changed since the last visit.",
  },
  {
    name: "Tom Richards",
    role: "Son, Perth",
    quote:
      "Booking transport was straightforward. The date, funding option, and service details were all in one place, which made the decision simple.",
  },
  {
    name: "Helen Morris",
    role: "Client, Newcastle",
    quote:
      "The language is simple and reassuring. I could understand the difference between self-funded bookings and package approvals without needing help.",
  },
  {
    name: "Rachel Nguyen",
    role: "Family carer, Canberra",
    quote:
      "The updates after each service are genuinely useful. It feels organised and trustworthy, not like another admin system to manage.",
  },
  {
    name: "David Collins",
    role: "Son, Hobart",
    quote:
      "CarePorter gave us one place to compare services, keep documents together, and see upcoming bookings. That made care coordination feel lighter.",
  },
  {
    name: "Maria Esposito",
    role: "Niece, Melbourne",
    quote:
      "I could find the right cleaning service quickly and understand what would happen next. The whole experience felt professional and considered.",
  },
];

export function HomePage() {
  const featuredServicesRef = useRef<HTMLDivElement>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const scrollFeaturedServices = (direction: "left" | "right") => {
    featuredServicesRef.current?.scrollBy({
      left: direction === "right" ? 380 : -380,
      behavior: "smooth",
    });
  };

  const changeReview = (direction: "previous" | "next") => {
    setActiveReviewIndex((current) => {
      const offset = direction === "next" ? 1 : -1;
      return (current + offset + familyReviews.length) % familyReviews.length;
    });
  };

  const visibleReviews = [-1, 0, 1].map((offset) => {
    const index = (activeReviewIndex + offset + familyReviews.length) % familyReviews.length;
    return { ...familyReviews[index], offset };
  });

  return (
    <div className="pb-24 md:pb-0">
      <section className="relative overflow-hidden bg-[#f4ecde]">
        <div className="absolute inset-0 opacity-60">
          <img src={homeHeroImage} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4ecde]/88 via-[#f4ecde]/66 to-[#f4ecde]/8" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f4ecde] to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-[#d8aecf] px-4 py-2 text-sm font-black text-porter-ink/78 shadow-sm">
              Verified care and support services
            </span>
            <h1 className="mt-6 max-w-xl text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              Finding trusted support is now simple.
            </h1>
            <p className="mt-6 max-w-2xl rounded-lg bg-white/90 px-4 py-3 text-lg leading-8 text-porter-ink/78 shadow-sm backdrop-blur-md">
              Search trusted Australian home-care and aged-care services, compare verified services, and book with
              confidence.
            </p>
            <div className="glass mt-8 max-w-2xl rounded-lg border border-white/70 p-3 shadow-soft">
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <label className="flex min-h-14 items-center gap-3 rounded-lg bg-white px-4">
                  <Search className="h-5 w-5 text-[#7a3f8f]" />
                  <input
                    className="w-full border-0 bg-transparent text-base font-semibold outline-none placeholder:text-porter-ink/45"
                    placeholder="Search cleaning, transport, personal care..."
                  />
                </label>
                <Link
                  to="/services"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#111411] px-6 font-black text-white"
                >
                  Browse services <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 text-sm font-black text-porter-ink/78 sm:grid-cols-3">
              <span className="flex min-h-11 items-center gap-2 rounded-lg bg-white/90 px-3 shadow-sm backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#7a3f8f]" />
                Verified
              </span>
              <span className="flex min-h-11 items-center gap-2 rounded-lg bg-white/90 px-3 shadow-sm backdrop-blur-md">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#7a3f8f]" />
                Easy booking
              </span>
              <span className="flex min-h-11 items-center gap-2 rounded-lg bg-white/90 px-3 shadow-sm backdrop-blur-md">
                <MailCheck className="h-4 w-4 shrink-0 text-[#7a3f8f]" />
                Approval links
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-black">Popular support services</h2>
            <p className="mt-2 text-porter-ink/65">Care at home, in the community, and around everyday routines.</p>
          </div>
          <Link to="/services" className="font-black text-[#7a3f8f]">View all services</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-black">Featured services near you</h2>
              <p className="mt-3 leading-7 text-porter-ink/68">
                Every service profile is built for confident decisions: availability, pricing, reviews, specialties,
                and clear next steps.
              </p>
              <div className="mt-8 grid gap-3">
                {["Select a service", "Choose a date and time", "Self-fund or request package approval"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-porter-mist p-4 font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d8aecf] text-[#111411]">{index + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0">
              <div className="mb-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  aria-label="Previous featured service"
                  title="Previous featured service"
                  onClick={() => scrollFeaturedServices("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/8 bg-white text-porter-ink shadow-sm transition hover:bg-porter-mist"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next featured service"
                  title="Next featured service"
                  onClick={() => scrollFeaturedServices("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/8 bg-white text-porter-ink shadow-sm transition hover:bg-porter-mist"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div
                ref={featuredServicesRef}
                className="flex snap-x gap-4 overflow-x-auto pb-2"
              >
                {providers.map((provider) => {
                  const primaryService = services.find((service) => service.id === provider.serviceIds[0]);

                  return (
                    <div key={provider.id} className="w-[min(82vw,22rem)] shrink-0 snap-start lg:w-[22rem]">
                      <ProviderCard
                        provider={provider}
                        image={primaryService?.image}
                        imagePosition={primaryService?.imagePosition}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-lg bg-white p-6 shadow-sm md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black">Why families choose CarePorter</h2>
            <p className="mt-3 max-w-xl leading-7 text-porter-ink/68">
              Finding the right support shouldn't be complicated. CarePorter helps you compare trusted services, book
              with confidence, and stay informed every step of the way.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Trusted, verified services",
                body: "Every service is reviewed and verified, so you can book with confidence.",
              },
              {
                title: "Know what's available before you book",
                body: "View availability upfront and request services that fit your schedule.",
              },
              {
                title: "Works with self-funded and package-funded care",
                body: "Choose the funding option that suits your circumstances.",
              },
              {
                title: "Stay informed from booking to completion",
                body: "Track approvals, appointments, updates, and service notes in one place.",
              },
            ].map((item) => (
              <div key={item.title} className="flex min-h-28 items-start gap-3 rounded-lg bg-porter-mist p-4">
                <Star className="h-4 w-4 fill-porter-butter text-porter-butter" />
                <div>
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-porter-ink/64">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ecde] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-normal">What clients are saying</h2>
            <p className="mt-3 leading-7 text-porter-ink/68">
              Feedback from clients using CarePorter to compare services, manage approvals, and stay across
              care updates.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-[44px_1fr_44px] items-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              title="Previous review"
              onClick={() => changeReview("previous")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white text-[#111411] shadow-sm transition hover:bg-[#d8aecf]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="grid min-w-0 items-center gap-4 md:grid-cols-[0.82fr_1.18fr_0.82fr]">
              {visibleReviews.map((review) => (
                <article
                  key={`${review.name}-${review.offset}`}
                  className={[
                    "rounded-lg border border-black/10 p-5 text-center shadow-sm transition",
                    review.offset === 0
                      ? "min-h-[18rem] bg-[#d8aecf] md:scale-105 md:p-7"
                      : "hidden min-h-[14rem] bg-white md:block",
                  ].join(" ")}
                >
                  <div className="mx-auto flex w-fit items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-[#111411] text-[#111411]" />
                    ))}
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-7 text-[#111411]">{review.quote}</p>
                  <div className="mt-6 flex flex-col items-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sm font-black text-[#111411] shadow-sm">
                      {review.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <h3 className="mt-3 font-black text-[#111411]">{review.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#111411]/70">{review.role}</p>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next review"
              title="Next review"
              onClick={() => changeReview("next")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white text-[#111411] shadow-sm transition hover:bg-[#d8aecf]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {familyReviews.map((review, index) => (
              <button
                key={review.name}
                type="button"
                aria-label={`Show review ${index + 1}`}
                onClick={() => setActiveReviewIndex(index)}
                className={[
                  "h-2.5 rounded-full transition",
                  index === activeReviewIndex ? "w-8 bg-[#111411]" : "w-2.5 bg-[#d8aecf]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[60rem] gap-3 lg:grid-cols-2">
          <article className="flex min-h-[18.75rem] flex-col rounded-lg border border-black/10 bg-[#f4ecde] p-4 shadow-sm md:p-6">
            <div className="flex min-h-24 items-center justify-center rounded-lg bg-white px-4 py-5">
              <img
                src="/images/careporter-for-business-logo.png"
                alt="CarePorter for Business"
                className="h-auto w-full max-w-[15.75rem] object-contain"
              />
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <h2 className="min-h-[3.6rem] max-w-full text-xl font-black leading-tight tracking-normal text-[#111411] xl:text-[1.45rem]">
                Ready to list your services on CarePorter?
              </h2>
              <p className="mt-3 min-h-[2.625rem] max-w-xl text-sm leading-6 text-porter-ink/68">
                Reach families who are actively comparing care and support services, and make it easier for them to book
                with confidence.
              </p>
              <Link
                to="/business"
                className="mt-5 inline-flex min-h-9 w-fit items-center justify-center rounded-lg bg-[#111411] px-4 text-sm font-black text-white"
              >
                Learn more
              </Link>
            </div>
          </article>

          <article className="flex min-h-[18.75rem] flex-col rounded-lg border border-black/10 bg-[#d8aecf] p-4 shadow-sm md:p-6">
            <div className="flex min-h-24 items-center justify-center rounded-lg bg-white px-4 py-5">
              <img
                src="/images/careporter-for-providers-logo.png"
                alt="CarePorter for Providers"
                className="h-auto w-full max-w-[15.75rem] object-contain"
              />
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <h2 className="min-h-[3.6rem] max-w-full text-xl font-black leading-tight tracking-normal text-[#111411] xl:text-[1.4rem]">
                Ready for efficient management of your clients' bookings?
              </h2>
              <p className="mt-3 min-h-[2.625rem] max-w-xl text-sm leading-6 text-[#111411]/72">
                Streamline package approvals, booking visibility, and service updates in one calm, organised workflow.
              </p>
              <Link
                to="/providers"
                className="mt-5 inline-flex min-h-9 w-fit items-center justify-center rounded-lg bg-[#111411] px-4 text-sm font-black text-white"
              >
                Learn more
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
