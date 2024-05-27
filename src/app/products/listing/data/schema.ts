import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>


export const listingSchema = z.object({
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
  status: z.string(),
  label: z.string(), 
  priority: z.string()
})

export type Listing = z.infer<typeof listingSchema>