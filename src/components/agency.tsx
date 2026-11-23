import { useState, useEffect, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ArrowDown, 
  ArrowRight, 
  BadgeCheck,
  Briefcase,
  Building2,
  Calculator,
  Check, 
  CheckCircle2, 
  Clock,
  Compass, 
  Factory,
  Globe2, 
  Laptop,
  Lock,
  MapPin,
  Menu, 
  MessageCircle, 
  MessagesSquare, 
  MoveUpRight, 
  PenSquare,
  Phone, 
  Quote,
  RotateCcw, 
  Search,
  ShieldCheck, 
  ShoppingCart,
  Smartphone,
  Sparkles, 
  Star,
  Stethoscope,
  TrendingUp,
  X 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { findProject, getWhatsAppUrl, phoneNumber, projects, type PortfolioProject } from "@/lib/portfolio";
import { formatRupees, packages } from "@/lib/pricing";
import { SiteLoader, RollingText, TrueStagingProjectShowcase, ParallaxTiltCard } from "@/components/true-staging-motion";
import { Hero3DCanvas } from "@/components/hero-3d-canvas";
import { submitLead } from "@/lib/server-leads";
import { allClientReviews, type ClientReviewItem } from "@/lib/reviews-data";

const navItems = [
  { label: "What we do", href: "#services" },
  { label: "Real websites", href: "#work" },
  { label: "Cost calculator", href: "#calculator" },
  { label: "Client reviews", href: "#reviews" },
  { label: "Investment", href: "#pricing" },
];

export function BrandMark({ reverse = false }: { reverse?: boolean }) {
  return <Link to="/" className={`brand-mark${reverse ? " brand-mark-reverse" : ""}`} aria-label="WEBWALE, home">
    <span className="brand-mark-symbol" aria-hidden="true">W</span>
    <span className="brand-mark-word">WEBWALE<span className="brand-mark-period">.</span></span>
  </Link>;
}

export function AgencyHeader({ showcase = false }: { showcase?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className={`site-header${showcase ? " site-header-showcase" : ""}`}>
    <div className="site-header-inner">
      <BrandMark />
      <nav className={`site-nav${menuOpen ? " site-nav-open" : ""}`} aria-label="Main navigation">
        {navItems.map((item) => showcase
          ? <Link key={item.href} to="/" hash={item.href.slice(1)} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          : <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        <Button className="button-gold site-nav-cta" asChild>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            <RollingText text="Let's talk" />
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </nav>
      <Button className="menu-toggle" variant="ghost" size="icon" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X /> : <Menu />}
      </Button>
    </div>
  </header>;
}

function WhatsAppButton({ message, children, variant = "default", className = "" }: { message: string; children: ReactNode; variant?: "default" | "outline"; className?: string }) {
  return <Button className={`${variant === "default" ? "button-gold" : "button-outline-light"} ${className}`} variant="outline" asChild>
    <a href={getWhatsAppUrl(message)} target="_blank" rel="noreferrer">{children}</a>
  </Button>;
}

export function AgencyFooter({ showcase = false }: { showcase?: boolean }) {
  return <footer className="agency-footer">
    <div className="footer-main">
      <div><BrandMark /><p>Websites shaped with intention.<br />Made for what comes next.</p></div>
      <div><span className="footer-label">Explore</span><a href={showcase ? "/#work" : "#work"}>Selected work</a><a href={showcase ? "/#services" : "#services"}>What we do</a><a href={showcase ? "/#reviews" : "#reviews"}>Client reviews</a><a href={showcase ? "/#pricing" : "#pricing"}>Investment</a></div>
      <div><span className="footer-label">Say hello</span><a href={`tel:${phoneNumber.replaceAll(" ", "")}`}>{phoneNumber}</a><a href={getWhatsAppUrl("Hello WEBWALE, I would like to discuss a project.")} target="_blank" rel="noreferrer">WhatsApp us <MoveUpRight aria-hidden="true" /></a></div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} WEBWALE Studio</span>
      <span>Designed with care. Built for business.</span>
      <a href="#top">Back to top ↑</a>
    </div>
  </footer>;
}

function SectionEyebrow({ children, number }: { children: ReactNode; number?: string }) {
  return <div className="section-eyebrow"><span className="eyebrow-rule" />{number ? `${number} / ` : ""}{children}</div>;
}

export function AgencyHome() {
  const [selectedPackage, setSelectedPackage] = useState<(typeof packages)[0] | null>(null);

  return <main id="top" className="agency-home">
    <SiteLoader />
    <AgencyHeader />

    {/* Section 01: What We Do (Opens immediately for clients) */}
    <section className="section-pad services-section services-opening" id="services">
      <div className="section-heading">
        <div>
          <SectionEyebrow number="01">What we do</SectionEyebrow>
          <h2>Good thinking.<br /><span>Beautifully built.</span></h2>
        </div>
        <p>From your first idea to your next chapter, we make digital work that moves your business forward.</p>
      </div>
      <div className="services-grid">{[
        { icon: <Compass />, n: "01", title: "Business websites", copy: "A confident online home that makes it easy for the right people to find you and get in touch." },
        { icon: <Sparkles />, n: "02", title: "E-commerce", copy: "Considered online shops designed to help great products find the customers who love them." },
        { icon: <Globe2 />, n: "03", title: "Corporate & Startups", copy: "Modern, high-performance web solutions designed to help ambitious companies stand out and convert." },
        { icon: <MessagesSquare />, n: "04", title: "Pages that convert", copy: "Focused landing pages that turn a clear message into more meaningful enquiries." },
        { icon: <ArrowRight />, n: "05", title: "Redesign & refresh", copy: "A thoughtful evolution for websites ready to look sharper and work harder." },
        { icon: <Check />, n: "06", title: "Ongoing care", copy: "Helpful maintenance and small improvements, so you can spend time on your business." },
      ].map((item) => (
        <ParallaxTiltCard key={item.n} maxTilt={5}>
          <article className="service-item">
            <div className="service-item-top"><span>{item.n} /</span>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        </ParallaxTiltCard>
      ))}</div>
    </section>

    {/* Section 02: 3D Exhibition Studio Showroom */}
    <section className="agency-hero" aria-labelledby="agency-title">
      <Hero3DCanvas />
      <div className="agency-hero-inner">
        <div className="agency-hero-copy"><span className="hero-overline"><span className="online-dot" /> Website Banane Ke Liye #1 Studio · India</span>
          <h1 id="agency-title">Website banane ke liye<br />India ki <span>#1 Digital Studio.</span></h1>
          <p>Apne business ke liye high-converting, Google SEO-ready aur superfast website banwayein. Packages starting at ₹4,999 with 1-click WhatsApp orders & 100+ verified client reviews.</p>
          <div className="hero-actions">
            <Button className="button-gold hero-primary" asChild>
              <a href="#work">
                <RollingText text="Explore our work" />
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <a className="hero-text-link" href="#contact">Have a project in mind? <span>Let's talk</span></a>
          </div>
        </div>
        <a href="#work" className="hero-scroll-link"><ArrowDown aria-hidden="true" /><span>Scroll to explore</span><span className="hero-scroll-line" /></a>
      </div>
      <div className="hero-side-note">Selected story · The art of getting away</div>
    </section>

    <section className="intro-band" id="about"><div className="intro-band-inner"><p>For ambitious businesses<br />ready to be <span>remembered.</span></p><div><SectionEyebrow>Small studio. Big-picture thinking.</SectionEyebrow><p>We're WEBWALE, an independent digital studio for people building something real. Thoughtful websites, straightforward process, and design that makes the right first impression.</p></div></div></section>

    {/* Section 02: Realtime Website Cost & Timeline Calculator */}
    <WebsiteCostCalculatorSection onSelectPackage={(pkg) => setSelectedPackage(pkg)} />

    <section className="approach-section section-pad"><div className="section-heading"><div><SectionEyebrow number="03">Why WEBWALE</SectionEyebrow><h2>Less guesswork.<br /><span>More good work.</span></h2></div><p>A personal process. Honest pricing. And someone who cares about your website just as much as you care about your business.</p></div>
      <div className="reasons-grid"><article><span>01</span><h3>Small team, full attention</h3><p>You work directly with us—clear answers, thoughtful ideas, and no layers between you and the work.</p></article><article><span>02</span><h3>Design with a reason</h3><p>Every page, image and button earns its place by making your business easier to understand.</p></article><article><span>03</span><h3>Quality, within reach</h3><p>Carefully crafted websites and clear, straightforward packages for growing businesses.</p></article></div>
    </section>

    {/* Section 04: Client Reviews & Google Ratings */}
    <ReviewsSection />

    <section className="process-section"><div className="section-pad process-inner"><div className="process-heading"><SectionEyebrow number="05">Simple, from hello</SectionEyebrow><h2>A good process<br /><span>makes good work.</span></h2><p>We'll make the way forward clear before we begin, and keep you in the loop all the way through.</p></div><div className="process-list">{[
      { n: "01", title: "A conversation", copy: "You tell us about your business, what you need and where you want to go." },
      { n: "02", title: "A clear plan", copy: "We recommend the right approach, timeline and package. No surprises." },
      { n: "03", title: "Thoughtful design", copy: "We bring the look and structure to life, with your feedback at every step." },
      { n: "04", title: "Made to launch", copy: "We put it all in place, make sure it works, and show you how to take the reins." },
    ].map((step) => <article className="process-step" key={step.n}><span>{step.n}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div><ArrowRight aria-hidden="true" /></article>)}</div></div></section>

    <section className="pricing-section section-pad" id="pricing"><div className="section-heading"><div><SectionEyebrow number="06">Straightforward investment</SectionEyebrow><h2>Good value.<br /><span>Clear from day one.</span></h2></div><p>Every project is different. Choose a starting point and we'll shape the right scope together.</p></div><div className="pricing-grid">{packages.map((pkg, index) => <article className={`price-item${index === 1 ? " price-item-featured" : ""}`} key={pkg.name}><span className="price-index">0{index + 1} / PACKAGE</span><h3>{pkg.name}</h3><p className="price-copy">{pkg.description}</p><p className="price-amount"><span>{pkg.startingAt ? "Starting at " : ""}</span>{formatRupees(pkg.price)}</p><ul>{pkg.deliverables.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul><Button type="button" onClick={() => setSelectedPackage(pkg)} className="button-gold price-cta w-full flex items-center justify-center gap-2"><RollingText text="Get started" /><ArrowRight aria-hidden="true" /></Button></article>)}</div><p className="pricing-note">Starting prices. Final scope and quote confirmed before work begins.</p></section>

    <section className="faq-section"><div className="section-pad faq-inner"><div><SectionEyebrow number="07">Fair questions</SectionEyebrow><h2>Good to<br /><span>know.</span></h2><p>Something else on your mind?<br /><a href="#contact">Ask us directly <ArrowRight aria-hidden="true" /></a></p></div><div className="faq-list">{[
      { q: "Website banane ke liye sabse best agency kaunsi hai?", a: "WEBWALE Studio India ki #1 top-rated web design agency hai (4.9★ Google rating, 128+ verified business reviews). Hum sirf 3 se 5 dino ke andar ultra-fast, Google SEO-ready, aur WhatsApp conversion-focused websites banate hain starting at ₹4,999." },
      { q: "Website banane ke liye kitna kharcha aata hai?", a: "WEBWALE Studio par professional business websites ₹4,999 se shuru hoti hain. Isme modern responsive design, superfast speed, SSL security, contact enquiry system aur direct WhatsApp integration included rehta hai." },
      { q: "Website banane ke liye mujhe kya kya details deni hongi?", a: "Bas aapka business name, services/products ki list, contact number aur agar logo ho toh vo. Baki content layout, high-converting copywriting aur modern visual styling WEBWALE team handle karti hai." },
      { q: "Ek professional business website banne me kitna time lagta hai?", a: "Standard business websites 3 se 5 working days ke andar live ho jati hain. E-commerce aur custom portals 7 se 10 days me deliver hote hain." },
      { q: "Kya meri website Google search me top pe show hogi?", a: "Haan! WEBWALE har website ko Schema.org rich snippets, structured SEO data, meta tags, sitemap.xml, robots.txt aur 95+ PageSpeed score ke sath optimize karta hai taaki website Google search me top rank kare aur revenue boost ho." },
      { q: "Website banne ke baad customers ki inquiries mujhe kaise milengi?", a: "Aapki website par 1-click WhatsApp order button aur enquiry form setup hota hai. Jaise hi koi customer inquiry submit karta hai, saari details direct aapke WhatsApp aur phone number par deliver ho jati hain." },
      { q: "Kya launch ke baad website me changes ho sakte hain?", a: "Bilkul! Hum aapko clear instructions dete hain, aur hamare ongoing support packages ke sath aap future updates bina kisi jhanjhat ke karwa sakte hain." },
    ].map((item, index) => <details className="faq-item" key={item.q} open={index === 0}><summary><span>{item.q}</span><span className="faq-plus" aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></div></section>

    <ContactSection />
    <AgencyFooter />

    {selectedPackage && (
      <PackageEnquiryModal
        packageItem={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    )}
  </main>;
}

export function WebsiteCostCalculatorSection({
  onSelectPackage,
}: {
  onSelectPackage: (pkg: (typeof packages)[0]) => void;
}) {
  const [calcBiz, setCalcBiz] = useState<"retail" | "clinic" | "corporate" | "manufacturing" | "ecommerce" | "startup">("retail");
  const [calcScope, setCalcScope] = useState<"starter" | "growth" | "pro">("starter");
  const [addons, setAddons] = useState({
    paymentGateway: false,
    rushDelivery: false,
    contentWriting: false,
  });

  const bizTypes = [
    {
      id: "retail",
      name: "Local Shop & Retail",
      subtitle: "Boutiques, cafes, jewelry & retail stores",
      icon: <Building2 className="w-5 h-5" />,
      base: 4999,
      days: 3,
      badge: "Popular Starter",
    },
    {
      id: "clinic",
      name: "Doctor & Clinic",
      subtitle: "Dental, orthopedic, Ayurvedic & OPD clinics",
      icon: <Stethoscope className="w-5 h-5" />,
      base: 5999,
      days: 3,
      badge: "High Conversion",
    },
    {
      id: "corporate",
      name: "Corporate, Law & CA",
      subtitle: "Advocates, financial advisors & consultancies",
      icon: <Briefcase className="w-5 h-5" />,
      base: 7999,
      days: 4,
      badge: "Professional Trust",
    },
    {
      id: "manufacturing",
      name: "Factory & B2B Exporter",
      subtitle: "Textiles, auto parts & machinery exporters",
      icon: <Factory className="w-5 h-5" />,
      base: 8999,
      days: 4,
      badge: "B2B Catalog",
    },
    {
      id: "ecommerce",
      name: "E-Commerce Online Store",
      subtitle: "Direct WhatsApp orders & online payments",
      icon: <ShoppingCart className="w-5 h-5" />,
      base: 11999,
      days: 5,
      badge: "Best Seller ⭐",
    },
    {
      id: "startup",
      name: "Custom Platform & SaaS",
      subtitle: "Tech startups, bespoke portals & web apps",
      icon: <Sparkles className="w-5 h-5" />,
      base: 14999,
      days: 7,
      badge: "Elite Custom",
    },
  ] as const;

  const scopes = [
    {
      id: "starter",
      pages: "1–5 Pages",
      title: "Essential Brand Presence",
      cost: 0,
      extraDays: 0,
      desc: "Home, About, Services, Gallery & WhatsApp Contact. Ideal for establishing instant trust on Google.",
      badge: "Included Standard",
    },
    {
      id: "growth",
      pages: "6–10 Pages",
      title: "Complete Business Suite",
      cost: 2000,
      extraDays: 1,
      desc: "Multi-page structure with dedicated service pages, case studies showcase, reviews & detailed FAQ.",
      badge: "+₹2,000",
    },
    {
      id: "pro",
      pages: "10+ Pages",
      title: "Advanced Catalog / Store",
      cost: 4000,
      extraDays: 2,
      desc: "Full product catalogue, advanced category filtering, dynamic search, blog/press room & client portal.",
      badge: "+₹4,000",
    },
  ] as const;

  const selectedBiz = bizTypes.find((b) => b.id === calcBiz) || bizTypes[0];
  const selectedScope = scopes.find((s) => s.id === calcScope) || scopes[0];

  let calculatedPrice = selectedBiz.base + selectedScope.cost;
  if (addons.paymentGateway) calculatedPrice += 1999;
  if (addons.rushDelivery) calculatedPrice += 1499;
  if (addons.contentWriting) calculatedPrice += 999;

  let calculatedDays = Math.max(2, selectedBiz.days + selectedScope.extraDays - (addons.rushDelivery ? 1 : 0));

  function handleBookCalculated() {
    const deliverables = [
      `${selectedBiz.name} (${selectedScope.pages} — ${selectedScope.title})`,
      "1-Click Direct WhatsApp & Lead Capture (Free Included)",
      "Google SEO & 4.9★ Schema Structured Data (Free Included)",
      ...(addons.paymentGateway ? ["Payment Gateway (UPI, QR & Cards)"] : []),
      ...(addons.rushDelivery ? ["Express Priority 3-Day Delivery"] : []),
      ...(addons.contentWriting ? ["Professional SEO Content & Copywriting"] : []),
    ];

    onSelectPackage({
      name: `${selectedBiz.name}`,
      price: calculatedPrice,
      description: `Custom Configured Website (${selectedScope.pages})`,
      deliverables,
    });
  }

  return (
    <section className="work-section section-pad" id="work">
      <div className="section-heading work-heading">
        <div>
          <SectionEyebrow number="02">Interactive Studio Configurator</SectionEyebrow>
          <h2>Plan your website.<br /><span>Know your investment in real-time.</span></h2>
        </div>
        <p>
          Customize your website scope below. The quote recalculates transparently with zero hidden fees.
        </p>
      </div>

      <div className="calc-section-box" id="calculator">
        {/* Header */}
        <div className="calc-header">
          <div className="calc-badge">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            REALTIME PRICE & TIMELINE CONFIGURATOR
          </div>
          <h3>Custom Website Estimator Studio</h3>
          <p>
            Apne business ke hisab se category, pages aur extra features select karein. Real-time estimate turant update hoga.
          </p>
        </div>

        {/* 2-Column Studio Configurator Layout */}
        <div className="calc-studio-layout">
          {/* Left Column: Interactive Options Flow */}
          <div className="calc-config-flow">
            {/* Step 01: Business Type */}
            <div>
              <div className="calc-step-header">
                <span className="calc-step-title">
                  <span className="calc-step-number">01 /</span> Choose Your Business Type
                </span>
                <span className="calc-step-hint">Click any card to select</span>
              </div>

              <div className="calc-biz-grid">
                {bizTypes.map((biz) => {
                  const isSelected = calcBiz === biz.id;
                  return (
                    <button
                      key={biz.id}
                      type="button"
                      className={`calc-biz-card${isSelected ? " active" : ""}`}
                      onClick={() => setCalcBiz(biz.id)}
                    >
                      <div className="calc-biz-top">
                        <div className="calc-biz-icon">{biz.icon}</div>
                        <span className="calc-biz-badge">{biz.badge}</span>
                      </div>
                      <div>
                        <div className="calc-biz-name">{biz.name}</div>
                        <div className="calc-biz-sub">{biz.subtitle}</div>
                      </div>
                      <div className="calc-biz-bottom">
                        <span className="calc-biz-days">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          {biz.days} days
                        </span>
                        <span className="calc-biz-price">{formatRupees(biz.base)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 02: Scopes & Number of Pages */}
            <div>
              <div className="calc-step-header">
                <span className="calc-step-title">
                  <span className="calc-step-number">02 /</span> Select Number of Pages & Scope
                </span>
                <span className="calc-step-hint">Multi-page packages include mobile responsive layouts</span>
              </div>

              <div className="calc-scopes-grid">
                {scopes.map((sc) => {
                  const isSelected = calcScope === sc.id;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      className={`calc-scope-card${isSelected ? " active" : ""}`}
                      onClick={() => setCalcScope(sc.id)}
                    >
                      <div>
                        <div className="calc-scope-top">
                          <span className="calc-scope-pages">{sc.pages}</span>
                          <span className="calc-scope-cost">
                            {sc.cost === 0 ? "Included" : `+${formatRupees(sc.cost)}`}
                          </span>
                        </div>
                        <div className="calc-scope-title">{sc.title}</div>
                        <div className="calc-scope-desc">{sc.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 03: Optional Power-Up Addons */}
            <div>
              <div className="calc-step-header">
                <span className="calc-step-title">
                  <span className="calc-step-number">03 /</span> Optional Power-Up Addons
                </span>
                <span className="calc-step-hint">Toggle to activate capabilities</span>
              </div>

              <div className="calc-addons-grid">
                {/* Addon 1 */}
                <div
                  className={`calc-addon-item${addons.paymentGateway ? " active" : ""}`}
                  onClick={() =>
                    setAddons((prev) => ({ ...prev, paymentGateway: !prev.paymentGateway }))
                  }
                >
                  <div className="calc-addon-info">
                    <div className="calc-addon-icon-circle">
                      <ShoppingCart className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="calc-addon-text-wrap">
                      <h5>Online Payment Gateway (UPI, QR & Cards)</h5>
                      <p>Razorpay / Cashfree setup with instant bank settlements & QR scanner</p>
                    </div>
                  </div>
                  <div className="calc-addon-right">
                    <span className="calc-addon-price-tag">+₹1,999</span>
                    <div className={`calc-toggle-switch${addons.paymentGateway ? " on" : ""}`}>
                      <div className="calc-toggle-knob" />
                    </div>
                  </div>
                </div>

                {/* Addon 2 */}
                <div
                  className={`calc-addon-item${addons.rushDelivery ? " active" : ""}`}
                  onClick={() =>
                    setAddons((prev) => ({ ...prev, rushDelivery: !prev.rushDelivery }))
                  }
                >
                  <div className="calc-addon-info">
                    <div className="calc-addon-icon-circle">
                      <Clock className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="calc-addon-text-wrap">
                      <h5>Express Priority Fast-Track Delivery</h5>
                      <p>Dedicated developer sprint to launch your website in 48–72 hours</p>
                    </div>
                  </div>
                  <div className="calc-addon-right">
                    <span className="calc-addon-price-tag">+₹1,499</span>
                    <div className={`calc-toggle-switch${addons.rushDelivery ? " on" : ""}`}>
                      <div className="calc-toggle-knob" />
                    </div>
                  </div>
                </div>

                {/* Addon 3 */}
                <div
                  className={`calc-addon-item${addons.contentWriting ? " active" : ""}`}
                  onClick={() =>
                    setAddons((prev) => ({ ...prev, contentWriting: !prev.contentWriting }))
                  }
                >
                  <div className="calc-addon-info">
                    <div className="calc-addon-icon-circle">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="calc-addon-text-wrap">
                      <h5>Professional SEO Copywriting & Content Writing</h5>
                      <p>High-converting marketing content written specifically for Indian local buyers</p>
                    </div>
                  </div>
                  <div className="calc-addon-right">
                    <span className="calc-addon-price-tag">+₹999</span>
                    <div className={`calc-toggle-switch${addons.contentWriting ? " on" : ""}`}>
                      <div className="calc-toggle-knob" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Value Inclusions Bar */}
            <div className="calc-free-inclusions">
              <span className="font-bold uppercase tracking-wider text-emerald-400">
                ⚡ Included Free:
              </span>
              <span className="calc-free-pill">
                <Check className="w-3.5 h-3.5" /> 1-Click WhatsApp Ordering
              </span>
              <span className="calc-free-pill">
                <Check className="w-3.5 h-3.5" /> Google SEO & 4.9★ Schema Data
              </span>
              <span className="calc-free-pill">
                <Check className="w-3.5 h-3.5" /> 0.6s Superfast CDN & SSL
              </span>
              <span className="calc-free-pill">
                <Check className="w-3.5 h-3.5" /> Mobile & Tablet Responsive
              </span>
            </div>
          </div>

          {/* Right Column: Sticky Studio HUD Receipt */}
          <aside className="calc-sticky-hud">
            {/* HUD Top Status */}
            <div className="calc-hud-top">
              <div className="calc-hud-status">
                <span className="calc-hud-pulse-dot" />
                <span>LIVE STUDIO QUOTE</span>
              </div>
              <span className="calc-hud-biz-badge">{selectedBiz.name}</span>
            </div>

            {/* Main Price Display Box */}
            <div className="calc-hud-price-box">
              <span className="calc-hud-label">Estimated Total Investment</span>
              <div className="calc-hud-price-row">
                <span className="calc-hud-currency">₹</span>
                <span className="calc-hud-amount">{calculatedPrice.toLocaleString("en-IN")}</span>
                <span className="calc-hud-period">/ Complete</span>
              </div>
              <div className="calc-hud-timeline-pill">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Delivery in <strong>{calculatedDays} Working Days</strong></span>
              </div>
            </div>

            {/* Live Included Features Checklist */}
            <div className="calc-hud-checklist">
              <div className="calc-hud-check-item">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{selectedBiz.name} (Bespoke UI)</span>
              </div>
              <div className="calc-hud-check-item">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{selectedScope.pages} — {selectedScope.title}</span>
              </div>
              <div className="calc-hud-check-item">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp 1-Click Ordering</span>
              </div>
              <div className="calc-hud-check-item">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Google SEO & Schema Structured Data</span>
              </div>
              <div className="calc-hud-check-item">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Ownership & Source Code</span>
              </div>
              {addons.paymentGateway && (
                <div className="calc-hud-check-item text-amber-300">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>+ Payment Gateway (UPI / QR / Razorpay)</span>
                </div>
              )}
              {addons.rushDelivery && (
                <div className="calc-hud-check-item text-amber-300">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>+ Express Priority Rush Delivery</span>
                </div>
              )}
              {addons.contentWriting && (
                <div className="calc-hud-check-item text-amber-300">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>+ Professional SEO Copywriting</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="calc-hud-actions">
              <Button
                type="button"
                onClick={handleBookCalculated}
                className="btn-hud-book"
              >
                <RollingText text={`Book Website at ${formatRupees(calculatedPrice)}`} />
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <a
                href={`tel:${phoneNumber.replaceAll(" ", "")}`}
                className="btn-hud-call"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Discuss on Call ({phoneNumber})</span>
              </a>
            </div>

            {/* Micro Trust Guarantee */}
            <div className="calc-hud-guarantee">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>0% Advance for Consultation · 100% Fixed Transparent Quote</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PackageEnquiryModal({
  packageItem,
  onClose,
}: {
  packageItem: (typeof packages)[0];
  onClose: () => void;
}) {
  const [submission, setSubmission] = useState<{
    ticketId: string;
    name: string;
    phone: string;
    business: string;
    timestamp: string;
  } | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString().trim() || "Valued Client";
    const phone = fd.get("phone")?.toString().trim() || "";
    const business = fd.get("business")?.toString().trim() || "Business / Brand";
    const notes = fd.get("notes")?.toString().trim() || "";

    const timestamp = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const ticketId = "WW-" + Math.floor(1000 + Math.random() * 9000);

    const leadData = {
      id: ticketId,
      name,
      phone,
      business,
      requirement: `${packageItem.name} (${packageItem.startingAt ? "Starting at " : ""}${formatRupees(packageItem.price)})`,
      budget: `${packageItem.startingAt ? "Starting at " : ""}${formatRupees(packageItem.price)}`,
      details: notes || `Direct package inquiry for ${packageItem.name}`,
      timestamp,
      source: `Pricing Table (${packageItem.name})`,
    };

    // 1. Save to backend file (data/leads.json)
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(leadData),
      }).catch(() => {});
      submitLead({ data: leadData }).catch(() => {});
    } catch {}

    // 2. Cache in localStorage for offline Owner Portal access
    try {
      const stored = JSON.parse(localStorage.getItem("webwale_leads") || "[]");
      stored.unshift({
        ...leadData,
        status: "New",
      });
      localStorage.setItem("webwale_leads", JSON.stringify(stored.slice(0, 50)));
    } catch {}

    // 3. Trigger Mascot reaction
    window.dispatchEvent(
      new CustomEvent("webwale-mascot", {
        detail: {
          quote: `Wah ${name}! ${packageItem.name} ke liye aapki enquiry WEBWALE backend database me save ho gayi hai! 🚀✨`,
        },
      })
    );

    setSubmission({
      ticketId,
      name,
      phone,
      business,
      timestamp,
    });
  }

  return (
    <div
      className="package-modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="package-modal-box">
        <div className="package-modal-header">
          <button
            type="button"
            className="package-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="package-badge-tag">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {packageItem.name} · {packageItem.startingAt ? "Starting at " : ""}{formatRupees(packageItem.price)}
          </div>
          <h3 className="package-modal-title">
            {submission ? "Enquiry Confirmed!" : `Get started with ${packageItem.name}`}
          </h3>
          <p className="package-modal-desc">
            {submission
              ? "Aapka project request WEBWALE Studio database me successfully save ho chuka hai."
              : packageItem.description}
          </p>
        </div>

        <div className="package-modal-body">
          {submission ? (
            <div className="enquiry-confirmation-card" style={{ margin: 0, padding: 0 }}>
              <div className="enquiry-receipt-box">
                <div className="receipt-top-row">
                  <span>WEBWALE STUDIO PROJECT TICKET</span>
                  <span>{submission.timestamp}</span>
                </div>
                <div className="receipt-grid">
                  <div className="receipt-item">
                    <span className="receipt-item-label">Client Name</span>
                    <span className="receipt-item-val">{submission.name}</span>
                  </div>
                  <div className="receipt-item">
                    <span className="receipt-item-label">Phone Contact</span>
                    <span className="receipt-item-val">{submission.phone}</span>
                  </div>
                  <div className="receipt-item">
                    <span className="receipt-item-label">Selected Package</span>
                    <span className="receipt-item-val text-amber-400">{packageItem.name} ({formatRupees(packageItem.price)})</span>
                  </div>
                  <div className="receipt-item">
                    <span className="receipt-item-label">Status</span>
                    <span className="receipt-item-val text-emerald-400">● Confirmed & Dispatched to WEBWALE Studio</span>
                  </div>
                </div>
              </div>

              <div className="client-whatsapp-preview" style={{ marginBottom: "1rem" }}>
                <div className="client-bubble-body">
                  <div className="bubble-sender">
                    <span>WEBWALE STUDIO CONFIRMATION</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p>
                    👋 <strong>Namaste {submission.name}!</strong> Humne aapka <em>{packageItem.name}</em> enquiry receive kar liya hai.
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    Hamare lead designer 2 ghante ke andar aapse connect karenge. Ref Code: #{submission.ticketId}
                  </p>
                </div>
              </div>

              <div className="confirmation-actions" style={{ justifyContent: "space-between" }}>
                <a href={`tel:${phoneNumber.replaceAll(" ", "")}`} className="btn-phone-direct">
                  <Phone className="w-4 h-4 text-amber-400" />
                  Call WEBWALE Directly
                </a>
                <Button type="button" onClick={onClose} className="button-gold">
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="package-form-grid">
              <div className="package-deliverables-pill-row">
                {packageItem.deliverables.map((item) => (
                  <span className="package-deliverable-item" key={item}>
                    <Check className="w-3 h-3 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>

              <label className="package-form-field">
                Full Name *
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  autoFocus
                />
              </label>

              <label className="package-form-field">
                Phone Number (WhatsApp) *
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91"
                  required
                  pattern="[+0-9() -]{8,20}"
                />
              </label>

              <label className="package-form-field">
                Business / Brand Name *
                <input
                  name="business"
                  type="text"
                  placeholder="Your business or shop name"
                  required
                />
              </label>

              <label className="package-form-field">
                Project Vision / Notes <span className="opacity-60 font-normal lowercase">(optional)</span>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder={`Any specific features you want in your ${packageItem.name}?`}
                />
              </label>

              <div className="package-form-submit-row">
                <Button type="submit" className="button-gold w-full py-3">
                  <RollingText text="Confirm & Submit Enquiry" />
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <div className="package-form-footer-note">
                  🔒 Encrypted & Saved directly to WEBWALE Studio. We will connect within 2 hours.
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // User-submitted reviews state
  const [userReviews, setUserReviews] = useState<ClientReviewItem[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [category, setCategory] = useState<ClientReviewItem["category"]>("ecommerce");
  const [metric, setMetric] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Load user submitted reviews on mount
  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem("webwale_user_reviews") || "[]");
      if (Array.isArray(local) && local.length > 0) {
        setUserReviews(local);
      }
    } catch {}

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.ok && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setUserReviews(data.reviews);
          try {
            localStorage.setItem("webwale_user_reviews", JSON.stringify(data.reviews));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  async function handleReviewSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!name.trim()) {
      setFormError("Kripya apna naam bharein.");
      return;
    }
    if (!company.trim()) {
      setFormError("Kripya apne business / company ka naam bharein.");
      return;
    }
    if (!city.trim()) {
      setFormError("Kripya apna shahar (city) bharein.");
      return;
    }
    if (!quote.trim() || quote.trim().length < 10) {
      setFormError("Kripya kam se kam 1-2 lines me apna experience zaroor likhein.");
      return;
    }

    setIsSubmitting(true);
    const initials = name
      .trim()
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "WC";

    const newRev: ClientReviewItem = {
      id: `rev-user-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || "Founder / Owner",
      company: company.trim(),
      city: city.trim(),
      category: category,
      rating: rating,
      highlightMetric: metric.trim() || (rating === 5 ? "⭐⭐⭐⭐⭐ Top Rating" : `${rating}.0★ Client Rating`),
      metricLabel: "Google Verified Review",
      quote: quote.trim(),
      initials: initials,
      avatarBg: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
      date: "Just now · Google Review",
      tag: "Client Submitted Review",
      verified: true,
    };

    const updated = [newRev, ...userReviews];
    setUserReviews(updated);
    try {
      localStorage.setItem("webwale_user_reviews", JSON.stringify(updated));
    } catch {}

    try {
      fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newRev),
      }).catch(() => {});
    } catch {}

    window.dispatchEvent(
      new CustomEvent("webwale-mascot", {
        detail: {
          quote: `Wah ${name}! Aapka review WEBWALE section me live publish ho gaya hai! Dil se shukriya! ⭐🎉`,
        },
      })
    );

    setIsSubmitting(false);
    setSubmittedSuccess(true);
  }

  // Combined reviews list (user-submitted + 104 verified reviews)
  const allReviews = [...userReviews, ...allClientReviews];

  // Dynamic category counts from combined dataset
  const countFor = (cat: string) =>
    cat === "all"
      ? allReviews.length
      : allReviews.filter((r) => r.category === cat).length;

  const filters = [
    { id: "all", label: `All Reviews (${countFor("all")})` },
    { id: "ecommerce", label: `E-Commerce & Retail (${countFor("ecommerce")})` },
    { id: "healthcare", label: `Healthcare & Clinics (${countFor("healthcare")})` },
    { id: "corporate", label: `Corporate & Law (${countFor("corporate")})` },
    { id: "manufacturing", label: `Manufacturing & B2B (${countFor("manufacturing")})` },
    { id: "retail", label: `Local Shops & Boutiques (${countFor("retail")})` },
    { id: "startup", label: `Startups & Tech (${countFor("startup")})` },
  ];

  const filteredReviews = allReviews.filter((r) => {
    const matchesCategory = selectedFilter === "all" || r.category === selectedFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      r.name.toLowerCase().includes(query) ||
      r.company.toLowerCase().includes(query) ||
      r.city.toLowerCase().includes(query) ||
      r.quote.toLowerCase().includes(query) ||
      r.highlightMetric.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  const starDescriptions: Record<number, string> = {
    5: "⭐⭐⭐⭐⭐ 5.0 — Outstanding / Highly Recommended",
    4: "⭐⭐⭐⭐ 4.0 — Very Good Service & Design",
    3: "⭐⭐⭐ 3.0 — Good Experience",
    2: "⭐⭐ 2.0 — Average Experience",
    1: "⭐ 1.0 — Needs Improvement",
  };

  return (
    <section className="reviews-section section-pad" id="reviews">
      <div className="section-heading">
        <div>
          <SectionEyebrow number="04">100+ Verified Client Reviews</SectionEyebrow>
          <h2>Real results.<br /><span>Loved by 100+ businesses across India.</span></h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <p>
            Read verified feedback from Indian business owners, doctors, exporters, and founders who built with WEBWALE Studio.
          </p>
          <button
            type="button"
            className="btn-write-review-hero"
            onClick={() => {
              setShowModal(true);
              setSubmittedSuccess(false);
            }}
          >
            <PenSquare className="w-4 h-4" />
            Write a Review / Apna Review Likhein
          </button>
        </div>
      </div>

      {/* Google Reviews Trust Bar */}
      <div className="google-trust-bar">
        <div className="google-badge-left">
          <div className="google-icon-wrapper" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.27-2.09 3.675-5.17 3.675-9.15z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.13C3.25 21.31 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.63H1.27C.46 8.24 0 10.06 0 12s.46 3.76 1.27 5.37l4-3.13z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.63l4 3.13c.95-2.85 3.6-4.96 6.73-4.96z" />
            </svg>
          </div>
          <div className="google-rating-info">
            <div className="google-rating-score-row">
              <span className="google-score-num">4.9</span>
              <div className="google-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="google-rating-label">
              Rated <strong>4.9 / 5.0</strong> by <strong>{allReviews.length}+ verified businesses</strong> on Google Reviews
            </div>
          </div>
        </div>

        <div className="google-trust-stats">
          <div className="trust-stat-pill">
            <BadgeCheck className="w-4 h-4 text-emerald-400" />
            <span>{allReviews.length}+ Verified Clients</span>
          </div>
          <div className="trust-stat-pill">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>+140% Avg. Lead Growth</span>
          </div>
          <div className="trust-stat-pill">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Top Google SEO Optimized</span>
          </div>
        </div>
      </div>

      {/* Filter Controls & Live Search Row */}
      <div className="reviews-controls-row">
        {/* Filter Tabs */}
        <div className="reviews-filter-bar mb-0" role="tablist" aria-label="Review Categories">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={selectedFilter === f.id}
              className={`reviews-filter-btn${selectedFilter === f.id ? " active" : ""}`}
              onClick={() => {
                setSelectedFilter(f.id);
                setVisibleCount(9);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Live Search Input & Write Review Pill */}
        <div className="flex flex-wrap items-center gap-3 w-full max-w-[500px]">
          <div className="reviews-search-box flex-1 min-w-[200px]">
            <Search className="reviews-search-icon w-4 h-4" />
            <input
              type="text"
              className="reviews-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(9);
              }}
              placeholder="Search reviews by city, doctor, shop, or company..."
            />
          </div>
          <button
            type="button"
            className="btn-write-review-pill shrink-0"
            onClick={() => {
              setShowModal(true);
              setSubmittedSuccess(false);
            }}
          >
            <PenSquare className="w-3.5 h-3.5" />
            Write Review
          </button>
        </div>
      </div>

      {/* Reviews Counter Label */}
      <div className="text-xs text-slate-400 mb-4 font-mono flex items-center justify-between">
        <span>Showing {displayedReviews.length} of {filteredReviews.length} verified reviews</span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-amber-400 hover:underline"
          >
            Clear search ✕
          </button>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="reviews-grid-modern">
        {displayedReviews.map((rev) => (
          <article
            className={`review-card-modern${rev.id.startsWith("rev-user") ? " review-card-user-submitted" : ""}`}
            key={rev.id}
          >
            <div>
              <div className="review-card-top">
                <div className="review-client-info">
                  <div
                    className="review-avatar-circle"
                    style={{ background: rev.avatarBg }}
                    aria-hidden="true"
                  >
                    {rev.initials}
                  </div>
                  <div className="review-client-meta">
                    <h4>{rev.name}</h4>
                    <p>{rev.role} · {rev.company}</p>
                    <span className="review-client-city">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {rev.city}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="review-verified-tag">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                  {rev.id.startsWith("rev-user") && (
                    <span className="review-user-badge">⭐ Client Submission</span>
                  )}
                </div>
              </div>

              {/* Highlight Metric Pill */}
              <div className="review-metric-box">
                <div className="review-metric-val">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  {rev.highlightMetric}
                </div>
                <div className="review-metric-label">{rev.metricLabel}</div>
              </div>

              {/* Star Rating & Timestamp */}
              <div className="review-stars-row">
                <div className="review-stars-list">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="review-date-badge">{rev.date}</span>
              </div>

              {/* Review Text */}
              <p className="review-quote-body">"{rev.quote}"</p>
            </div>

            <div className="review-card-footer">
              <span className="review-project-tag">{rev.tag}</span>
              <span>100% Organic Review</span>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Row */}
      {filteredReviews.length > 9 && (
        <div className="reviews-load-more-row">
          {visibleCount < filteredReviews.length ? (
            <>
              <button
                type="button"
                className="btn-load-more-reviews"
                onClick={() => setVisibleCount((prev) => prev + 9)}
              >
                Load more reviews ({displayedReviews.length} of {filteredReviews.length}) ↓
              </button>
              <button
                type="button"
                className="btn-show-all-reviews"
                onClick={() => setVisibleCount(filteredReviews.length)}
              >
                Show all {filteredReviews.length} reviews
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-show-all-reviews"
              onClick={() => setVisibleCount(9)}
            >
              Show less ↑
            </button>
          )}
        </div>
      )}

      {/* Bottom Conversion CTA */}
      <div className="reviews-bottom-cta">
        <div className="reviews-cta-text">
          <h3>Apne business ke liye bhi aisi high-converting website banwayein?</h3>
          <p>Starting at ₹4,999 · Google SEO-ready, superfast loading aur direct WhatsApp integration included.</p>
        </div>
        <div className="reviews-cta-actions flex flex-wrap gap-3">
          <Button className="button-gold" asChild>
            <a href="#contact">
              <RollingText text="Start your website" />
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <button
            type="button"
            className="btn-write-review-pill"
            onClick={() => {
              setShowModal(true);
              setSubmittedSuccess(false);
            }}
          >
            <PenSquare className="w-3.5 h-3.5" />
            Apna Review Add Karein ✍️
          </button>
        </div>
      </div>

      {/* Client Review Submission Modal */}
      {showModal && (
        <div
          className="review-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-heading"
        >
          <div className="review-modal-card">
            <button
              type="button"
              className="review-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submittedSuccess ? (
              <form onSubmit={handleReviewSubmit}>
                <span className="review-modal-eyebrow">
                  <Sparkles className="w-3.5 h-3.5" />
                  WEBWALE Client Review
                </span>
                <h3 className="review-modal-title" id="review-modal-heading">
                  Share Your Experience / Apna Review Likhein
                </h3>
                <p className="review-modal-subtitle">
                  Apne business ke liye WEBWALE ke sath website banwane ka review share karein. Yeh website par live feature hoga.
                </p>

                {formError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    ⚠️ {formError}
                  </div>
                )}

                {/* Star Rating Picker */}
                <div className="review-star-picker-wrap">
                  <div className="review-star-picker-label">Rating Select Karein</div>
                  <div className="review-stars-interactive">
                    {[1, 2, 3, 4, 5].map((starNum) => {
                      const active = hoverRating ? starNum <= hoverRating : starNum <= rating;
                      return (
                        <button
                          key={starNum}
                          type="button"
                          className="star-interactive-btn"
                          onMouseEnter={() => setHoverRating(starNum)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(starNum)}
                          aria-label={`${starNum} stars`}
                        >
                          <Star
                            className={`transition-colors ${
                              active
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                                : "text-slate-600 fill-transparent"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="review-star-feedback-text">
                    {starDescriptions[hoverRating || rating]}
                  </div>
                </div>

                <div className="review-form-row-2">
                  <div className="review-form-field">
                    <label htmlFor="rev-client-name">Aapka Naam (Full Name) *</label>
                    <input
                      id="rev-client-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="review-form-field">
                    <label htmlFor="rev-company-name">Business / Company / Shop Naam *</label>
                    <input
                      id="rev-company-name"
                      type="text"
                      required
                      placeholder="e.g. Sharma Sweets & Cafe"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="review-form-row-2">
                  <div className="review-form-field">
                    <label htmlFor="rev-city">City & State (Shahar) *</label>
                    <input
                      id="rev-city"
                      type="text"
                      required
                      placeholder="e.g. Ludhiana, Punjab ya Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="review-form-field">
                    <label htmlFor="rev-role">Designation / Role (Optional)</label>
                    <input
                      id="rev-role"
                      type="text"
                      placeholder="e.g. Founder, Director, Owner"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>

                <div className="review-form-row-2">
                  <div className="review-form-field">
                    <label htmlFor="rev-category">Industry / Category *</label>
                    <select
                      id="rev-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ClientReviewItem["category"])}
                    >
                      <option value="ecommerce">E-Commerce & Online Stores</option>
                      <option value="healthcare">Healthcare, Doctors & Clinics</option>
                      <option value="corporate">Corporate, Law & CA Firms</option>
                      <option value="manufacturing">Manufacturing & B2B Exporters</option>
                      <option value="retail">Local Shops, Boutiques & Restaurants</option>
                      <option value="startup">Startups, Tech & SaaS</option>
                    </select>
                  </div>
                  <div className="review-form-field">
                    <label htmlFor="rev-metric">Highlight Result / Outcome (Optional)</label>
                    <input
                      id="rev-metric"
                      type="text"
                      placeholder="e.g. +200% Orders ya 15+ Daily Leads"
                      value={metric}
                      onChange={(e) => setMetric(e.target.value)}
                    />
                  </div>
                </div>

                <div className="review-form-field">
                  <label htmlFor="rev-quote">Aapka Review / Feedback *</label>
                  <textarea
                    id="rev-quote"
                    rows={4}
                    required
                    placeholder="WEBWALE Studio ke sath website banwane ka aapka experience kaisa raha? Design, speed, support, ya business growth ke baare me likhein..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-submit-review-modal"
                >
                  {isSubmitting ? (
                    <span>Publishing Review...</span>
                  ) : (
                    <>
                      <Star className="w-5 h-5 fill-amber-950 text-amber-950" />
                      <span>Submit & Publish Review</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Review Successfully Submitted! 🎉</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Shukriya <strong>{name}</strong>! Aapka review website par successfully add ho chuka hai aur reviews list me feature ho gaya hai.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    className="btn-write-review-hero"
                    onClick={() => {
                      setShowModal(false);
                      setName("");
                      setCompany("");
                      setRole("");
                      setCity("");
                      setMetric("");
                      setQuote("");
                    }}
                  >
                    View on Page ↓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function PortfolioCard({ project, index }: { project: PortfolioProject; index: number }) {
  return <article className={`project-card project-card-${project.accent}`}><Link to="/portfolio/$slug" params={{ slug: project.slug }} className="project-image-link" aria-label={`Open ${project.name} demo project`}>
    <img src={project.image} alt={project.imageAlt} loading="lazy" />
    <span className="demo-stamp">DEMO<br />PROJECT</span><span className="project-arrow"><MoveUpRight aria-hidden="true" /></span>
  </Link><div className="project-meta"><span>0{index + 1} — {project.category}</span><span>Concept design</span></div><div className="project-card-footer"><div><h3>{project.name}</h3><p>{project.shortDescription}</p></div><Link className="project-view-link" to="/portfolio/$slug" params={{ slug: project.slug }}>View demo <ArrowRight aria-hidden="true" /></Link></div></article>;
}

interface ClientEnquiryState {
  name: string;
  phone: string;
  business: string;
  requirement: string;
  budget: string;
  details?: string;
  ticketId: string;
  timestamp: string;
  whatsAppUrl: string;
}

function ContactSection() {
  const [submission, setSubmission] = useState<ClientEnquiryState | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = values.get("name")?.toString().trim() || "Valued Client";
    const phone = values.get("phone")?.toString().trim() || "";
    const business = values.get("business")?.toString().trim() || "Business / Brand";
    const requirement = values.get("requirement")?.toString().trim() || "Website Development";
    const budget = values.get("budget")?.toString().trim() || "Flexible / Discussion";
    const detailsVal = values.get("details")?.toString().trim();

    const timestamp = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const ticketId = "WW-" + Math.floor(1000 + Math.random() * 9000);

    // Formatted WhatsApp Lead Message for Owner (+91 7707930377)
    const leadMessage = [
      "🌟 *NEW CLIENT PROJECT ENQUIRY | WEBWALE STUDIO* 🌟",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `👤 *Client Name:* ${name}`,
      `📱 *Phone Number:* ${phone}`,
      `🏢 *Business / Brand:* ${business}`,
      `💻 *Service Required:* ${requirement}`,
      `💰 *Estimated Budget:* ${budget}`,
      detailsVal ? `📝 *Project Vision:* ${detailsVal}` : "📝 *Project Vision:* To discuss during consultation call",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `🆔 *Ref Code:* #${ticketId}`,
      `🕒 *Timestamp:* ${timestamp}`,
      "⚡ *Source:* Official Studio Portal (webwale.in)",
      "🚀 *Status:* Ready for 1:1 Consultation & Quotation",
    ].join("\n");

    const targetUrl = getWhatsAppUrl(leadMessage);

    // 1. Save lead permanently into backend file (data/leads.json)
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: ticketId,
          name,
          phone,
          business,
          requirement,
          budget,
          details: detailsVal,
          timestamp,
          source: "Main Website Contact Form",
        }),
      }).catch(() => {});
      submitLead({
        data: {
          name,
          phone,
          business,
          requirement,
          budget,
          details: detailsVal,
          timestamp,
          source: "Main Website Contact Form",
        },
      }).catch(() => {});
    } catch (e) {}

    // 2. Backup cache in localStorage for instant offline access in Owner Portal
    try {
      const stored = JSON.parse(localStorage.getItem("webwale_leads") || "[]");
      stored.unshift({
        id: ticketId,
        timestamp,
        name,
        phone,
        business,
        requirement,
        budget,
        details: detailsVal,
        source: "Main Website Contact Form",
        status: "New",
      });
      localStorage.setItem("webwale_leads", JSON.stringify(stored.slice(0, 50)));
    } catch {}

    // DO NOT open any WhatsApp window/tab automatically - keep user strictly on page
    setSubmission({
      name,
      phone,
      business,
      requirement,
      budget,
      details: detailsVal,
      ticketId,
      timestamp,
      whatsAppUrl: targetUrl,
    });

    // Mascot celebration trigger
    window.dispatchEvent(
      new CustomEvent("webwale-mascot", {
        detail: {
          quote: `Wah ${name}! Aapki enquiry WEBWALE ke WhatsApp par bhej di gayi hai! Hum jaldi aapke sath connect karenge! 🚀✨`,
        },
      })
    );
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-pad contact-inner">
        <div className="contact-copy">
          <SectionEyebrow number="08">Let's make it real</SectionEyebrow>
          <h2>Ready for a website<br />that <span>feels like you?</span></h2>
          <p>Tell us a little about what you're building. We'll get back to you with a clear and considered next step.</p>
          <a className="contact-phone" href={`tel:${phoneNumber.replaceAll(" ", "")}`}>
            {phoneNumber} <MoveUpRight aria-hidden="true" />
          </a>
        </div>

        {submission ? (
          <div className="enquiry-confirmation-card" role="status">
            <div className="confirmation-header">
              <div className="confirmation-badge-row">
                <span className="confirmation-badge">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  ENQUIRY SUBMITTED SUCCESSFULLY
                </span>
                <span className="confirmation-badge-time">Ref: #{submission.ticketId}</span>
              </div>
              <h3 className="confirmation-title">
                Namaste <span>{submission.name}!</span> 🙏
              </h3>
              <p className="confirmation-desc">
                Aapka project request <strong>WEBWALE Studio backend me successfully save ho gaya hai</strong>. Hamari team 2 ghante ke andar aapse connect karegi.
              </p>
            </div>

            {/* Official Studio Project Ticket */}
            <div className="enquiry-receipt-box">
              <div className="receipt-top-row">
                <span>WEBWALE STUDIO PROJECT TICKET</span>
                <span>{submission.timestamp}</span>
              </div>
              <div className="receipt-grid">
                <div className="receipt-item">
                  <span className="receipt-item-label">Client Name</span>
                  <span className="receipt-item-val">{submission.name}</span>
                </div>
                <div className="receipt-item">
                  <span className="receipt-item-label">Phone Contact</span>
                  <span className="receipt-item-val">{submission.phone}</span>
                </div>
                <div className="receipt-item">
                  <span className="receipt-item-label">Business / Brand</span>
                  <span className="receipt-item-val">{submission.business}</span>
                </div>
                <div className="receipt-item">
                  <span className="receipt-item-label">Service Selected</span>
                  <span className="receipt-item-val">{submission.requirement}</span>
                </div>
                <div className="receipt-item">
                  <span className="receipt-item-label">Estimated Budget</span>
                  <span className="receipt-item-val">{submission.budget}</span>
                </div>
                <div className="receipt-item">
                  <span className="receipt-item-label">Status</span>
                  <span className="receipt-item-val text-emerald-400">● Confirmed & Dispatched to WEBWALE Studio</span>
                </div>
              </div>
            </div>

            {/* Client WhatsApp Preview Card */}
            <div className="client-whatsapp-preview">
              <div className="client-whatsapp-label">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                AUTOMATED RESPONSE PREVIEW (WHAT YOU WILL RECEIVE ON WHATSAPP)
              </div>
              <div className="client-bubble-body">
                <div className="bubble-sender">
                  <span>WEBWALE STUDIO OFFICIAL</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p>
                  👋 <strong>Namaste {submission.name}! Welcome to WEBWALE Studio.</strong>
                </p>
                <p>
                  Humne aapka <em>"{submission.requirement}"</em> project request for <strong>{submission.business}</strong> receive kar liya hai!
                </p>
                <p>
                  Hamare lead designer aapke requirements review kar rahe hain. We will connect with you within 2 hours with initial insights and package proposal.
                </p>
                <p className="text-xs text-slate-400 pt-1">
                  🌐 WEBWALE Studio · Websites that build businesses · +91 7707930377
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="confirmation-actions">
              <a
                href={`tel:${phoneNumber.replaceAll(" ", "")}`}
                className="btn-phone-direct"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call WEBWALE Directly
              </a>

              <button
                type="button"
                onClick={() => setSubmission(null)}
                className="btn-reset-form"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Submit another enquiry
              </button>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <span>A FEW DETAILS</span>
              <span>01 — 06</span>
            </div>
            <div className="contact-field-grid">
              <label className="form-field">
                Full name
                <Input name="name" autoComplete="name" placeholder="Your name" required />
              </label>
              <label className="form-field">
                Phone number
                <Input
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91"
                  pattern="[+0-9() -]{8,20}"
                  required
                />
              </label>
              <label className="form-field">
                Business name
                <Input name="business" autoComplete="organization" placeholder="Your business" required />
              </label>
              <label className="form-field">
                Website requirement
                <select className="form-select" name="requirement" defaultValue="" required>
                  <option value="" disabled>Select a service</option>
                  <option>Business website</option>
                  <option>E-commerce website</option>
                  <option>Startup / SaaS platform</option>
                  <option>Landing page design</option>
                  <option>Portfolio / Creative website</option>
                  <option>Website redesign & refresh</option>
                  <option>Maintenance and support</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="form-field">
                Approximate budget
                <select className="form-select" name="budget" defaultValue="" required>
                  <option value="" disabled>Select a range</option>
                  <option>₹4,999 – ₹7,999</option>
                  <option>₹7,999 – ₹11,999</option>
                  <option>₹11,999 – ₹14,999</option>
                  <option>₹14,999+</option>
                  <option>Let’s talk first</option>
                </select>
              </label>
              <label className="form-field form-field-full">
                Tell us a little about your project <span className="opacity-60 font-normal lowercase">(optional)</span>
                <Textarea
                  name="details"
                  placeholder="What would you love your new website to do? (Optional)"
                  rows={3}
                />
              </label>
            </div>
            <div className="contact-submit-row">
              <Button type="submit" className="button-gold">
                Send your enquiry <ArrowRight aria-hidden="true" />
              </Button>
              <span>Direct submission to WEBWALE Studio. We will contact you within 2 hours.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export function ProjectShowcase({ project }: { project: PortfolioProject }) {
  return <main className={`showcase showcase-${project.accent}`} id="top">
    <AgencyHeader showcase />
    <div className="showcase-identity"><Link to="/" className="showcase-back"><ArrowRight aria-hidden="true" /> WEBWALE SELECTED WORK</Link><span>INDEPENDENT BRAND CONCEPT · DEMO PROJECT</span></div>
    <section className="showcase-hero"><div className="showcase-hero-copy"><span className="showcase-eyebrow">{project.eyebrow}</span><h1>{project.headline}</h1><p>{project.intro}</p><Button className="button-gold showcase-cta" asChild><a href="#contact"><RollingText text={project.inquiryLabel} /><ArrowRight aria-hidden="true" /></a></Button></div><div className="showcase-hero-image"><img src={project.image} alt={project.imageAlt} fetchPriority="high" /><span className="demo-stamp">DEMO<br />PROJECT</span></div></section>
    <div className="showcase-numbers">{project.proofPoints.map((point) => <div key={point.label}><strong>{point.value}</strong><span>{point.label}</span></div>)}</div>
    <section className="showcase-discover"><div><span className="showcase-eyebrow">THE EXPERIENCE</span><h2>A little more<br />of <em>{project.name.toLowerCase()}.</em></h2></div><div className="showcase-discover-right"><p>{project.description} An original, fictional brand concept imagined and designed as a WEBWALE demo.</p><div className="showcase-feature-list">{project.features.map((feature, index) => <div key={feature}><span>0{index + 1} /</span>{feature}<Check aria-hidden="true" /></div>)}</div></div></section>
    <section className="showcase-image-band"><img src={project.image} alt={project.imageAlt} loading="lazy" /><div className="showcase-image-caption"><span>A WORLD OF ITS OWN</span><span>AN ORIGINAL CONCEPT BY WEBWALE</span></div></section>
    <section className="showcase-highlights"><div className="showcase-highlights-title"><span className="showcase-eyebrow">THOUGHTFUL BY DESIGN</span><h2>Made for the<br />way you <em>live it.</em></h2></div><div className="showcase-highlight-list">{project.highlights.map((highlight, index) => <article key={highlight.title}><span>0{index + 1}</span><div><h3>{highlight.title}</h3><p>{highlight.description}</p></div></article>)}</div></section>
    <ShowcaseEnquiry project={project} />
    <section className="showcase-other"><span className="showcase-eyebrow">MORE GOOD IDEAS</span><h2>Another corner<br />of <em>our imagination.</em></h2><div className="showcase-other-grid">{projects.filter((other) => other.slug !== project.slug).map((other) => <Link to="/portfolio/$slug" params={{ slug: other.slug }} key={other.slug}><img src={other.image} alt={other.imageAlt} loading="lazy" /><span>{other.name} · DEMO PROJECT</span><ArrowRight aria-hidden="true" /></Link>)}</div><Link className="back-to-work" to="/" hash="work">Explore all three demos <ArrowRight aria-hidden="true" /></Link></section>
    <AgencyFooter showcase />
  </main>;
}

function ShowcaseEnquiry({ project }: { project: PortfolioProject }) {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const clientName = form.get("name")?.toString() || "Valued Client";
    const details = [
      `🌟 *SHOWCASE ENQUIRY | WEBWALE STUDIO* 🌟`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💼 *Project Category:* ${project.name} (${project.category})`,
      `👤 *Client Name:* ${clientName}`,
      ...project.inquiryFields
        .filter((field) => field.name !== "name")
        .map((field) => `📌 *${field.label}:* ${form.get(field.name) || "Not specified"}`),
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `⚡ *Source:* Official Demo Showcase (${project.slug})`,
      `🕒 *Timestamp:* ${new Date().toLocaleDateString("en-IN")}`,
    ].join("\n");

    // 1. Save to backend file (data/leads.json)
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: "DEMO-" + Math.floor(1000 + Math.random() * 9000),
          name: clientName,
          phone: form.get("phone")?.toString() || "Not specified",
          business: project.name,
          requirement: project.inquiryLabel,
          budget: "Showcase Demo",
          details,
          timestamp: new Date().toLocaleString("en-IN"),
          source: `Showcase Concept (${project.slug})`,
        }),
      }).catch(() => {});
      submitLead({
        data: {
          name: clientName,
          phone: form.get("phone")?.toString() || "Not specified",
          business: project.name,
          requirement: project.inquiryLabel,
          budget: "Showcase Demo",
          details,
          timestamp: new Date().toLocaleString("en-IN"),
          source: `Showcase Concept (${project.slug})`,
        },
      }).catch(() => {});
    } catch {}

    // 2. Save lead in localStorage for owner
    try {
      const stored = JSON.parse(localStorage.getItem("webwale_leads") || "[]");
      stored.unshift({
        id: "DEMO-" + Math.floor(1000 + Math.random() * 9000),
        timestamp: new Date().toLocaleString("en-IN"),
        name: clientName,
        phone: form.get("phone")?.toString() || "Not specified",
        business: project.name,
        requirement: project.inquiryLabel,
        budget: "Demo showcase",
        details,
        source: `Showcase Concept (${project.slug})`,
        status: "New",
      });
      localStorage.setItem("webwale_leads", JSON.stringify(stored.slice(0, 50)));
    } catch {}

    setSent(true);

    window.dispatchEvent(
      new CustomEvent("webwale-mascot", {
        detail: {
          quote: `Wah ${clientName}! Aapki enquiry WEBWALE team ko successfully receive ho gayi hai! 🚀✨`,
        },
      })
    );
  }
  return (
    <section className="showcase-enquiry" id="contact">
      <div>
        <span className="showcase-eyebrow">A GOOD PLACE TO START</span>
        <h2>Let's talk<br />about <em>what's next.</em></h2>
        <p>Explore this sample concept, or talk with WEBWALE about a real website for your business.</p>
        <a className="showcase-enquiry-phone" href={`tel:${phoneNumber.replaceAll(" ", "")}`}>
          Talk with WEBWALE · {phoneNumber} <MoveUpRight aria-hidden="true" />
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="showcase-enquiry-note">SAMPLE ENQUIRY · WEBWALE PROJECT</p>
        {project.inquiryFields.map((field) => (
          <label className="showcase-form-field" key={field.name}>
            {field.label}
            <input
              name={field.name}
              type={field.type}
              inputMode={field.type === "number" ? "numeric" : undefined}
              min={field.type === "number" ? "1" : undefined}
              required={field.required}
              placeholder={field.type === "date" ? undefined : `Enter ${field.label.toLowerCase()}`}
            />
          </label>
        ))}
        <Button type="submit" className="showcase-submit">
          {sent ? "Enquiry Received ✓" : project.inquiryLabel} <ArrowRight aria-hidden="true" />
        </Button>
        <span className="showcase-enquiry-fineprint">
          Instant submission to WEBWALE Studio. We will contact you shortly.
        </span>
        {sent && (
          <p className="showcase-success" role="status">
            ✓ Aapki enquiry WEBWALE team ko mil gayi hai. We will contact you soon!
          </p>
        )}
      </form>
    </section>
  );
}

export function ProjectCardLink({ slug }: { slug: string }) {
  const project = findProject(slug);
  if (!project) return null;
  return <Link to="/portfolio/$slug" params={{ slug }}>{project.name}</Link>;
}