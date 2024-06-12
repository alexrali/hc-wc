'use client'

import { useEffect, useRef, useState } from 'react';
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { listingSchema } from "../data/schema"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"

async function fetchTasks(type: string) {

    let url = 'https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/listing';
    if (type !== '' && type !== 'default') {
        url += `?ean=${type}`;
    }

    const response = await fetch(url, {
        headers: {
            'ngrok-skip-browser-warning': 'any value'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tasks = await response.json();

    return z.array(listingSchema).parse(tasks);
}

export function ProductDataTableTabs() {

    type ListingSchemaType = z.infer<typeof listingSchema>;

    const [tasks, setTasks] = useState<ListingSchemaType[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>('default');

    const prevSelectedTabRef = useRef<string>();
    useEffect(() => {
        if (prevSelectedTabRef.current !== selectedTab) {
            fetchTasks(selectedTab).then(setTasks);
        }
        prevSelectedTabRef.current = selectedTab;
    }, [selectedTab]);

    return (
        <>
            <Tabs defaultValue="active">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="active" onClick={() => setSelectedTab('')}>Activos</TabsTrigger>
                        <TabsTrigger value="draft" onClick={() => setSelectedTab('Z')}>Inactivos</TabsTrigger>
                        <TabsTrigger value="archived" className="hidden sm:flex" onClick={() => setSelectedTab('ZZ')}>
                            Descatalogados
                        </TabsTrigger>
                        {/* <TabsTrigger value="all"  onClick={() => setSelectedTab('all')}>Todos</TabsTrigger> */}
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filtrar
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Activo
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Descatalogado
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Exportar
                            </span>
                        </Button>
                        <Button size="sm" className="h-7 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Producto Nuevo
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        {/* <CardHeader>
                                    <CardTitle>Products</CardTitle>
                                    <CardDescription>
                                        Manage your products and view their sales performance.
                                    </CardDescription>
                                </CardHeader> */}
                        <CardContent>

                            <div className="hidden h-full flex-1 flex-col space-y-8 pt-4 md:flex">
                                {/*<div className="flex items-center justify-between space-y-2">
                                             <div>
                                                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                                                <p className="text-muted-foreground">
                                                    Here&apos;s a list of your tasks for this month!
                                                </p>
                                            </div> 
                                             <div className="flex items-center space-x-2">
                                                <UserNav />
                                            </div> 
                                        </div> */}
                                <DataTable data={tasks} columns={columns} />
                            </div>

                        </CardContent>
                        {/* <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                            products
                        </div>
                    </CardFooter> */}
                    </Card>
                </TabsContent>
                <TabsContent value="active">
                    <Card x-chunk="dashboard-06-chunk-0">
                        {/* <CardHeader>
                                    <CardTitle>Products</CardTitle>
                                    <CardDescription>
                                        Manage your products and view their sales performance.
                                    </CardDescription>
                                </CardHeader> */}
                        <CardContent>

                            <div className="hidden h-full flex-1 flex-col space-y-8 pt-4 md:flex">
                                {/*<div className="flex items-center justify-between space-y-2">
                                             <div>
                                                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                                                <p className="text-muted-foreground">
                                                    Here&apos;s a list of your tasks for this month!
                                                </p>
                                            </div> 
                                             <div className="flex items-center space-x-2">
                                                <UserNav />
                                            </div> 
                                        </div> */}
                                <DataTable data={tasks} columns={columns} />                                    </div>

                        </CardContent>
                        {/* <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                            products
                        </div>
                    </CardFooter> */}
                    </Card>
                </TabsContent>
                <TabsContent value="draft">
                    <Card x-chunk="dashboard-06-chunk-0">
                        {/* <CardHeader>
                                    <CardTitle>Products</CardTitle>
                                    <CardDescription>
                                        Manage your products and view their sales performance.
                                    </CardDescription>
                                </CardHeader> */}
                        <CardContent>

                            <div className="hidden h-full flex-1 flex-col space-y-8 pt-4 md:flex">
                                {/*<div className="flex items-center justify-between space-y-2">
                                             <div>
                                                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                                                <p className="text-muted-foreground">
                                                    Here&apos;s a list of your tasks for this month!
                                                </p>
                                            </div> 
                                             <div className="flex items-center space-x-2">
                                                <UserNav />
                                            </div> 
                                        </div> */}
                                <DataTable data={tasks} columns={columns} />                                    </div>

                        </CardContent>
                        {/* <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                            products
                        </div>
                    </CardFooter> */}
                    </Card>
                </TabsContent>
                <TabsContent value="archived">
                    <Card x-chunk="dashboard-06-chunk-0">
                        {/* <CardHeader>
                                    <CardTitle>Products</CardTitle>
                                    <CardDescription>
                                        Manage your products and view their sales performance.
                                    </CardDescription>
                                </CardHeader> */}
                        <CardContent>

                            <div className="hidden h-full flex-1 flex-col space-y-8 pt-4 md:flex">
                                {/*<div className="flex items-center justify-between space-y-2">
                                             <div>
                                                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                                                <p className="text-muted-foreground">
                                                    Here&apos;s a list of your tasks for this month!
                                                </p>
                                            </div> 
                                             <div className="flex items-center space-x-2">
                                                <UserNav />
                                            </div> 
                                        </div> */}
                                <DataTable data={tasks} columns={columns} />                                    </div>

                        </CardContent>
                        {/* <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                            products
                        </div>
                    </CardFooter> */}
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}