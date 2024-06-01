import { useCallback, useEffect, useMemo, useState } from "react";
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
function IngredientRow({ ingredient }: { ingredient: Item }) {
  return (
    <li>
      <div className="flex">
        <div className="flex items-center font-medium">
          <DotIcon className="mr-1" /> {ingredient?.name}
        </div>
        <Badge
          variant="secondary"
          className=" mx-4 rounded-sm px-1 font-normal"
        >
          {ingredient.quantity}
        </Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          {ingredient?.location?.name}
        </div>
      </div>
    </li>
  );
}

export function CategoryDashboard() {
  const [groupedItems, setGroupedItems] = useState<[string, Item[]][]>([]);
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

  return (
    <div className="flex justify-center">
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:max-w-2xl md:max-w-5xl grow sm:grow-0	">
        {groupedItems.map(([groupId, values]) => {
          return (
            <Card key={groupId} className="">
              <CardHeader>
                <CardTitle>
                  {values[0]?.category?.name ?? "Bez kategorie"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {values.map((value) => (
                    <IngredientRow key={value.id} ingredient={value} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
