export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: "skyroute" | "globalpath" | "urbanbites";
  eyebrow: string;
  headline: string;
  intro: string;
  features: string[];
  proofPoints: { value: string; label: string }[];
  inquiryLabel: string;
  inquiryFields: { label: string; name: string; type: "text" | "date" | "number"; required: boolean }[];
  highlights: { title: string; description: string }[];
};

export const whatsappNumber = "917707930377";
export const phoneNumber = "+91 7707930377";

export const projects: PortfolioProject[] = [
  {
    slug: "nexus-tech",
    name: "NEXUS TECH",
    category: "SaaS & Tech Platform",
    shortDescription: "High-performance digital engineering for modern tech brands.",
    description: "A showcase modern tech website designed by WEBWALE, engineered with lightning-fast load times, interactive UI/UX, and high conversion flow.",
    image: "/images/skyroute-coast.webp",
    imageAlt: "Modern tech web platform designed by WEBWALE",
    accent: "skyroute",
    eyebrow: "Digital Engineering & Design",
    headline: "Engineered for ambitious brands.",
    intro: "Fast, modern, and built to convert. We craft responsive web platforms that turn visitors into loyal customers.",
    features: ["Custom React & Next.js Architecture", "High-Converting UI/UX Design", "SEO & Core Web Vitals Optimization", "WhatsApp & Lead Integration"],
    proofPoints: [{ value: "99+", label: "Performance Score" }, { value: "100%", label: "Mobile Responsive" }, { value: "3x", label: "Higher Lead Conversion" }],
    inquiryLabel: "Start your website project",
    inquiryFields: [
      { label: "Your name", name: "name", type: "text", required: true },
      { label: "Business / Project name", name: "business", type: "text", required: true },
      { label: "What kind of website do you need?", name: "websiteType", type: "text", required: true },
      { label: "Your phone number", name: "phone", type: "text", required: true },
    ],
    highlights: [
      { title: "Bespoke Design, Zero Generic Templates", description: "Every page is hand-crafted to reflect your brand's unique identity and value proposition." },
      { title: "Blazing Speed & Search Optimized", description: "Built with modern clean code so your website loads in under 1 second and ranks on Google." },
      { title: "Built to Convert Visitors into Clients", description: "Strategic layout, clear call-to-actions, and direct WhatsApp integration for maximum enquiries." },
    ],
  },
  {
    slug: "globalpath-immigration",
    name: "GLOBALPATH",
    category: "Corporate & Consulting Website",
    shortDescription: "A multi-page business website built for professional consulting services.",
    description: "A sample corporate guidance and consulting platform designed by WEBWALE to make professional services feel clear and approachable.",
    image: "/images/globalpath-student.webp",
    imageAlt: "Professional corporate consulting website designed by WEBWALE",
    accent: "globalpath",
    eyebrow: "Professional Web Presence",
    headline: "Clarity that inspires trust.",
    intro: "A clean, confident corporate website designed to establish credibility and capture qualified enquiries.",
    features: ["Multi-Page Corporate Architecture", "Interactive Lead Capture Forms", "Trust & Credibility Modules", "Mobile-First Responsive Layout"],
    proofPoints: [{ value: "100%", label: "Custom Architecture" }, { value: "1:1", label: "Dedicated Support" }, { value: "Fast", label: "Project Delivery" }],
    inquiryLabel: "Inquire about a website",
    inquiryFields: [
      { label: "Your name", name: "name", type: "text", required: true },
      { label: "Where are you located / Business name", name: "destination", type: "text", required: true },
      { label: "What kind of website are you looking for?", name: "pathway", type: "text", required: true },
      { label: "Your phone number", name: "phone", type: "text", required: true },
    ],
    highlights: [
      { title: "Designed to Build Immediate Trust", description: "Clear value proposition, modern typography, and structured content that instills confidence in clients." },
      { title: "Seamless Lead Generation", description: "Custom enquiry forms and WhatsApp integration designed to convert interested visitors into real clients." },
      { title: "Ongoing Support & Peace of Mind", description: "Helpful handover, maintenance options, and technical support so you can focus on your business." },
    ],
  },
  {
    slug: "urban-bites",
    name: "URBAN BITES",
    category: "Restaurant & E-commerce Website",
    shortDescription: "A high-conversion food & hospitality website built with online menu and table bookings.",
    description: "A sample hospitality and restaurant experience designed by WEBWALE for slow evenings, bright flavours, and easy online bookings.",
    image: "/images/urbanbites-ramen.webp",
    imageAlt: "A steaming bowl of spicy ramen from Urban Bites",
    accent: "urbanbites",
    eyebrow: "Hospitality & E-commerce Design",
    headline: "Your brand, served beautifully.",
    intro: "Vibrant visuals, interactive digital menus, and 1-click WhatsApp table reservations designed for modern hospitality businesses.",
    features: ["Interactive Digital Menu", "Direct WhatsApp Table Bookings", "Location & Hours Integration", "Social Proof & Review Badges"],
    proofPoints: [{ value: "Instant", label: "WhatsApp Bookings" }, { value: "100%", label: "Mobile-First Design" }, { value: "Fast", label: "Menu Updates" }],
    inquiryLabel: "Get a website for your brand",
    inquiryFields: [
      { label: "Your name", name: "name", type: "text", required: true },
      { label: "Business name", name: "business", type: "text", required: true },
      { label: "Target launch timeframe", name: "timeframe", type: "text", required: false },
      { label: "Your phone number", name: "phone", type: "text", required: true },
    ],
    highlights: [
      { title: "Visuals that Sell", description: "High-resolution imagery, warm aesthetic palettes, and layouts that make your offerings irresistible." },
      { title: "Frictionless Booking & Orders", description: "Direct 1-tap WhatsApp reservations and order enquiries without third-party commission cuts." },
      { title: "Easily Editable Content", description: "Simple setup so you can update pricing, menus, or seasonal specials anytime with ease." },
    ],
  },
];

export function findProject(slug: string) {
  if (slug === "skyroute-travels") {
    return projects[0];
  }
  return projects.find((project) => project.slug === slug);
}

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}