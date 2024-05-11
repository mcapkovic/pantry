"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { OptionItem } from "@/components/ingredients-table/data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  foodOptions: OptionItem[];
  locationOptions: OptionItem[];
}

export function DataTableToolbar<TData>({
  table,
  foodOptions,
  locationOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="overflow-x-auto p-2 -m-2"> 
      <div className="flex flex-1 items-center space-x-2 ">
        <Input
          placeholder="Nazov..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Kategoria"
            options={foodOptions}
          />
        )}
        {table.getColumn("storageLocation") && (
          <DataTableFacetedFilter
            column={table.getColumn("storageLocation")}
            title="Miesto"
            options={locationOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <div className="flex justify-end flex-grow">
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
