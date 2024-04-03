import { createFileRoute, redirect } from '@tanstack/react-router'
import {Dashboard} from '@/components/examples/Dashboard'

export const Route = createFileRoute('/dashboard')({
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
  component: Dashboard,
})

function Dashboard2() {
  return (
    <div className="p-2">
      <h3>Dashboard</h3>
    </div>
  )
}