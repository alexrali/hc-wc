'use client'

import { useTheme } from "next-themes"
import { Bar, BarChart, Line, LineChart, Sector } from "recharts"

import { useConfig } from "@/hooks/use-config"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { themes } from "@/themes"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

import getProductDetail from "@/app/actions/getProductCommercialDetail"
import { ProductCommercialDetail } from "@/app/models/ProductCommercialDetail"
import { Progress } from "@/components/ui/progress"
import { ArrowDownIcon, ArrowUpIcon, UserRoundIcon, UsersRoundIcon, StoreIcon, ExpandIcon, TrendingUp } from "lucide-react"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, } from 'recharts';
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import CountUp from 'react-countup';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { formatDistanceToNow } from "date-fns"
import { es } from 'date-fns/locale';



const chartConfig = {
    autoservicio: {
        label: "a_pct",
        color: "hsl(var(--chart-1))",
    },
    distribucion: {
        label: "d_pct",
        color: "hsl(var(--chart-2))",
    },

} satisfies ChartConfig

interface ProductBalanceProps {
    productDetail: ProductCommercialDetail;
}

export function ProductBalance({ productDetail }: ProductBalanceProps) {
    const { theme: mode } = useTheme()
    const [config] = useConfig()

    const theme = themes.find((theme) => theme.name === config.theme)

    // const [productDetail, setProductDetail] = useState<ProductCommercialDetail | null>(null);

    // useEffect(() => {
    //     const fetchProductDetail = async () => {
    //         const action = await getProductDetail(ean);
    //         if (action.type === 'GET_PRODUCT_DETAIL_SUCCESS') {
    //             if (typeof action.payload === 'object' && action.payload !== null) {
    //                 setProductDetail(action.payload);
    //                 // console.log("balance of channels", action.payload);
    //             }
    //         } else {
    //             console.error(action.payload);
    //         }
    //     };

    //     fetchProductDetail();
    // }, [ean]);

    let data = [
        {
            name: 'Distribucion',
            value: (productDetail?.d_pct ?? 0) * 100,
            fill: "hsl(var(--chart-1))",
        },
        {
            name: 'Sucursales',
            value: (productDetail?.a_pct ?? 0) * 100,
            fill: "hsl(var(--chart-2))",
        },
    ];

    return (

        <Card
            className="max-w-xs" x-chunk="charts-01-chunk-5"
        >
            <CardContent className="flex gap-4 p-4">
                <div className="grid items-center gap-2 w-[160px]">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Demanda</div>
                        <div className="flex items-baseline gap-1 text-2xl font-bold  tracking-tighter leading-none sm:text-1xl">
                            <CountUp end={productDetail?.avg_demand !== undefined ? productDetail?.avg_demand : 0} duration={5} />
                            <span className="text-[0.7rem] font-normal tracking-tighter text-muted-foreground">
                                mensual
                            </span>
                        </div>
                    </div>
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Participación</div>
                        <div className="flex items-baseline gap-0.5 text-2xl font-bold tracking-tighter leading-none sm:text-1xl">
                            {productDetail?.som_cat !== undefined
                                ? (productDetail.som_cat * 100).toFixed(1)
                                : 'NA'}
                            <span className="text-[0.7rem] font-normal text-muted-foreground">
                                % en categoria
                            </span>
                        </div>
                    </div>
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">Catalogación</div>
                        <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                            <span className="text-[0.7rem] font-bold tracking-tighter ">
                                {formatDistanceToNow(productDetail?.f_alta ?? new Date(), {
                                    addSuffix: true,
                                    locale: es, // Use the imported Spanish locale here
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[50%]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            paddingAngle={5}
                            innerRadius={34}
                            activeIndex={data[0].name === 'Distribucion' && data[0].value > 50 ? 0 : 1}
                            activeShape={({
                                outerRadius = 4,
                                cornerRadius = 4,
                                ...props
                            }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius} cornerRadius={4} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 14}
                                        innerRadius={outerRadius + 3}
                                        cornerRadius={cornerRadius}
                                    />
                                </g>
                            )}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}
