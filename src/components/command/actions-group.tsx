import { AppWindow } from "lucide-react";
import { useCommandState } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { CommandGroup, CommandItem } from "@/components/ui/command";

const navPages = [
  {
    id: "1",
    title: "Add ingredient",
    value: "action-ingredients",
    route: "/ingredients",
    actionName: 'addIngredient',
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
  const pages = hasSearch ? navPages : navPages.slice(0, 1);

  return (
    <CommandGroup heading="Actions">
      {pages.map((page) => (
        <CommandItem
          key={page.id}
          keywords={["action", page.title.toLowerCase()]}
          value={page.value}
          onSelect={() => handleRedirect(page.route, page.actionName)}
        >
          <AppWindow className="mr-2 h-4 w-4" />
          <span>{page.title}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
