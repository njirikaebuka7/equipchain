import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Shield, Truck, Settings, HardHat, Wrench, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@assets/equipchain_global_ltd_hero_background_1779629274989.png";

export function Services() {
  useEffect(() => {
    document.title = "Our Services | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState(0);

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

      {/* Service Tabs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                  activeTab === i
                    ? "bg-[#0b0d82] text-white border-[#0b0d82] shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-[#0b0d82]/40 hover:text-foreground"
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto"
            >
              {/* Left — Text Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#0b0d82]/10 flex items-center justify-center">
                    {React.createElement(services[activeTab].icon, { className: "w-7 h-7 text-[#0b0d82]" })}
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground">{services[activeTab].title}</h2>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {services[activeTab].desc}
                </p>

                <ul className="space-y-3 mb-10">
                  {services[activeTab].points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/request-quote?service=${SERVICE_SLUGS[services[activeTab].title] || encodeURIComponent(services[activeTab].title)}`}
                  className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-12 px-8 shadow-md"
                >
                  Request a Quote <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </div>

              {/* Right — Service Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10] bg-secondary">
                <img
                  src={services[activeTab].image}
                  alt={services[activeTab].title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d82]/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>

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
