import { z } from "zod"

export const ingresoSchema = z.object({
  date: z.string().min(1, "La fecha es obligatoria"),
  time: z.string().min(1, "La hora es obligatoria"),
  provider: z.string().min(1, "El proveedor es obligatorio"),
  remission: z.string().min(1, "La remisión es obligatoria"),

  volume: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().min(1, "Debe ser mayor a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  realVolume: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().min(1, "Debe ser mayor a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  fat: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().min(0, "No puede ser negativo").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  protein: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().min(0, "No puede ser negativo").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  temperature: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  pH: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  density: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),

 quality: z.enum(["Excelente", "Buena", "Regular", "Deficiente"]).optional(),

  user: z.string().optional(),
  price: z.preprocess(
    (val) => val === "" ? undefined : Number(val),
    z.number().min(0, "Debe ser mayor o igual a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  firma: z.string().min(1, "La firma es obligatoria"),
})

export type PropsRegitros = z.infer<typeof ingresoSchema>
