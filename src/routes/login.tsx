import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Login } from "@/pages/login";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().catch("/"),
  }),
  component: Login,
});
