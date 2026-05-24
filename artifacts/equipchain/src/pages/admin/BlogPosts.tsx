import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { useAdminListBlogPosts, useToggleBlogPostPublish, useDeleteBlogPost } from "@workspace/api-client-react";
import { getAdminListBlogPostsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export function BlogPosts() {
  useEffect(() => { document.title = "Manage Posts | Admin"; }, []);

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const queryParams = { 
    page, 
    limit: 10, 
    ...(statusFilter !== 'all' ? { status: statusFilter as any } : {}) 
  };

  const { data, isLoading } = useAdminListBlogPosts(queryParams, {
    query: { queryKey: getAdminListBlogPostsQueryKey(queryParams) }
  });

  const togglePublish = useToggleBlogPostPublish();
  const deletePost = useDeleteBlogPost();

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    togglePublish.mutate({ id, data: { status: newStatus as any } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListBlogPostsQueryKey() });
        toast({ title: "Success", description: `Post marked as ${newStatus}` });
      }
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deletePost.mutate({ id: deleteId }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListBlogPostsQueryKey() });
        setDeleteId(null);
        toast({ title: "Deleted", description: "Post removed successfully" });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground text-sm">Manage your insights and industry news.</p>
        </div>
        <Link href="/admin/posts/new" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#f97316] text-white hover:bg-[#f97316]/90 h-10 px-4 shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Create New Post
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between bg-secondary/20">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-6 py-4"><Skeleton className="h-5 w-48" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-24 ml-auto" /></td>
                  </tr>
                ))
              ) : data?.posts?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No posts found. <Link href="/admin/posts/new" className="text-primary hover:underline">Create one</Link>.
                  </td>
                </tr>
              ) : (
                data?.posts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground max-w-[300px] truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {post.category || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        post.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        post.status === 'scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleToggleStatus(post.id, post.status)}
                          className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
                          title={post.status === 'published' ? "Unpublish" : "Publish"}
                        >
                          {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link 
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 rounded-md hover:bg-secondary text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => setDeleteId(post.id)}
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

        {/* Pagination */}
        {data && data.total > data.limit && (
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {((page - 1) * data.limit) + 1} to {Math.min(page * data.limit, data.total)} of {data.total} posts
            </div>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                disabled={page * data.limit >= data.total}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 border border-border rounded hover:bg-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deletePost.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
