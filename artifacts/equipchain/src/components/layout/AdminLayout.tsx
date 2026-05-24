import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useGetAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { LayoutDashboard, FileText, MessageSquare, ClipboardList, Settings, LogOut, Loader2, Menu, X } from "lucide-react";
import { getGetAdminMeQueryKey } from "@workspace/api-client-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const { data: user, isLoading, isError } = useGetAdminMe({
    query: {
      queryKey: getGetAdminMeQueryKey(),
      retry: false
    }
  });

  const logout = useAdminLogout();

  useEffect(() => {
    if (!isLoading && isError) {
      setLocation("/admin/login");
    }
  }, [isLoading, isError, setLocation]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        setLocation("/admin/login");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !user) {
    return null; // Will redirect in useEffect
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Blog Posts", href: "/admin/posts", icon: FileText },
    { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
    { label: "Quote Requests", href: "/admin/quotes", icon: ClipboardList },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0b0d82] text-white border-r border-border shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="font-display font-bold text-xl tracking-tight">EquipChain Admin</Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  location.startsWith(item.href) ? "bg-white/20 text-white font-medium" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="font-medium">{user.username}</p>
              <p className="text-white/50 text-xs">Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            disabled={logout.isPending}
            className="w-full flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white rounded-md transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Layout */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-16 border-b border-border bg-card flex items-center justify-between px-4">
          <Link href="/admin/dashboard" className="font-display font-bold text-lg text-primary">EquipChain Admin</Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-card border-b border-border z-50 p-4 shadow-lg">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    location.startsWith(item.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4 md:p-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
