import React, { useEffect } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { useListBlogPosts } from "@workspace/api-client-react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Insights() {
  useEffect(() => {
    document.title = "Insights & Industry News | EquipChain Global Ltd";
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError } = useListBlogPosts();

  return (
    <div className="w-full bg-background min-h-screen">
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0b0d82] to-[#1a1a2e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Insights & Industry News</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Latest updates, technical insights, and company news.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {["All", "Procurement", "Supply Chain", "HSE", "Industry Insights"].map((tab, i) => (
              <button key={i} className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-colors ${i === 0 ? "bg-[#0b0d82] text-white" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                {tab}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="w-full h-64 rounded-2xl" />
                  <Skeleton className="w-24 h-6 rounded-full" />
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-16" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-secondary/50 rounded-3xl">
              <p className="text-destructive font-semibold text-lg">Failed to load insights. Please try again later.</p>
            </div>
          ) : data?.posts?.length === 0 ? (
            <div className="text-center py-20 bg-secondary/50 rounded-3xl">
              <p className="text-muted-foreground text-lg">No insights available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.posts.map((post) => (
                <article key={post.id} className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden bg-secondary">
                    {post.featuredImage ? (
                      <img 
                        src={post.featuredImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0b0d82]/20 to-[#1a1a2e]/20" />
                    )}
                    {post.category && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[#f97316] text-white text-xs font-bold uppercase tracking-wider rounded-md">
                        {post.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="text-2xl font-display font-bold text-foreground mb-4 line-clamp-2 group-hover:text-[#0b0d82] transition-colors">
                      <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                      {post.excerpt || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                      <div className="flex flex-col text-xs text-muted-foreground gap-1">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt ? format(new Date(post.publishedAt), 'MMM dd, yyyy') : ''}</span>
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author || "EquipChain Team"}</span>
                      </div>
                      <Link href={`/insights/${post.slug}`} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-[#0b0d82] group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
