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