export interface KardexEntry {
    rn: number;
    producto: string;
    descripcion?: string;
    fecha: Date;
    documento: string;
    d_descripcion?: string;
    cant?: number;
    saldo?: number;
    cli_prov?: string;
    unidad?: string;
    monto?: number;
    c_unit?: number;
}