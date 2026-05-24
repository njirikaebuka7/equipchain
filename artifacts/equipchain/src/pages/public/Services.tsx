import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Shield, Truck, Settings, HardHat, Wrench, ChevronRight, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@assets/equipchain_global_ltd_hero_background_1779629274989.png";

export function Services() {
  useEffect(() => {
    document.title = "Our Services | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const base = import.meta.env.BASE_URL;

  const SERVICE_SLUGS: Record<string, string> = {
    "Procurement & Supply": "procurement-supply",
    "Supply Chain & Logistics": "supply-chain-logistics",
    "Oil & Gas Support": "oil-gas-support",
    "Project Support": "project-support",
    "Industrial Services": "industrial-services",
  };

  const services = [
    {
      title: "Procurement & Supply",
      icon: Shield,
      image: `${base}service-images/procurement.png`,
      desc: "Reliable sourcing of industrial materials and technical equipment to keep your operations running smoothly.",
      points: [
        "Industrial materials sourcing",
        "Procurement support services",
        "Local and international sourcing coordination",
        "Supply of industrial consumables",
        "Vendor sourcing and coordination",
        "Technical procurement support"
      ]
    },
    {
      title: "Supply Chain & Logistics",
      icon: Truck,
      image: `${base}service-images/logistics.png`,
      desc: "End-to-end logistics and inventory coordination ensuring materials arrive when and where they are needed.",
      points: [
        "Materials coordination",
        "Inventory support services",
        "Logistics coordination",
        "Vendor management support",
        "Supply chain administration",
        "Delivery coordination services"
      ]
    },
    {
      title: "Oil & Gas Support",
      icon: Settings,
      image: `${base}service-images/oil-gas.png`,
      desc: "Specialized operational and technical support tailored for the demanding oil and gas sector.",
      points: [
        "Operational support services",
        "Industrial support solutions",
        "Project materials coordination",
        "Site support services",
        "Equipment sourcing support",
        "Technical support coordination"
      ]
    },
    {
      title: "Project Support",
      icon: HardHat,
      image: `${base}service-images/project-support.png`,
      desc: "Comprehensive project coordination and site administration to facilitate successful execution.",
      points: [
        "Project coordination support",
        "Site operations support",
        "Contractor coordination",
        "Project logistics administration",
        "Documentation support",
        "Field operational assistance"
      ]
    },
    {
      title: "Industrial Services",
      icon: Wrench,
      image: `${base}service-images/industrial.png`,
      desc: "General contracting and facility support services for continuous business operations.",
      points: [
        "Industrial supplies",
        "Facility support services",
        "General contracting",
        "Outsourcing support services",
        "Business support solutions"
      ]
    }
  ];

  const activeService = services[activeTab];
  const quoteLink = (title: string) =>
    `/request-quote?service=${SERVICE_SLUGS[title] || encodeURIComponent(title)}`;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-24 text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d82]/85 via-[#0b0d82]/80 to-[#1a1a2e]/90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Comprehensive industrial solutions designed to keep operations running efficiently.</p>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">

          {/* ── DESKTOP: side-menu + content panel ── */}
          <div className="hidden lg:grid lg:grid-cols-[260px_1fr] gap-12 items-start">

            {/* Left: vertical side-menu */}
            <nav className="sticky top-28 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              {services.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-left transition-all duration-200 border-l-4 ${
                    activeTab === i
                      ? "border-l-[#0b0d82] bg-[#0b0d82]/6 text-[#0b0d82] font-semibold"
                      : "border-l-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                  } ${i !== 0 ? "border-t border-border" : ""}`}
                >
                  <s.icon className={`w-4 h-4 shrink-0 ${activeTab === i ? "text-[#0b0d82]" : "text-muted-foreground"}`} />
                  {s.title}
                </button>
              ))}
            </nav>

            {/* Right: content panel — image on top, text below */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28 }}
              >
                {/* Image — top */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9] bg-secondary mb-8">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d82]/40 to-transparent pointer-events-none" />
                </div>

                {/* Text — below */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0b0d82]/10 flex items-center justify-center shrink-0">
                    {React.createElement(activeService.icon, { className: "w-6 h-6 text-[#0b0d82]" })}
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground">{activeService.title}</h2>
                </div>

                <p className="text-lg text-muted-foreground mb-7 leading-relaxed">{activeService.desc}</p>

                <ul className="space-y-3 mb-8">
                  {activeService.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={quoteLink(activeService.title)}
                  className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-12 px-8 shadow-md"
                >
                  Request a Quote <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── MOBILE: accordion ── */}
          <div className="lg:hidden space-y-3">
            {services.map((s, i) => {
              const isOpen = openAccordion === i;
              return (
                <div
                  key={i}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen ? "border-[#0b0d82]/40 shadow-md" : "border-border"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors ${
                      isOpen ? "bg-[#0b0d82] text-white" : "bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <s.icon className={`w-5 h-5 shrink-0 ${isOpen ? "text-white" : "text-[#0b0d82]"}`} />
                      <span className="font-semibold text-sm">{s.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-muted-foreground"}`}
                    />
                  </button>

                  {/* Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 bg-card">
                          {/* Image */}
                          <div className="relative rounded-xl overflow-hidden shadow aspect-[16/9] bg-secondary mb-5">
                            <img
                              src={s.image}
                              alt={s.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d82]/40 to-transparent pointer-events-none" />
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground mb-5 leading-relaxed text-sm">{s.desc}</p>

                          {/* Bullets */}
                          <ul className="space-y-2.5 mb-6">
                            {s.points.map((pt, j) => (
                              <li key={j} className="flex items-start gap-2.5 text-foreground text-sm">
                                <CheckCircle2 className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <Link
                            href={quoteLink(s.title)}
                            className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-11 px-7 shadow-md w-full"
                          >
                            Request a Quote <ChevronRight className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 text-center px-4 relative overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d82]/90 to-[#1a1a2e]/90 z-0" />
        <div className="relative z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            Our team of procurement and supply chain specialists is ready to discuss your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-14 px-10 shadow-lg"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-white/10 text-white hover:bg-white/20 border border-white/20 h-14 px-10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
