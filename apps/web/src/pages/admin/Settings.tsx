import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetSiteSettings, useUpdateSiteSettings } from "@workspace/api-client-react";
import { getGetSiteSettingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, Globe, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const settingsSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
  address: z.string().optional(),
  businessHours: z.string().optional(),
  facebookUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  twitterUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  linkedinUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  instagramUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export function SettingsPage() {
  useEffect(() => { document.title = "Settings | Admin"; }, []);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: settings, isLoading } = useGetSiteSettings({
    query: { queryKey: getGetSiteSettingsQueryKey() }
  });

  const updateSettings = useUpdateSiteSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      phone: "", email: "", address: "", businessHours: "",
      facebookUrl: "", twitterUrl: "", linkedinUrl: "", instagramUrl: ""
    }
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        phone: settings.phone || "",
        email: settings.email || "",
        address: settings.address || "",
        businessHours: settings.businessHours || "",
        facebookUrl: settings.facebookUrl || "",
        twitterUrl: settings.twitterUrl || "",
        linkedinUrl: settings.linkedinUrl || "",
        instagramUrl: settings.instagramUrl || ""
      });
    }
  }, [settings, form]);

  const onSubmit = (data: SettingsFormValues) => {
    updateSettings.mutate({ data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetSiteSettingsQueryKey() });
        toast({ title: "Success", description: "Site settings updated successfully." });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[600px] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground text-sm">Manage public contact info and social links.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2 mb-6">
                <Globe className="w-5 h-5 text-[#f97316]" /> Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" /> Public Email</FormLabel>
                    <FormControl><Input placeholder="yolatoye@equipchainglobal.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" /> Phone Number</FormLabel>
                    <FormControl><Input placeholder="+234..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> Office Address</FormLabel>
                    <FormControl><Textarea className="resize-none" placeholder="Full address..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="businessHours" render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> Business Hours</FormLabel>
                    <FormControl><Input placeholder="Mon - Fri: 8:00 AM - 5:00 PM" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2 mb-6">
                <Globe className="w-5 h-5 text-blue-500" /> Social Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="linkedinUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl><Input placeholder="https://linkedin.com/company/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="twitterUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter / X URL</FormLabel>
                    <FormControl><Input placeholder="https://twitter.com/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="facebookUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl><Input placeholder="https://facebook.com/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="instagramUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram URL</FormLabel>
                    <FormControl><Input placeholder="https://instagram.com/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-border">
              <button 
                type="submit" 
                disabled={updateSettings.isPending || !form.formState.isDirty}
                className="flex items-center justify-center px-8 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium transition-colors disabled:opacity-50"
              >
                {updateSettings.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Settings
              </button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
