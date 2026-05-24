import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function AdminLogin() {
  const [, setLocation] = useLocation();
  const [errorMsg, setErrorMsg] = useState("");
  const login = useAdminLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setErrorMsg("");
    login.mutate({ data }, {
      onSuccess: () => {
        setLocation("/admin/dashboard");
      },
      onError: (err: any) => {
        setErrorMsg(err?.error || "Invalid username or password");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0d82] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md mb-4 shadow-xl">
            <Lock className="w-8 h-8 text-[#f97316]" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">EquipChain Admin</h1>
          <p className="text-white/60">Secure portal access</p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {errorMsg && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button 
                type="submit" 
                disabled={login.isPending}
                className="w-full flex items-center justify-center rounded-lg h-12 bg-[#f97316] text-white font-medium hover:bg-[#f97316]/90 transition-colors disabled:opacity-70"
              >
                {login.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
              </button>
            </form>
          </Form>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Default credentials for dev: admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
