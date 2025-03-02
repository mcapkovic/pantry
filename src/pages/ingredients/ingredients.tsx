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
import { Button } from "../../components/ui/button";
import { ResponsiveDialog } from "../../components/ui/responsive-dialog";
import { AddIngredientsForm } from "../../components/add-ingredients-form";
import { Portal } from "@/components/portal";
import {
  ingredientsRead,
  subscribeToAllIngredientChanges,
} from "@/api/ingredients";
import { useURLActions } from "@/hooks/use-url-actions";
import { ADD_INGREDIENT } from "@/components/command/actions-group";

export function Ingredients() {
  const { search, actionName } = Route.useSearch();
  const [tasks, setTasks] = useState<Item[]>([]);
  const [foodOptions, setFoodOptions] = useState<OptionItem[]>([]);
  const [locationOptions, setLocationOptions] = useState<OptionItem[]>([]);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const [row, setRow] = useState<Item | null>(null);
  const [householdId, setHouseholdId] = useState<string | null>(null);

  const getIngredients = useCallback(async () => {
    let { data, error } = await ingredientsRead();
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
          expirationDate: item.expiration_date,
        };
      });
      setTasks(z.array(itemSchema).parse(newData));
      setHouseholdId(householdId);
    }
  }, [setHouseholdId, setTasks]);

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

    getIngredients();
    getCategories();
    getLocations();
    subscribeToAllIngredientChanges(getIngredients);
    // NOTE: this should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions = useMemo(() => {
    return [
      {
        action: ADD_INGREDIENT,
        handler: () => {
          modalTriggerRef.current?.click();
        },
      },
    ];
  }, []);

  useURLActions({ actions, urlAction: actionName });

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
    [],
  );
  
  return (
    <div className="mt-3">
      <Portal destinatinId="top-bar-portal-start">
        <ResponsiveDialog
          title="Pridat ingredienciu"
          dialogTrigger={<Button variant="outline">Pridať ingredienciu</Button>}
        >
          <AddIngredientsForm
            foodOptions={foodOptions}
            locationOptions={locationOptions}
            householdId={householdId}
          />
        </ResponsiveDialog>
      </Portal>

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
