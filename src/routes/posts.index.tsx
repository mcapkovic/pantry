import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

// @ts-ignore
export const Route = createFileRoute('/posts/')({
  component: PostsIndexComponent,
})

function PostsIndexComponent() {
  return <div>posts index</div>
}
