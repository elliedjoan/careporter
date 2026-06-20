export type Tone = "sea" | "amber" | "coral" | "lavender" | "slate";

export const businessProfile = {
  name: "Northside Home Care",
  owner: "Amelia Hart",
  suburb: "Brisbane North",
  rating: 4.9,
  responseTime: "18 min",
};

export const dashboardMetrics = [
  { label: "Open booking requests", value: "12", detail: "+4 since yesterday", tone: "sea" },
  { label: "This week revenue", value: "$8.4k", detail: "72% package funded", tone: "amber" },
  { label: "Roster coverage", value: "86%", detail: "3 gaps need attention", tone: "coral" },
  { label: "Service health", value: "94", detail: "2 listings need updates", tone: "lavender" },
] as const;

export const actionQueue = [
  {
    id: "ACT-102",
    title: "Confirm cleaning request",
    subject: "Maggie Green",
    meta: "Package-funded, awaiting business confirmation",
    due: "Today 2:00 pm",
    priority: "High",
    tone: "coral" as Tone,
  },
  {
    id: "ACT-103",
    title: "Upload renewed liability certificate",
    subject: "Compliance",
    meta: "Required before adding personal care workers",
    due: "27 Jun",
    priority: "Medium",
    tone: "amber" as Tone,
  },
  {
    id: "ACT-104",
    title: "Reply to family message",
    subject: "Sarah Thompson",
    meta: "Question about linen refresh and access notes",
    due: "Today",
    priority: "Normal",
    tone: "sea" as Tone,
  },
];

export const todaySchedule = [
  { time: "9:00", service: "Cleaning", client: "Joan Wallace", worker: "Priya", status: "In progress" },
  { time: "11:30", service: "Meal preparation", client: "Graham Reid", worker: "Leo", status: "Confirmed" },
  { time: "2:15", service: "Personal care", client: "Maggie Green", worker: "Unassigned", status: "Needs worker" },
  { time: "4:00", service: "Cleaning", client: "Anne Morris", worker: "Mina", status: "Confirmed" },
];

export const serviceListings = [
  {
    id: "cleaning",
    name: "Home cleaning",
    category: "Domestic assistance",
    status: "Published",
    coverage: "Brisbane North",
    rate: 58,
    utilisation: 82,
    nextOpenSlot: "Tomorrow 10:00 am",
    funding: "Self-funded and package-funded",
    requirements: ["Police check", "Insurance", "Care notes"],
  },
  {
    id: "meals",
    name: "Meal preparation",
    category: "At-home support",
    status: "Published",
    coverage: "North Lakes, Chermside",
    rate: 64,
    utilisation: 68,
    nextOpenSlot: "Fri 1:30 pm",
    funding: "Self-funded",
    requirements: ["Food safety", "Care notes"],
  },
  {
    id: "personal-care",
    name: "Personal care",
    category: "Daily living",
    status: "Needs verification",
    coverage: "Brisbane North",
    rate: 72,
    utilisation: 44,
    nextOpenSlot: "Paused",
    funding: "Package-funded",
    requirements: ["Worker credentials", "Insurance renewal"],
  },
  {
    id: "linen",
    name: "Linen refresh",
    category: "Domestic assistance",
    status: "Draft",
    coverage: "Draft coverage",
    rate: 42,
    utilisation: 0,
    nextOpenSlot: "Not published",
    funding: "Self-funded",
    requirements: ["Pricing", "Availability"],
  },
];

export const availabilityRules = [
  { day: "Mon", window: "8:00 am - 4:30 pm", workers: 7, openSlots: 9, status: "Healthy" },
  { day: "Tue", window: "8:00 am - 4:30 pm", workers: 6, openSlots: 6, status: "Healthy" },
  { day: "Wed", window: "9:00 am - 3:00 pm", workers: 4, openSlots: 2, status: "Tight" },
  { day: "Thu", window: "8:00 am - 4:30 pm", workers: 5, openSlots: 4, status: "Healthy" },
  { day: "Fri", window: "8:00 am - 2:00 pm", workers: 3, openSlots: 1, status: "Gap" },
];

export const bookings = [
  {
    id: "CPB-2148",
    client: "Maggie Green",
    service: "Home cleaning",
    date: "21 Jun 2026",
    time: "10:00 am",
    funding: "Package-funded",
    status: "New request",
    owner: "Unassigned",
  },
  {
    id: "CPB-2142",
    client: "Joan Wallace",
    service: "Home cleaning",
    date: "20 Jun 2026",
    time: "9:00 am",
    funding: "Self-funded",
    status: "In progress",
    owner: "Priya S.",
  },
  {
    id: "CPB-2139",
    client: "Graham Reid",
    service: "Meal preparation",
    date: "20 Jun 2026",
    time: "11:30 am",
    funding: "Self-funded",
    status: "Confirmed",
    owner: "Leo M.",
  },
  {
    id: "CPB-2135",
    client: "Anne Morris",
    service: "Home cleaning",
    date: "20 Jun 2026",
    time: "4:00 pm",
    funding: "Package-funded",
    status: "Provider approval received",
    owner: "Mina K.",
  },
];

export const messages = [
  {
    id: "MSG-81",
    sender: "Sarah Thompson",
    context: "Maggie Green, home cleaning",
    preview: "Can linen refresh be included with next Friday's visit?",
    time: "8 min ago",
    status: "Unread",
  },
  {
    id: "MSG-80",
    sender: "BrightPath Care Packages",
    context: "Approval CPB-2148",
    preview: "Approval request received. Please confirm worker allocation before 4 pm.",
    time: "42 min ago",
    status: "Needs reply",
  },
  {
    id: "MSG-79",
    sender: "CarePorter Support",
    context: "Listing verification",
    preview: "Personal care listing is paused until the renewed certificate is uploaded.",
    time: "Yesterday",
    status: "Open",
  },
];

export const documents = [
  { name: "Public liability insurance", type: "Insurance", status: "Expires soon", expires: "27 Jun 2026" },
  { name: "Worker police checks", type: "Credential pack", status: "Current", expires: "14 Mar 2027" },
  { name: "Food safety certificate", type: "Service credential", status: "Current", expires: "09 Nov 2026" },
  { name: "Personal care worker credentials", type: "Credential pack", status: "Missing", expires: "Required" },
];

export const invoices = [
  { id: "INV-B-1092", client: "Joan Wallace", service: "Home cleaning", amount: 116, status: "Paid", date: "20 Jun 2026" },
  { id: "INV-B-1088", client: "Anne Morris", service: "Home cleaning", amount: 132, status: "Approved", date: "19 Jun 2026" },
  { id: "INV-B-1082", client: "Graham Reid", service: "Meal preparation", amount: 192, status: "Due", date: "18 Jun 2026" },
];
