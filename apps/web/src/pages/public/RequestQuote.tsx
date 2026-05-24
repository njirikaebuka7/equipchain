import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitQuoteRequest } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg from "@assets/equipchain_global_ltd_hero_background_1779629274989.png";

const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Service type is required"),
  otherService: z.string().optional(),
  productService: z.string().optional(),
  quantity: z.string().optional(),
  specification: z.string().optional(),
  deliveryTimeline: z.string().optional(),
  sourcingType: z.string().optional(),
  additionalMessage: z.string().optional(),
  documentUrl: z.string().optional()
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const SERVICE_OPTIONS = [
  "Procurement & Supply",
  "Supply Chain & Logistics",
  "Oil & Gas Support",
  "Project Support",
  "Industrial Services",
  "Other"
];

const SERVICE_SLUG_MAP: Record<string, string> = {
  "procurement-supply": "Procurement & Supply",
  "supply-chain-logistics": "Supply Chain & Logistics",
  "oil-gas-support": "Oil & Gas Support",
  "project-support": "Project Support",
  "industrial-services": "Industrial Services",
};

export function RequestQuote() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string | null>(null);

  const submitQuote = useSubmitQuoteRequest();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      serviceType: "",
      otherService: "",
      productService: "",
      quantity: "",
      specification: "",
      deliveryTimeline: "",
      sourcingType: "No Preference",
      additionalMessage: "",
      documentUrl: ""
    },
    mode: "onChange"
  });

  useEffect(() => {
    document.title = "Request a Quote | EquipChain Global Ltd";
    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const serviceSlug = params.get("service");
    const serviceLabel = serviceSlug
      ? (SERVICE_SLUG_MAP[serviceSlug] ?? (SERVICE_OPTIONS.includes(serviceSlug) ? serviceSlug : null))
      : null;
    if (serviceLabel) {
      setPreSelectedService(serviceLabel);
      form.setValue("serviceType", serviceLabel);
      // Stay on step 1 (Basic Info) — handleNext will skip step 2 automatically
    }
  }, []);

  const { watch, trigger } = form;
  const serviceType = watch("serviceType");

  const handleNext = async () => {
    let fieldsToValidate: (keyof QuoteFormValues)[] = [];

    if (step === 1) fieldsToValidate = ["fullName", "email"];
    if (step === 2) fieldsToValidate = ["serviceType"];

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    // Skip step 2 if service is pre-selected from URL
    if (step === 1 && preSelectedService) {
      setStep(3);
    } else {
      setStep(s => Math.min(s + 1, 5));
    }
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step === 3 && preSelectedService) {
      setStep(1);
    } else {
      setStep(s => Math.max(s - 1, 1));
    }
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const onSubmit = (data: QuoteFormValues) => {
    submitQuote.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
      }
    });
  };

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d82]/85 via-[#0b0d82]/80 to-[#1a1a2e]/90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Request a Quote</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Provide details about your project to get a customized proposal.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border p-12 rounded-3xl shadow-xl text-center"
            >
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Quote Request Submitted</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Thank you for your interest in EquipChain Global Ltd. Our procurement specialists are reviewing your requirements and will contact you shortly with a customized proposal.
              </p>
              <button
                onClick={() => {
                  form.reset();
                  setStep(1);
                  setIsSuccess(false);
                  setPreSelectedService(null);
                }}
                className="px-8 py-3 bg-[#0b0d82] text-white rounded-full font-semibold hover:bg-[#0b0d82]/90 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">

              {/* Progress Bar */}
              <div className="bg-secondary p-6 border-b border-border">
                {/* Pre-selected service chip */}
                {preSelectedService && (
                  <div className="mb-5 flex items-center gap-2.5 bg-[#f97316]/10 border border-[#f97316]/30 rounded-xl px-4 py-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f97316] shrink-0" />
                    <span className="text-sm text-foreground">
                      Service selected: <strong className="text-[#f97316]">{preSelectedService}</strong>
                    </span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        s === step ? "bg-[#f97316] text-white ring-4 ring-[#f97316]/20" :
                        s < step ? "bg-[#0b0d82] text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                      </div>
                      <span className="text-xs font-medium mt-2 hidden sm:block text-foreground">
                        {s === 1 ? "Basic Info" : s === 2 ? "Service" : s === 3 ? "Details" : s === 4 ? "Uploads" : "Review"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden mt-4">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#f97316] transition-all duration-500 ease-out"
                    style={{ width: `${((step - 1) / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 md:p-12">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <AnimatePresence mode="wait">

                      {/* STEP 1 */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-2xl font-semibold text-foreground border-b border-border pb-4 mb-6">1. Basic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="companyName" render={({ field }) => (
                              <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Acme Corp" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" placeholder="john@example.com" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="+234..." {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-2xl font-semibold text-foreground border-b border-border pb-4 mb-6">2. Select Service Needed</h3>
                          <FormField control={form.control} name="serviceType" render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {SERVICE_OPTIONS.map((opt) => (
                                  <div
                                    key={opt}
                                    onClick={() => field.onChange(opt)}
                                    className={`cursor-pointer border-2 rounded-xl p-6 text-center transition-all ${
                                      field.value === opt
                                        ? "border-[#f97316] bg-[#f97316]/5 text-[#f97316]"
                                        : "border-border bg-card hover:border-primary/50 text-foreground"
                                    }`}
                                  >
                                    <span className="font-semibold">{opt}</span>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )} />

                          {serviceType === "Other" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                              <FormField control={form.control} name="otherService" render={({ field }) => (
                                <FormItem className="mt-4">
                                  <FormLabel>Please specify *</FormLabel>
                                  <FormControl><Input placeholder="Describe the service needed" {...field} className="h-12" /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </motion.div>
                          )}
                        </motion.div>
                      )}

                      {/* STEP 3 */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-2xl font-semibold text-foreground border-b border-border pb-4 mb-6">3. Request Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="productService" render={({ field }) => (
                              <FormItem><FormLabel>Product/Service Needed</FormLabel><FormControl><Input placeholder="e.g. Centrifugal Pumps" {...field} className="h-12" /></FormControl></FormItem>
                            )} />
                            <FormField control={form.control} name="quantity" render={({ field }) => (
                              <FormItem><FormLabel>Quantity</FormLabel><FormControl><Input placeholder="e.g. 5 units" {...field} className="h-12" /></FormControl></FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="specification" render={({ field }) => (
                            <FormItem><FormLabel>Specification / Description</FormLabel><FormControl><Textarea placeholder="Technical details, part numbers, or specific requirements..." className="min-h-[100px]" {...field} /></FormControl></FormItem>
                          )} />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="deliveryTimeline" render={({ field }) => (
                              <FormItem><FormLabel>Required Delivery Timeline</FormLabel><FormControl><Input placeholder="e.g. 2 weeks, ASAP" {...field} className="h-12" /></FormControl></FormItem>
                            )} />
                            <FormField control={form.control} name="sourcingType" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Sourcing Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-12"><SelectValue placeholder="Select type" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Local">Local</SelectItem>
                                    <SelectItem value="International">International</SelectItem>
                                    <SelectItem value="No Preference">No Preference</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )} />
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4 */}
                      {step === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-2xl font-semibold text-foreground border-b border-border pb-4 mb-6">4. Additional Information</h3>
                          <FormField control={form.control} name="documentUrl" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link to RFQ, BOQ, or Specification Document (Optional)</FormLabel>
                              <div className="p-6 border-2 border-dashed border-border rounded-xl bg-secondary/50 text-center">
                                <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                                <p className="text-sm text-muted-foreground mb-4">Paste a secure link (Google Drive, Dropbox, etc.) to your documents</p>
                                <FormControl><Input placeholder="https://" {...field} className="max-w-md mx-auto h-12" /></FormControl>
                              </div>
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="additionalMessage" render={({ field }) => (
                            <FormItem><FormLabel>Additional Message</FormLabel><FormControl><Textarea placeholder="Any other details we should know?" className="min-h-[120px]" {...field} /></FormControl></FormItem>
                          )} />
                        </motion.div>
                      )}

                      {/* STEP 5 */}
                      {step === 5 && (
                        <motion.div
                          key="step5"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-2xl font-semibold text-foreground border-b border-border pb-4 mb-6">5. Review & Submit</h3>
                          <div className="bg-secondary/50 rounded-2xl p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Full Name</p>
                                <p className="font-semibold text-foreground">{form.getValues("fullName")}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Company</p>
                                <p className="font-semibold text-foreground">{form.getValues("companyName") || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Email</p>
                                <p className="font-semibold text-foreground">{form.getValues("email")}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Service Selected</p>
                                <p className="font-semibold text-foreground">{form.getValues("serviceType")}</p>
                              </div>
                            </div>
                            <div className="pt-4 border-t border-border">
                              <p className="text-muted-foreground text-sm">Description/Spec</p>
                              <p className="font-medium mt-1 text-foreground">{form.getValues("specification") || "N/A"}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-8 border-t border-border">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={step === 1 || submitQuote.isPending}
                        className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-0 transition-colors h-12 px-6"
                      >
                        <ChevronLeft className="mr-2 w-5 h-5" /> Back
                      </button>

                      {step < 5 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors focus-visible:outline-none bg-[#0b0d82] text-white hover:bg-[#0b0d82]/90 h-12 px-8"
                        >
                          Next Step <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitQuote.isPending}
                          className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#ea6500] h-12 px-8 shadow-md disabled:opacity-50"
                        >
                          {submitQuote.isPending ? "Submitting..." : "Submit Quote Request"} <CheckCircle2 className="ml-2 w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
