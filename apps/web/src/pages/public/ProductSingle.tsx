import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { productsData } from "@/lib/products";
import { useSubmitQuoteRequest } from "@workspace/api-client-react";
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
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const submitQuote = useSubmitQuoteRequest();

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
    
    submitQuote.mutate({
      data: {
        fullName: name,
        companyName: company,
        email: email,
        serviceType: "Procurement & Supply", // Required by backend schema
        productService: product.name,
        specification: message,
        sourcingType: "No Preference",
      }
    }, {
      onSuccess: () => {
        setIsSuccess(true);
      }
    });
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
                  <DialogContent className="w-[95vw] max-w-[400px] sm:max-w-[420px] max-h-[90vh] overflow-y-auto p-0 bg-card border-border rounded-2xl sm:rounded-3xl shadow-2xl">
                    <div className="bg-[#0b0d82] p-6 sm:p-8 text-center text-white shrink-0">
                      <DialogTitle className="text-xl sm:text-2xl font-bold text-white mb-1">Request a Quote</DialogTitle>
                      <DialogDescription className="text-white/80 text-sm">
                        {product.name}
                      </DialogDescription>
                    </div>
                    {isSuccess ? (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Request Sent!</h3>
                        <p className="text-muted-foreground text-sm mb-6">Thank you. Our team will review your requirements and get back to you shortly.</p>
                        <button 
                          onClick={() => setIsSuccess(false)}
                          className="w-full inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors bg-secondary text-foreground hover:bg-secondary/80 h-11"
                        >
                          Send Another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleQuoteRequest} className="p-5 sm:p-6 space-y-4 sm:space-y-5">
                        <div className="space-y-1.5">
                          <label className="text-xs sm:text-sm font-semibold text-foreground">Full Name *</label>
                          <Input 
                            required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name" 
                            className="h-10 sm:h-11 border-border focus:border-[#f97316] focus:ring-[#f97316]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-foreground">Company</label>
                            <Input 
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Your Company" 
                              className="h-10 sm:h-11 border-border focus:border-[#f97316] focus:ring-[#f97316]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-semibold text-foreground">Email *</label>
                            <Input 
                              required
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email Address" 
                              className="h-10 sm:h-11 border-border focus:border-[#f97316] focus:ring-[#f97316]"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs sm:text-sm font-semibold text-foreground">Additional Details (Optional)</label>
                          <Textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Quantity, timeline, specs..." 
                            className="min-h-[80px] sm:min-h-[100px] border-border focus:border-[#f97316] focus:ring-[#f97316] resize-none text-sm"
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={submitQuote.isPending}
                          className="w-full mt-2 inline-flex items-center justify-center rounded-xl text-sm sm:text-base font-semibold transition-colors bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-12 disabled:opacity-50"
                        >
                          {submitQuote.isPending ? "Sending..." : "Submit Quote Request"}
                        </button>
                      </form>
                    )}
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
