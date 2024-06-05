import { AppWindow } from "lucide-react";
import { useCommandState } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { CommandGroup, CommandItem } from "@/components/ui/command";

export const ADD_INGREDIENT = 'addIngredient'

const actionPages = [
  {
    title: "Add ingredient",
    id: "action-ingredients",
    route: "/ingredients",
    actionName: ADD_INGREDIENT,
  },
];

export function ActionGroup({ closeDialog }: { closeDialog: () => void }) {
  const navigate = useNavigate();
  const search = useCommandState((state) => state.search);
  const hasSearch = search != null && search.length > 0;

  const handleRedirect = (route: string, actionName: string) => {
    closeDialog();
    navigate({
      to: route,
      search: {
        actionName,
      }
    });
  };

  // slice results for default view (no search)
  const pages = hasSearch ? actionPages : actionPages.slice(0, 1);

  return (
    <CommandGroup heading="Actions">
      {pages.map((page) => (
        <CommandItem
          key={page.id}
          keywords={["action", page.title.toLowerCase()]}
          value={page.id}
          onSelect={() => handleRedirect(page.route, page.actionName)}
        >
          <AppWindow className="mr-2 h-4 w-4" />
          <span>{page.title}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
