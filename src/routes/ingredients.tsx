import { createFileRoute, redirect } from "@tanstack/react-router";
import { Ingredients } from "@/pages/ingredients";

type ProductSearch = {
  search: string;
};

export const Route = createFileRoute("/ingredients")({
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
  component: Ingredients,
  validateSearch: (searchData: Record<string, string>): ProductSearch => {
    return {
      search: searchData.search,
    };
  },
});
