import { useMemo } from "react";
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
import { CheckIcon, ChevronRightIcon, DotFilledIcon, DotsHorizontalIcon, DotIcon } from "@radix-ui/react-icons";

function IngredientRow({ ingredient }) {
  return (
    <li>
      <div className="flex">
        <div className="flex items-center  font-medium">
          <DotIcon className="mr-1" /> {ingredient?.name}
        </div>
        <div className="flex items-center text-sm mx-2 grow text-muted-foreground">
          {ingredient?.pieces}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          {ingredient?.storageLocation}
        </div>
      </div>
    </li>
  );
}

export function CategoryDashboard() {
  const groupedValues = useMemo(() => {
    return Object.entries(groupBy(ingredients, "category"));
  }, [ingredients]);

  return (
    <div className="flex flex-wrap gap-4">
      {groupedValues.map(([groupId, values]) => {
        return (
          <Card key={groupId} className="w-80">
            <CardHeader>
              <CardTitle>{groupId}</CardTitle>
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
  );
}
