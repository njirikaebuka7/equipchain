import React, { useEffect, useState } from "react";
import { useListContactSubmissions, useMarkContactRead, useDeleteContactSubmission } from "@workspace/api-client-react";
import { getListContactSubmissionsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Mail, Trash2, Eye, EyeOff, Calendar, Building, Phone } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function Contacts() {
  useEffect(() => { document.title = "Contact Messages | Admin"; }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMessage, setViewMessage] = useState<any | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const queryParams = { 
    page, 
    limit: 10, 
    ...(debouncedSearch ? { search: debouncedSearch } : {}) 
  };

  const { data, isLoading } = useListContactSubmissions(queryParams, {
    query: { queryKey: getListContactSubmissionsQueryKey(queryParams) }
  });

  const markRead = useMarkContactRead();
  const deleteContact = useDeleteContactSubmission();

  const handleToggleRead = (id: number, currentRead: boolean) => {
    markRead.mutate({ id, data: { isRead: !currentRead } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListContactSubmissionsQueryKey() });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteContact.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListContactSubmissionsQueryKey() });
          toast({ title: "Deleted", description: "Message removed" });
          setViewMessage(null);
        }
      });
    }
  };

  const openMessage = (msg: any) => {
    setViewMessage(msg);
    if (!msg.isRead) {
      handleToggleRead(msg.id, false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Contact Messages</h1>
          <p className="text-muted-foreground text-sm">View and manage inquiries from the website.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-secondary/20">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email, or company..." 
              className="pl-9 bg-background"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : data?.submissions?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No messages found.
                  </td>
                </tr>
              ) : (
                data?.submissions.map((msg) => (
                  <tr 
                    key={msg.id} 
                    onClick={() => openMessage(msg)}
                    className={`border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer ${!msg.isRead ? 'bg-primary/5' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!msg.isRead && <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />}
                        <span className={`font-medium ${!msg.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.fullName}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{msg.companyName || "—"}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-foreground">
                        {msg.inquiryType || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {format(new Date(msg.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => handleToggleRead(msg.id, msg.isRead)}
                          className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
                          title={msg.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          {msg.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleDelete(msg.id)}
                          className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                        >
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
            <div>Showing {((page - 1) * data.limit) + 1} to {Math.min(page * data.limit, data.total)} of {data.total} messages</div>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50">Previous</button>
              <button disabled={page * data.limit >= data.total} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>

      <Sheet open={!!viewMessage} onOpenChange={(open) => !open && setViewMessage(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl">Message Details</SheetTitle>
            <SheetDescription>From the public contact form.</SheetDescription>
          </SheetHeader>
          
          {viewMessage && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {viewMessage.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{viewMessage.fullName}</h3>
                  <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {viewMessage.email}</span>
                    {viewMessage.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {viewMessage.phone}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center gap-1"><Building className="w-3.5 h-3.5" /> Company</p>
                    <p className="font-medium text-foreground">{viewMessage.companyName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Date</p>
                    <p className="font-medium text-foreground">{format(new Date(viewMessage.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Inquiry Type</p>
                  <span className="px-3 py-1 rounded-md bg-secondary text-sm font-medium">{viewMessage.inquiryType || 'General Inquiry'}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm mb-3 font-medium">Message</p>
                <div className="bg-secondary/30 p-4 rounded-xl border border-border text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                  {viewMessage.message}
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <a href={`mailto:${viewMessage.email}`} className="flex-1 flex justify-center items-center py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                  Reply via Email
                </a>
                <button onClick={() => handleDelete(viewMessage.id)} className="px-4 py-2 border border-destructive text-destructive hover:bg-destructive/10 rounded-md transition-colors font-medium">
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
