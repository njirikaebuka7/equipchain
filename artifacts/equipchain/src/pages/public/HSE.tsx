import React, { useEffect } from "react";
import { ShieldAlert, Activity, FileCheck, RefreshCw } from "lucide-react";
import { Link } from "wouter";

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

  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0b0d82] to-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Health, Safety & Environment</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Operating safely, responsibly, and with environmental consciousness.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Our HSE Commitment</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              EquipChain Global Ltd is committed to conducting its operations in a safe, responsible, and environmentally conscious manner. We believe that all workplace incidents are preventable and prioritize the well-being of our personnel, partners, and the communities where we operate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
            {pillars.map((pillar, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                  <pillar.icon className="w-8 h-8 text-[#0b0d82]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1a1a2e] rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldAlert className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-display font-bold mb-6 text-[#f97316]">Zero Incident Mindset</h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Safety is not just a policy—it is a core value. We embed HSE considerations into every stage of our supply chain and project support services to protect lives, assets, and the environment.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-white text-[#0b0d82] hover:bg-white/90 h-14 px-10">
                Contact Us for HSE Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
