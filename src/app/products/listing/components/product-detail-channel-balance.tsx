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

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
    // visitors: {
    //   label: "Visitors",
    // },
    autoservicio: {
        label: "a_pct",
        color: "hsl(var(--chart-1))",
    },
    distribucion: {
        label: "d_pct",
        color: "hsl(var(--chart-2))",
    },
    // firefox: {
    //   label: "Firefox",
    //   color: "hsl(var(--chart-3))",
    // },
    // edge: {
    //   label: "Edge",
    //   color: "hsl(var(--chart-4))",
    // },
    // other: {
    //   label: "Other",
    //   color: "hsl(var(--chart-5))",
    // },
} satisfies ChartConfig

interface ProductCardsStatsProps {
    ean: string;
}

export function ProductCardChannelBalance({ ean }: ProductCardsStatsProps) {
    const { theme: mode } = useTheme()
    const [config] = useConfig()

    const theme = themes.find((theme) => theme.name === config.theme)

    const [productDetail, setProductDetail] = useState<ProductCommercialDetail | null>(null);

    useEffect(() => {
        let isMounted = true; // Flag to track the mounted state of the component

        const fetchProductDetail = async () => {
            if (!isMounted) return; // Prevent updating state if the component is unmounted

            const action = await getProductDetail(ean);
            if (action.type === 'GET_PRODUCT_DETAIL_SUCCESS') {
                if (typeof action.payload === 'object' && action.payload !== null) {
                    if (isMounted) setProductDetail(action.payload);
                } else {
                    console.error('Payload is not of type ProductCommercialDetail', action.payload);
                    if (isMounted) setProductDetail(null);
                }
            } else {
                console.error('Failed to fetch product detail');
                if (isMounted) setProductDetail(null);
            }
        };

        fetchProductDetail();

        return () => {
            isMounted = false; // Set the flag to false when the component unmounts
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ean]); // Empty dependency array to run the effect only once on component mount

    let data = [
        {
            name: 'Distribucion',
            value: (productDetail?.d_pct ?? 0) * 100,
            fill: '#94a3b8',
        },
        {
            name: 'Sucursales',
            value: (productDetail?.a_pct ?? 0) * 100,
            fill: '#cbd5e1',
        },
    ];

    return (

        <Card className="flex flex-col">
            <CardHeader className="items-left pb-0">
                <CardTitle>Balance Comercial</CardTitle>
                <CardDescription>
                    <span className="text-[0.70rem]">
                        Participación Ventas por Canal
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="col-span-2 row-span-2 p-4 bg-card rounded-lg shadow-sm">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[350px]"
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
                                innerRadius={65}
                                activeIndex={data[0].name === 'Distribucion' && data[0].value > 50 ? 0 : 1}
                                activeShape={({
                                    outerRadius = 0,
                                    ...props
                                }: PieSectorDataItem) => (
                                    <g>
                                        <Sector {...props} outerRadius={outerRadius} />
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 10}
                                            innerRadius={outerRadius + 3}
                                        />
                                    </g>
                                )}
                            />
                        </PieChart>
                    </ChartContainer>
                </div>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-[0.70rem]">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {data[0].name === 'Distribucion' && data[0].value > 50 ? (
                        <span> Distribucion tiene participación del {Math.round(data[0].value)}%</span>
                    ) : (
                        <span> Sucursales tiene participación del {Math.round(data[1].value)}%</span>
                    )}
                </div>
                <div className="leading-none text-muted-foreground ">
                    Con informacion acumulada anual
                </div>
            </CardFooter>
        </Card>
    )
}
