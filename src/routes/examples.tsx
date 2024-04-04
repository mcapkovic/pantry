import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/examples/Dashboard";
import { Playground } from "@/components/examples/Playground";
import TaskPage from "@/components/examples/tasks/page";

export const Route = createFileRoute("/examples")({
  component: () => (
    <div>
      <Dashboard />
      <Playground />
      <TaskPage />
    </div>
  ),
});
