import { useAuth } from '@/auth'
import {Button} from '@/components/ui/button'

import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    beforeLoad: ({ context, location }) => {
      if (!context.auth.isAuthenticated) {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.href,
          },
        })
      }
    },
    component: About,
  })

function About() {
    const navigate = useNavigate({ from: '/about' })
    const auth = useAuth()
  
    const handleLogout = () => {
      auth.setUser(null)
      navigate({ to: '/' })
    }

  return <div className="p-2"><Button onClick={handleLogout}>Logout</Button></div>
}