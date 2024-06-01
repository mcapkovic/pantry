import { createFileRoute, redirect } from "@tanstack/react-router";
import {About} from "@/pages/about";

export const Route = createFileRoute("/about")({
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
  component: About,
});
