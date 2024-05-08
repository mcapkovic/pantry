import { useEffect, useState } from "react";
import { z } from "zod";

import { supabase } from "@/lib/supabaseClient";
import { DataTable } from "@/components/ingredients-table/components/data-table";
import { Route } from "@/routes/ingredients";
import { columns } from "@/components/ingredients-table/components/columns";
import { itemSchema } from "@/components/ingredients-table/data/schema";
import { Item } from "@/components/ingredients-table/data/schema";

export function Ingredients() {
  const { search } = Route.useSearch();
  const [tasks, setTasks] = useState<Item[]>([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

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
        )
      `);

      if (error) {
        console.warn(error);
      } else if (data) {
        const newData = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            category: item.category?.name ?? null,
            storageLocation: item.location?.name ?? null,
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

  return (
    <div className="mt-3">
      <h1>Ingredients</h1>
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
