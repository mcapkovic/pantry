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
  useEffect(() => {
    async function getIngredients() {
      let { data, error } = await supabase.from("ingredient").select(`
        id,
        name,
        category (
            id,
            name
        )
      `);

      if (error) {
        console.warn(error);
      } else if (data) {
        console.log(data);
        const newData = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            category: item.category?.name ?? null,
            storageLocation: null,
          };
        });
        setTasks(z.array(itemSchema).parse(newData));
      }
    }

    getIngredients();
  }, []);

  return (
    <div className="mt-3">
      <h1>Ingredients</h1>
      <div className="m-6">
        <DataTable data={tasks} columns={columns} search={search} />
      </div>
    </div>
  );
}
