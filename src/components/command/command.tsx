import { useCallback, useState, useEffect, useMemo } from "react";
import { useCommandState } from "cmdk";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
} from "lucide-react";
import { z } from "zod";

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
import { NavGroup } from "@/components/command/nav-group";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ingredientsRead } from "@/api/ingredients";
import { itemSchema, Item } from "@/pages/category-dashboard/schema";
import { IngredientsGroup } from "@/components/command/ingredients-group";
import { ActionGroup } from "@/components/command/actions-group";

const NAV_GROUP = "navGroup";
const ACTION_GROUP = "actionGroup";
const INGREDIENTS_GROUP = "ingredientsGroup";
const ALL_GROUPS = [NAV_GROUP, ACTION_GROUP, INGREDIENTS_GROUP];

interface ItemGroupsProps {
  closeDialog: () => void;
  ingredients: Item[];
}

function ItemGroups({ closeDialog, ingredients }: ItemGroupsProps) {
  const search = useCommandState((state) => state.search);

  const showGroups = useMemo(() => {
    if (!search.includes(" ")) return new Set(ALL_GROUPS);
    if (search.startsWith("add ")) return new Set([ACTION_GROUP]);
    if (search.startsWith("nav ")) return new Set([NAV_GROUP]);
    return new Set(ALL_GROUPS);
  }, [search]);

  return (
    <>
      {showGroups.has(INGREDIENTS_GROUP) && (
        <IngredientsGroup ingredients={ingredients} closeDialog={closeDialog} />
      )}

      {showGroups.has(NAV_GROUP) && (
        <>
          <CommandSeparator />
          <NavGroup closeDialog={closeDialog} />
        </>
      )}

      {showGroups.has(ACTION_GROUP) && (
        <>
          <CommandSeparator />
          <ActionGroup closeDialog={closeDialog} />
        </>
      )}
    </>
  );
}

export function Command() {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState<Item[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getIngredients = useCallback(async () => {
    const { data, error } = await ingredientsRead();

    if (error) {
      console.warn(error);
    } else if (data) {
      const parsedData = z.array(itemSchema).parse(data);
      setIngredients(parsedData);
    }
  }, []);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
              <Search className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm text-muted-foreground">
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>J
              </kbd>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <ItemGroups
            closeDialog={() => setOpen(false)}
            ingredients={ingredients}
          />

          {/* <CommandGroup heading="Suggestions">
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
          </CommandGroup> */}

          {/* <CommandGroup heading="Settings">
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
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}
