import { z } from "zod";
import { clsx } from "clsx";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useRef } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { DialogClose } from "./ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DESKTOP_BREAKPOINT_QUERY } from "@/components/ui/responsive-dialog";
import { Item } from "@/pages/category-dashboard/schema";
import { ExpirationDatePicker } from "@/components/expiration-date-picker";

interface AddIngredientsFormProps {
  row?: Item | null;
}

const formSchema = z.object({
  pieces: z.string(),
  expirationDate: z.date(),
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
      expirationDate: row.expiration_date
        ? new Date(row.expiration_date)
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

  async function onEdit({
    pieces,
    expirationDate,
  }: z.infer<typeof formSchema>) {
    const queryResult = await supabase
      .from("ingredient")
      .update({
        quantity: pieces,
        expiration_date: expirationDate,
      })
      .eq("id", row?.id)
      .select();

    return queryResult;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await onEdit(values);

    if (error != null) {
      console.log(error);
    } else {
      console.log(data);
      handleClose();
    }
  }

  const handlePiecesChange = useCallback(
    (direction: "increase" | "decrease") => {
      let value = Number(form.getValues("pieces") ?? "0");
      if (direction === "increase") {
        value += 1;
      } else if (direction === "decrease") {
        value -= 1;
      }
      form.setValue("pieces", String(value));
    },
    [form],
  );

  const handleDecrease = useCallback(() => {
    handlePiecesChange("decrease");
  }, [handlePiecesChange]);

  const handleIncrease = useCallback(() => {
    handlePiecesChange("increase");
  }, [handlePiecesChange]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormLabel>Dátum expirácie</FormLabel>
                <FormControl>
                  <ExpirationDatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-end justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mb-1 h-8 w-8 shrink-0 rounded-full"
            onClick={handleDecrease}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>

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

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mb-1 h-8 w-8 shrink-0 rounded-full"
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>

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
