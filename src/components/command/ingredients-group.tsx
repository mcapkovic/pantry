import { useCallback } from "react";

import { ChefHat } from "lucide-react";
import { useCommandState } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Item } from "@/pages/category-dashboard/schema";
import { Badge } from "@/components/ui/badge";

interface IngredientsGroupProps {
  ingredients: Item[];
  closeDialog: () => void;
}
export function IngredientsGroup({
  ingredients: allIngredients,
  closeDialog,
}: IngredientsGroupProps) {
  const navigate = useNavigate();
  const search = useCommandState((state) => state.search);
  const hasSearch = search != null && search.length > 0;
  const ingredients = hasSearch ? allIngredients : allIngredients.slice(0, 3);

  const handleRedirect = useCallback(
    (ingredient: string) => {
      closeDialog();
      navigate({
        to: "/ingredients",
        search: {
          search: ingredient,
        },
      });
    },
    [closeDialog, navigate]
  );

  return (
    <CommandGroup heading="Ingredients">
      {ingredients.map((ingredient) => (
        <CommandItem
          key={ingredient.id}
          keywords={[ingredient.name.toLowerCase()]}
          value={ingredient.id}
          onSelect={() => handleRedirect(ingredient.name)}
        >
          <ChefHat className="mr-2 h-4 w-4" />
          <span>{ingredient.name}</span>
          <Badge
            variant="secondary"
            className=" ml-4 rounded-sm px-1 font-normal"
          >
            {ingredient.quantity}
          </Badge>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
