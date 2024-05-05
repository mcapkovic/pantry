import { createFileRoute, redirect } from "@tanstack/react-router";
import { AddIngredients } from "@/components/add-ingredients";
import { Ingredients } from "@/components/ingredients";

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
  component: IngredientsPage,
  validateSearch: (searchData: Record<string, string>): ProductSearch => {
    return {
      search: searchData.search,
    };
  },
});

function IngredientsPage() {
  return <Ingredients />
  return (
    <div className="mt-3">
      <AddIngredients />
    </div>
  );
}
