import React, { useEffect } from "react";
import { Link } from "wouter";
import { useGetDashboardStats } from "@workspace/api-client-react";
import { getGetDashboardStatsQueryKey } from "@workspace/api-client-react";
import { FileText, MessageSquare, ClipboardList, TrendingUp, Plus, Eye, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminDashboard() {
  useEffect(() => { document.title = "Dashboard | Admin"; }, []);

  const { data: stats, isLoading } = useGetDashboardStats({
    query: { queryKey: getGetDashboardStatsQueryKey() }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Blog Posts", value: stats?.totalPosts || 0, sub: `${stats?.publishedPosts || 0} published`, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Quote Requests", value: stats?.totalQuotes || 0, sub: `${stats?.newQuotes || 0} new requests`, icon: ClipboardList, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Contact Messages", value: stats?.totalContacts || 0, sub: `${stats?.unreadContacts || 0} unread`, icon: MessageSquare, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back to the EquipChain admin portal.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/posts/new" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#f97316] text-white hover:bg-[#f97316]/90 h-10 px-4">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" /> {stat.sub}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Quotes */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/30">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-muted-foreground" /> Recent Quotes
            </h3>
            <Link href="/admin/quotes" className="text-sm text-primary hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex-1 p-0">
            {(!stats?.recentQuotes || stats.recentQuotes.length === 0) ? (
              <div className="p-8 text-center text-muted-foreground">No recent quote requests.</div>
            ) : (
              <div className="divide-y divide-border">
                {stats.recentQuotes.map(quote => (
                  <Link key={quote.id} href="/admin/quotes" className="block p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm truncate">{quote.companyName || quote.fullName}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        quote.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {quote.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-2">{quote.serviceType}</p>
                    <p className="text-xs text-muted-foreground/70">{format(new Date(quote.createdAt), 'MMM dd, HH:mm')}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/30">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-muted-foreground" /> Recent Messages
            </h3>
            <Link href="/admin/contacts" className="text-sm text-primary hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex-1 p-0">
            {(!stats?.recentContacts || stats.recentContacts.length === 0) ? (
              <div className="p-8 text-center text-muted-foreground">No recent messages.</div>
            ) : (
              <div className="divide-y divide-border">
                {stats.recentContacts.map(contact => (
                  <Link key={contact.id} href="/admin/contacts" className="block p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className={`font-medium text-sm truncate ${!contact.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {contact.fullName}
                      </p>
                      {!contact.isRead && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-2">{contact.inquiryType || 'General Inquiry'}</p>
                    <p className="text-xs text-muted-foreground/70">{format(new Date(contact.createdAt), 'MMM dd, HH:mm')}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
