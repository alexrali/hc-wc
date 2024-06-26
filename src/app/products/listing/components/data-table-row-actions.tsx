"use client"

import { DotsHorizontalIcon, ReaderIcon, CardStackIcon, StackIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "../data/data"
import { listingSchema, taskSchema } from "../data/schema"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCardsMetric } from "./product-detail-metric"
import { ProductCardsActivityGoal } from "./product-detail-goal"
import { ProductCardsStats } from "./product-detail-stats"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductRecentPurchases } from "./product-detail-recent-purchases"

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
            {/* <div >
              <span>{task.descripcion} - {task.presentacion} </span>
            </div>
            <div>
              <span className="text-xs font-normal leading-snug text-muted-foreground">{task.clave}</span>
            </div> */}
            {/* <span className="text-xs font-normal leading-snug text-muted-foreground"> {task.clave} - {task.priority}</span> */}
          </SheetTitle>
          <SheetDescription>
            {/* <div>
              <span className="text-xs font-normal leading-snug text-muted-foreground">
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </span>
            </div> */}
            {/* <div className="grid grid-cols-6 gap-4">
              <div className="col-span-4">
                <ProductCardsStats />
              </div>
              <div className="col-span-2">
                <ProductCardsActivityGoal />
              </div>
              <div className="col-span-4">
                <ProductCardsMetric />
              </div>
            </div> */}

            {/* <Card className="max-w-7xl mx-auto py-4 px-10 sm:px-6 lg:px-8 ">
              <CardTitle>Move Goal</CardTitle>
              <CardDescription></CardDescription>
              <CardContent>

                <div className="grid grid-cols-7 gap-3">
                  <div className="col-span-3">
                    <ProductCardsStats />
                  </div>
                  <div className="col-span-4">
                    <ProductCardsMetric />
                  </div>
                </div>

              </CardContent>

            </Card> */}
            {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-7 gap-3">
                <div className="col-span-3">
                  <ProductCardsStats />
                </div>
                <div className="col-span-4">
                  <ProductCardsMetric />
                </div>
              </div>
            </div> */}

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[78rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4 pb-3 ">

                  <div>
                    <span className="group flex items-center gap-2 text-lg font-extrabold">
                      {task.descripcion}
                    </span>
                  </div>
                  {/* <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-bold tracking-tight sm:grow-0">
                  
                  </h1> */}
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    {task.presentacion}
                  </Badge>
                  {/* <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                  </div> */}
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                    <ProductCardsStats ean={task.clave} />

                    {/* <Card x-chunk="dashboard-07-chunk-1">
                      <CardHeader>
                        <CardTitle>Stock</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                      </CardContent>
                      <CardFooter className="justify-center border-t p-4">
                        <Button size="sm" variant="ghost" className="gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Variant
                        </Button>
                      </CardFooter>
                    </Card> */}

                    <ProductCardsMetric ean={task.clave} />
                    {/* <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Product Category</CardTitle>
                      </CardHeader>
                      <CardContent>

                      </CardContent>
                    </Card> */}
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    {/* <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Product Status</CardTitle>
                      </CardHeader>
                      <CardContent>

                      </CardContent>
                    </Card> */}



                    <ProductRecentPurchases ean={task.clave} />

                    {/* <Card
                      className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>

                      </CardContent>
                    </Card> */}
                    <ProductCardsActivityGoal ean={task.clave}/> 

                    {/* <Card x-chunk="dashboard-07-chunk-5">
                      <CardHeader>
                        <CardTitle>Archive Product</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>

                      </CardContent>
                    </Card> */}
                  </div>
                </div>
                {/* <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Product</Button>
                </div> */}
              </div>
            </main>


          </SheetDescription>
        </SheetHeader>



      </SheetContent>
    </Sheet>

    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="ghost"
    //       className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
    //     >
    //       <DotsHorizontalIcon className="h-4 w-4" />
    //       <span className="sr-only">Abrir menu</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="w-[160px]">
    //     <DropdownMenuItem>Editar</DropdownMenuItem>
    //     <DropdownMenuItem></DropdownMenuItem>
    //     <DropdownMenuItem>Seguimiento</DropdownMenuItem>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuSub>
    //       <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
    //       <DropdownMenuSubContent>
    //         <DropdownMenuRadioGroup value={task.descripcion}>
    //           {labels.map((label) => (
    //             <DropdownMenuRadioItem key={label.value} value={label.value}>
    //               {label.label}
    //             </DropdownMenuRadioItem>
    //           ))}
    //         </DropdownMenuRadioGroup>
    //       </DropdownMenuSubContent>
    //     </DropdownMenuSub>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>
    //       Descatalogar
    //       <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}

