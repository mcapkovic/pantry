import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";

import { supabase } from "@/lib/supabaseClient";
import { DataTable } from "@/components/ingredients-table/components/data-table";
import { Route } from "@/routes/ingredients";
import { getColumns } from "@/components/ingredients-table/components/columns";
import { itemSchema } from "@/components/ingredients-table/data/schema";
import { Item, Option } from "@/components/ingredients-table/data/schema";
import { Button } from "./ui/button";
import { ResponsiveDialog } from "./ui/responsive-dialog";
import { AddIngredientsForm } from "./add-ingredients-form";

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
      `).order('created_at', { ascending: true });

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
      <ResponsiveDialog
        title="Pridat ingredienciu"
        dialogTrigger={<Button variant="outline">add ingredient</Button>}
      >
        <AddIngredientsForm
          foodOptions={foodOptions}
          locationOptions={locationOptions}
        />
      </ResponsiveDialog>

      <ResponsiveDialog
        title="Upravit ingredienciu"
        dialogTrigger={<Button ref={modalTriggerRef} className="hidden" />}
      >
        <AddIngredientsForm
          foodOptions={foodOptions}
          locationOptions={locationOptions}
          row={row}
        />
      </ResponsiveDialog>
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
