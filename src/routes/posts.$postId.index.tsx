import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

// @ts-ignore
export const Route = createFileRoute('/posts/$postId/')({
  component: SubPostsIndexComponent,
})

function SubPostsIndexComponent() {
  return <div>sub post index</div>
}
