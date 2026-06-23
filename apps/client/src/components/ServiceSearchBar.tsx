import { ChevronRight, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

type ServiceSearchBarProps = {
  className?: string;
  serviceValue?: string;
  locationValue?: string;
  servicePlaceholder?: string;
  locationPlaceholder?: string;
  actionLabel?: string;
  actionTo?: string;
  onServiceChange?: (value: string) => void;
  onLocationChange?: (value: string) => void;
};

export function ServiceSearchBar({
  className = "",
  serviceValue,
  locationValue,
  servicePlaceholder = "Search support services",
  locationPlaceholder = "Suburb or postcode",
  actionLabel = "Search",
  actionTo,
  onServiceChange,
  onLocationChange,
}: ServiceSearchBarProps) {
  const fields = (
    <>
      <label className="flex min-h-14 min-w-0 items-center gap-3 bg-white px-4 sm:px-5">
        <Search className="h-5 w-5 shrink-0 text-[#7a3f8f]" />
        <input
          value={serviceValue}
          onChange={(event) => onServiceChange?.(event.target.value)}
          className="w-full min-w-0 border-0 bg-transparent text-[0.95rem] font-medium outline-none placeholder:text-porter-ink/42 sm:text-base"
          placeholder={servicePlaceholder}
        />
      </label>
      <label className="flex min-h-14 min-w-0 items-center gap-3 border-t border-black/[0.08] bg-white px-4 sm:px-5 lg:border-l lg:border-t-0">
        <MapPin className="h-5 w-5 shrink-0 text-[#7a3f8f]" />
        <input
          value={locationValue}
          onChange={(event) => onLocationChange?.(event.target.value)}
          className="w-full min-w-0 border-0 bg-transparent text-[0.95rem] font-medium outline-none placeholder:text-porter-ink/42 sm:text-base"
          placeholder={locationPlaceholder}
        />
      </label>
    </>
  );

  const actionClass =
    "inline-flex min-h-14 shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-[#111411] px-5 text-[0.95rem] font-medium text-white transition hover:bg-[#2a302b] sm:text-base lg:px-6";

  return (
    <div
      className={[
        "overflow-hidden rounded-[1.75rem] border border-black/[0.08] bg-white shadow-[0_14px_34px_rgba(89,50,95,0.08)]",
        className,
      ].join(" ")}
    >
      <div className="grid lg:grid-cols-[minmax(17rem,1.08fr)_minmax(14rem,0.82fr)_max-content]">
        {fields}
        {actionTo ? (
          <Link to={actionTo} className={actionClass}>
            {actionLabel}
            <ChevronRight className="h-5 w-5" />
          </Link>
        ) : (
          <button type="button" className={actionClass}>
            {actionLabel}
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
