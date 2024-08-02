'use client'

import getProductCluster from "@/app/actions/getProductCluster";
import { ProductCluster } from "@/app/models/ProductCluster";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Label, LabelList, Rectangle, ReferenceLine, XAxis, YAxis } from "recharts";


type ProductDistributionSalesProps = {
    ean: string;
}

export function ProductDistributionSales({ ean }: ProductDistributionSalesProps) {

    const [productData, setProductData] = useState<ProductCluster[]>([])
    const [totalCustomer, setTotalCustomer] = useState<number>(0);
    const [totalCustomerxCluster, setTotalCustomerxCluster] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const action = await getProductCluster(ean);
            if (action.type === 'GET_PRODUCT_CLUSTER_SUCCESS' && Array.isArray(action.payload)) {
                setProductData(action.payload);

                // count the total product_clients per cluster
                const total = action.payload.reduce((acc, cluster) => acc + cluster.product_clients, 0);
                setTotalCustomer(total);

                // count the total category_clients per cluster
                const totalxCluster = action.payload.reduce((acc, cluster) => acc + cluster.category_clients, 0);
                setTotalCustomerxCluster(totalxCluster);
            }
        };
        fetchData();
    }, [ean]);

    console.log(productData);

    return (

        <Card
            className="lg:max-w-md" x-chunk="charts-01-chunk-0"
        >

            <CardHeader className="space-y-0 pb-2">
                {/* <CardDescription>Today</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                    12,584{" "}
                    <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                        steps
                    </span>
                </CardTitle> */}
            </CardHeader>
            <CardContent>

                <ChartContainer
                    config={{
                        steps: {
                            label: "Steps",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                >
                    <BarChart
                        accessibilityLayer
                        margin={{
                            left: -4,
                            right: -4,
                        }}
                        data={productData}
                    // data={[
                    //     {
                    //         date: "2024-01-01",
                    //         steps: 2000,
                    //     },
                    //     {
                    //         date: "2024-01-02",
                    //         steps: 2100,
                    //     },
                    //     {
                    //         date: "2024-01-03",
                    //         steps: 2200,
                    //     },
                    //     {
                    //         date: "2024-01-04",
                    //         steps: 1300,
                    //     },
                    //     {
                    //         date: "2024-01-05",
                    //         steps: 1400,
                    //     },
                    //     {
                    //         date: "2024-01-06",
                    //         steps: 2500,
                    //     },
                    //     {
                    //         date: "2024-01-07",
                    //         steps: 1600,
                    //     },
                    // ]}
                    >
                        {/* <CartesianGrid vertical={false} /> */}
                        <Bar
                            dataKey="quantity_fy"
                            fill="var(--color-steps)"
                            radius={5}
                            fillOpacity={0.6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                        >
                            <LabelList
                                position="insideBottom"
                                dataKey="quantity_fy"
                                fill="white"
                                //offset={8}
                                fontSize={10}
                            />
                        </Bar>


                        <XAxis
                            dataKey="cluster"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                        // tickFormatter={(value) => {
                        //     return new Date(value).toLocaleDateString("en-US", {
                        //         weekday: "short",
                        //     })
                        // }}
                        />
                        <ChartTooltip
                            //defaultIndex={0}
                            content={
                                <ChartTooltipContent
                                    hideIndicator={true}
                                    // labelFormatter={(value) => {
                                    //     // return new Date(value).toLocaleDateString("en-US", {
                                    //     //     day: "numeric",
                                    //     //     month: "long",
                                    //     //     year: "numeric",
                                    //     // })
                                    // }}

                                    // code: string,
                                    // quantity_fy: number,
                                    // product_clients: number,
                                    // category: string,
                                    // category_clients: number,
                                    // cluster: string,
                                    // cluster_clients: number,
                                    formatter={(value, name, item, index) => (
                                        <div className="min-w-[120px] ml-auto ">
                                            {/* <div className="text-xs font-semibold mb-2">

                                            {item.payload.cluster} 

                                        </div>  */}
                                            <div className="mb-1 ">
                                                <span className="text-xs font-medium">Clientes Producto </span>
                                                <span className="text-[0.70rem] text-muted-foreground">{item.payload.product_clients}</span>
                                            </div>
                                            <div className="mb-1 ">
                                                <span className="text-xs font-medium">Clientes Categoria </span>
                                                <span className="text-[0.70rem] text-muted-foreground">{item.payload.category_clients}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="text-xs font-medium">Clientes Clientes </span>
                                                <span className="text-[0.70rem] text-muted-foreground">{item.payload.cluster_clients}</span>
                                            </div> 
                                        </div>


                                    )}
                                />
                            }
                            cursor={false}
                        />
                        {/* <ReferenceLine
                            y={1200}
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="3 3"
                            strokeWidth={1}
                        >
                            <Label
                                position="insideBottomLeft"
                                value="Average Steps"
                                offset={10}
                                fill="hsl(var(--foreground))"
                            />
                            <Label
                                position="insideTopLeft"
                                value="12,343"
                                className="text-lg"
                                fill="hsl(var(--foreground))"
                                offset={10}
                                startOffset={100}
                            />
                        </ReferenceLine> */}
                    </BarChart>
                </ChartContainer>

            </CardContent>
            <CardFooter className="flex flex-row border-t p-4">
                <div className="flex w-full items-center gap-2">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Clientes</div>
                        <div className="flex items-baseline gap-1 text-2xl font-bold leading-none">
                            {totalCustomer}
                            <span className="text-[0.7rem] font-normal text-muted-foreground">
                                / {totalCustomerxCluster} cat
                            </span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Desempeño</div>
                        <div className="flex items-baseline gap-1 text-2xl font-bold leading-none">

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
