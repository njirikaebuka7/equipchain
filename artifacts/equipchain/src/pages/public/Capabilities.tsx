import React, { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle2, ShieldCheck, Download } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0b0d82] to-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Capabilities</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Practical industry exposure and execution excellence.</p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coreCapabilities.map((cap, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-display font-bold text-[#0b0d82] mb-6 pb-4 border-b border-border">{cap.title}</h3>
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
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">Industry Experience</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Management and operational exposure includes participation in activities linked to major operational environments:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {["Chevron Corporation", "ExxonMobil", "Dangote Group"].map((brand, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-border flex items-center justify-center h-32">
                  <span className="font-display font-bold text-2xl text-foreground/80">{brand}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-[#0b0d82] text-white p-10 rounded-2xl text-left">
              <h3 className="text-xl font-semibold mb-6">Our team brings practical understanding of:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Procurement systems", "Operational coordination", "Industrial support processes", "Logistics administration", "Vendor engagement practices", "Project support requirements"].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                    <span className="text-white/90">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12">What Distinguishes Us</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-16">
            {[
              "Experienced management background",
              "Strong local market understanding",
              "Flexible operational structure",
              "Fast response capability",
              "Relationship-driven service approach",
              "Commitment to professionalism",
              "Client-focused execution model"
            ].map((adv, i) => (
              <span key={i} className="bg-secondary text-foreground px-6 py-3 rounded-full font-medium border border-border">
                {adv}
              </span>
            ))}
          </div>

          <div className="inline-block p-8 border border-border rounded-2xl bg-card">
            <h3 className="text-2xl font-bold mb-4">Download Capability Statement</h3>
            <p className="text-muted-foreground mb-6">Get a comprehensive overview of our services and experience.</p>
            <button className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#f97316]/90 h-12 px-8">
              <Download className="mr-2 w-5 h-5" /> Download PDF
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
