import React, { useEffect } from "react";
import { ShieldAlert, Activity, FileCheck, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import heroImg from "@assets/equipchain_global_ltd_hero_background_1779629274989.png";

export function HSE() {
  useEffect(() => {
    document.title = "Health, Safety & Environment | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      title: "Safe Work Practices",
      icon: ShieldAlert,
      desc: "Promoting a culture where safety comes first in every procurement, logistics, and site coordination activity."
    },
    {
      title: "Regulatory Compliance",
      icon: FileCheck,
      desc: "Strict adherence to local and international health, safety, and environmental regulations."
    },
    {
      title: "Risk Awareness",
      icon: Activity,
      desc: "Proactive identification and mitigation of operational hazards before they impact people or projects."
    },
    {
      title: "Continuous Improvement",
      icon: RefreshCw,
      desc: "Regular review and enhancement of our HSE protocols to meet evolving industry standards."
    }
  ];

  const hseCommitmentImg = `${import.meta.env.BASE_URL}hse-commitment.png`;

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d82]/85 via-[#0b0d82]/80 to-[#1a1a2e]/90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Health, Safety & Environment</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Operating safely, responsibly, and with environmental consciousness.</p>
        </div>
      </section>

      {/* HSE Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">

          {/* Intro */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-1 bg-[#f97316]"></div>
              <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">Our Commitment</h2>
              <div className="w-8 h-1 bg-[#f97316]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Our HSE Commitment</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              EquipChain Global Ltd is committed to conducting its operations in a safe, responsible, and environmentally conscious manner. We believe that all workplace incidents are preventable and prioritize the well-being of our personnel, partners, and the communities where we operate.
            </p>
          </div>

          {/* Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {pillars.map((pillar, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-[#0b0d82]/55" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image + Zero Incident */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-secondary">
              <img
                src={hseCommitmentImg}
                alt="HSE safety workers"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.opacity = "0"; }}
              />
            </div>
            <div className="bg-[#1a1a2e] rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.06]">
                <ShieldAlert className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-4 text-[#f97316]">Zero Incident Mindset</h2>
                <p className="text-white/75 mb-8 leading-relaxed">
                  Safety is not just a policy — it is a core value. We embed HSE considerations into every stage of our supply chain and project support services to protect lives, assets, and the environment.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-white text-[#0b0d82] hover:bg-white/90 h-12 px-8"
                >
                  Contact Us for HSE Documentation
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
