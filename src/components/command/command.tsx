import React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  AppWindow,
} from "lucide-react";
import { useCommandState } from "cmdk";
import { useNavigate } from "@tanstack/react-router";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const navPages = [
  {
    id: "1",
    title: "Home",
    value: "home",
    route: "/",
  },
  {
    id: "2",
    title: "Ingredients",
    value: "ingredients",
    route: "/ingredients",
  },
  {
    id: "3",
    title: "About",
    value: "about",
    route: "/about",
  },
];

function NavCommands({ closeDialog }: { closeDialog: () => void }) {
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
          value={page.value}
          onSelect={() => handleRedirect(page.route)}
        >
          <AppWindow className="mr-2 h-4 w-4" />
          <span>{page.title}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

export function Command() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => console.log("dddd")}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>

          <NavCommands closeDialog={() => setOpen(false)} />

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
