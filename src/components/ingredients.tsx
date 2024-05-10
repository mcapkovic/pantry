import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";

import { supabase } from "@/lib/supabaseClient";
import { DataTable } from "@/components/ingredients-table/components/data-table";
import { Route } from "@/routes/ingredients";
import { getColumns } from "@/components/ingredients-table/components/columns";
import { itemSchema } from "@/components/ingredients-table/data/schema";
import { Item, Option } from "@/components/ingredients-table/data/schema";
import { AddIngredients } from "@/components/add-ingredients";
import { Button } from "./ui/button";

export function Ingredients() {
  const { search } = Route.useSearch();
  const [tasks, setTasks] = useState<Item[]>([]);
  const [foodOptions, setFoodOptions] = useState<Option[]>([]);
  const [locationOptions, setLocationOptions] = useState<Option[]>([]);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const [row, setRow] = useState<Item | null>(null);

  useEffect(() => {
    async function getIngredients() {
      let { data, error } = await supabase.from("ingredient").select(`
        id,
        name,
        category (
            id,
            name
        ),
        location (
            id,
            name
        ),
        quantity
      `);

      if (error) {
        console.warn(error);
      } else if (data) {
        const newData = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            category: item.category ?? { id: "empty", name: "" },
            storageLocation: item.location ?? { id: "empty", name: "" },
            quantity: item.quantity,
          };
        });
        setTasks(z.array(itemSchema).parse(newData));
      }
    }

    async function getCategories() {
      let { data, error } = await supabase.from("ingredient_category_option")
        .select(`
        id,
        name
      `);

      if (error) {
        console.warn(error);
      } else if (data) {
        setFoodOptions(
          data.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          })
        );
      }
    }

    async function getLocations() {
      let { data, error } = await supabase.from("ingredient_location_option")
        .select(`
        id,
        name
      `);

      if (error) {
        console.warn(error);
      } else if (data) {
        setLocationOptions(
          data.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          })
        );
      }
    }

    getIngredients();
    getCategories();
    getLocations();
  }, []);

  const columns = useMemo(
    () =>
      getColumns({
        onEdit: (tableRow) => {
          console.log(tableRow.original);
          setRow(tableRow.original);
          modalTriggerRef.current?.click();
        },
      }),
    []
  );

  return (
    <div className="mt-3">
      <h1>Ingredients</h1>
      <AddIngredients
        title="Pridat ingredienciu"
        foodOptions={foodOptions}
        locationOptions={locationOptions}
        modalTrigger={<Button variant="outline">add ingredient</Button>}
      />
      <AddIngredients
        foodOptions={foodOptions}
        locationOptions={locationOptions}
        title="Upravit ingredienciu"
        modalTrigger={<Button ref={modalTriggerRef} className="hidden" />}
        row={row}
      />
      <div className="m-6">
        <DataTable
          data={tasks}
          columns={columns}
          search={search}
          foodOptions={foodOptions}
          locationOptions={locationOptions}
        />
      </div>
    </div>
  );
}
