import { z } from "zod";
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
import { Item, Option } from "@/components/ingredients-table/data/schema";
import { supabase } from "@/lib/supabaseClient";
import { DialogClose } from "./ui/dialog";

interface AddIngredientsFormProps {
  foodOptions?: Option[];
  locationOptions?: Option[];
  row?: Item | null;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nazov musi mat aspon 2 znaky.",
  }),
  category: z.string().optional(),
  location: z.string().optional(),
  pieces: z.string().optional(),
});

export function AddIngredientsForm({
  foodOptions,
  locationOptions,
  row,
}: AddIngredientsFormProps) {
  const closeTriggerRef = useRef<HTMLButtonElement>(null);
  const defaultValues = useMemo(() => {
    if (row == null) {
      return {
        name: "",
        pieces: "1",
      };
    }
    return {
      name: row.name,
      pieces: "1",
      category:
        row?.category != null && row?.category?.id != "empty"
          ? row.category.id
          : undefined,
      location:
        row?.storageLocation != null && row?.storageLocation?.id != "empty"
          ? row.storageLocation.id
          : undefined,
    };
  }, [row]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleClose() {
    closeTriggerRef.current?.click();
  }

  async function onSubmit({
    name,
    category,
    location,
    pieces,
  }: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { data, error } = await supabase
      .from("ingredient")
      .insert([
        {
          name,
          location,
          category,
          quantity: pieces,
          household_id: "27c3c745-3cfe-461a-a7ae-d61b78ea77f4",
        },
      ])
      .select();
    console.log(data, error);

    if (error != null) {
      console.log(error);
    } else {
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
              <FormLabel>Nazov</FormLabel>
              <FormControl>
                <Input placeholder="Jablká, Ryza, ..." {...field} />
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
              <FormLabel>Pocet</FormLabel>
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
              <FormLabel>Kategoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {foodOptions.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
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
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <DialogClose className="hidden" ref={closeTriggerRef}>
          hidden close button
        </DialogClose>
      </form>
    </Form>
  );
}
