'use client'

// import addDays from "date-fns/addDays"
// import addHours from "date-fns/addHours"

import { addHours, addDays, nextSaturday } from 'date-fns';

// import format from "date-fns/format"
import { format } from 'date-fns';

// import nextSaturday from "date-fns/nextSaturday"
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, LabelList, Line, LineChart, Rectangle, ReferenceLine, XAxis, YAxis } from "recharts"


import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components//ui/chart"


import { Mail } from "@/app//products/mail/data"
import { ProductCardsStats } from '../../listing/components/product-detail-stats';
import { ProductCardsMetric } from '../../listing/components/product-detail-metric';
import { ProductRecentPurchases } from '../../listing/components/product-detail-recent-purchases';
import { ProductCardsActivityGoal } from '../../listing/components/product-detail-goal';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ProductCardChannelBalance } from '../../listing/components/product-detail-channel-balance';
import { ProductSales } from '../../listing/components/product-detail-sales';
import { ProductCardsStockHistory } from '../../listing/components/product-detail-stock-history';
import { ProductPurchases } from '../../listing/components/product-detail-purchases';
import { ProductInventoryStatus } from '../../listing/components/product-detail-inventory-status';
import { ProductBalance } from '../../listing/components/product-detail-balance';
import getProductDetail from '@/app/actions/getProductCommercialDetail';
import { useEffect, useState } from 'react';
import { ProductCommercialDetail } from '@/app/models/ProductCommercialDetail';
import { ProductDetailPerformance } from '../../listing/components/product-detail-performance';
import { ProductDetailDoh } from '../../listing/components/product-detail-doh';
import { ProductStoresSales } from '../../listing/components/product-detail-stores-sales';
import { ProductDistributionSales } from '../../listing/components/product-detail-distribution-sales';

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const today = new Date()
  const [productDetail, setProductDetail] = useState<ProductCommercialDetail | null>(null);

  useEffect(() => {
    if (mail && mail.id) { // Ensure mail and mail.id are not null or undefined
      getProductDetail(mail.id).then((action) => {
        if (action.type === 'GET_PRODUCT_DETAIL_SUCCESS') {
          if (typeof action.payload === 'object' && action.payload !== null) {
            setProductDetail(action.payload);
            // console.log('ProductCommercialDetail:', action.payload);
          } else {
            console.error('Payload is not a ProductCommercialDetail:', action.payload);
            setProductDetail(null);
          }
        }
      });
    }
  }, [mail, mail?.id]); // Re-fetch if mail.id changes

  return (
    <div className="flex h-full flex-col">

      <div className="flex items-center p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Seguimiento</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Seguimiento</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">In and Out</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>In and Out</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Baja de Catalogo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Baja de Catalogo</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!mail}>
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Pausar Compra</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Pausar hasta</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Mas tarde{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Proximo año
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Proximo Mes
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Proximo Semestre
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Pausar</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!mail}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Enviar a sugerido</DropdownMenuItem>
            <DropdownMenuItem>Enviar a cotización</DropdownMenuItem>
            <DropdownMenuItem>Añadir etiqueta</DropdownMenuItem>
            <DropdownMenuItem>Promover</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />

      {mail ? (


        <div className="flex flex-1 flex-col">

          <div className="flex items-start p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

            <div className="flex items-start gap-4 text-sm">
              {/* <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar> */}
              <div className="grid gap-1 pl-6">
                <div className="font-semibold">{mail.name}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Inventario:</span> {mail.email}

                </div>
              </div>
            </div>
            {mail.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.date), "PPpp")}
              </div>
            )}
          </div>
          <Separator />

          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <div className="grid gap-1">
                </div>
              </div>

            </div>
            <Separator />

            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
              <ScrollArea className="flex flex-col h-[900px] overflow-auto">
                <main className="grid flex-1 items-start gap-4 sm:px-2 sm:py-0 md:gap-4">
                  <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                    <div className="grid gap-4 md:grid-cols-12 lg:grid-cols-12">
                      {/* Component 1: CategoryShare spans 4 columns and 2 rows */}
                      <div className="md:col-span-6 lg:col-span-6 md:row-span-2 lg:row-span-2">
                        <ProductSales ean={mail.id} />
                      </div>
                      {/* Component 2: CategoryTarget on the first row next to CategoryShare, spanning 2 columns */}
                      <div className="md:col-span-3 lg:col-span-3 md:row-span-1 lg:row-span-1">
                        <ProductDetailPerformance productDetail={productDetail as ProductCommercialDetail} />
                      </div>
                      {/* Component 3: CategoryDescriptor on the first row next to CategoryTarget, spanning 2 columns */}
                      <div className="md:col-span-3 lg:col-span-3 md:row-span-1 lg:row-span-1">
                        <ProductDetailDoh productDetail={productDetail as ProductCommercialDetail} />
                        {/* <ProductDistributionSales ean={mail.id} /> */}
                      </div>
                      {/* Repeat of Component 2: CategoryTarget on the second row below the first instance, spanning 2 columns */}
                      <div className="md:col-span-3 lg:col-span-3 md:row-span-1 lg:row-span-1">
                        <ProductInventoryStatus ean={mail.id} />
                      </div>
                      {/* Repeat of Component 3: CategoryDescriptor on the second row next to the repeated CategoryTarget, spanning 2 columns */}
                      <div className="md:col-span-3 lg:col-span-3 md:row-span-1 lg:row-span-1">
                        <ProductBalance productDetail={productDetail as ProductCommercialDetail} />
                      </div>
                      {/* Component 4: CategoryBalance on the third row, spanning 2 columns */}
                      <div className="md:col-span-2 lg:col-span-2 md:row-span-1 lg:row-span-1">
                        <ProductStoresSales ean={mail.id} />
                      </div>
                      {/* Component 5: CategoryPerformance on the third row next to CategoryBalance, spanning 6 columns */}
                      <div className="md:col-span-6 lg:col-span-6 md:row-span-1 lg:row-span-1">
                        <ProductPurchases ean={mail.id} />
                      </div>
                    </div>
                  </div>
                </main>
              </ScrollArea>
            </div>


            <Separator className="mt-auto" />

          </div>

        </div>


      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Sin selección
        </div>
      )
      }
    </div >
  )
}