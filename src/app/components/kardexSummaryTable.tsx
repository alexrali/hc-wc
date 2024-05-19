import React from 'react';
import { KardexSummary } from "@/app/models/KardexSummary"
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scroll } from 'lucide-react';


interface KardexSummaryProps {
    kardexSummary: KardexSummary[] | null;
}
const KardexSummaryTable: React.FC<KardexSummaryProps> = ({ kardexSummary }) => {
    const kardexSummaryE = Array.isArray(kardexSummary) ? kardexSummary.filter(item => item.clase === 'E') : [];
    const kardexSummaryS = Array.isArray(kardexSummary) ? kardexSummary.filter(item => item.clase === 'S') : [];
    return (
        <div>
            <ScrollArea className="h-[370px] overflow-auto">
                <div className="font-semibold">Movimientos de Entrada</div>
                <div className="grid gap-3 mt-3">
                    {kardexSummaryE.length > 0 ? kardexSummaryE.map((item, index) => (
                        <ul key={index} className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">{item.descripcion}</span>
                                <span className="font-bold">{Number(item.total).toFixed(2)}</span>
                            </li>
                        </ul>
                    )) : <div className='mt-3'>Sin transacciones de entrada</div>}
                </div>
                <Separator className="my-3" />
                <div className="font-semibold">Movimientos de Salida</div>
                <div className="grid gap-3 mt-3">
                    {kardexSummaryS.length > 0 ? kardexSummaryS.map((item, index) => (
                        <ul key={index} className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">{item.descripcion}</span>
                                <span className="font-bold">{Number(item.total).toFixed(2)}</span>
                            </li>
                        </ul>
                    )) : <div className='mt-3'>Sin transacciones de salida</div>}
                </div>
            </ScrollArea>
        </div>

    );
};

export default KardexSummaryTable;