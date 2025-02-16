import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { ingredientsRead } from "@/api/ingredients";
import { Button } from "@/components/ui/button";

const itemSchema = z.object({
  id: z.string(),
  nazov: z.string(),
  kategoria: z.string().optional(),
  mnozstvo: z.number(),
  datum_spotreby: z.string().optional(),
});

export type Item = z.infer<typeof itemSchema>;

export function DataExport() {
  const [tasks, setTasks] = useState<Item[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  const getIngredients = useCallback(async () => {
    const { data, error } = await ingredientsRead();
    if (error) {
      console.warn(error);
    } else if (data) {
      const newData = data
        .map((item) => {
          return {
            id: item.id,
            nazov: item.name,
            kategoria: item?.category?.name,
            mnozstvo: item.quantity,
            datum_spotreby: item.expiration_date ?? undefined,
          };
        })
        .filter((item) => item.mnozstvo > 0);
      setTasks(z.array(itemSchema).parse(newData));
    }
  }, [setTasks]);

  useEffect(() => {
    getIngredients();
    // NOTE: this should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyToClipboard() {
    const newTasks = tasks.map((item) => {
      const { id: _, ...rest } = item;
      return rest;
    });

    const text = JSON.stringify(newTasks, null, 2);
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="p-5">
      <h1>Export data</h1>
      <div className="h-96 overflow-auto">
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
      <Button
        className="mt-5"
        variant="outline"
        onClick={() => {
          copyToClipboard();
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 500);
        }}
      >
        {isCopied ? "Copied to clipboard" : "Copy to clipboard"}
      </Button>
    </div>
  );
}
