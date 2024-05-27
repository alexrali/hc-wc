"use client";

import React, { useState, useEffect } from 'react';

import { addDays, format, set } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    CalendarIcon,
    ScanBarcodeIcon,
    GalleryVerticalEndIcon,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import getProductKardex from '../actions/getProductKardex';
import getProductSummary from '../actions/getProductSummary';
import getKardexSummary from '../actions/getKardexSummary';
import { DateRange } from 'react-day-picker';
import { ProductListingCombo } from './productListingCombo';
import { Product } from '../models/ProductEntry';
import { KardexEntry } from '../models/KardexEntry';
import { ProductSummary } from '../models/ProductSummary';
import { KardexSummary } from '../models/KardexSummary';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import getAllProductsKardex from '../actions/getAllProductsKardex';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import axios from 'axios';
import { AxiosProgressEvent } from 'axios';





interface ProductSelectorProps {
    onProductInformationChange: (kardexData: KardexEntry[] | null) => void;
    onProductSummaryChange: (summaryData: ProductSummary | null) => void;
    onKardexSummaryChange: (kardexSummary: KardexSummary[] | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
    onProductSummaryChange,
    onKardexSummaryChange,
    onProductInformationChange,
    setIsLoading,
    isLoading,
}) => {
    const [ean, setEan] = useState('');
    const { toast } = useToast();
    const [selectedProduct, setValue] = useState<Product | undefined>(undefined); // [ean, setEan
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isProgressLoading, setIsProgressLoading] = React.useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isProgressLoading) {
            const timer = setInterval(() => {
                // Calculate the progress based on some logic
                let newProgress = Math.min(progress + Math.floor(Math.random() * 10) + 1, 100); // increment by a random value between 1 and 10, but not exceeding 100

                setProgress(newProgress);
            }, 1500);

            return () => clearInterval(timer);
        } else {
            setProgress(0);
        }
    }, [isProgressLoading, progress]);

    const [date, setDate] = React.useState<DateRange | undefined>(() => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
            from: firstDayOfMonth,
            to: lastDayOfMonth,
        };
    });

    // const handleConsultarClick = async () => {
    //     console.log('handleConsultarClick called with', { ean, date });

    //     if (selectedProduct?.ean && date?.from && date?.to) {
    //         const startDate = format(date.from, 'yyyy-MM-dd');
    //         const endDate = format(date.to, 'yyyy-MM-dd');
    //         console.log('Calling API methods with', { ean, startDate, endDate });

    //         setIsLoading(true);

    //         const [kardexAction, summaryAction, kardexSummaryAction] = await Promise.all([
    //             getProductKardex(selectedProduct?.ean, startDate, endDate),
    //             getProductSummary(selectedProduct?.ean, startDate, endDate),
    //             getKardexSummary(selectedProduct?.ean, startDate, endDate),
    //         ]);

    //         if (!kardexAction.payload || kardexAction.payload.length === 0) {
    //             toast({
    //                 title: "Sin transacciones",
    //                 description: "No se encontraron movimientos para el código y rango de fechas.",
    //             });
    //             onProductInformationChange(null);
    //             onProductSummaryChange(null);
    //             onKardexSummaryChange(null);
    //             setIsLoading(false);
    //             return;
    //         }

    //         onProductInformationChange(kardexAction.payload);
    //         onProductSummaryChange(summaryAction.payload);
    //         onKardexSummaryChange(kardexSummaryAction.payload);

    //         setIsLoading(false);
    //     } else {
    //         console.log('No valid data provided - toast shown');
    //         toast({
    //             title: "Sin datos suficientes",
    //             variant: "destructive",
    //             description: "Ingresa un codigo y rango de fechas.",
    //         });
    //     }
    // };

    const handleConsultarClick = () => {
        console.log('handleConsultarClick called with', { ean, date });

        // Set all variables to null at the start of a new request
        onProductInformationChange(null);
        onProductSummaryChange(null);
        onKardexSummaryChange(null);

        if (isSwitchOn) {
            // Perform actions when switch is on
            // toast({
            //     title: "Funcionalidad no implementada",
            //     description: "La funcionalidad de consultar todos los códigos no está implementada.",
            // });

            //check if date?.from and date?.to are not null

            console.log('isSwitchOn', isSwitchOn);
            setIsDialogOpen(true);

            // if (date?.from && date?.to) {
            //     const startDate = format(date.from, 'yyyy-MM-dd');
            //     const endDate = format(date.to, 'yyyy-MM-dd');
            //     console.log('Calling API methods with', { startDate, endDate });

            //     setIsLoading(true);

            //     // Construct the URL with the start and end dates
            //     const url = `https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/all_products_kardex?start_date=${startDate}&end_date=${endDate}`;

            //     // Fetch the file
            //     fetch(url, {
            //         headers: {
            //             'ngrok-skip-browser-warning': 'any value'
            //         }
            //     })
            //         .then(response => response.blob())
            //         .then(blob => {
            //             // Create a new 'a' element
            //             const link = document.createElement('a');

            //             // Create an object URL for the Blob
            //             const url = URL.createObjectURL(blob);

            //             // Set the 'href' attribute to the object URL
            //             link.href = url;

            //             // Set the file name considering the start and end dates and the date of download as the current date
            //             const currentDate = new Date();
            //             const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
            //             const formattedStartDate = format(startDate, 'yyyy-MM-dd');
            //             const formattedEndDate = format(endDate, 'yyyy-MM-dd');

            //             const fileName = `desde_${formattedStartDate}hasta_${formattedEndDate}_en${formattedCurrentDate}.zip`;

            //             // append word 'kardex' to the file name
            //             link.download = 'kardex_' + fileName;

            //             // Set the 'download' attribute to the desired file name
            //             // link.download = 'response.zip';

            //             // Append the 'a' element to the body
            //             document.body.appendChild(link);

            //             // Programmatically click the 'a' element to start the file download
            //             link.click();

            //             // Remove the 'a' element from the body after the download starts
            //             document.body.removeChild(link);

            //             setIsLoading(false);
            //         })
            //         .catch(error => {
            //             console.error('Error:', error);
            //             setIsLoading(false);
            //         });
            // } else {
            //     console.log('No valid data provided - toast shown');
            //     toast({
            //         title: "Sin datos suficientes",
            //         variant: "destructive",
            //         description: "Ingresa un rango de fechas.",
            //     });
            // }

        } else {

            if (selectedProduct?.ean && date?.from && date?.to) {
                const startDate = format(date.from, 'yyyy-MM-dd');
                const endDate = format(date.to, 'yyyy-MM-dd');
                console.log('Calling API methods with', { ean, startDate, endDate });

                setIsLoading(true);

                let completedRequests = 0;

                const checkAllRequestsComplete = () => {
                    completedRequests++;
                    if (completedRequests === 3) {
                        setIsLoading(false);
                    }
                };

                getProductKardex(selectedProduct?.ean, startDate, endDate).then(kardexAction => {
                    if (!kardexAction.payload || kardexAction.payload.length === 0) {
                        toast({
                            title: "Sin transacciones",
                            description: "No se encontraron movimientos para el código y rango de fechas.",
                        });
                        onProductInformationChange(null);
                        checkAllRequestsComplete();
                        return;
                    }
                    onProductInformationChange(kardexAction.payload);
                    checkAllRequestsComplete();
                });

                getProductSummary(selectedProduct?.ean, startDate, endDate).then(summaryAction => {
                    onProductSummaryChange(summaryAction.payload);
                    checkAllRequestsComplete();
                });

                getKardexSummary(selectedProduct?.ean, startDate, endDate).then(kardexSummaryAction => {
                    onKardexSummaryChange(kardexSummaryAction.payload);
                    checkAllRequestsComplete();
                });

            } else {
                console.log('No valid data provided - toast shown');
                toast({
                    title: "Sin datos suficientes",
                    variant: "destructive",
                    description: "Ingresa un codigo y rango de fechas.",
                });
            }
        }
    };

    return (
        <Card
            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
        >
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle>Consulta</CardTitle>
                    <div className="flex items-center space-x-2 ">
                        <Switch
                            id="full-mode"
                            checked={isSwitchOn}
                            onCheckedChange={setIsSwitchOn}
                        />
                        <Label htmlFor="full-mode" className="text-xs">Todos los códigos</Label>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 pt-3">
                    <div className="grid gap-3 items-center">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                    locale={es}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="relative ml-auto flex-1 md:grow-0 w-full">
                        <ScanBarcodeIcon className="absolute left-2.5 top-2.5 h-4 w-4 mr-2" />
                        <ProductListingCombo onProductSelect={(selectedProduct: any) => setValue(selectedProduct)} />
                    </div>

                    <div className="grid col-span-2">
                        <Button variant="outline" onClick={handleConsultarClick}>
                            Consultar
                        </Button>
                    </div>
                </div>

                <AlertDialog open={isDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirma acción</AlertDialogTitle>
                            <AlertDialogDescription>
                                Dependiendo del período a consultar la descarga puede tardar varios minutos.
                                Asegura que las fechas sean correctas antes de continuar.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className='mt-3'>
                            <Progress value={progress} className="w-[100%]" />
                        </div>
                        <AlertDialogFooter>
                            {/* <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancelar</AlertDialogCancel> */}
                            <AlertDialogCancel onClick={() => setIsDialogOpen(false)} aria-disabled={isLoading}
                                disabled={isLoading}>Cancelar</AlertDialogCancel>

                            <AlertDialogAction onClick={() => {

                                setIsLoading(true);

                                if (date?.from && date?.to) {
                                    const startDate = format(date.from, 'yyyy-MM-dd');
                                    const endDate = format(date.to, 'yyyy-MM-dd');
                                    console.log('Calling API methods with', { startDate, endDate });


                                    setIsProgressLoading(true);

                                    // Construct the URL with the start and end dates
                                    const url = `https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/all_products_kardex?start_date=${startDate}&end_date=${endDate}`;

                                    // Fetch the file
                                    axios.get(url, {
                                        headers: {
                                            'ngrok-skip-browser-warning': 'any value'
                                        },

                                        responseType: 'blob'
                                    })
                                        .then(response => {
                                            console.log(response.headers['content-length']);

                                            const blob = response.data

                                            // Create a new 'a' element
                                            const link = document.createElement('a');

                                            // Create an object URL for the Blob
                                            const url = URL.createObjectURL(blob);

                                            // Set the 'href' attribute to the object URL
                                            link.href = url;

                                            // Set the file name considering the start and end dates and the date of download as the current date
                                            const currentDate = new Date();
                                            const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
                                            const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                                            const formattedEndDate = format(endDate, 'yyyy-MM-dd');

                                            const fileName = `desde_${formattedStartDate}hasta_${formattedEndDate}_en${formattedCurrentDate}.zip`;

                                            // append word 'kardex' to the file name
                                            link.download = 'kardex_' + fileName;

                                            // Set the 'download' attribute to the desired file name
                                            // link.download = 'response.zip';

                                            // Append the 'a' element to the body
                                            document.body.appendChild(link);

                                            // Programmatically click the 'a' element to start the file download
                                            link.click();

                                            // Remove the 'a' element from the body after the download starts
                                            document.body.removeChild(link);

                                            setIsProgressLoading(false);
                                            setIsLoading(false);
                                            setIsDialogOpen(false);
                                        })
                                        .catch(error => {
                                            console.error('Error:', error);

                                            setIsProgressLoading(false);
                                            setIsLoading(false);
                                            setIsDialogOpen(false);
                                        });
                                } else {
                                    console.log('No valid data provided - toast shown');
                                    toast({
                                        title: "Sin datos suficientes",
                                        variant: "destructive",
                                        description: "Ingresa un rango de fechas.",
                                    });
                                }
                            }} disabled={isLoading}>Confirmar y Descargar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardContent>
        </Card>
    );
};

export default ProductSelector;