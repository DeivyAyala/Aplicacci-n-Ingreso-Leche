import { z } from "zod"

export const ingresoSchema = z.object({
  id: z.string().optional(),

  date: z.string().min(1, "La fecha es obligatoria").optional(),
  time: z.string().min(1, "La hora es obligatoria").optional(),
  provider: z.string().min(1, "El proveedor es obligatorio").optional(),
  remission: z.string().min(1, "La remisión es obligatoria").optional(),

  volume: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Debe ser mayor a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ).optional(),
  realVolume: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Debe ser mayor a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ).optional(),
  fat: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "No puede ser negativo").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ).optional(),
  protein: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "No puede ser negativo").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ).optional(),
  temperature: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ).optional(),
  pH: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ).optional(),
  density: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),

  quality: z.enum(["Excelente", "Buena", "Regular", "Deficiente"]).optional(),

  user: z.string().optional(),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "Debe ser mayor o igual a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ).optional(),
  firma: z.string().min(1, "La firma es obligatoria").optional(),

  // Nuevo campo opcional (array de strings)
  notes: z.array(z.string()).optional(),

  // Campos adicionales opcionales
  supervisor: z.string().optional(),
  analyst: z.string().optional(),
  tank: z.string().optional
})

export type PropsRegitros = z.infer<typeof ingresoSchema>

