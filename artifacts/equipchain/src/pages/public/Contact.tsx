import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetSiteSettings, useSubmitContact } from "@workspace/api-client-react";
import { getGetSiteSettingsQueryKey } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import heroImg from "@assets/equipchain_global_ltd_hero_background_1779629274989.png";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  inquiryType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  useEffect(() => {
    document.title = "Contact Us | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const { data: settings } = useGetSiteSettings({
    query: { queryKey: getGetSiteSettingsQueryKey() }
  });

  const submitContact = useSubmitContact();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      inquiryType: "General Inquiry",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
      }
    });
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 text-white overflow-hidden"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d82]/85 via-[#0b0d82]/80 to-[#1a1a2e]/90 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Get in touch with our team of industrial experts.</p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

            {/* Contact Form */}
            <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm">
              <h2 className="text-3xl font-semibold text-foreground mb-8">Send a Message</h2>

              {isSuccess ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-8 rounded-2xl text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Message Sent Successfully</h3>
                  <p className="text-green-600 dark:text-green-300 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+234..." {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                              <SelectItem value="Request a Quote">Request a Quote</SelectItem>
                              <SelectItem value="Partnership">Partnership</SelectItem>
                              <SelectItem value="HSE">HSE</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can we help you?" className="min-h-[150px] resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="w-full inline-flex items-center justify-center rounded-full text-base font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white hover:bg-[#ea6500] h-14 shadow-md disabled:opacity-50"
                    >
                      {submitContact.isPending ? "Sending..." : "Send Message"} <Send className="ml-2 w-5 h-5" />
                    </button>
                  </form>
                </Form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-[#0b0d82] text-white p-10 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-[#f97316]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Office Address</h4>
                      <p className="text-white/75">{settings?.address || "Aziom Plaza Opp. Old Nitel Exchange, Tabon-Tabon, Agege, Lagos State, Nigeria, West-Africa."}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-[#f97316]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Email Address</h4>
                      <a href={`mailto:${settings?.email || "yolatoye@equipchainglobal.com"}`} className="text-white/75 hover:text-white transition-colors">
                        {settings?.email || "yolatoye@equipchainglobal.com"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[#f97316]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Phone Number</h4>
                      <a href={`tel:${settings?.phone || "+2348072072332"}`} className="text-white/75 hover:text-white transition-colors">
                        {settings?.phone || "+2348072072332"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-[#f97316]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Business Hours</h4>
                      <p className="text-white/75">{settings?.businessHours || "Mon - Fri: 8:00 AM - 5:00 PM"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-Width Google Map */}
      <section className="h-[450px] w-full">
        <iframe
          src="https://maps.google.com/maps?q=Aziom+Plaza+Opp+Old+Nitel+Exchange+Tabon-Tabon+Agege+Lagos+Nigeria&output=embed&z=16"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="EquipChain Global Ltd — Agege, Lagos"
        />
      </section>
    </div>
  );
}
