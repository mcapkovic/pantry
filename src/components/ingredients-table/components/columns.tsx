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
    id:'category',
    accessorKey: "category.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategoria" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.original.category?.name}</div>,
    // enableSorting: false,
    // enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id : 'storageLocation',
    accessorKey: "storageLocation.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miesto" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.original.storageLocation?.name}</div>,
    // enableSorting: false,
    // enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },


]
