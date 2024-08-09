'use client'

import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import getLastPurchase from '@/app/actions/getPurchaseHistory';
import { useConfig } from '@/hooks/use-config';
import { themes } from '@/themes';
import { useTheme } from 'next-themes';

import { Line, LineChart,  XAxis, YAxis, CartesianGrid } from 'recharts';

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

type SimplePurchase = {
    date: string;
    resting: number;
    label: string;
}

interface ProductPurchasesProps {
    ean: string;
}
export function ProductPurchases({ ean }: ProductPurchasesProps) {

    const { theme: mode } = useTheme()
    const [config] = useConfig()
    const theme = themes.find((theme) => theme.name === config.theme)

    const [data, setData] = useState<SimplePurchase[]>([]);    
    const [u_costo, setU_costo] = useState<number>(0);
    const [variability, setVariability] = useState<number>(0);

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            const action = await getLastPurchase(ean);
            if (action.type === 'GET_LAST_PURCHASE_SUCCESS' && Array.isArray(action.payload)) {
                setData(action.payload.map((purchase) => ({
                    date: purchase.fecha,
                    resting: purchase.costo,
                    label: purchase.nombre,
                })));
                // as we have data, calculate variability and last cost
                setU_costo(action.payload[0].costo);

                // calculate variability of the cost, from the average, compare to the last cost, and calculate the percentage
                const average = action.payload.reduce((acc, curr) => acc + curr.costo, 0) / action.payload.length;
                const lastCost = action.payload[0].costo;
                const variability = Math.abs(average - lastCost) / average * 100;
                setVariability(variability);

            } else {
                console.error(action.payload);
            }
        };
        fetchPurchaseHistory();
    }, [ean]);

    return (
        <Card
            // className="flex flex-col lg:max-w-lg" 
            className="max-w-md" 
            x-chunk="charts-01-chunk-1"
        >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                <div>
                    <CardDescription><span className='text-xs text-muted-foreground'>Último Costo</span></CardDescription>
                    <CardTitle className="flex items-baseline gap-1 text-3xl font-bold leading-none sm:text-3xl">
                        ${u_costo}
                        <span className="text-xs font-normal tracking-normal text-muted-foreground">
                            pesos
                        </span>
                    </CardTitle>
                </div>
                <div>
                    <CardDescription><span className='text-xs text-muted-foreground'>Variabilidad</span></CardDescription>
                    <CardTitle className="flex items-baseline gap-1 text-3xl font-bold leading-none sm:text-3xls">
                        {variability.toFixed(2)}%
                        <span className="text-sm font-normal tracking-normal text-muted-foreground">
                            {/* ms */}
                        </span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 items-center">
                <ChartContainer
                    config={{
                        resting: {
                            label: "costo",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="w-full"
                >
                    <LineChart
                        accessibilityLayer
                        margin={{
                            left: 14,
                            right: 14,
                            top: 10,
                        }}
                        data = {[...data].reverse()}
                    >
                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                            stroke="hsl(var(--muted-foreground))"
                            strokeOpacity={0.5}
                        />
                        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                return new Date(value).toLocaleDateString("es-MX", {
                                    // weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                })
                            }}
                        />
                        <Line
                            dataKey="resting"
                            type="natural"
                            fill="var(--color-resting)"
                            stroke="var(--color-resting)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                fill: "var(--color-resting)",
                                stroke: "var(--color-resting)",
                                r: 4,
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("es-MX", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                            cursor={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}