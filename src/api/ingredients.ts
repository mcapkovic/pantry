import { supabase } from "@/lib/supabaseClient";

export async function ingredientsRead() {
  let result = await supabase
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

  return result;
}

export async function availableIngredientsRead() {
  let result = await supabase
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
    .gt("quantity", 0)
    .order("created_at", { ascending: true });

  return result;
}

export async function shoppingListRead() {
  let result = await supabase
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
    .lte("quantity", 0)
    .order("created_at", { ascending: true });

  return result;
}

export function subscribeToAllIngredientChanges(callback: () => void) {
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
          callback !== null && callback();
        }
      },
    )
    .subscribe();
  // console.log("status", status);
}
