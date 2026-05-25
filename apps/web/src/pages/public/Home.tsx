import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Truck, Settings, HardHat, Wrench,
  Building2, Droplets, Zap, Factory, CheckCircle2
} from "lucide-react";
import { useListBlogPosts } from "@workspace/api-client-react";
const heroImg = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80";
import aboutImg from "@assets/generated_images/nigerian_industrial_procurement_team_1145.png";

export function Home() {
  useEffect(() => {
    document.title = "EquipChain Global Ltd | Industrial Procurement & Supply Chain";
  }, []);

  const { data: blogData } = useListBlogPosts({ limit: 3 });

  const services = [
    { title: "Procurement & Supply", icon: ShieldCheck, desc: "Industrial materials, technical sourcing, and vendor coordination for seamless operations." },
    { title: "Supply Chain & Logistics", icon: Truck, desc: "Materials coordination, inventory management, and end-to-end delivery logistics." },
    { title: "Oil & Gas Support", icon: Settings, desc: "Operational support, equipment sourcing, and site coordination for the oil sector." },
    { title: "Project Support", icon: HardHat, desc: "Project coordination, contractor management, and site administration services." },
    { title: "Industrial Services", icon: Wrench, desc: "Facility support, general contracting, and business support solutions." },
  ];

  const industries = [
    { title: "Oil & Gas", icon: Zap, desc: "Supporting upstream and downstream operations with specialized procurement, equipment sourcing, and site coordination." },
    { title: "Energy", icon: Zap, desc: "Delivering critical materials and logistics for power generation, transmission, and energy distribution projects." },
    { title: "Manufacturing", icon: Factory, desc: "Supplying consumables, spare parts, and end-to-end chain solutions to keep production lines running at peak." },
    { title: "Infrastructure", icon: Building2, desc: "Providing construction materials, project coordination, and supply support for roads, utilities, and civil works." },
    { title: "Mining", icon: Wrench, desc: "Sourcing heavy-duty equipment and operational supplies for extraction, processing, and mine support operations." },
    { title: "Water & Process", icon: Droplets, desc: "Delivering instrumentation, process equipment, and technical supplies for water treatment and processing facilities." },
  ];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/80 to-transparent z-0" />

        <div className="relative z-10 container mx-auto px-4 py-20 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.1] max-w-4xl"
          >
            Your Trusted Partner in Industrial{" "}
            <span className="text-[#f97316]">Procurement</span> & Supply Chain Solutions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-white/75 mb-12 max-w-3xl font-light"
          >
            Keeping critical operations moving in Oil & Gas, Energy, Manufacturing, and Infrastructure with dependable execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/request-quote"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-14 px-10 shadow-[0_0_30px_rgba(249,115,22,0.35)]"
            >
              Request a Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-white/10 text-white hover:bg-white/20 border border-white/20 h-14 px-10 backdrop-blur-sm"
            >
              Explore Services
            </Link>
          </motion.div>
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
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Dependable Support for Complex Operations.
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                EquipChain Global Ltd. connects industries to trusted equipment, instrumentation, automation products, and technical supplies through a responsive end-to-end procurement and logistics support model.
              </p>
              <ul className="space-y-4 mb-10">
                {["Integrity & Professionalism", "Responsiveness & Reliability", "Safety Consciousness (HSE)", "Execution Excellence"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#f97316] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-12 px-8"
              >
                Learn More About Us
              </Link>
            </div>

            {/* Right column: about image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={aboutImg}
                alt="EquipChain Procurement Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d82]/80 via-[#0b0d82]/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-5xl font-display font-bold text-[#f97316]">25+</p>
                <p className="text-lg font-medium text-white">Years of Industrial Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#f97316]"></div>
              <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">Our Services</h2>
              <div className="w-8 h-1 bg-[#f97316]"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">Comprehensive Industrial Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-1 bg-[#f97316] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="p-8 flex flex-col flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-[#0b0d82]/8 flex items-center justify-center mb-6 group-hover:bg-[#f97316] transition-colors duration-300">
                    <service.icon className="w-7 h-7 text-[#0b0d82] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h4>
                  <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">{service.desc}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center font-semibold text-sm text-[#0b0d82] hover:text-[#f97316] transition-colors"
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}

            {/* 6th card — View All Services */}
            <Link
              href="/services"
              className="group relative bg-[#0b0d82] rounded-2xl border border-[#0b0d82] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#f97316] transition-colors duration-300">
                  <ArrowRight className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">View All Services</h4>
                <p className="text-white/65 text-sm mb-5">Explore our complete range of industrial solutions</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f97316]">
                  Explore Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIES PREVIEW — Glassmorphic */}
      <section className="py-24 bg-[#080a1a] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-[#f97316]"></div>
                <h2 className="text-white/70 font-semibold tracking-wider uppercase text-sm">Industries We Serve</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Powering Critical Sectors</h3>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#f97316] text-white hover:bg-[#ea6500] h-12 px-8 shrink-0"
            >
              View All Industries
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <Link
                key={i}
                href="/industries"
                className="group relative rounded-2xl overflow-hidden border border-white/15 bg-white/8 backdrop-blur-md hover:bg-white/14 hover:border-[#f97316]/50 transition-all duration-300 p-8 flex flex-col justify-between min-h-[180px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center mb-5 group-hover:bg-[#f97316] transition-colors duration-300">
                    <ind.icon className="w-6 h-6 text-[#f97316] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{ind.title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">{ind.desc}</p>
                </div>
                <div className="relative z-10 mt-4">
                  <span className="text-white/50 text-sm inline-flex items-center gap-1 group-hover:text-[#f97316] transition-colors">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES & HSE */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-10 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-[#f97316]"></div>
                <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">Capabilities</h2>
              </div>
              <h3 className="text-3xl font-semibold mb-6 text-foreground">Operational Exposure</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our management team brings practical understanding of procurement systems, operational coordination, and industrial support processes from major environments including Chevron, ExxonMobil, and Dangote Group.
              </p>
              <Link href="/capabilities" className="inline-flex items-center font-semibold text-[#0b0d82] hover:text-[#f97316] transition-colors">
                View Capability Statement <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#0b0d82] p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-8">
                <ShieldCheck className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-[#f97316]"></div>
                  <h2 className="text-white/70 font-semibold tracking-wider uppercase text-sm">HSE Commitment</h2>
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-white">Zero Incident Mindset</h3>
                <p className="text-white/75 mb-8 leading-relaxed">
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

      {/* INSIGHTS PREVIEW */}
      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-[#f97316]"></div>
                <h2 className="text-[#0b0d82] font-semibold tracking-wider uppercase text-sm">Insights & News</h2>
                <div className="w-8 h-1 bg-[#f97316]"></div>
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">Latest from EquipChain</h3>
            </div>
            <Link href="/insights" className="inline-flex items-center font-semibold text-[#0b0d82] hover:text-[#f97316] transition-colors whitespace-nowrap shrink-0">
              View All Insights <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {blogData?.posts && blogData.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogData.posts.slice(0, 3).map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {post.featuredImage ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.featuredImage} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-[#0b0d82] to-[#1a1a2e]" />
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block bg-[#f97316] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                        {post.category}
                      </span>
                    )}
                    <h4 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-[#0b0d82] transition-colors">
                      {post.title}
                    </h4>
                    {post.excerpt && <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{post.author || "EquipChain Team"}</span>
                      {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
                    </div>
                    <Link href={`/insights/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-[#0b0d82] hover:text-[#f97316] transition-colors">
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="aspect-[16/9] bg-secondary animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary rounded animate-pulse w-1/3" />
                    <div className="h-5 bg-secondary rounded animate-pulse" />
                    <div className="h-4 bg-secondary rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
