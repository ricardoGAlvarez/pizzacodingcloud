// schemas/productSchema.ts
import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  ingredients: z.string().optional(),
  price: z
    .number({ invalid_type_error: "Debe ser un número" })
    .positive("Debe ser mayor a 0"),
  
})
