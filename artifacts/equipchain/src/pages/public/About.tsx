import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Target, Users, Zap, Award, Briefcase, Clock, ThumbsUp } from "lucide-react";

export function About() {
  useEffect(() => {
    document.title = "About Us | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const values = [
    { title: "Integrity", icon: ShieldCheck },
    { title: "Professionalism", icon: Briefcase },
    { title: "Reliability", icon: ThumbsUp },
    { title: "Responsiveness", icon: Clock },
    { title: "Safety Consciousness", icon: ShieldCheck },
    { title: "Accountability", icon: Users },
    { title: "Excellence", icon: Award },
    { title: "Client Satisfaction", icon: Target }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0b0d82] to-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            About EquipChain Global Ltd
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            An indigenous Nigerian company providing reliable solutions to the oil & gas, energy, manufacturing, infrastructure, and process-driven sectors.
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              EquipChain Global Ltd. connects industries to trusted equipment, instrumentation, automation products, industrial materials, and technical supplies through a responsive end-to-end procurement and logistics support model.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With strong local market understanding, global supplier networks, technical knowledge, and practical industry experience, we help clients simplify sourcing, reduce operational delays, control costs, and maintain business continuity.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-10 rounded-2xl shadow-sm border border-border">
              <div className="w-16 h-16 rounded-xl bg-[#0b0d82]/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#0b0d82]" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Vision Statement</h3>
              <p className="text-muted-foreground text-lg">
                To become a trusted indigenous service company recognized for operational excellence, reliability and strategic value delivery within Nigeria's oil & gas, industrial and infrastructure sectors.
              </p>
            </div>
            <div className="bg-[#0b0d82] p-10 rounded-2xl shadow-lg border border-[#0b0d82] text-white">
              <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#f97316]" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Mission Statement</h3>
              <p className="text-white/80 text-lg">
                To provide dependable procurement, logistics, industrial support and project coordination solutions through professionalism, integrity, responsiveness and continuous commitment to client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">The principles that guide every decision and action.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="group bg-card p-6 rounded-xl border border-border text-center hover:border-[#f97316] transition-colors">
                <v.icon className="w-8 h-8 mx-auto mb-4 text-[#0b0d82] group-hover:text-[#f97316] transition-colors" />
                <h4 className="font-semibold text-foreground">{v.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e] text-center px-4">
        <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to Partner With Us?</h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Experience dependable procurement and supply chain solutions tailored for your operations.</p>
        <Link href="/request-quote" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#f97316]/90 h-14 px-10 shadow-lg">
          Request a Quote <ChevronRight className="ml-2 w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
