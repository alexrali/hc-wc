"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Key } from "lucide-react"
import { ProductDrain } from "@/app/models/ProductDrain"
import getProductDrain from "@/app/actions/getProductDrain"
import { useTheme } from "next-themes"
import { useConfig } from "@/hooks/use-config"
import { themes } from "@/themes"

interface ChartDataEntry {
  month: string;
  distribucion: number;
  sucursales: number;
  distribucion_ly: number;
  sucursales_ly: number;
}

type TotalType = {
  distribucion: number;
  sucursales: number;
  views?: number; // Add this if `views` is a valid property
  // Add any other properties that might be accessed
};



// const chartData: ChartDataEntry[] = [

//   { month: "2024-01", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-02", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-03", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-04", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-05", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-06", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-07", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-08", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-09", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-10", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-11", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 },
//   { month: "2024-12", distribucion: 8374, sucursales: 6520, distribucion_ly: 1234, sucursales_ly: 5678 }

// ]

const chartConfig = {
  views: {
    label: "U.V",
  },
  distribucion: {
    label: "Distribucion",
    color: "hsl(var(--chart-1))",
  },
  sucursales: {
    label: "Sucursales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


interface ProductSalesProps {
  ean: string;
}

export function ProductSales({ ean }: ProductSalesProps) {

  const { theme: mode } = useTheme()
  const [config] = useConfig()

  const theme = themes.find((theme) => theme.name === config.theme)

  const [chartData, setProductData] = React.useState<ChartDataEntry[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await getProductDrain(ean);
        if (action.type === 'GET_PRODUCT_DRAIN_SUCCESS' && action.payload) {
          if (typeof action.payload === 'string') {
            console.error('Payload should not be a string');
          } else if (Array.isArray(action.payload)) {
            // Correctly map ProductDrain to ChartDataEntry format and update state
            const newChartData = action.payload.map(item => ({
              month: item.MonthName,
              distribucion: item.D_CY,
              sucursales: item.A_CY,
              distribucion_ly: item.D_LY,
              sucursales_ly: item.A_LY,
            }));
            
            setProductData(newChartData);
            console.log('newChartData', newChartData);
          }
        } else {
          console.error('Failed to fetch product drain');
        }
      } catch (error) {
        console.error('Error fetching product drain:', error);
      }
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ean]);

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("distribucion")

  const total = React.useMemo(
    () => ({
      distribucion: chartData.reduce((acc, curr) => acc + curr.distribucion, 0),
      sucursales: chartData.reduce((acc, curr) => acc + curr.sucursales, 0),
    }),
    [chartData]
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Registro de Ventas</CardTitle>
          <CardDescription>
            Mostrando informacion anual
          </CardDescription>
        </div>
        {/* <div className="flex">
          {["distribucion", "sucursales"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div> */}
        <div className="flex">
          {["distribucion", "sucursales"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            const lastYearKey = `${chart}_ly` as keyof typeof total; // Determine the key for last year's data
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
                {/* <span className="text-sm leading-none sm:text-xl">
                  Last Year: {total[lastYearKey].toLocaleString()} 
                </span> */}
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={8} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} className="text-[0.70rem]"/>

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                />
              }
            />

            <Bar dataKey={`${activeChart}_ly`} 
            style={
                {
                  fill: "var(--theme-primary)",
                  opacity: 0.1,
                  "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                } as React.CSSProperties
              }/>
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />

          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
