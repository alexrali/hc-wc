"use client";

import React, { useState, useEffect } from 'react';

import { addDays, format, set} from "date-fns"
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


interface ProductSelectorProps {
    onProductInformationChange: (kardexData: KardexEntry[] | null) => void;
    onProductSummaryChange: (summaryData: ProductSummary | null) => void;
    onKardexSummaryChange: (kardexSummary: KardexSummary[] | null) => void;
    setIsLoading: (isLoading: boolean) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
    onProductSummaryChange,
    onKardexSummaryChange,
    onProductInformationChange,
    setIsLoading
}) => {
    const [ean, setEan] = useState('');
    const { toast } = useToast();
    const [selectedProduct, setValue] = useState<Product | undefined>(undefined); // [ean, setEan

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const [date, setDate] = React.useState<DateRange | undefined>(() => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return {
            from: firstDayOfMonth,
            to: addDays(firstDayOfMonth, 20),
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

            if (date?.from && date?.to) {
                const startDate = format(date.from, 'yyyy-MM-dd');
                const endDate = format(date.to, 'yyyy-MM-dd');
                console.log('Calling API methods with', { startDate, endDate });
        
                setIsLoading(true);
        
                // Construct the URL with the start and end dates
                const url = `http://192.168.0.119/api/v1/products/all_products_kardex?start_date=${startDate}&end_date=${endDate}`;
        
                // Create a new 'a' element
                const link = document.createElement('a');
        
                // Set the 'href' attribute to the URL
                link.href = url;
        
                // Set the 'download' attribute to the desired file name
                link.download = 'response.zip';
        
                // Append the 'a' element to the body
                document.body.appendChild(link);
        
                // Programmatically click the 'a' element to start the file download
                link.click();
        
                // Remove the 'a' element from the body after the download starts
                document.body.removeChild(link);
        
                setIsLoading(false);
            } else {
                console.log('No valid data provided - toast shown');
                toast({
                    title: "Sin datos suficientes",
                    variant: "destructive",
                    description: "Ingresa un rango de fechas.",
                });
            }
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
                <div className="grid gap-3 sm:grid-cols-2 grid-cols-2 pt-3">
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

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <ScanBarcodeIcon className="absolute left-2.5 top-2.5 h-4 w-4 mr-2" />
                        <ProductListingCombo onProductSelect={(selectedProduct: any) => setValue(selectedProduct)} />
                    </div>

                    <div className="grid col-span-2">
                        <Button variant="outline" onClick={handleConsultarClick}>
                            Consultar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductSelector;