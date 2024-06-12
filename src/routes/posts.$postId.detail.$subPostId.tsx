import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/detail/$subPostId")({
  component: PostComponent,
});
function PostComponent() {
  const params = useParams({ from: "/posts/$postId/detail/$subPostId" });
  return (
    <div className="flex gap-2">
      {params.subPostId}
    </div>
  );
}
