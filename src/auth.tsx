import * as React from 'react'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { supabase } from '@/lib/supabaseClient'

export interface AuthContext {
  isAuthenticated: boolean
  setUser: (username: string | null) => void
  user: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [user, setUser] = React.useState<string | null>(null)
  const [user, setUser, removeValue] = useLocalStorage<string | null>('user', null)

  const [session, setSession] = useState(null)

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
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, session }}>
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