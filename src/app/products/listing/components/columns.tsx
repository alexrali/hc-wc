"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses, compradores } from "../data/data"
import { Task } from "../data/schema"
import { Listing } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Listing>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clave",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clave" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[80px] text-xs">{row.getValue("clave")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "descripcion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          <span className="max-w-[400px] truncate font-bold">
            {row.getValue("descripcion")}
          </span>

          {label && <Badge variant="outline">{label.label}</Badge>}

        </div>
      )
    },
  },
  {
    accessorKey: "presentacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Presentacion" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("presentacion")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ultima_venta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="U. Venta" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[85px]">{row.getValue("ultima_venta")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ultima_compra",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="U. Compra" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[85px]">{row.getValue("ultima_compra")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "existencia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EX" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[30px] font-bold">{row.getValue("existencia")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="font-bold text-xs">{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex w-[70px] items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="font-bold text-xs">{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "ultimo_costo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UC" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.getValue("ultimo_costo"))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "costo_promedio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CP" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.getValue("costo_promedio"))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "P3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="P3" className="text-xs" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.getValue("P3"))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "comprador",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="C" className="text-xs" />
    ),
    
    cell: ({ row }) => {
      const comprador = compradores.find(
        (comprador) => comprador.value === row.getValue("comprador")
      )

      if (!comprador) {
        return null
      }

      return (
        <div className="flex w-[10px] items-center">
          <span className="font-bold text-xs">{comprador.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },

    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
