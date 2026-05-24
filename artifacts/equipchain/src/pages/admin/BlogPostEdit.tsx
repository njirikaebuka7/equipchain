import React, { useEffect, useState, useMemo } from "react";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateBlogPost, useUpdateBlogPost, useGetAdminMe } from "@workspace/api-client-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  category: z.string().optional(),
  tags: z.string().optional(),
  featuredImage: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content is required"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"]).default("draft"),
  author: z.string().optional(),
  scheduledAt: z.string().optional()
});

type PostFormValues = z.infer<typeof postSchema>;

export function BlogPostEdit() {
  const [matchEdit, params] = useRoute("/admin/posts/:id/edit");
  const isEdit = matchEdit && !!params?.id;
  const postId = isEdit ? parseInt(params.id, 10) : undefined;
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const { data: user } = useGetAdminMe();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "", slug: "", category: "Industry Insights", tags: "", 
      featuredImage: "", excerpt: "", content: "", seoTitle: "", 
      seoDescription: "", status: "draft", author: user?.username || "EquipChain Team", scheduledAt: ""
    },
    mode: "onChange"
  });

  // Fetch post data manually to bypass generated hook type strictness since we are patching the form
  useEffect(() => {
    if (isEdit && postId) {
      fetch(`/api/blog/posts/admin/${postId}`, { credentials: "include" }).then(r => r.json())
        .then((data: any) => {
          if (data) {
            form.reset({
              title: data.title || "",
              slug: data.slug || "",
              category: data.category || "",
              tags: data.tags || "",
              featuredImage: data.featuredImage || "",
              excerpt: data.excerpt || "",
              content: data.content || "",
              seoTitle: data.seoTitle || "",
              seoDescription: data.seoDescription || "",
              status: data.status as any,
              author: data.author || "",
              scheduledAt: data.scheduledAt ? new Date(data.scheduledAt).toISOString().slice(0,16) : ""
            });
          }
          setInitialLoading(false);
        })
        .catch(() => {
          toast({ title: "Error", description: "Failed to load post", variant: "destructive" });
          setLocation("/admin/posts");
        });
    }
  }, [isEdit, postId, form, setLocation, toast]);

  // Auto-generate slug from title
  const titleValue = form.watch("title");
  useEffect(() => {
    if (!isEdit && titleValue && !form.formState.dirtyFields.slug) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [titleValue, isEdit, form]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof PostFormValues)[] = [];
    if (step === 1) fieldsToValidate = ["title", "slug", "category"];
    if (step === 2) fieldsToValidate = ["featuredImage"];
    if (step === 3) fieldsToValidate = ["content", "excerpt"];
    
    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) return;
    }
    setStep(s => Math.min(s + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = (data: PostFormValues) => {
    if (isEdit && postId) {
      updatePost.mutate({ id: postId, data }, {
        onSuccess: () => {
          toast({ title: "Success", description: "Post updated successfully" });
          setLocation("/admin/posts");
        }
      });
    } else {
      createPost.mutate({ data }, {
        onSuccess: () => {
          toast({ title: "Success", description: "Post created successfully" });
          setLocation("/admin/posts");
        }
      });
    }
  };

  if (initialLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const isSaving = createPost.isPending || updatePost.isPending;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setLocation("/admin/posts")} className="p-2 hover:bg-secondary rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            {isEdit ? "Edit Post" : "Create New Post"}
          </h1>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {/* Progress */}
        <div className="bg-secondary/30 p-4 border-b border-border flex justify-between">
          {[1,2,3,4,5].map(s => (
            <div key={s} className="flex flex-col items-center flex-1 relative">
              {s < 5 && <div className={`absolute top-4 left-1/2 w-full h-0.5 ${s < step ? 'bg-primary' : 'bg-border'}`} />}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                s === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : 
                s < step ? "bg-primary/80 text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span className="text-[10px] sm:text-xs mt-2 font-medium text-muted-foreground hidden sm:block">
                {s === 1 ? "Basic" : s === 2 ? "Media" : s === 3 ? "Content" : s === 4 ? "SEO" : "Publish"}
              </span>
            </div>
          ))}
        </div>

        <div className="p-6 md:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Post Title</FormLabel><FormControl><Input className="text-lg h-12" placeholder="Enter post title" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="slug" render={({ field }) => (
                      <FormItem><FormLabel>URL Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Procurement">Procurement</SelectItem>
                            <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                            <SelectItem value="HSE">HSE</SelectItem>
                            <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="author" render={({ field }) => (
                      <FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="tags" render={({ field }) => (
                      <FormItem><FormLabel>Tags (comma separated)</FormLabel><FormControl><Input placeholder="oil, gas, logistics" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <FormField control={form.control} name="featuredImage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://images.unsplash.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                      {field.value && !form.formState.errors.featuredImage ? (
                        <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-border bg-secondary flex items-center justify-center">
                          <img src={field.value} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjRweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzkxOTg5ZSI+SW1hZ2UgbG9hZCBmYWlsZWQ8L3RleHQ+PC9zdmc+'; }} />
                        </div>
                      ) : (
                        <div className="mt-4 aspect-video rounded-xl border-2 border-dashed border-border bg-secondary/50 flex flex-col items-center justify-center text-muted-foreground">
                          <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                          <p>Image preview will appear here</p>
                        </div>
                      )}
                    </FormItem>
                  )} />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <FormField control={form.control} name="excerpt" render={({ field }) => (
                    <FormItem><FormLabel>Excerpt (Short summary)</FormLabel><FormControl><Textarea className="resize-none h-24" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (HTML supported)</FormLabel>
                      <FormControl><Textarea className="font-mono text-sm h-[400px]" placeholder="<p>Write your content here...</p>" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <FormField control={form.control} name="seoTitle" render={({ field }) => (
                    <FormItem><FormLabel>SEO Title</FormLabel><FormControl><Input placeholder="Optimal title for search engines" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="seoDescription" render={({ field }) => (
                    <FormItem><FormLabel>SEO Meta Description</FormLabel><FormControl><Textarea className="resize-none h-24" placeholder="Brief description for search results" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="bg-secondary/50 p-6 rounded-xl border border-border">
                    <h3 className="font-semibold text-lg mb-4">Publishing Options</h3>
                    
                    <FormField control={form.control} name="status" render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Post Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="h-12"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft (Hidden)</SelectItem>
                            <SelectItem value="published">Published (Visible)</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />

                    {form.watch("status") === "scheduled" && (
                      <FormField control={form.control} name="scheduledAt" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schedule Date & Time</FormLabel>
                          <FormControl><Input type="datetime-local" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
                <button type="button" onClick={() => setStep(s => Math.max(1, s-1))} disabled={step === 1 || isSaving} className="px-6 py-2 rounded-md hover:bg-secondary disabled:opacity-0 font-medium">
                  Back
                </button>
                
                {step < 5 ? (
                  <button type="button" onClick={handleNext} className="flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium">
                    Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button type="submit" disabled={isSaving} className="flex items-center px-8 py-2 bg-[#f97316] text-white rounded-md hover:bg-[#f97316]/90 font-bold shadow-lg disabled:opacity-50">
                    {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : (isEdit ? "Update Post" : "Create Post")}
                  </button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
