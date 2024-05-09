import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Option } from "@/components/ingredients-table/data/schema";
import { supabase } from "@/lib/supabaseClient";

interface AddIngredientsFormProps {
  closeDialog: () => void;
  foodOptions: Option[];
  locationOptions: Option[];
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
  closeDialog,
  foodOptions,
  locationOptions,
}: AddIngredientsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pieces: "1",
    },
  });

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
      .insert([{ name, location, category, quantity: pieces, household_id: '27c3c745-3cfe-461a-a7ae-d61b78ea77f4' }])
      .select();

    console.log(data, error);
    if (closeDialog != null) closeDialog();
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
      </form>
    </Form>
  );
}
