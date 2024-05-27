"use client"

import { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import getProductList from "../actions/getProductsList"
import { Product } from '../models/ProductEntry';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';



export function ProductListingCombo({ onProductSelect }: { onProductSelect: any }) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch products whenever the search query changes
    const fetchProducts = async (query: string) => {
        if (query.length < 3) {
            return;
        }

        const response = await getProductList(query);
        if (response.type === 'GET_PRODUCT_LISTING_SUCCESS') {
            setProducts(response.payload);
        } else {
            console.error('No product found with the given search query.');
        }
    };

    const debouncedFetchProducts = useMemo(() => debounce(fetchProducts, 500), []);

    useEffect(() => {
        if (searchQuery) {
            debouncedFetchProducts(searchQuery);
        }
    }, [searchQuery, debouncedFetchProducts]);


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-full pl-8"
                >
                    {
                        value && products && products.length > 0
                            ? products.find((product) => {
                                console.log('value:', value, 'product.descripcion:', product.descripcion);
                                return product.descripcion.toLowerCase() === value.toLowerCase();
                            })?.ean
                            : "Filtrar producto..."
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" side="bottom" align="start">
                <Command>
                    <CommandInput
                        placeholder="Ingresa descripción o clave..."
                        value={searchQuery}
                        onChangeCapture={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                        className='w-full rounded-lg bg-background font-medium text-sm'
                    />
                    <CommandEmpty>Sin coincidencias.</CommandEmpty>
                    <ScrollArea 
                        className="h-[200px] "
                    >
                        <CommandGroup >
                            {
                                Array.isArray(products) && products.length > 0
                                    ?
                                    products.map((product) => (

                                        <CommandItem
                                            key={product.descripcion}
                                            value={product.descripcion}
                                            className="w-[400px] text-xs font-medium"
                                            onSelect={(currentValue) => {
                                                console.log('currentValue', currentValue)
                                                currentValue = currentValue.toUpperCase()
                                                setValue(currentValue === value ? "" : currentValue)
                                                onProductSelect(product)
                                                setOpen(false)
                                            }}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === product.descripcion ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {/* {`${product.descripcion} - ${product.presentacion}`}  */}
                                            {product.presentacion}
                                        </CommandItem>

                                    ))
                                    : <CommandEmpty></CommandEmpty>
                            }
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
}