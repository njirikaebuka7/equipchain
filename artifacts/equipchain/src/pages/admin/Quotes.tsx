import React, { useEffect, useState } from "react";
import { useListQuoteRequests, useUpdateQuoteStatus, useDeleteQuoteRequest } from "@workspace/api-client-react";
import { getListQuoteRequestsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Mail, Trash2, Calendar, Building, Phone, FileText, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Quotes() {
  useEffect(() => { document.title = "Quote Requests | Admin"; }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewQuote, setViewQuote] = useState<any | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const queryParams = { 
    page, 
    limit: 10, 
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(statusFilter !== 'all' ? { status: statusFilter as any } : {})
  };

  const { data, isLoading } = useListQuoteRequests(queryParams, {
    query: { queryKey: getListQuoteRequestsQueryKey(queryParams) }
  });

  const updateStatus = useUpdateQuoteStatus();
  const deleteQuote = useDeleteQuoteRequest();

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatus.mutate({ id, data: { status: newStatus as any } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListQuoteRequestsQueryKey() });
        if (viewQuote && viewQuote.id === id) {
          setViewQuote({ ...viewQuote, status: newStatus });
        }
        toast({ title: "Updated", description: "Status changed successfully" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this quote request?")) {
      deleteQuote.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListQuoteRequestsQueryKey() });
          toast({ title: "Deleted", description: "Request removed" });
          setViewQuote(null);
        }
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'in_review': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
      case 'responded': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Quote Requests</h1>
          <p className="text-muted-foreground text-sm">Manage RFQs and service inquiries.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-secondary/20 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search quotes..." 
              className="pl-9 bg-background"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="responded">Responded</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Service Needed</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-6 py-4"><Skeleton className="h-5 w-32" /><Skeleton className="h-3 w-20 mt-2" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
                  </tr>
                ))
              ) : data?.requests?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No quote requests found.
                  </td>
                </tr>
              ) : (
                data?.requests.map((quote) => (
                  <tr 
                    key={quote.id} 
                    onClick={() => setViewQuote(quote)}
                    className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{quote.companyName || quote.fullName}</div>
                      {quote.companyName && <div className="text-xs text-muted-foreground mt-0.5">{quote.fullName}</div>}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {quote.serviceType === 'Other' ? quote.otherService : quote.serviceType}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {format(new Date(quote.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                      <Select value={quote.status} onValueChange={(v) => handleStatusChange(quote.id, v)}>
                        <SelectTrigger className={`h-8 text-xs font-bold uppercase tracking-wider border ${getStatusColor(quote.status)} w-32`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_review">In Review</SelectItem>
                          <SelectItem value="responded">Responded</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end" onClick={e => e.stopPropagation()}>
                        <button onClick={() => handleDelete(quote.id)} className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data && data.total > data.limit && (
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing {((page - 1) * data.limit) + 1} to {Math.min(page * data.limit, data.total)} of {data.total} requests</div>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50">Previous</button>
              <button disabled={page * data.limit >= data.total} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>

      <Sheet open={!!viewQuote} onOpenChange={(open) => !open && setViewQuote(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto sm:w-[600px]">
          <SheetHeader className="mb-6 flex flex-row justify-between items-center pr-8">
            <SheetTitle className="text-xl">Quote Request</SheetTitle>
            {viewQuote && (
              <Select value={viewQuote.status} onValueChange={(v) => handleStatusChange(viewQuote.id, v)}>
                <SelectTrigger className={`h-8 text-xs font-bold uppercase tracking-wider border ${getStatusColor(viewQuote.status)} w-32`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            )}
          </SheetHeader>
          
          {viewQuote && (
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-secondary/30 p-5 rounded-xl border border-border">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Client Details</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div><p className="text-muted-foreground text-xs mb-1">Company</p><p className="font-medium text-foreground">{viewQuote.companyName || "N/A"}</p></div>
                  <div><p className="text-muted-foreground text-xs mb-1">Contact Name</p><p className="font-medium text-foreground">{viewQuote.fullName}</p></div>
                  <div><p className="text-muted-foreground text-xs mb-1">Email</p><p className="font-medium text-foreground flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground"/> {viewQuote.email}</p></div>
                  <div><p className="text-muted-foreground text-xs mb-1">Phone</p><p className="font-medium text-foreground flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground"/> {viewQuote.phone || "N/A"}</p></div>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 border-b border-border pb-2">Request Details</h4>
                <div className="grid grid-cols-2 gap-y-6 gap-x-6 text-sm">
                  <div className="col-span-2">
                    <p className="text-muted-foreground text-xs mb-1">Service Type</p>
                    <p className="font-bold text-lg text-primary">{viewQuote.serviceType === 'Other' ? viewQuote.otherService : viewQuote.serviceType}</p>
                  </div>
                  <div><p className="text-muted-foreground text-xs mb-1">Product/Service Details</p><p className="font-medium text-foreground">{viewQuote.productService || "N/A"}</p></div>
                  <div><p className="text-muted-foreground text-xs mb-1">Quantity</p><p className="font-medium text-foreground">{viewQuote.quantity || "N/A"}</p></div>
                  <div><p className="text-muted-foreground text-xs mb-1">Delivery Timeline</p><p className="font-medium text-foreground">{viewQuote.deliveryTimeline || "N/A"}</p></div>
                  <div><p className="text-muted-foreground text-xs mb-1">Sourcing Preference</p><p className="font-medium text-foreground">{viewQuote.sourcingType || "N/A"}</p></div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground text-xs mb-2">Specification / Description</p>
                    <div className="bg-background p-4 rounded-lg border border-border whitespace-pre-wrap">{viewQuote.specification || "No specification provided."}</div>
                  </div>
                </div>
              </div>

              {/* Attachments & Additional */}
              {(viewQuote.documentUrl || viewQuote.additionalMessage) && (
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 border-b border-border pb-2">Additional Info</h4>
                  <div className="space-y-4 text-sm">
                    {viewQuote.documentUrl && (
                      <div>
                        <p className="text-muted-foreground text-xs mb-2">Attached Document</p>
                        <a href={viewQuote.documentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-primary hover:bg-secondary/80 font-medium transition-colors">
                          <FileText className="w-4 h-4" /> View Document <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                    {viewQuote.additionalMessage && (
                      <div>
                        <p className="text-muted-foreground text-xs mb-2">Additional Message</p>
                        <div className="bg-background p-4 rounded-lg border border-border whitespace-pre-wrap">{viewQuote.additionalMessage}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-6 flex gap-3">
                <a href={`mailto:${viewQuote.email}?subject=RE: Quote Request - EquipChain Global Ltd`} className="flex-1 flex justify-center items-center py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                  Respond via Email
                </a>
                <button onClick={() => handleDelete(viewQuote.id)} className="px-4 py-2 border border-destructive text-destructive hover:bg-destructive/10 rounded-md transition-colors font-medium">
                  Delete
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
