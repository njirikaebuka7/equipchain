import React, { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

import {
  Home,
  About,
  Services,
  Industries,
  Capabilities,
  HSE,
  PrivacyPolicy,
  TermsConditions,
  Contact,
  RequestQuote,
  Insights,
  BlogPost,
  Products,
  ProductSingle
} from "@/pages/public";

import {
  AdminLogin,
  AdminDashboard,
  BlogPosts,
  BlogPostEdit,
  Contacts,
  Quotes,
  SettingsPage
} from "@/pages/admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function AdminRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate("/admin/login", { replace: true } as any);
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin/login">
        <AdminLogin />
      </Route>
      <Route path="/admin/dashboard">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </Route>
      <Route path="/admin/posts">
        <AdminLayout><BlogPosts /></AdminLayout>
      </Route>
      <Route path="/admin/posts/new">
        <AdminLayout><BlogPostEdit /></AdminLayout>
      </Route>
      <Route path="/admin/posts/:id/edit">
        <AdminLayout><BlogPostEdit /></AdminLayout>
      </Route>
      <Route path="/admin/contacts">
        <AdminLayout><Contacts /></AdminLayout>
      </Route>
      <Route path="/admin/quotes">
        <AdminLayout><Quotes /></AdminLayout>
      </Route>
      <Route path="/admin/settings">
        <AdminLayout><SettingsPage /></AdminLayout>
      </Route>
      <Route path="/admin">
        <AdminRedirect />
      </Route>

      {/* Public Routes */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>
      <Route path="/about">
        <PublicLayout><About /></PublicLayout>
      </Route>
      <Route path="/products">
        <PublicLayout><Products /></PublicLayout>
      </Route>
      <Route path="/products/:id">
        <PublicLayout><ProductSingle /></PublicLayout>
      </Route>
      <Route path="/services">
        <PublicLayout><Services /></PublicLayout>
      </Route>
      <Route path="/industries">
        <PublicLayout><Industries /></PublicLayout>
      </Route>
      <Route path="/capabilities">
        <PublicLayout><Capabilities /></PublicLayout>
      </Route>
      <Route path="/hse">
        <PublicLayout><HSE /></PublicLayout>
      </Route>
      <Route path="/insights">
        <PublicLayout><Insights /></PublicLayout>
      </Route>
      <Route path="/insights/:slug">
        <PublicLayout><BlogPost /></PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
      </Route>
      <Route path="/request-quote">
        <PublicLayout><RequestQuote /></PublicLayout>
      </Route>
      <Route path="/privacy-policy">
        <PublicLayout><PrivacyPolicy /></PublicLayout>
      </Route>
      <Route path="/terms-conditions">
        <PublicLayout><TermsConditions /></PublicLayout>
      </Route>
      
      {/* 404 */}
      <Route>
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
