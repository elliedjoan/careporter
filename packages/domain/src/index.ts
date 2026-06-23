export type UserRole = "client" | "business_staff" | "provider_staff" | "admin";

export type BookingPathway = "provider_managed" | "self_managed_package" | "private_pay";

export type BookingStatus =
  | "draft"
  | "pending_provider_approval"
  | "provider_approved"
  | "vendor_confirmed"
  | "in_progress"
  | "completed"
  | "invoice_sent"
  | "paid";

export type VerificationStatus = "not_started" | "submitted" | "human_review" | "approved" | "renewal_due";

export type ProviderPlan = "free" | "growth";

export function getTimeOfDayGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

export const roleLabels: Record<UserRole, string> = {
  client: "Client",
  business_staff: "Business staff",
  provider_staff: "Provider staff",
  admin: "Admin",
};

export const bookingPathways: Array<{
  id: BookingPathway;
  label: string;
  shortLabel: string;
  description: string;
  requiresProviderApproval: boolean;
}> = [
  {
    id: "provider_managed",
    label: "Provider managed",
    shortLabel: "Provider managed",
    description: "Your provider approves the request before the vendor confirms the service.",
    requiresProviderApproval: true,
  },
  {
    id: "self_managed_package",
    label: "Self-managed package",
    shortLabel: "Self-managed",
    description: "You book directly and keep package records and service updates together.",
    requiresProviderApproval: false,
  },
  {
    id: "private_pay",
    label: "Pay privately",
    shortLabel: "Private pay",
    description: "You pay for the service yourself. No provider approval is needed.",
    requiresProviderApproval: false,
  },
];

export const bookingLifecycle: Array<{ status: BookingStatus; label: string; description: string }> = [
  { status: "draft", label: "Draft", description: "Service, vendor, and care preferences are being collected." },
  { status: "pending_provider_approval", label: "Provider approval", description: "Provider reviews budget, care fit, and invoice details." },
  { status: "provider_approved", label: "Approved", description: "Vendor can confirm and prepare the visit." },
  { status: "vendor_confirmed", label: "Vendor confirmed", description: "Date, time, access notes, and service scope are confirmed." },
  { status: "in_progress", label: "Service in progress", description: "Vendor is delivering the service." },
  { status: "completed", label: "Progress note", description: "Vendor adds the completion note, photos, and follow-up details." },
  { status: "invoice_sent", label: "Invoice sent", description: "Invoice has been sent to the right payer or finance contact." },
  { status: "paid", label: "Paid", description: "Payment is complete and CarePorter commission is recorded." },
];

export const providerFeatureGates = [
  {
    feature: "Approve, decline, and ask questions",
    free: true,
    growth: true,
  },
  {
    feature: "View booking and invoice status",
    free: true,
    growth: true,
  },
  {
    feature: "Pay invoices",
    free: true,
    growth: true,
  },
  {
    feature: "Team seats and approval routing",
    free: false,
    growth: true,
  },
  {
    feature: "Bulk approvals and reporting export",
    free: false,
    growth: true,
  },
  {
    feature: "Approval rules and API readiness",
    free: false,
    growth: true,
  },
] as const;

export const launchMetrics = {
  client: [
    { label: "Upcoming services", value: "4", detail: "1 awaiting provider approval" },
    { label: "Progress notes", value: "7", detail: "Added this month" },
    { label: "Booked this month", value: "3", detail: "Across trusted services" },
  ],
  provider: [
    { label: "Approvals waiting", value: "12", detail: "4 due today" },
    { label: "Invoices ready", value: "$8.4k", detail: "Across pilot clients" },
    { label: "Plan", value: "Free", detail: "Upgrade unlocks team workflow" },
  ],
  admin: [
    { label: "Vendors in review", value: "18", detail: "6 need human review" },
    { label: "Provider pilots", value: "5", detail: "2 ready for onboarding" },
    { label: "Open risks", value: "3", detail: "Complaints or late invoices" },
  ],
} as const;

export const providerApprovalQueue = [
  {
    id: "APR-2401",
    client: "Maggie Thompson",
    vendor: "Coast & Garden Support",
    service: "Garden tidy-up",
    amount: "$216 est.",
    requestedBy: "Sarah Thompson",
    due: "Today 3:00 pm",
    status: "Needs approval",
    pathway: "provider_managed" satisfies BookingPathway,
  },
  {
    id: "APR-2398",
    client: "Joan Wallace",
    vendor: "Kindway Transport",
    service: "Appointment transport",
    amount: "$84 est.",
    requestedBy: "Joan Wallace",
    due: "Tomorrow 10:00 am",
    status: "Question asked",
    pathway: "provider_managed" satisfies BookingPathway,
  },
  {
    id: "APR-2394",
    client: "Graham Reid",
    vendor: "Northside Home Care",
    service: "Home cleaning",
    amount: "$132 est.",
    requestedBy: "Michael Reid",
    due: "Approved yesterday",
    status: "Approved",
    pathway: "provider_managed" satisfies BookingPathway,
  },
];

export const adminVerificationQueue = [
  {
    id: "VER-118",
    business: "Harbour Allied Support",
    category: "Allied health",
    status: "Human review",
    checks: "Insurance, police check, onboarding call",
    risk: "Medium",
  },
  {
    id: "VER-117",
    business: "Gold Coast Hearing Care",
    category: "Hearing services",
    status: "Automated review",
    checks: "ABN and insurance matched",
    risk: "Low",
  },
  {
    id: "VER-116",
    business: "Bright Hands Cleaning",
    category: "Cleaning",
    status: "Renewal due",
    checks: "Public liability expires in 9 days",
    risk: "High",
  },
];
