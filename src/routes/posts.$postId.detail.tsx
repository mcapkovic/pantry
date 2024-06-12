import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/detail")({
  component: PostComponent,
});
function PostComponent() {
  return (
    <div className="flex gap-2">
      detail
      <hr />
      <Outlet />
    </div>
  );
}
