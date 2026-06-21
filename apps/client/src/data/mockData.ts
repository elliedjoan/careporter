import {
  Armchair,
  BadgeCheck,
  Car,
  CookingPot,
  Flower2,
  HeartHandshake,
  Home,
  PersonStanding,
  ShieldPlus,
  Sparkles,
} from "lucide-react";
import type { ElementType } from "react";

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  priceFrom: number;
  duration: string;
  icon: ElementType;
  accent: string;
  image: string;
  imagePosition: string;
};

export type Provider = {
  id: string;
  name: string;
  serviceIds: string[];
  bio: string;
  rating: number;
  reviews: number;
  suburb: string;
  availability: string[];
  price: number;
  specialties: string[];
  imagePosition: string;
};

export const heroImage = "/images/careporter-care-visual.png";

export const services: Service[] = [
  {
    id: "cleaning",
    name: "Cleaning",
    short: "Fresh, calm homes with verified domestic support.",
    description:
      "Routine home cleaning, linen changes, kitchen refreshes, and light organisation from trusted services.",
    priceFrom: 48,
    duration: "2-4 hours",
    icon: Sparkles,
    accent: "bg-sky-100 text-sky-800",
    image: "/images/services/cleaning.png",
    imagePosition: "50% 48%",
  },
  {
    id: "gardening",
    name: "Gardening",
    short: "Garden care, mowing, pruning, and safer outdoor spaces.",
    description:
      "Support with lawns, seasonal planting, weeding, tidy-ups, and light outdoor maintenance.",
    priceFrom: 56,
    duration: "2-3 hours",
    icon: Flower2,
    accent: "bg-emerald-100 text-emerald-800",
    image: "/images/services/gardening.png",
    imagePosition: "50% 52%",
  },
  {
    id: "transport",
    name: "Transport",
    short: "Reliable trips to appointments, shops, and social visits.",
    description:
      "Door-to-door support for medical appointments, shopping, community activities, and family visits.",
    priceFrom: 42,
    duration: "60-120 min",
    icon: Car,
    accent: "bg-amber-100 text-amber-800",
    image: "/images/services/transport.png",
    imagePosition: "50% 48%",
  },
  {
    id: "maintenance",
    name: "Home maintenance",
    short: "Practical handyman help for safer everyday living.",
    description:
      "Small repairs, grab rail coordination, furniture assembly, smoke alarm checks, and odd jobs.",
    priceFrom: 70,
    duration: "1-3 hours",
    icon: Home,
    accent: "bg-stone-200 text-stone-800",
    image: "/images/services/maintenance.png",
    imagePosition: "50% 48%",
  },
  {
    id: "meals",
    name: "Meal preparation",
    short: "Simple, nourishing meals prepared at home.",
    description:
      "Planning, shopping support, batch cooking, meal prep, and kitchen clean-up for the week ahead.",
    priceFrom: 52,
    duration: "2-3 hours",
    icon: CookingPot,
    accent: "bg-orange-100 text-orange-800",
    image: "/images/services/meals.png",
    imagePosition: "50% 48%",
  },
  {
    id: "personal-care",
    name: "Personal care",
    short: "Respectful assistance with daily routines.",
    description:
      "Personal care support delivered with dignity, consistency, and clear family communication.",
    priceFrom: 62,
    duration: "45-90 min",
    icon: HeartHandshake,
    accent: "bg-rose-100 text-rose-800",
    image: "/images/services/personal-care.png",
    imagePosition: "50% 48%",
  },
  {
    id: "companionship",
    name: "Social support",
    short: "Conversation, outings, hobbies, and connection.",
    description:
      "Companionship visits, community outings, light activities, and support staying socially connected.",
    priceFrom: 44,
    duration: "1-3 hours",
    icon: Armchair,
    accent: "bg-violet-100 text-violet-800",
    image: "/images/services/companionship.png",
    imagePosition: "50% 48%",
  },
  {
    id: "allied-health",
    name: "Allied health support",
    short: "Support around physio, OT, and therapy routines.",
    description:
      "Assistance following agreed therapy routines, mobility plans, and wellness activities.",
    priceFrom: 78,
    duration: "45-60 min",
    icon: ShieldPlus,
    accent: "bg-cyan-100 text-cyan-800",
    image: "/images/services/allied-health.png",
    imagePosition: "50% 48%",
  },
  {
    id: "mobility",
    name: "Mobility assistance",
    short: "Confidence getting around home and community.",
    description:
      "Support with safe transfers, short walks, errands, and mobility confidence-building.",
    priceFrom: 58,
    duration: "45-120 min",
    icon: PersonStanding,
    accent: "bg-lime-100 text-lime-800",
    image: "/images/services/mobility.png",
    imagePosition: "50% 48%",
  },
  {
    id: "nursing-support",
    name: "Nursing-related support",
    short: "Coordinated non-emergency care support.",
    description:
      "Medication prompts, wellbeing check-ins, post-appointment notes, and coordination with family.",
    priceFrom: 82,
    duration: "30-60 min",
    icon: BadgeCheck,
    accent: "bg-blue-100 text-blue-800",
    image: "/images/services/nursing-support.png",
    imagePosition: "50% 48%",
  },
];

export const providers: Provider[] = [
  {
    id: "northside-home-care",
    name: "Northside Home Care",
    serviceIds: ["cleaning", "meals", "personal-care"],
    bio: "A small verified team known for warm routines, reliable notes, and thoughtful care in Brisbane homes.",
    rating: 4.9,
    reviews: 142,
    suburb: "Brisbane North",
    availability: ["Today 2:30 pm", "Tomorrow 10:00 am", "Fri 1:00 pm"],
    price: 58,
    specialties: ["Dementia-aware", "Family updates", "Weekly visits"],
    imagePosition: "35% 48%",
  },
  {
    id: "coast-and-garden",
    name: "Coast & Garden Support",
    serviceIds: ["gardening", "maintenance", "mobility"],
    bio: "Friendly outdoor and home-safety support for older Australians who want their homes to keep feeling like home.",
    rating: 4.8,
    reviews: 96,
    suburb: "Gold Coast",
    availability: ["Tomorrow 8:30 am", "Thu 11:00 am", "Sat 9:00 am"],
    price: 66,
    specialties: ["Garden tidy-ups", "Minor repairs", "Fall-risk checks"],
    imagePosition: "66% 50%",
  },
  {
    id: "kindway-transport",
    name: "Kindway Transport",
    serviceIds: ["transport", "companionship", "mobility"],
    bio: "Calm, punctual transport and community access support with careful handover notes after each booking.",
    rating: 4.95,
    reviews: 211,
    suburb: "Melbourne East",
    availability: ["Today 4:00 pm", "Tomorrow 9:15 am", "Wed 3:45 pm"],
    price: 49,
    specialties: ["Appointment trips", "Shopping", "Social outings"],
    imagePosition: "51% 42%",
  },
  {
    id: "harbour-allied-support",
    name: "Harbour Allied Support",
    serviceIds: ["allied-health", "nursing-support", "personal-care"],
    bio: "Experienced support workers helping clients follow therapy routines and stay confident between appointments.",
    rating: 4.86,
    reviews: 74,
    suburb: "Sydney Inner West",
    availability: ["Thu 12:30 pm", "Fri 9:30 am", "Mon 2:00 pm"],
    price: 82,
    specialties: ["OT routines", "Mobility plans", "Care notes"],
    imagePosition: "75% 42%",
  },
];

export const bookings = [
  {
    id: "CP-1042",
    service: "Transport",
    provider: "Kindway Transport",
    date: "18 Jun 2026",
    time: "9:15 am",
    status: "Confirmed",
    funding: "Pay privately",
  },
  {
    id: "CP-1038",
    service: "Cleaning",
    provider: "Northside Home Care",
    date: "21 Jun 2026",
    time: "10:00 am",
    status: "Pending approval",
    funding: "Provider managed",
  },
  {
    id: "CP-1025",
    service: "Gardening",
    provider: "Coast & Garden Support",
    date: "07 Jun 2026",
    time: "8:30 am",
    status: "Completed",
    funding: "Provider managed",
  },
];
