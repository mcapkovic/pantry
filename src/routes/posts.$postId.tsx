import { createFileRoute, useParams, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostComponent,
});

function PostComponent() {
  const params = useParams({ from: "/posts/$postId" });
  return (
    <div className="flex gap-2">
      {params.postId}
      <hr />
      <Outlet />
    </div>
  );
}
