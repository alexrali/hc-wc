import { z } from "zod"


export const providerProductSchema = z.object({
  clave: z.string(),
  descripcion: z.string(),
  presentacion: z.string(),
  ultima_venta: z.string(), // date as string, you might want to parse it later
  ultima_compra: z.string(), // date as string, you might want to parse it later
  existencia: z.number(),
  ultimo_costo: z.number(),
  costo_promedio: z.number(),
  P3: z.number(),
  UT: z.string().optional(),
  estatus: z.string(), //status
  label: z.string(), 
  prioridad: z.string(), //priority
  linea: z.string().optional(),
  proveedor: z.string().optional(), 
  comprador: z.string().optional()
})

export type ProviderProduct = z.infer<typeof providerProductSchema>