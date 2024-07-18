'use client'

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import getLastPurchase from '@/app/actions/getPurchaseHistory';
import { PurchaseHistory } from '@/app/models/PurchaseHistory';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConfig } from '@/hooks/use-config';
import { themes } from '@/themes';
import { useTheme } from 'next-themes';

import { Line, LineChart, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ProductRecentPurchasesProps {
  ean: string;
}
export function ProductRecentPurchases({ ean }: ProductRecentPurchasesProps) {

  const { theme: mode } = useTheme()
  const [config] = useConfig()
  const theme = themes.find((theme) => theme.name === config.theme)

  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const action = await getLastPurchase(ean);
      if (action.type === 'GET_LAST_PURCHASE_SUCCESS' && Array.isArray(action.payload)) {
        setPurchaseHistory(action.payload);
      } else {
        console.error(action.payload);
      }
    };

    fetchPurchaseHistory();
  }, [ean]);


  return (

    <Card className="flex flex-col">
      <CardHeader className="items-left pb-0">
        <CardTitle>
          Compras Recientes
        </CardTitle>
        <CardDescription>
          <span className="text-[0.70rem]">
            Costo de las adquisiciones más recientes
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent >
        {/* 
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[...purchaseHistory].reverse()}
              margin={{
                top: 0,
                right: 10,
                left: -50,
                bottom: 0,
              }}
            >

              <XAxis
                dataKey="fecha"
                stroke="#888888"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  // Assuming the date is in YYYY-MM-DD format
                  const date = new Date(value);
                  return date.toLocaleDateString('es-MX', {
                    month: 'short', // "Jun"
                    year: '2-digit' // "21"
                  });
                }}
              />
              <YAxis
                // stroke="#888888"
                tick={false}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 100', 'dataMax + 100']}
              // orientation="left"
              // fontSize={6}
              // tickLine={false}
              // axisLine={false}
              // tick={false}
              // tickFormatter={(value) => `$${value}`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {

                    const formattedFecha = new Date(payload[0].payload.fecha).toLocaleDateString('es-MX', {
                      month: 'short', // "Jun"
                      year: '2-digit' // "21"
                    });

                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] text-muted-foreground">
                              Fecha
                            </span>
                            <span className="font-bold">
                              {formattedFecha}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] text-muted-foreground">
                              Costo
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }) ?? 'N/A'}
                            </span>
                          </div>

                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="costo"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                      })`,
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}

        <ChartContainer 
          config={chartConfig}
          className="mx-auto max-h-[150px]"
          >
          <LineChart
            accessibilityLayer
            data={[...purchaseHistory].reverse()}
            margin={{
              top: 0,
              right: 10,
              left: -50,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="fecha"
              tickMargin={8}
              fontSize={9}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('es-MX', {
                  month: 'short', // "Jun"
                  year: '2-digit' // "21"
                });
              }}
            />

            <YAxis
              tick={false}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 100', 'dataMax + 100']}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="costo"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>

        <ScrollArea className="h-36 mt-10">
          <div className="w-full max-w-2xl mx-auto ">
            <div className="grid gap-4 text-xs">
              {purchaseHistory.map((purchase) => (
                <div className="grid grid-cols-[1fr_auto] items-center gap-2 text-[0.70rem]" key={purchase.folio}>
                  <div className="grid gap-1">
                    <h3 className="font-bold ">{purchase.nombre}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{purchase.folio}</p>
                    {/* <p className="text-gray-500 dark:text-gray-400">{new Date(purchase.fecha).toLocaleDateString()}</p> */}
                  </div>
                  <div className="grid gap-1 text-right">
                    <p className="font-bold">${purchase.costo.toFixed(2)}</p>
                    <p className="text-gray-500 dark:text-gray-400">{new Date(purchase.fecha).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
        </ScrollArea>

        {/* <div className="space-y-5">
      {purchaseHistory.map((purchase) => (
        <div className="flex items-center" key={purchase.folio}>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{purchase.nombre}</p>
            <p className="text-sm text-muted-foreground">
            {new Date(purchase.fecha).toLocaleDateString()}
            </p>
          </div>
          <div className="ml-auto font-medium">+${purchase.costo.toFixed(2)}</div>
        </div>
      ))}
    </div> */}
        {/* <div className="space-y-5">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
              <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
              <p className="text-sm text-muted-foreground">
                isabella.nguyen@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$299.00</div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}