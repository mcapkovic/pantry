import * as React from 'react'
import { useEffect, useState } from 'react'
import {Session} from '@supabase/supabase-js'

import { supabase } from '@/lib/supabaseClient'

export interface AuthContext {
  isAuthenticated: boolean
  session: Session | null
  user: Session['user'] | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
       setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const isAuthenticated = session !== null
  return (
    <AuthContext.Provider value={{ isAuthenticated, session, user: session?.user ?? null }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}