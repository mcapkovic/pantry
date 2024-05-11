"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Row } from "@tanstack/react-table";

import { labels, priorities, statuses } from "../data/data";
import { Item } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    id: "category",
    accessorKey: "category.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategoria" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.original.category?.name}</div>
    ),
    // enableSorting: false,
    // enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "storageLocation",
    accessorKey: "storageLocation.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miesto" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.original.storageLocation?.name}</div>
    ),
    // enableSorting: false,
    // enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export type TableRowType = Row<Item>;

interface IGetColumns {
  onEdit?: (row: TableRowType) => void;
  onDelete?: (row: TableRowType) => void;
}

export function getColumns({
  onEdit,
  onDelete,
}: IGetColumns): ColumnDef<Item>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Názov" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")} </div>,
      // enableSorting: false,
      // enableHiding: false,
    },

    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="No." />
      ),
      cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    },
    {
      id: "category",
      accessorKey: "category.id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kategória" />
      ),
      cell: ({ row }) => <div>{row.original.category?.name}</div>,

      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "storageLocation",
      accessorKey: "storageLocation.id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Miesto" />
      ),
      cell: ({ row }) => <div>{row.original.storageLocation?.name}</div>,

      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];
}
