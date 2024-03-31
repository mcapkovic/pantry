import { createFileRoute, redirect } from '@tanstack/react-router'
import TaskPage from '@/components/tasks/page'

export const Route = createFileRoute('/ingredients')({
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
  component: TaskPage,
})
