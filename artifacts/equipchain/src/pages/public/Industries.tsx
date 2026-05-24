import React, { useEffect } from "react";
import { Link } from "wouter";
import { Zap, Factory, Building2, Wrench, Droplets, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
        "Logistics and operational support participation"
      ],
      bg: "bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]"
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
      ],
      bg: "bg-gradient-to-br from-[#1a1a2e] to-[#0b0d82]"
    },
    {
      title: "Manufacturing & Industrial",
      icon: Factory,
      desc: "Keeping production lines moving with dependable supply chain and maintenance materials.",
      points: [
        "Industrial materials support",
        "Vendor and supply coordination",
        "Operational support services",
        "Procurement administration assistance"
      ],
      bg: "bg-gradient-to-br from-[#0b0d82] to-black"
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
      ],
      bg: "bg-gradient-to-tr from-[#1a1a2e] to-[#0b0d82]"
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
      ],
      bg: "bg-gradient-to-bl from-[#0b0d82] to-[#1a1a2e]"
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
      ],
      bg: "bg-gradient-to-tl from-[#1a1a2e] to-[#0b0d82]"
    }
  ];

  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0b0d82] to-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Industries We Serve</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Powering critical sectors with dependable supply chain and procurement solutions.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className={`group relative rounded-2xl overflow-hidden ${ind.bg} text-white shadow-lg`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
                <div className="relative p-8 h-full flex flex-col">
                  <ind.icon className="w-12 h-12 text-[#f97316] mb-6" />
                  <h3 className="text-3xl font-display font-bold mb-4">{ind.title}</h3>
                  <p className="text-white/80 mb-6 flex-1">{ind.desc}</p>
                  
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <ul className="space-y-2 mb-6">
                      {ind.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/90">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-3xl font-display font-bold text-foreground mb-6">Working in one of these sectors? Let's talk.</h3>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#f97316]/90 h-14 px-10 shadow-lg">
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
