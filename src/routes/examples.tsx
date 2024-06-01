import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/pages/examples/Dashboard";
import { Playground } from "@/pages/examples/Playground";
import TaskPage from "@/pages/examples/tasks/page";

export const Route = createFileRoute("/examples")({
  component: () => (
    <div>
      <Dashboard />
      <Playground />
      <TaskPage />
    </div>
  ),
});
