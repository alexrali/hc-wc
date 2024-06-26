'use client'

import React, { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { useConfig } from "@/hooks/use-config"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { themes } from "@/themes"
import { StockValue } from "@/app/models/StockValue"
import getStockValue from "@/app/actions/getStockValue"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

interface ProductCardsActivityGoalProps {
  ean: string;
}

export function ProductCardsActivityGoal({ ean }: ProductCardsActivityGoalProps) {
  const { theme: mode } = useTheme()
  const [config] = useConfig()

  const theme = themes.find((theme) => theme.name === config.theme)
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  const [StockValue, setStockValue] = useState<StockValue[]>([]);

  useEffect(() => {
    const fetchStockValue = async () => {
      const action = await getStockValue(ean);
      if (action.type === 'GET_STOCK_VALUE_SUCCESS' && Array.isArray(action.payload)) {
        // Assuming the payload directly contains the StockValue object or value you need
        setStockValue(action.payload);
      } else {
        console.error(action.payload);
      }
    };

    fetchStockValue();
  }, [ean]);


  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Existencias</CardTitle>
        {/* <CardDescription>Set your daily activity goal.</CardDescription> */}
      </CardHeader>
      <CardContent className="pb-2">

        <div className="h-[105px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              // data={[...StockValue].reverse()}
              data={StockValue}
              margin={{
                top: 0,
                right: 10,
                left: -50,
                bottom: 0,
              }}
            >

              <XAxis
                dataKey="stockDate"
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
              // domain={['dataMin - 100', 'dataMax + 100']}
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

                    const formattedFecha = new Date(payload[0].payload.stockDate).toLocaleDateString('es-MX', {
                      day: '2-digit', // "01"
                      month: 'short', // "Jun"
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
                            Existencia
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].payload.stockValue}
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
                strokeWidth={2}
                dataKey="stockValue"

                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    opacity: 0.25,
                    "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                      })`,
                  } as React.CSSProperties
                }
              />
              {/* <Line
                type="monotone"
                dataKey="stockValue"
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
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-10)}
            disabled={goal <= 200}
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-5xl font-bold tracking-tighter">{goal}</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              Calories/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(10)}
            disabled={goal >= 400}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div> */}

        {/* <div className="my-3 h-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="goal"
                style={
                  {
                    fill: "var(--theme-primary)",
                    opacity: 0.2,
                    "--theme-primary": `hsl(${
                      theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

      </CardContent>
      <CardFooter>
        {/* <Button className="w-full">Set Goal</Button> */}
      </CardFooter>
    </Card>
  )
}