import React, { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle2, ShieldCheck, Download } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@assets/equipchain_global_ltd_hero_background_1779629274989.png";

export function Capabilities() {
  useEffect(() => {
    document.title = "Our Capabilities | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const coreCapabilities = [
    {
      title: "Procurement & Strategic Sourcing",
      points: [
        "Industrial procurement support",
        "Technical sourcing coordination",
        "Vendor identification and engagement",
        "Local supply chain coordination",
        "Procurement administration support"
      ]
    },
    {
      title: "Logistics & Supply Chain Support",
      points: [
        "Materials coordination",
        "Delivery logistics support",
        "Inventory coordination",
        "Vendor management support",
        "Operational logistics assistance"
      ]
    },
    {
      title: "Oil & Gas Support Services",
      points: [
        "Project operational support",
        "Site coordination support",
        "Equipment sourcing assistance",
        "Materials support coordination",
        "Technical operational assistance"
      ]
    },
    {
      title: "Project Support Services",
      points: [
        "Project coordination assistance",
        "Contractor support coordination",
        "Documentation and reporting support",
        "Site operational administration",
        "Execution support services"
      ]
    }
  ];

  const exposures = [
    { name: "Chevron Nigeria", role: "Procurement & Logistics Support" },
    { name: "ExxonMobil", role: "Industrial Materials Coordination" },
    { name: "Dangote Group", role: "Supply Chain Administration" },
    { name: "NNPC Operations", role: "Project Coordination Support" },
    { name: "Total Energies", role: "Operational Procurement" },
    { name: "Siemens Energy", role: "Technical Supply Coordination" }
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d82]/85 via-[#0b0d82]/80 to-[#1a1a2e]/90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Capabilities</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Practical industry exposure and execution excellence.</p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#f97316]"></div>
              <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">What We Do</h2>
              <div className="w-8 h-1 bg-[#f97316]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coreCapabilities.map((cap, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-[#0b0d82] mb-6 pb-4 border-b border-border">{cap.title}</h3>
                <ul className="space-y-3">
                  {cap.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Exposure */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#f97316]"></div>
              <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">Operational Exposure</h2>
              <div className="w-8 h-1 bg-[#f97316]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Industry Exposure</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our management team brings practical understanding from major industrial environments.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {exposures.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0b0d82]/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#0b0d82]" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{exp.name}</h4>
                <p className="text-muted-foreground text-sm">{exp.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Statement CTA */}
      <section
        className="py-24 text-center px-4 relative overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d82]/90 to-[#1a1a2e]/90 z-0" />
        <div className="relative z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Download Our Capability Statement</h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">A concise overview of our services, core competencies, and industry experience.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-14 px-10 shadow-lg"
            >
              <Download className="mr-2 w-5 h-5" /> Request Capability Document
            </Link>
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-white/10 text-white hover:bg-white/20 border border-white/20 h-14 px-10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
