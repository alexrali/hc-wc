"use client"

import { DotsHorizontalIcon, ReaderIcon, CardStackIcon, StackIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"


import { listingSchema, taskSchema } from "../data/schema"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCardsMetric } from "./product-detail-metric"
import { ProductCardsActivityGoal } from "./product-detail-goal"
import { ProductCardsStats } from "./product-detail-stats"

import { Badge } from "@/components/ui/badge"
import { ProductRecentPurchases } from "./product-detail-recent-purchases"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  //const task = taskSchema.parse(row.original)
  const task = listingSchema.parse(row.original)

  return (

    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>
          </SheetTitle>
          <SheetDescription>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[78rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4 pb-3 ">

                  <div>
                    <span className="group flex items-center gap-2 text-xl tracking-tight font-extrabold">
                      {task.descripcion}
                    </span>
                  </div>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    {task.presentacion}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                    <ProductCardsStats ean={task.clave} />


                    
                    <ProductCardsMetric ean={task.clave} />
                    

                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <ProductRecentPurchases ean={task.clave} />
                    <ProductCardsActivityGoal ean={task.clave} />
                  </div>
                </div>

              </div>
            </main>


          </SheetDescription>
        </SheetHeader>



      </SheetContent>
    </Sheet>

  )
}

