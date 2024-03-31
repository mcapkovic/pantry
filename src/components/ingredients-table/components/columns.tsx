"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategoria" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("category")}</div>,
    // enableSorting: false,
    // enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "storageLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miesto" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("storageLocation")}</div>,
    // enableSorting: false,
    // enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },


]
