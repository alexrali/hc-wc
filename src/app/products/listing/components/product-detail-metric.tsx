'use client'

import { useEffect, useState } from "react";

import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

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

// const data = [
//   { name: "Jan", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Feb", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Mar", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Apr", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "May", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Jun", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Jul", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Aug", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Sep", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Oct", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Nov", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 },

//   { name: "Dec", total_CY: Math.floor(Math.random() * 5000) + 1000, total_2_CY: Math.floor(Math.random() * 5000) + 1000, total_LY: Math.floor(Math.random() * 5000) + 1000, total_2_LY: Math.floor(Math.random() * 5000) + 1000 }
// ];

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
              setProductData(action.payload); // Directly set the array
            } else {
              setProductData([action.payload]); // Wrap the single object in an array
            }
          }
        } else {
          console.error('Failed to fetch product drain');
        }
      } catch (error) {
        console.error('Error fetching product drain:', error);
      }
    };

    fetchData();
  }, [ean]); // Dependency array to re-fetch data if 'ean' changes

  return (

    <Card>
      <CardHeader>
        <CardTitle>Desplazamiento Mensual</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="pb-4">



         <ResponsiveContainer width="100%" height={250}>

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
        </ResponsiveContainer> 

      </CardContent>
    </Card>
  )
}