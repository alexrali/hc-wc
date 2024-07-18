'use client'

import { useEffect, useState } from "react";

import { useTheme } from "next-themes"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

import { useConfig } from "@/hooks/use-config"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import { themes } from "@/themes"
import getProductDrain from "@/app/actions/getProductDrain";
import { ProductDrain } from "@/app/models/ProductDrain";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Autoservicio",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Distribución",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


interface ProductCardsMetricProps {
  ean: string;
}
export function ProductCardsMetric({ ean }: ProductCardsMetricProps) {
  const { theme: mode } = useTheme()
  const [config] = useConfig()

  const theme = themes.find((theme) => theme.name === config.theme)

  const [productData, setProductData] = useState<ProductDrain[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await getProductDrain(ean);
        if (action.type === 'GET_PRODUCT_DRAIN_SUCCESS' && action.payload) {
          if (typeof action.payload === 'string') {
            console.error('Payload should not be a string');
          } else {
            if (Array.isArray(action.payload)) {
              setProductData(action.payload);
            } else {
              setProductData([action.payload]);
            }
          }
        } else {
          console.error('Failed to fetch product drain');
        }
      } catch (error) {
        console.error('Error fetching product drain:', error);
      } finally {
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ean]);

  return (

    <Card>
      <CardHeader>
        <CardTitle>Desplazamiento Mensual</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="pb-4">


        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px]"
        >
          <BarChart accessibilityLayer data={productData}>

            <CartesianGrid vertical={false} />
            <XAxis dataKey="MonthName" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} className="text-[0.70rem]"/>
            {/* <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} /> */}

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}

            <Bar
              dataKey="A_LY" stackId="LY"
              style={
                {
                  fill: "var(--theme-primary)",
                  opacity: 0.1,
                  "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                } as React.CSSProperties
              }
            />
            <Bar
              dataKey="D_LY" radius={[4, 4, 0, 0]} stackId="LY"
              style={
                {
                  fill: "var(--theme-primary)",
                  opacity: 0.2,
                  "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                } as React.CSSProperties
              }
            />
            <Bar dataKey="A_CY" fill="#93c5fd" stackId="CY" />
            <Bar dataKey="D_CY" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="CY" />
          </BarChart>
        </ChartContainer>

        {/* <ResponsiveContainer width="100%" height={250}>

          <BarChart data={productData} barGap={4} barSize={40} >
            <XAxis
              dataKey="MonthName"
              stroke="#888888"
              fontSize={9}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={9}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar
              dataKey="A_LY"
              stackId="LY"
              style={
                {
                  fill: "var(--theme-primary)",
                  opacity: 0.1,
                  "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                } as React.CSSProperties
              }
            />
            <Bar
              dataKey="D_LY"
              radius={[4, 4, 0, 0]}
              stackId="LY"
              style={
                {
                  fill: "var(--theme-primary)",
                  opacity: 0.2,
                  "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                } as React.CSSProperties
              }
            />
            <Bar
              dataKey="A_CY"
              fill="#FFCE56" // Blue for CY
              // radius={[4, 4, 0, 0]}
              stackId="CY"
            />
            <Bar
              dataKey="D_CY"
              fill="#36A2EB" // Green for CY
              radius={[4, 4, 0, 0]}
              stackId="CY"
            />

          </BarChart>
        </ResponsiveContainer> */}

      </CardContent>
    </Card>
  )
}