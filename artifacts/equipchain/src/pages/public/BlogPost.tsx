import React, { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useGetBlogPostBySlug } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogPost() {
  const [match, params] = useRoute("/insights/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading, isError } = useGetBlogPostBySlug(slug, {
    query: {
      enabled: !!slug
    }
  });

  useEffect(() => {
    if (post) {
      document.title = post.seoTitle || `${post.title} | EquipChain Global Ltd`;
      // In a real app we'd update meta description too
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <Skeleton className="w-full h-96 rounded-3xl mb-12" />
        <Skeleton className="w-32 h-8 rounded-full mb-6" />
        <Skeleton className="w-full h-16 mb-8" />
        <div className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto px-4 py-40 text-center">
        <h1 className="text-4xl font-display font-bold text-foreground mb-6">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link href="/insights" className="inline-flex items-center px-6 py-3 bg-[#0b0d82] text-white rounded-md hover:bg-[#0b0d82]/90">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Featured Image Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] bg-[#1a1a2e] flex flex-col justify-end">
        {post.featuredImage && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/80 to-transparent z-10" />
          </>
        )}
        
        <div className="container mx-auto px-4 relative z-20 pb-16 max-w-4xl">
          <Link href="/insights" className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm font-medium mb-10 block">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
          </Link>

          {post.category && (
            <div className="inline-block px-4 py-1.5 bg-[#f97316] text-white text-sm font-bold uppercase tracking-wider rounded-full mb-6">
              {post.category}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 leading-[1.1]">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#f97316]" />
              <span>{post.author || "EquipChain Team"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#f97316]" />
              <span>{post.publishedAt ? format(new Date(post.publishedAt), 'MMMM dd, yyyy') : ''}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* Social Share Sidebar (Desktop) */}
            <div className="hidden lg:block w-16 shrink-0">
              <div className="sticky top-32 flex flex-col gap-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center mb-2" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Share</p>
                <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-[#0b0d82] transition-colors"><Share2 className="w-5 h-5" /></button>
                {/* Social icons placeholders */}
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-colors font-bold">in</div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors font-bold">tw</div>
              </div>
            </div>

            {/* Main Content */}
            <article className="flex-1 max-w-3xl">
              <div 
                className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:text-[#0b0d82] dark:prose-h2:text-white prose-a:text-[#f97316] max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
              
              {/* Tags */}
              {post.tags && (
                <div className="mt-16 pt-8 border-t border-border">
                  <h4 className="font-semibold mb-4 text-foreground">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.split(',').map((tag, i) => (
                      <span key={i} className="px-4 py-1.5 bg-secondary text-foreground text-sm rounded-full">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

          </div>
        </div>
      </section>

    </div>
  );
}
