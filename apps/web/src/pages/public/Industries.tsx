import React, { useEffect } from "react";
import { Link } from "wouter";
import { Zap, Factory, Building2, Wrench, Droplets, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@assets/equipchain_global_ltd_hero_background_1779629274989.png";

export function Industries() {
  useEffect(() => {
    document.title = "Industries We Serve | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const industries = [
    {
      title: "Oil & Gas",
      icon: Zap,
      desc: "Comprehensive procurement and operational support for upstream, midstream, and downstream operations.",
      points: [
        "Procurement coordination support",
        "Materials sourcing and supply support",
        "Vendor coordination activities",
        "Logistics and operational support"
      ]
    },
    {
      title: "Energy",
      icon: Zap,
      desc: "Supporting power generation and distribution with critical parts and equipment sourcing.",
      points: [
        "Equipment sourcing and supply",
        "Maintenance materials coordination",
        "Technical supply support",
        "Facility support services"
      ]
    },
    {
      title: "Manufacturing & Industrial",
      icon: Factory,
      desc: "Keeping production lines moving with dependable supply chain and maintenance materials.",
      points: [
        "Industrial materials support",
        "Vendor and supply coordination",
        "Operational support services",
        "Procurement administration"
      ]
    },
    {
      title: "Infrastructure & Projects",
      icon: Building2,
      desc: "Logistics and materials support for large-scale construction and infrastructure development.",
      points: [
        "Site coordination support",
        "Contractor liaison support",
        "Materials logistics coordination",
        "Project execution assistance"
      ]
    },
    {
      title: "Mining",
      icon: Wrench,
      desc: "Robust equipment supply and logistical support for demanding mining operations.",
      points: [
        "Heavy equipment parts sourcing",
        "Consumables supply",
        "Site logistics coordination",
        "Operational support"
      ]
    },
    {
      title: "Water & Process",
      icon: Droplets,
      desc: "Sourcing pumps, valves, and instrumentation for water treatment and process industries.",
      points: [
        "Instrumentation sourcing",
        "Pumps and valves supply",
        "Technical procurement",
        "Vendor coordination"
      ]
    }
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
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Industries We Serve</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Powering critical sectors with dependable supply chain and procurement solutions.</p>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient top border */}
                <div className="h-1.5 bg-gradient-to-r from-[#0b0d82] to-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-6 group-hover:bg-[#f97316] transition-colors duration-300">
                    <ind.icon className="w-7 h-7 text-[#f97316] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{ind.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{ind.desc}</p>
                  <ul className="space-y-2.5">
                    {ind.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[#f97316] mt-0.5 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
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
          <h2 className="text-4xl font-display font-bold text-white mb-6">Let's Work Together</h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">Reach out to discuss how EquipChain can support your sector's operational needs.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-14 px-10 shadow-lg"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
