
import { ProductCommercialDetail } from "@/app/models/ProductCommercialDetail"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

type ProductDetailPerformanceProps = {
    productDetail: ProductCommercialDetail;
}

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function ProductDetailPerformance({ productDetail }: ProductDetailPerformanceProps) {

    const chartData = [
        {
            period: new Date().getFullYear().toString(),
            value: productDetail?.percent_ytd ?? 0,
        },
        {
            period: new Date().toLocaleString('es-MX', { month: 'long' }),
            value: productDetail?.percent_mtd ?? 0,
        }
    ]

    return (

        <Card
            className="max-w-xs" x-chunk="charts-01-chunk-2"
        >
            <CardHeader className="-mt-1">
                <CardTitle><span className="font-bold tracking-tighter leading-none">Desempeño General</span></CardTitle>
                {/* <CardDescription>
                    <span className="text-[.70rem] tracking-tighter">Diferencia volumen de venta</span>
                </CardDescription> */}
            </CardHeader>

            <CardContent className="grid">
                <div className="flex flex-col gap-2">
                    <div className="flex-1 flex items-baseline gap-1 text-2xl font-bold leading-none sm:text-3xl">
                        {productDetail?.percent_ytd !== undefined && (
                            productDetail.percent_ytd < 0 ?
                                <TrendingDownIcon className="text-red-500" /> :
                                <TrendingUpIcon className="text-green-500" />
                        )}
                        <span className="pl-3 tracking-tighter">
                            {productDetail?.percent_ytd !== undefined ? (productDetail.percent_ytd * 100).toFixed(1) : 0}%
                        </span>
                        <span className="text-[.70rem] font-normal text-muted-foreground">
                            anual
                        </span>
                    </div>
                    {/* <div className="border-b border-gray-200 my-1"></div> Separator with a slight gap */}
                    <div className="flex-1 flex items-baseline gap-1 text-3xl font-bold leading-none sm:text-3xl">
                        {productDetail?.percent_mtd !== undefined && (
                            productDetail.percent_mtd < 0 ?
                                <TrendingDownIcon className="text-red-500" /> :
                                <TrendingUpIcon className="text-green-500" />
                        )}
                        <span className=" pl-3 tracking-tighter">
                            {productDetail?.percent_mtd !== undefined ? (productDetail.percent_mtd * 100).toFixed(1) : 0}%
                        </span>
                        <span className="text-[.70rem] font-normal text-muted-foreground">
                            mensual
                        </span>
                    </div>
                </div>


                {/* <div className="grid auto-rows-min gap-0">
                    <div className="flex items-baseline gap-1 text-2xl font-bold leading-none sm:text-3xl">
                        <span className="tracking-tighter">
                            {productDetail?.percent_ytd !== undefined ? (productDetail.percent_ytd * 100).toFixed(1) : 0}%
                        </span>
                        <span className="text-[.70rem] font-normal text-muted-foreground">
                            ytd
                        </span>
                    </div>
                    <ChartContainer
                        config={{
                            steps: {
                                label: "Steps",
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                        className="aspect-auto h-[32px] w-full"
                    >


                        <BarChart
                            accessibilityLayer
                            layout="vertical"
                            margin={{
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                            }}
                            data={[
                                {
                                    date: new Date().getFullYear().toString(),
                                    steps: productDetail?.percent_ytd * 100 ?? 0,
                                   
                                },
                            ]}
                            barCategoryGap="35%"
                            barGap={0}
                            barSize={32}
                        >
                            <Bar
                                dataKey="steps"
                                fill={productDetail?.percent_ytd > 0 ? "var(--color-steps)" : "hsl(var(--muted-foreground))"}
                                radius={4}
                            >
                                <LabelList
                                    position="insideLeft"
                                    dataKey="date"
                                    offset={8}
                                    fontSize={12}
                                    fill="white"
                                />
                            </Bar>
                            <YAxis dataKey="date" type="category" tickCount={1} hide />
                            <XAxis
                                dataKey="steps"
                                type="number"
                                hide={true}
                                domain={[-100, 100]}
                                ticks={[0]} // This ensures 0 is always marked, adjust as needed
                            />
                        </BarChart>


                    </ChartContainer>
                </div> */}
                {/* 
                <div className="grid auto-rows-min gap-0 mt-0">
                    <div className="flex items-baseline gap-1 text-3xl font-bold leading-none sm:text-3xl">
                        <span className="tracking-tighter">
                            {productDetail?.percent_mtd !== undefined ? (productDetail.percent_mtd * 100).toFixed(1) : 0}%
                        </span>
                        <span className="text-[.70rem] font-normal text-muted-foreground">
                            mensual
                        </span>
                    </div>
                    <ChartContainer
                        config={{
                            steps: {
                                label: "Steps",
                                color: "hsl(var(--muted))",
                            },
                        }}
                        className="aspect-auto h-[32px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            layout="vertical"
                            margin={{
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                            }}
                            data={[
                                {
                                    date: new Date().toLocaleString('es-MX', { month: 'long' }),
                                    steps: productDetail?.percent_mtd * 100 ?? 0,
                                },
                            ]}
                            barCategoryGap="35%"
                            barGap={0}
                            barSize={32}
                        >
                            <Bar
                                dataKey="steps"
                                fill={productDetail?.percent_mtd > 0 ? "var(--color-steps)" : "hsl(var(--muted-foreground))"}
                                radius={4}
                            >
                                <LabelList
                                    position="insideLeft"
                                    dataKey="date"
                                    offset={8}
                                    fontSize={12}
                                    fill="white"
                                />
                            </Bar>
                            <YAxis dataKey="date" type="category" tickCount={1} hide />
                            <XAxis
                                dataKey="steps"
                                type="number"
                                hide={true}
                                domain={[-100, 100]}
                                ticks={[0]} // This ensures 0 is always marked, adjust as needed
                            />
                        </BarChart>
                    </ChartContainer>
                </div> */}

            </CardContent>
        </Card>
    )
}