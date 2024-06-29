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
// import { Item, OptionItem } from "@/components/ingredients-table/data/schema";
import { supabase } from "@/lib/supabaseClient";
import { DialogClose } from "./ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DESKTOP_BREAKPOINT_QUERY } from "@/components/ui/responsive-dialog";
import {  Item } from "@/pages/category-dashboard/schema";

interface AddIngredientsFormProps {
  row?: Item | null;
}

const formSchema = z.object({
  pieces: z.string(),
});

export function UpdateQuantityForm({ row }: AddIngredientsFormProps) {
  const closeTriggerRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT_QUERY);

  const defaultValues = useMemo(() => {
    if (row == null) {
      return {
        pieces: "1",
      };
    }
    return {
      pieces: row.quantity.toString(),
    };
  }, [row]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleClose() {
    closeTriggerRef.current?.click();
  }

  async function onEdit({ pieces }: z.infer<typeof formSchema>) {
    const queryResult = await supabase
      .from("ingredient")
      .update({ quantity: pieces })
      .eq("id", row?.id)
      .select();

    return queryResult;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('ss')

    const { data, error } = await onEdit(values);

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

        <Button className={clsx(!isDesktop && "w-full")} type="submit">
          Submit
        </Button>
        <DialogClose className="hidden" ref={closeTriggerRef}>
          hidden close button
        </DialogClose>
      </form>
    </Form>
  );
}
