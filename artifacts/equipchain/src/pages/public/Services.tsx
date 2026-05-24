import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Shield, Truck, Settings, HardHat, Wrench, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Services() {
  useEffect(() => {
    document.title = "Our Services | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: "Procurement & Supply",
      icon: Shield,
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
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0b0d82] to-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Services</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Comprehensive procurement, logistics, and industrial support solutions.</p>
        </div>
      </section>

      <section className="py-24 bg-background min-h-[600px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* Tabs List */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2">
              {services.map((service, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-4 p-5 rounded-xl text-left transition-all ${
                    activeTab === idx 
                      ? "bg-[#0b0d82] text-white shadow-lg" 
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <service.icon className={`w-6 h-6 ${activeTab === idx ? "text-[#f97316]" : "text-[#0b0d82]"}`} />
                  <span className="font-semibold text-lg">{service.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="w-full lg:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border p-10 rounded-3xl shadow-sm"
                >
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-8">
                    {React.createElement(services[activeTab].icon, { className: "w-8 h-8 text-[#f97316]" })}
                  </div>
                  <h2 className="text-3xl font-semibold text-foreground mb-4">{services[activeTab].title}</h2>
                  <p className="text-lg text-muted-foreground mb-8 pb-8 border-b border-border">
                    {services[activeTab].desc}
                  </p>
                  
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Key Capabilities:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {services[activeTab].points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <ChevronRight className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/request-quote" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-12 px-8">
                    Request a Quote
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
