import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { productsData } from "@/lib/products";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ProductSingle() {
  const [match, params] = useRoute("/products/:id");
  const productId = params?.id;
  const product = productsData.find(p => p.id === productId);

  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | EquipChain Global Ltd`;
    } else {
      document.title = "Product Not Found | EquipChain Global Ltd";
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-background text-center px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist.</p>
        <Link href="/products" className="inline-flex items-center text-[#f97316] hover:underline font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>
      </div>
    );
  }

  const handleQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Quote Request: ${product.name}`);
    const body = encodeURIComponent(`Product: ${product.name}
Name: ${name}
Company: ${company || "N/A"}
Phone: ${phone || "N/A"}

Message:
${message}
`);

    const mailtoLink = `mailto:yolatoye@equipchainglobal.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="w-full bg-background min-h-screen">
      {/* HEADER SECTION */}
      <section className="relative bg-[#0b0d82] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060731] to-transparent z-0" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center text-white/70 hover:text-[#f97316] transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4"
          >
            {product.name}
          </motion.h1>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="rounded-3xl overflow-hidden border border-border shadow-xl bg-card">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#f97316] uppercase tracking-wider mb-6">
                <div className="w-8 h-1 bg-[#f97316]"></div>
                Product Details
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">{product.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {product.description}
              </p>

              <div className="space-y-6 mb-12 border-t border-border pt-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">High Performance</h4>
                    <p className="text-muted-foreground text-sm mt-1">Engineered for maximum reliability and output in tough environments.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Custom Solutions</h4>
                    <p className="text-muted-foreground text-sm mt-1">We source the exact specifications needed for your operational requirements.</p>
                  </div>
                </div>
              </div>

              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#ea6500] h-14 px-10 shadow-lg">
                      Request Quote
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card border-border rounded-3xl shadow-2xl">
                    <div className="bg-[#0b0d82] p-8 text-center text-white">
                      <DialogTitle className="text-2xl font-bold text-white mb-2">Request a Quote</DialogTitle>
                      <DialogDescription className="text-white/80">
                        {product.name}
                      </DialogDescription>
                    </div>
                    <form onSubmit={handleQuoteRequest} className="p-8 space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Full Name *</label>
                        <Input 
                          required 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name" 
                          className="h-12 border-border focus:border-[#f97316] focus:ring-[#f97316]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Company</label>
                          <Input 
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Your Company" 
                            className="h-12 border-border focus:border-[#f97316] focus:ring-[#f97316]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Phone</label>
                          <Input 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Your Phone Number" 
                            className="h-12 border-border focus:border-[#f97316] focus:ring-[#f97316]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Additional Details (Optional)</label>
                        <Textarea 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Specify quantity, delivery timeline, or technical requirements..." 
                          className="min-h-[100px] border-border focus:border-[#f97316] focus:ring-[#f97316] resize-none"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full inline-flex items-center justify-center rounded-xl text-base font-semibold transition-colors bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-14"
                      >
                        Send Request via Email
                      </button>
                      <p className="text-xs text-center text-muted-foreground mt-4">
                        This will open your default email client with a pre-filled message.
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
