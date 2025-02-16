import { createFileRoute, redirect } from "@tanstack/react-router";
import { DataExport } from "@/pages/export";

export const Route = createFileRoute("/export")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: DataExport,
});
