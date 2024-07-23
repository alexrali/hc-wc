'use client'

import React, { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts"

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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { set } from 'lodash';

type SimpleStockValue = {
    date: string;
    time: number;
}

interface ProductInventoryProps {
    ean: string;
}

export function ProductInventoryStatus({ ean }: ProductInventoryProps) {
    const { theme: mode } = useTheme()
    const [config] = useConfig()

    const theme = themes.find((theme) => theme.name === config.theme)
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }

    const [data, setData] = useState<SimpleStockValue[]>([]);
    const [out_of_stock, setOut_of_stock] = useState<number>(0);

    useEffect(() => {
        const fetchStockValue = async () => {
            const action = await getStockValue(ean);
            if (action.type === 'GET_STOCK_VALUE_SUCCESS' && Array.isArray(action.payload)) {

                setData(action.payload.map((stock) => ({
                    date: stock.stockDate,
                    time: stock.stockValue,
                })));

                // out of stock is the count of 0 values in the data
                const out_of_stock = action.payload.reduce((acc, stock) => stock.stockValue === 0 ? acc + 1 : acc, 0);
                setOut_of_stock(out_of_stock);

            } else {
                console.error(action.payload);
            }
        };

        fetchStockValue();
    }, [ean]);


    return (
        <Card
            className="max-w-xs" x-chunk="charts-01-chunk-7"
        >
            <CardHeader className="space-y-0 pb-0">
                <CardDescription><span className='text-xs text-muted-foreground'>Inventario</span></CardDescription>
                <CardTitle className="flex items-baseline gap-1 text-3xl font-bold leading-none sm:text-3xls">
                    {out_of_stock}
                    <span className="font-sans text-xs font-normal tracking-normal text-muted-foreground">
                        dias sin inventario
                    </span>
                    {/* 35
                    <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                        min
                    </span> */}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ChartContainer
                    config={{
                        time: {
                            label: "Existencias",
                            color: "hsl(var(--chart-2))",
                        },
                    }}
                >
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        // {[
                        //     {
                        //         date: "2024-01-01",
                        //         time: 8.5,
                        //     },
                        //     {
                        //         date: "2024-01-02",
                        //         time: 7.2,
                        //     },
                        //     {
                        //         date: "2024-01-03",
                        //         time: 8.1,
                        //     },
                        //     {
                        //         date: "2024-01-04",
                        //         time: 6.2,
                        //     },
                        //     {
                        //         date: "2024-01-05",
                        //         time: 5.2,
                        //     },
                        //     {
                        //         date: "2024-01-06",
                        //         time: 8.1,
                        //     },
                        //     {
                        //         date: "2024-01-07",
                        //         time: 7.0,
                        //     },
                        // ]}
                        margin={{
                            left: -5,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="date" hide />
                        <YAxis domain={["dataMin - 0", "dataMax + 15"]} hide />
                        <defs>
                            <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="20%"
                                    stopColor="var(--color-time)"
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset="85%"
                                    stopColor="var(--color-time)"
                                    stopOpacity={0.09}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="time"
                            type="natural"
                            fill="url(#fillTime)"
                            fillOpacity={0.4}
                            stroke="var(--color-time)"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent 
                                // hideLabel 
                                />
                            }
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("es-MX", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })
                            }}
                            formatter={(value) => (
                                <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                    Existencias
                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                        {value}
                                        <span className="font-normal text-muted-foreground">
                                        </span>
                                    </div>
                                </div>
                            )}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}