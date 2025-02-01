import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import groupBy from "lodash/groupBy";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ingredients from "@/components/ingredients-table/data/ingredients.json";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
  DotsHorizontalIcon,
  DotIcon,
} from "@radix-ui/react-icons";
import {
  availableIngredientsRead,
  subscribeToAllIngredientChanges,
} from "@/api/ingredients";
import { z } from "zod";
import { itemSchema, Item } from "@/pages/category-dashboard/schema";
import { Badge } from "@/components/ui/badge";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { UpdateQuantityForm } from "@/components/update-quantity-form";
import { differenceInDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cva } from "class-variance-authority";

const varningVariants = cva("h-2 w-2", {
  variants: {
    variant: {
      default: "bg-green-300 dark:bg-green-800",
      warning: "bg-orange-400 dark:bg-orange-600",
      danger: "bg-red-500 dark:bg-red-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function IngredientRow({
  ingredient,
  onQuantityClick,
}: {
  ingredient: Item;
  onQuantityClick: () => void;
}) {
  const daysUntilExpiration = useMemo(() => {
    if (!ingredient.expiration_date) return null;
    return differenceInDays(new Date(ingredient.expiration_date), new Date());
  }, [ingredient.expiration_date]);

  const expirationDate = useMemo(() => {
    if (!ingredient.expiration_date) return null;
    return format(new Date(ingredient.expiration_date), "dd.MM.yyyy");
  }, [ingredient.expiration_date]);

  const variant = useMemo(() => {
    if (daysUntilExpiration == null) return undefined;
    if (daysUntilExpiration <= 3) return "danger";
    if (daysUntilExpiration <= 7) return "warning";
    return "default";
  }, [daysUntilExpiration]);

  return (
    <li className="py-2">
      <div className="relative flex pl-4">
        {expirationDate != null ? (
          <Popover>
            <PopoverTrigger>
              <div className={cn(varningVariants({ variant }), "mr-2")} />
            </PopoverTrigger>
            <PopoverContent>
              {`${daysUntilExpiration} dni do ${expirationDate}`}
            </PopoverContent>
          </Popover>
        ) : null}

        <div className="flex grow items-center font-medium">
          {ingredient?.name}
        </div>

        <div className="flex items-center">
          <Badge
            variant="secondary"
            className="mx-4 rounded-sm px-1 font-normal"
          >
            {onQuantityClick != null ? (
              <button onClick={onQuantityClick}>{ingredient.quantity}</button>
            ) : (
              ingredient.quantity
            )}
          </Badge>

          <div className="flex items-center text-sm text-muted-foreground">
            {ingredient?.location?.name}
          </div>
        </div>
      </div>
    </li>
  );
}

export function CategoryDashboard() {
  const [groupedItems, setGroupedItems] = useState<[string, Item[]][]>([]);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const [row, setRow] = useState<Item | null>(null);

  const getIngredients = useCallback(async () => {
    let { data, error } = await availableIngredientsRead();
    console.log(data);
    if (error) {
      console.warn(error);
    } else if (data) {
      const parsedData = z.array(itemSchema).parse(data);
      console.log(parsedData);
      const groupedData = groupBy(parsedData, (item) => {
        return item?.category?.id ?? "empty";
      });
      setGroupedItems(Object.entries(groupedData));
    }
  }, [setGroupedItems]);

  useEffect(() => {
    subscribeToAllIngredientChanges(getIngredients);
    getIngredients();
    // NOTE: this should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onQuantityClickHandler = (row: Item) => {
    setRow(row);
    modalTriggerRef.current?.click();
  };

  return (
    <>
      <ResponsiveDialog
        title={row?.name ?? ""}
        dialogTrigger={<Button ref={modalTriggerRef} className="hidden" />}
      >
        <UpdateQuantityForm row={row} />
      </ResponsiveDialog>

      <div className="flex justify-center">
        <div className="grid grow grid-cols-1 gap-4 p-2 sm:max-w-2xl sm:grow-0 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3	">
          {groupedItems.map(([groupId, values]) => {
            return (
              <Card key={groupId} className="">
                <CardHeader>
                  <CardTitle>
                    {values[0]?.category?.name ?? "Bez kategorie"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col divide-y">
                    {values.map((value) => (
                      <IngredientRow
                        key={value.id}
                        ingredient={value}
                        onQuantityClick={() => onQuantityClickHandler(value)}
                      />
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
