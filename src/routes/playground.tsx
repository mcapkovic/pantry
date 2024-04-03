import { createFileRoute, redirect } from '@tanstack/react-router'
import {Playground} from '@/components/examples/Playground'

export const Route = createFileRoute('/playground')({
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
  component: Playground,
})