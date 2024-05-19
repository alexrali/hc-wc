export interface Listing {
    clave: string;
    descripcion: string;
    presentacion: string;
    ultima_venta: Date;
    ultima_compra: Date;
    existencia: number;
    ultimo_costo: number;
    costo_promedio: number;
    P3: number;
    UT?: string;
}