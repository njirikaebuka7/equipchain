import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Settings, HardHat, Wrench, Building2, Droplets, Zap, Factory, CheckCircle2 } from "lucide-react";
import { useListBlogPosts } from "@workspace/api-client-react";

export function Home() {
  useEffect(() => {
    document.title = "EquipChain Global Ltd | Industrial Procurement & Supply Chain";
  }, []);

  const { data: blogData } = useListBlogPosts({ limit: 3 });

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#1a1a2e] overflow-hidden">
        {/* Background gradient/image overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d82]/90 via-[#1a1a2e]/95 to-[#1a1a2e] z-0" />
        <div 
          className="absolute inset-0 z-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">Trusted Nigerian Industrial Partner</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[1.1] max-w-5xl"
          >
            Your Trusted Partner in Industrial <span className="text-[#f97316]">Procurement</span> & Supply Chain Solutions.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-2xl text-white/70 mb-12 max-w-3xl font-light"
          >
            Keeping critical operations moving in Oil & Gas, Energy, Manufacturing, and Infrastructure with dependable execution.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link href="/request-quote" className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#f97316]/90 h-14 px-8 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              Request a Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/services" className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-white/10 text-white hover:bg-white/20 border border-white/10 h-14 px-8 backdrop-blur-sm">
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-[#1a1a2e]/80 backdrop-blur-md z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 py-6">
              <div className="text-center px-4">
                <p className="text-3xl font-display font-bold text-white mb-1">20+</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-display font-bold text-white mb-1">500+</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">Projects Delivered</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-display font-bold text-white mb-1">50+</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">Industry Partners</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-display font-bold text-white mb-1">100%</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">HSE Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-[#f97316]"></div>
                <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">About Us</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Dependable Support for Complex Operations.</h3>
              <p className="text-lg text-muted-foreground mb-8">
                EquipChain Global Ltd. connects industries to trusted equipment, instrumentation, automation products, and technical supplies through a responsive end-to-end procurement and logistics support model.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Integrity & Professionalism",
                  "Responsiveness & Reliability",
                  "Safety Consciousness (HSE)",
                  "Execution Excellence"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-6 h-6 text-[#f97316]" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-12 px-8">
                Learn More About Us
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-secondary/50 p-8 rounded-2xl border border-border">
                  <ShieldCheck className="w-12 h-12 text-[#f97316] mb-6" />
                  <h4 className="text-xl font-bold mb-3 text-foreground">Trusted Sourcing</h4>
                  <p className="text-muted-foreground text-sm">Direct access to original equipment manufacturers globally.</p>
                </div>
                <div className="bg-[#0b0d82] p-8 rounded-2xl border border-[#0b0d82] shadow-xl">
                  <Truck className="w-12 h-12 text-white mb-6" />
                  <h4 className="text-xl font-bold mb-3 text-white">Logistics Mastery</h4>
                  <p className="text-white/80 text-sm">End-to-end coordination ensuring on-time project delivery.</p>
                </div>
              </div>
              <div className="space-y-6 sm:mt-12">
                <div className="bg-secondary/50 p-8 rounded-2xl border border-border">
                  <Settings className="w-12 h-12 text-[#0b0d82] mb-6" />
                  <h4 className="text-xl font-bold mb-3 text-foreground">Technical Support</h4>
                  <p className="text-muted-foreground text-sm">Engineering and operational support for critical facilities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-1 bg-[#f97316]"></div>
              <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">Our Services</h2>
              <div className="w-8 h-1 bg-[#f97316]"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Comprehensive Industrial Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Procurement & Supply", icon: ShieldCheck, desc: "Industrial materials, technical sourcing, and vendor coordination." },
              { title: "Supply Chain & Logistics", icon: Truck, desc: "Materials coordination, inventory management, and delivery logistics." },
              { title: "Oil & Gas Support", icon: Settings, desc: "Operational support, equipment sourcing, and site coordination." },
              { title: "Project Support", icon: HardHat, desc: "Project coordination, contractor management, and site administration." },
              { title: "Industrial Services", icon: Wrench, desc: "Facility support, general contracting, and business solutions." }
            ].map((service, i) => (
              <div key={i} className="group bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-xl hover:border-[#f97316]/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-[#f97316] transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-[#0b0d82] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4 text-foreground">{service.title}</h4>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <Link href="/services" className="inline-flex items-center font-semibold text-[#0b0d82] hover:text-[#f97316] transition-colors">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-12 px-8">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIES PREVIEW */}
      <section className="py-24 bg-[#1a1a2e] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-[#f97316]"></div>
                <h2 className="text-white/80 font-semibold tracking-wider uppercase text-sm">Industries We Serve</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Powering Critical Sectors</h3>
            </div>
            <Link href="/industries" className="inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#f97316]/90 h-12 px-8">
              View All Industries
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Oil & Gas", icon: Zap, image: "bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]" },
              { title: "Energy", icon: Zap, image: "bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]" },
              { title: "Manufacturing", icon: Factory, image: "bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]" },
              { title: "Infrastructure", icon: Building2, image: "bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]" },
              { title: "Mining", icon: Wrench, image: "bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]" },
              { title: "Water & Process", icon: Droplets, image: "bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]" }
            ].map((ind, i) => (
              <Link key={i} href="/industries" className={`group relative h-64 rounded-2xl overflow-hidden flex flex-col justify-end p-6 ${ind.image} border border-white/10 hover:border-[#f97316]/50 transition-colors`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="relative z-10">
                  <ind.icon className="w-10 h-10 text-[#f97316] mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />
                  <h4 className="text-2xl font-display font-bold text-white mb-2 transform group-hover:-translate-y-2 transition-transform duration-300">{ind.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES & HSE */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="bg-card border border-border p-10 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-[#f97316]"></div>
                <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">Capabilities</h2>
              </div>
              <h3 className="text-3xl font-display font-bold mb-6 text-foreground">Operational Exposure</h3>
              <p className="text-muted-foreground mb-8">
                Our management team brings practical understanding of procurement systems, operational coordination, and industrial support processes from major environments including Chevron, ExxonMobil, and Dangote Group.
              </p>
              <Link href="/capabilities" className="inline-flex items-center font-semibold text-[#0b0d82] hover:text-[#f97316] transition-colors">
                View Capability Statement <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#0b0d82] p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-[#f97316]"></div>
                  <h2 className="text-white/80 font-semibold tracking-wider uppercase text-sm">HSE Commitment</h2>
                </div>
                <h3 className="text-3xl font-display font-bold mb-6 text-white">Zero Incident Mindset</h3>
                <p className="text-white/80 mb-8">
                  EquipChain Global Ltd is committed to maintaining safe and environmentally responsible operations through adherence to safety procedures, operational risk awareness, and continuous HSE improvement culture.
                </p>
                <Link href="/hse" className="inline-flex items-center font-semibold text-[#f97316] hover:text-white transition-colors">
                  Read HSE Policy <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
