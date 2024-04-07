import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as React from 'react'
import { flushSync } from 'react-dom'
import {
  useNavigate,
  getRouteApi,
} from '@tanstack/react-router'
import { useAuth } from '@/auth'

const routeApi = getRouteApi('/login')


export function Login() {

    const auth = useAuth()
    const navigate = useNavigate()
  
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [name, setName] = React.useState('')
  
    const search = routeApi.useSearch()
  
    const handleLogin = (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      setIsSubmitting(true)
  
      flushSync(() => {
        auth.setUser(name)
      })
  
      navigate({ to: search.redirect })
    }

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
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" onClick={(e) => handleLogin(e)}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block max-h-screen">
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
