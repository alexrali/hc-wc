import { useTheme } from "next-themes"
import { Bar, BarChart, Line, LineChart } from "recharts"

import { useConfig } from "@/hooks/use-config"
import {
    Card,
    CardContent,
    CardDescription,
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
import { ArrowDownIcon, ArrowUpIcon, UserRoundIcon, UsersRoundIcon, StoreIcon, ExpandIcon } from "lucide-react"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton"


const data = [
    {
        revenue: 10400,
        subscription: 240,
    },
    {
        revenue: 14405,
        subscription: 300,
    },
    {
        revenue: 9400,
        subscription: 200,
    },
    {
        revenue: 8200,
        subscription: 278,
    },
    {
        revenue: 7000,
        subscription: 189,
    },
    {
        revenue: 9600,
        subscription: 239,
    },
    {
        revenue: 11244,
        subscription: 278,
    },
    {
        revenue: 26475,
        subscription: 189,
    },
]

interface ProductCardsStatsProps {
    ean: string;
}

export function ProductCardsStats({ ean }: ProductCardsStatsProps) {
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
            name: 'Participación Distribucion',
            value: (productDetail?.d_pct ?? 0) * 100,
            fill: '#36A2EB',
        },
        {
            name: 'Participación Sucursales',
            value: (productDetail?.a_pct ?? 0) * 100,
            fill: '#FFCE56',
        },
    ];

    const COLORS = ['#36A2EB', '#FFCE56'];

    return (
        // <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Indicadores Clave</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-6 grid-rows-2 gap-4">

                <div className="col-span-2 row-span-2 p-4 bg-card rounded-lg shadow-sm">
                    <ResponsiveContainer width={220} height={180}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={75}
                                fill="#8884d8"
                                paddingAngle={7}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm max-w-[100px]">
                                                {payload.map((item, index) => (
                                                    <div key={index} className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] text-muted-foreground">
                                                                {item.payload.name}
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                                {parseFloat(item.value?.toString() ?? '0').toFixed(1) + '%'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }

                                    return null
                                }}
                            />

                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-4 col-span-2 row-span-2 bg-card rounded-lg shadow-sm">

                    <TableRow>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <UsersRoundIcon className="h-4 w-4 text-primary" /> {/* Adjust icon size and color as needed */}
                                <div className="font-bold text-xs">Clientes</div>
                            </div>
                        </TableCell>
                        <TableCell className="text-right text-xs">{productDetail?.c_dist}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <StoreIcon className="h-4 w-4 text-primary" /> {/* Adjust icon size and color as needed */}
                                <div className="font-bold text-xs">Sucursales</div>
                            </div>
                        </TableCell>
                        <TableCell className="text-right text-xs">{productDetail?.c_auto}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <div className="font-bold text-xs">Demanda Mensual</div>
                        </TableCell>
                        <TableCell className="text-right text-xs">{productDetail?.avg_demand}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <div className="font-bold text-xs">Var. de la Demanda</div>
                        </TableCell>
                        <TableCell className="text-right text-xs">{productDetail?.std_demand}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <div className="font-bold text-xs">Fecha de Alta</div>
                        </TableCell>
                        <TableCell className="text-right text-xs"> {productDetail?.f_alta ? new Date(productDetail.f_alta).toLocaleDateString() : ''}</TableCell>
                    </TableRow>

                </div>

                <div className="p-4 bg-card rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-muted-foreground">MTD</div>
                        {/* <div className="flex items-center gap-1">
                            <ArrowUpIcon className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">+8.2%</span>
                        </div> */}
                    </div>
                    <div className="text-2xl font-bold tracking-tighter mt-2 text-right">
                        {`${((productDetail?.percent_mtd ?? 0) * 100).toFixed(1)}%`}
                    </div>
                </div>

                <div className="p-4 bg-card rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-muted-foreground">YTD</div>
                        {/* <div className="flex items-center gap-1">
                            <ArrowUpIcon className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">+8.2%</span>
                        </div> */}
                    </div>
                    <div className="text-2xl font-bold tracking-tighter mt-2 text-right">
                        {`${((productDetail?.percent_ytd ?? 0) * 100).toFixed(1)}%`}
                    </div>
                </div>

                <div className="col-span-2 p-4 bg-card rounded-lg shadow-sm">
                    <div className="flex-1 text-center">
                        <div className="text-5xl font-bold tracking-tighter">{productDetail?.doh}</div>
                        {/* <div className="text-[0.70rem] uppercase text-muted-foreground">
              DOH
            </div> */}
                    </div>
                </div>

            </CardContent>
        </Card>
        // </div>
    )
}

{/* <Card>
                <CardHeader>
                    <CardTitle>Indicadores de Inventario</CardTitle>
                </CardHeader>
                <CardContent> */}
{/* <div className="text-2xl font-bold">$15,231.89</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                    <div className="h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 10,
                                    left: 10,
                                    bottom: 0,
                                }}
                            >
                                <Line
                                    type="monotone"
                                    strokeWidth={2}
                                    dataKey="revenue"
                                    activeDot={{
                                        r: 6,
                                        style: { fill: "var(--theme-primary)", opacity: 0.25 },
                                    }}
                                    style={
                                        {
                                            stroke: "var(--theme-primary)",
                                            "--theme-primary": `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"]
                                                .primary
                                                })`,
                                        } as React.CSSProperties
                                    }
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div> */}

{/* <Table className="text-xs"> */ }
{/* <TableHeader>
                            <TableRow>
                                <TableHead className="hidden xl:table-column">Concepto</TableHead>
                                <TableHead className="hidden xl:table-column">Type</TableHead>
                                <TableHead className="hidden xl:table-column">Status</TableHead>
                                <TableHead className="hidden xl:table-column">Date</TableHead>
                                <TableHead className="text-right">Valor</TableHead>
                            </TableRow>
                        </TableHeader> */}
{/* <TableBody> */ }
{/* <TableRow>
                                <TableCell>
                                    <div className="font-bold">Sucursales</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div> 
                                </TableCell> 

                                <TableCell className="hidden xl:table-column">Sale</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-23
                                </TableCell>  

                                <TableCell className="text-right">{productDetail?.c_auto}</TableCell>
                            </TableRow> */}
{/* <TableRow>
                                <TableCell>
                                    <div className="font-bold">Clientes Distribución</div>  */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        olivia@example.com
                                    </div> */}
{/* </TableCell>
                                <TableCell className="hidden xl:table-column">Refund</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Declined
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-24
                                </TableCell>
                                <TableCell className="text-right">{productDetail?.c_dist}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-bold">Fecha de Alta</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        noah@example.com
                                    </div> */}
{/* </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    Subscription
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-25
                                </TableCell>
                                <TableCell className="text-right">
                                {productDetail?.f_alta ? new Date(productDetail.f_alta).toLocaleDateString() : ''}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-bold">Desempeño del Mes</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        emma@example.com
                                    </div> */}
{/* </TableCell>
                                <TableCell className="hidden xl:table-column">Sale</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-26
                                </TableCell>
                                <TableCell className="text-right">{productDetail?.percent_mtd}</TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell>
                                    <div className="font-bold">Desempeño Anual</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div> */}
{/* </TableCell> 
                                <TableCell className="hidden xl:table-column">Sale</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-27
                                </TableCell> 
                                <TableCell className="text-right">{productDetail?.percent_ytd}</TableCell> 

                            </TableRow>
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Indicadores Comerciales</CardTitle>
                </CardHeader>
                <CardContent> */}
{/* <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="subscription"
                  style={
                    {
                      fill: "var(--theme-primary)",
                      opacity: 1,
                      "--theme-primary": `hsl(${
                        theme?.cssVars[mode === "dark" ? "dark" : "light"]
                          .primary
                      })`,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer> 
          </div>*/}

{/* <Table className="text-xs"> */ }
{/* <TableHeader>
                            <TableRow>
                                <TableHead className="hidden xl:table-column">Concepto</TableHead>
                                <TableHead className="hidden xl:table-column">Type</TableHead>
                                <TableHead className="hidden xl:table-column">Status</TableHead>
                                <TableHead className="hidden xl:table-column">Date</TableHead>
                                <TableHead className="text-right">Valor</TableHead>
                            </TableRow>
                        </TableHeader> */}
{/* <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="font-bold">Dias de Inventario</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div> */}
{/* </TableCell>

                                <TableCell className="hidden xl:table-column">Sale</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-23
                                </TableCell>  

                                <TableCell className="text-right">{productDetail?.doh}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-bold">Demanda Promedio</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        olivia@example.com
                                    </div> */}
{/* </TableCell>
                                <TableCell className="hidden xl:table-column">Refund</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Declined
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-24
                                </TableCell>
                                <TableCell className="text-right">{productDetail?.avg_demand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-bold">Variacion de la Demanda</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        noah@example.com
                                    </div> */}
{/* </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    Subscription
                                </TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-25
                                </TableCell>
                                <TableCell className="text-right">{productDetail?.std_demand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-bold">Participacion Distribucion</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        emma@example.com
                                    </div> */}
{/* </TableCell>
                                <TableCell className="hidden xl:table-column">Sale</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-26
                                </TableCell>
                                <TableCell className="text-right">{productDetail?.d_pct}</TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell>
                                    <div className="font-bold">Participacion Sucursales</div> */}
{/* <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div> */}
{/* </TableCell> 
                                <TableCell className="hidden xl:table-column">Sale</TableCell>
                                <TableCell className="hidden xl:table-column">
                                    <Badge className="text-xs" variant="outline">
                                        Approved
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                    2023-06-27
                                </TableCell> 
                                <TableCell className="text-right">{productDetail?.a_pct}</TableCell>  */}

{/* </TableRow>
                        </TableBody>
                    </Table>

                 </CardContent> */}
{/* </Card>
        </div> */}


