import { z } from "zod";

export const ingresoSchema = z.object({
  id: z.string().optional(),

  date: z.string().min(1, "La fecha es obligatoria"),
  time: z.string().min(1, "La hora es obligatoria"),
  provider: z.string().min(1, "El proveedor es obligatorio").optional(),


  volume: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Debe ser mayor a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  realVolume: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Debe ser mayor a 0").refine((v) => !isNaN(v), {
      message: "Ingrese un número válido",
    })
  ),
  user: z.string(),
  notes: z.array(z.string()).optional(),

  supervisor: z.string().optional(),
  analyst: z.string().optional(),
  tank: z.string().optional(), 
});

export type PropsRegitros = z.infer<typeof ingresoSchema>;
