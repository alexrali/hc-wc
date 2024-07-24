
import { ProductCommercialDetail } from "@/app/models/ProductCommercialDetail";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { themes } from "@/themes";
import { Bar, BarChart, Rectangle, XAxis } from "recharts";


type ProductDetailDohProps = {
    productDetail: ProductCommercialDetail;
}

export function ProductDetailDoh( { productDetail }: ProductDetailDohProps ) {

    return (
        <Card className="max-w-xs mt-4" x-chunk="charts-01-chunk-6" >
            <CardHeader className="p-4 pb-0">
                <CardTitle><span className="font-bold tracking-tighter leading-none">Existencia</span></CardTitle>

                <CardDescription>
                    <span className="text-[.70rem] tracking-tighter"> 
                    {productDetail?.doh < 3 ? 'Oportunidad' : productDetail?.doh > 75 ? 'Excedente' : productDetail?.doh > 7 ? 'Abasto suficiente' : 'Atención'}
                     </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
                <div className="flex items-baseline gap-1 text-3xl font-bold leading-none tracking-tighter sm:text-3xl">
                   { productDetail?.doh ?? 0 }
                    <span className="text-[.7rem] font-normal leading-none tracking-tighter text-muted-foreground">
                    {productDetail?.doh === 0 ? 'sin inventario' : 'dias de inventario'}
                    </span>
                </div>
                <ChartContainer
                    config={{
                        calories: {
                            label: "Calories",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="ml-auto w-[64px]"
                >
                    <BarChart
                        accessibilityLayer
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        data={[
                            {
                                date: "2024-01-01",
                                calories: 354,
                            },
                            {
                                date: "2024-01-02",
                                calories: 514,
                            },
                            {
                                date: "2024-01-03",
                                calories: 345,
                            },
                            {
                                date: "2024-01-04",
                                calories: 734,
                            },
                            {
                                date: "2024-01-05",
                                calories: 645,
                            },
                            {
                                date: "2024-01-06",
                                calories: 456,
                            },
                            {
                                date: "2024-01-07",
                                calories: 345,
                            },
                        ]}
                    >
                        <Bar
                            dataKey="calories"
                            fill="var(--color-calories)"
                            radius={2}
                            fillOpacity={0.2}
                            activeIndex={6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            hide
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}