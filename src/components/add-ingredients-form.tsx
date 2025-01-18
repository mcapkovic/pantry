import { z } from "zod";
import { clsx } from "clsx";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Item, OptionItem } from "@/components/ingredients-table/data/schema";
import { supabase } from "@/lib/supabaseClient";
import { DialogClose } from "./ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DESKTOP_BREAKPOINT_QUERY } from "@/components/ui/responsive-dialog";
import { ExpirationDatePicker } from "@/components/expiration-date-picker";
import { PostgrestError } from "@supabase/supabase-js";
import { format } from "date-fns";
import { ingredientFormSchema } from "@/schemas/ingredient-form";

interface AddIngredientsFormProps {
  foodOptions: OptionItem[];
  locationOptions: OptionItem[];
  row?: Item | null;
  householdId?: string | null;
}

export function AddIngredientsForm({
  foodOptions,
  locationOptions,
  row,
  householdId,
}: AddIngredientsFormProps) {
  const closeTriggerRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT_QUERY);

  const defaultValues = useMemo(() => {
    if (row == null) {
      return {
        name: "",
        pieces: "1",
      };
    }
    return {
      name: row.name,
      pieces: row.quantity.toString(),
      category:
        row?.category != null && row?.category?.id != "empty"
          ? row.category.id
          : undefined,
      location:
        row?.storageLocation != null && row?.storageLocation?.id != "empty"
          ? row.storageLocation.id
          : undefined,
      expirationDate: row.expirationDate
        ? new Date(row.expirationDate)
        : undefined,
    };
  }, [row]);

  const form = useForm<z.infer<typeof ingredientFormSchema>>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues,
  });

  function handleClose() {
    closeTriggerRef.current?.click();
  }

  async function onEdit({
    name,
    category,
    location,
    pieces,
    expirationDate,
  }: z.infer<typeof ingredientFormSchema>) {
    const formattedDate = expirationDate
      ? format(expirationDate, "yyyy-MM-dd")
      : undefined;

    const queryResult = await supabase
      .from("ingredient")
      .update({
        name,
        location,
        category,
        quantity: pieces,
        expiration_date: formattedDate,
      })
      .eq("id", row?.id)
      .select();

    return queryResult;
  }

  async function onAdd({
    name,
    category,
    location,
    pieces,
    expirationDate,
  }: z.infer<typeof ingredientFormSchema>) {
    const formattedDate = expirationDate
      ? format(expirationDate, "yyyy-MM-dd")
      : undefined;

    const queryResult = await supabase
      .from("ingredient")
      .insert([
        {
          name,
          location,
          category,
          quantity: pieces,
          expiration_date: formattedDate,
          household_id: householdId, // TODO: this should be on BE
        },
      ])
      .select();

    return queryResult;
  }

  async function onSubmit(values: z.infer<typeof ingredientFormSchema>) {
    const action = row ? onEdit : onAdd;
    const {
      data,
      error,
    }: { data: any[] | null; error: PostgrestError | null } =
      await action(values);

    if (error != null) {
      console.log(error);
    } else {
      console.log(data);
      handleClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Názov</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jablká, Ryza, ..."
                  {...field}
                  autoFocus={row == null}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pieces"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Množstvo</FormLabel>
              <FormControl>
                <Input placeholder="1" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategória</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {foodOptions.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <FormDescription>
                Ovocie, zelenina, maso, ...
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miesto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locationOptions.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dátum expirácie</FormLabel>
              <FormControl>
                <ExpirationDatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className={clsx(!isDesktop && "w-full")} type="submit">
          {row ? "Upraviť" : "Pridať"}
        </Button>
        <DialogClose className="hidden" ref={closeTriggerRef}>
          hidden close button
        </DialogClose>
      </form>
    </Form>
  );
}
