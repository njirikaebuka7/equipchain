import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { productsData } from "@/lib/products";

export function Products() {
  useEffect(() => {
    document.title = "Our Products | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <section className="relative bg-[#0b0d82] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060731] to-transparent z-0" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-[#f97316] transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
          >
            Our <span className="text-[#f97316]">Products</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl font-light"
          >
            Explore our curated selection of high-performance machinery and rugged attachments tailored for your industrial and construction needs.
          </motion.p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsData.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-[#0b0d82] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-border">
                    <Link href={`/products/${product.id}`} className="inline-flex items-center text-sm font-semibold text-[#f97316] hover:text-[#ea6500] transition-colors">
                      View Details <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block p-8 rounded-3xl bg-secondary/50 border border-border max-w-3xl">
              <h4 className="text-2xl font-semibold mb-4 text-foreground">Need a custom equipment solution?</h4>
              <p className="text-muted-foreground mb-6">Our experts can help you source the perfect machines and attachments for your specific operational requirements.</p>
              <Link 
                href="/request-quote" 
                className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-12 px-8"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
