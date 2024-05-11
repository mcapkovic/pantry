import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";

import { supabase } from "@/lib/supabaseClient";
import { DataTable } from "@/components/ingredients-table/components/data-table";
import { Route } from "@/routes/ingredients";
import {
  TableRowType,
  getColumns,
} from "@/components/ingredients-table/components/columns";
import { itemSchema } from "@/components/ingredients-table/data/schema";
import { Item, OptionItem } from "@/components/ingredients-table/data/schema";
import { Button } from "./ui/button";
import { ResponsiveDialog } from "./ui/responsive-dialog";
import { AddIngredientsForm } from "./add-ingredients-form";

export function Ingredients() {
  const { search } = Route.useSearch();
  const [tasks, setTasks] = useState<Item[]>([]);
  const [foodOptions, setFoodOptions] = useState<OptionItem[]>([]);
  const [locationOptions, setLocationOptions] = useState<OptionItem[]>([]);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const [row, setRow] = useState<Item | null>(null);
  const [householdId, setHouseholdId] = useState<string | null>(null);

  const getIngredients = useCallback(async () => {
    let { data, error } = await supabase
      .from("ingredient")
      .select(
        `
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
    quantity,
    household_id
  `
      )
      .order("created_at", { ascending: true });

    let householdId: string | null = null;

    if (error) {
      console.warn(error);
    } else if (data) {
      const newData = data.map((item) => {
        if (householdId == null) householdId = item.household_id;
        return {
          id: item.id,
          name: item.name,
          category: item.category ?? { id: "empty", name: "" },
          storageLocation: item.location ?? { id: "empty", name: "" },
          quantity: item.quantity,
        };
      });
      setTasks(z.array(itemSchema).parse(newData));
      setHouseholdId(householdId);
    }
  }, [householdId, setHouseholdId, setTasks]);

  useEffect(() => {
    async function getCategories() {
      let { data, error } = await supabase.from("ingredient_category_option")
        .select(`
        id,
        name
      `);

      if (error) {
        console.warn(error);
      } else if (data) {
        setFoodOptions(data);
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
        setLocationOptions(data);
      }
    }

    function subscribeToChanges() {
      const status = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "ingredient" },
          (payload) => {
            console.log("Change received!", payload);
            const { eventType } = payload;
            if (
              eventType === "UPDATE" ||
              eventType === "INSERT" ||
              eventType === "DELETE"
            ) {
              getIngredients();
            }
          }
        )
        .subscribe();
      console.log("status", status);
    }

    getIngredients();
    getCategories();
    getLocations();
    subscribeToChanges();
  }, []);

  async function onDelete(tableRow: TableRowType) {
    console.log("delete", tableRow.original.id);
    const { error } = await supabase
      .from("ingredient")
      .delete()
      .eq("id", tableRow.original.id);
  }

  function onEdit(tableRow: TableRowType) {
    setRow(tableRow.original);
    modalTriggerRef.current?.click();
  }

  const columns = useMemo(
    () =>
      getColumns({
        onEdit,
        onDelete,
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
          householdId={householdId}
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
          householdId={householdId}
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
