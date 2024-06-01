import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, getRouteApi } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Heslo musi mat aspon 4 znaky.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const routeApi = getRouteApi("/login");

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const { setError } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const search = routeApi.useSearch();

  const onSubmit = useCallback(
    async ({ email, password }: FormValues) => {
      setIsSubmitting(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setIsSubmitting(false);

      if (error) {
        console.error("Error logging in:", error.message);
        setError("root.serverError", {
          type: error.code,
          message: error.message,
        });
        return;
      }
    },
    [setError],
  );

  if (auth.isAuthenticated) navigate({ to: search.redirect });
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="xy@gmail.com"
                          {...field}
                          type="email"
                        />
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
                      <div className="flex items-center">
                        <FormLabel>Heslo</FormLabel>
                        <a
                          // href="/forgot-password"
                          href="/login"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </a>
                      </div>

                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form?.formState?.errors?.root?.serverError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {form?.formState?.errors?.root?.serverError?.message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button className={"w-full"} type="submit" disabled={isSubmitting}>
                  Prihlasit sa
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/login" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden max-h-screen bg-muted lg:block">
        <img
          // src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=800&auto=format&fit=crop"
          // src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb"
          src="https://images.unsplash.com/photo-1512850183-6d7990f42385?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
