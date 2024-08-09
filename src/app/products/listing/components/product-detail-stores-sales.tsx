'use client'

import getBusinessUnitSummaries from "@/app/actions/getBusinessUnitSummary";
import { BusinessUnitSummary } from "@/app/models/BusinessUnitSummary";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Bar, BarChart, LabelList, Rectangle, XAxis, YAxis } from "recharts";


type SimpleStoreSales = {
    activity: string,
    value: number,
    label: string,
    actual: number,
    previous: number,
    difference: number,
    fill: string,
}

type ProductStoresSalesProps = {
    ean: string;
}

export function ProductStoresSales({ ean }: ProductStoresSalesProps) {

    const [data, setStoresSales] = useState<SimpleStoreSales[]>([])

    const [uniqueStores, setUniqueStores] = useState<number>(0);
    const [performance, setPerformance] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const action = await getBusinessUnitSummaries(ean);
            if (action.type === 'GET_BUSINESS_UNIT_SUMMARIES_SUCCESS' && Array.isArray(action.payload)) {

                setStoresSales(action.payload.map((store) => ({
                    activity: store.businessUnit,
                    value: store.totalQuantityCurrent,
                    label: store.totalQuantityCurrent.toString(),
                    actual: store.totalQuantityCurrent,
                    previous: store.totalQuantityPrevious,
                    difference: store.percentageDifference,
                    // store.totalQuantityCurrent.toString() + " / " + store.totalQuantityPrevious.toString() + " " + store.percentageDifference.toString() + "%",
                    // fill: "var(--color-${store.businessUnit})",

                    fill: store.percentageDifference < 0 ? "hsl(0 90.6% 70.8%)" : "hsl(var(--chart-2))"
                })));

                // Count unique businessUnits
                const uniqueBusinessUnits = new Set(action.payload.map(store => store.businessUnit));
                setUniqueStores(uniqueBusinessUnits.size);

                // Calculate performance, sum totalQuantityCurrent sCY, sum totalQuantityPrevious sPY, ytd = (sCY - sPY) / sPY
                const sCY = action.payload.reduce((acc, store) => acc + store.totalQuantityCurrent, 0);
                const sPY = action.payload.reduce((acc, store) => acc + store.totalQuantityPrevious, 0);
                const performance = ((sCY - sPY) / sPY) * 100;
                setPerformance(performance);

            } else {
                console.error(action.payload); // Handle failure
            }
        };

        fetchData();
    }, [ean]); // Dependency array, re-run the effect if `ean` changes

    return (
        <Card
            className="max-w-md" x-chunk="charts-01-chunk-4"
        >
            <CardContent className="flex gap-4 p-4 pb-2">
                <ChartContainer
                    config={{
                        // '003': {
                        //     label: "Quinientos",
                        //     color: "hsl(var(--chart-1))",
                        // },
                        // stand: {
                        //     label: "Stand",
                        //     color: "hsl(var(--chart-2))",
                        // },
                        // exercise: {
                        //     label: "Exercise",
                        //     color: "hsl(var(--chart-3))",
                        // },
                    }}
                    className="h-[200px] w-full"
                >
                    <BarChart
                        margin={{
                            left: -15,
                            right: 10,
                            top: 20,
                            bottom: 25,
                        }}
                        data={data}

                        layout="vertical"
                        barSize={32}
                        barGap={2}

                    >
                        <XAxis type="number" dataKey="value" hide />
                        <YAxis
                            dataKey="activity"
                            type="category"
                            tickLine={false}
                            tickMargin={4}
                            axisLine={false}
                            className="capitalize"
                            tick={{ fontSize: 8 }}
                            scale="point" // Ensures that the scale is set to 'point' for categorical data
                            interval={0}
                        />
                        <Bar dataKey="value" radius={5}>
                            <LabelList
                                position="insideLeft"
                                dataKey="label"
                                fill="white"
                                offset={8}
                                fontSize={10}
                            />
                        </Bar>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    // className="w-[120px]"
                                    formatter={(value, name, item, index) => (
                                        <div className="min-w-[120px] ml-auto ">
                                            <div className="text-xs font-semibold mb-2">

                                                {item.payload.activity} 
                                                <Badge variant={item.payload.difference < 0 ? "destructive" : "outline"}> {item.payload.difference}% </Badge>

                                            </div> {/* Title */}
                                            <div className="mb-1 ">
                                                <span className="text-xs font-medium">Actual </span>
                                                <span className="text-[0.70rem] text-muted-foreground">{item.payload.actual}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="text-xs font-medium">Previo </span>
                                                <span className="text-[0.70rem] text-muted-foreground">{item.payload.previous}</span>
                                            </div>
                                        </div>
                                    )}
                                />
                            }
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-row border-t p-4">
                <div className="flex w-full items-center gap-2">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Prescencia</div>
                        <div className="flex items-baseline gap-1 text-2xl font-bold leading-none">
                            {uniqueStores}
                            <span className="text-xs font-normal text-muted-foreground">
                                sucursales
                            </span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Desempeño</div>
                        <div className="flex items-baseline gap-1 text-2xl font-bold leading-none">
                            {performance.toFixed(1)}
                            <span className="text-xs font-normal text-muted-foreground">
                                %
                            </span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Stand</div>
                        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                            14
                            <span className="text-sm font-normal text-muted-foreground">
                                hr
                            </span>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}