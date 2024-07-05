import { createFileRoute, redirect } from "@tanstack/react-router";
import { ShoppingList } from "@/pages/shopping-list";

export const Route = createFileRoute("/shopping-list")({
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
  component: Index,
});

function Index() {
  return <ShoppingList />;
}
