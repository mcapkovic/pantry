import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  component: PostsComponent,
})

function PostsComponent() {
//   const posts = Route.useLoaderData()

  return (
    <div className="p-2 flex gap-2">
      posts route
      <hr />
      <Outlet />
    </div>
  )
}
