import { CheckCircleIcon, PenToolIcon } from "lucide-react"
import { CardTitulo } from "./CardTitulo"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PropsRegitros } from "@/Registro/types/typeRegistro"

interface propsFirma {
    formState: PropsRegitros
    onCustomChange: <K extends keyof PropsRegitros>(
        field: K,
        value: PropsRegitros[K]
    ) => void
}

export const FirmaFrom = ({formState, onCustomChange}: propsFirma ) => {
  return (
   <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
        <CardTitulo 
            icono={<CheckCircleIcon className="h-5 w-5" />}
            title="Evaluación y Firma"
        />
        <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="quiality" className="text-amber-800 font-medium">
                  Calidad General
                </Label>
                <Select value={formState.quality} onValueChange={(value) => onCustomChange("quality", value)}>
                  <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
                    <SelectValue placeholder="Seleccionar calidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excelente">Excelente</SelectItem>
                    <SelectItem value="Buena">Buena</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Deficiente">Deficiente</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="firma" className="text-amber-800 font-medium flex items-center gap-2">
                  <PenToolIcon className="h-4 w-4" />
                  Firma del Responsable
                </Label>
                <Textarea
                  id="firma"
                  placeholder="Nombre y firma del responsable de la recepción"
                  value={formState.firma}
                  onChange={(e) => onCustomChange("firma", e.target.value)}
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 min-h-[100px]"
                  required
                />
            </div>
        </CardContent>
    </Card>
  )
}
