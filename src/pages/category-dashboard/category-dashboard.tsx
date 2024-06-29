import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import groupBy from "lodash/groupBy";

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
import { ingredientsRead } from "@/api/ingredients";
import { z } from "zod";
import { itemSchema, Item } from "@/pages/category-dashboard/schema";
import { Badge } from "@/components/ui/badge";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { UpdateQuantityForm } from "@/components/update-quantity-form";

function IngredientRow({
  ingredient,
  onQuantityClick,
}: {
  ingredient: Item;
  onQuantityClick: () => void;
}) {
  return (
    <li className="py-2">
      <div className="flex">
        <div className="flex grow items-center font-medium">
          {ingredient?.name}
        </div>

        <div className="flex items-center">
          <Badge
            variant="secondary"
            className=" mx-4 rounded-sm px-1 font-normal"
            onClick={onQuantityClick}
          >
            {ingredient.quantity}
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

  // const groupedValues = useMemo(() => {
  //   return Object.entries(groupBy(ingredients, "category"));
  // }, [ingredients]);

  const getIngredients = useCallback(async () => {
    let { data, error } = await ingredientsRead();
    if (error) {
      console.warn(error);
    } else if (data) {
      const parsedData = z.array(itemSchema).parse(data);
      const groupedData = groupBy(parsedData, (item) => {
        return item?.category?.id ?? "empty";
      });
      setGroupedItems(Object.entries(groupedData));
    }
  }, [setGroupedItems]);

  useEffect(() => {
    getIngredients();
  }, []);

  const onQuantityClickHandler = (row: Item) => {
    setRow(row);
    modalTriggerRef.current?.click();
  };

  return (
    <>
      <ResponsiveDialog
        title="Upravit mnozstvo"
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
