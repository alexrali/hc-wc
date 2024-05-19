import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area";
import { KardexEntry } from "@/app/models/KardexEntry"

interface ProductKardexTableProps {
  productKardex: KardexEntry[] | null;
}

const ProductKardexTable: React.FC<ProductKardexTableProps> = ({ productKardex }) => {
  return (
    <ScrollArea className="h-[475px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-xs'>rn</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead className="hidden sm:table-cell">Fecha</TableHead>
            {/* <TableHead className="hidden sm:table-cell">Documento</TableHead>
        <TableHead className="hidden sm:table-cell">Descripcion</TableHead> */}
            <TableHead className="hidden md:table-cell">Cantidad</TableHead>
            <TableHead className="text-right">Saldo</TableHead>
            <TableHead className="text-right">Cli-Pro</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead className="text-right">Costo</TableHead>
            {/* Add more TableHead components as needed */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(productKardex) && productKardex.length > 0 && productKardex.map((entry, index) => (
            <TableRow key={index}>
              <TableCell className='text-xs text-muted-foreground'>{entry.rn}</TableCell>
              <TableCell>
                <div className="font-semibold">{entry.d_descripcion}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {entry.documento}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{entry.fecha.toString()}</TableCell>
              {/* <TableCell className="hidden sm:table-cell">{entry.documento}</TableCell>
          <TableCell className="hidden sm:table-cell">{entry.d_descripcion}</TableCell> */}
              <TableCell className="text-center font-semibold">{Number(entry.cant).toLocaleString()}</TableCell>
              <TableCell className="text-right font-semibold">{Number(entry.saldo).toLocaleString()}</TableCell>
              <TableCell className="text-right">{entry.cli_prov}</TableCell>
              <TableCell className="text-right">$  {Number(entry.monto).toLocaleString()} </TableCell>
              <TableCell className="text-right">$ {Number(entry.c_unit).toLocaleString()} </TableCell>
              {/* Add more TableCell components as needed */}
            </TableRow>
          ))}

        </TableBody>

      </Table>
    </ScrollArea>
  );
};

export default ProductKardexTable;
