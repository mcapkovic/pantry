import { AppWindow } from "lucide-react";
import { useCommandState } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { CommandGroup, CommandItem } from "@/components/ui/command";

const navPages = [
  {
    title: "Home",
    id: "nav-home",
    route: "/",
  },
  {
    title: "Ingredients",
    id: "nav-ingredients",
    route: "/ingredients",
  },
  {
    title: "About",
    id: "nav-about",
    route: "/about",
  },
];

export function NavGroup({ closeDialog }: { closeDialog: () => void }) {
  const navigate = useNavigate();
  const search = useCommandState((state) => state.search);
  const hasSearch = search != null && search.length > 0;

  const handleRedirect = (route: string) => {
    closeDialog();
    navigate({
      to: route,
    });
  };

  // slice results for default view (no search)
  const pages = hasSearch ? navPages : navPages.slice(0, 1);

  return (
    <CommandGroup heading="Navigation">
      {pages.map((page) => (
        <CommandItem
          key={page.id}
          keywords={["nav", page.title.toLowerCase()]}
          value={page.id}
          onSelect={() => handleRedirect(page.route)}
        >
          <AppWindow className="mr-2 h-4 w-4" />
          <span>{page.title}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
