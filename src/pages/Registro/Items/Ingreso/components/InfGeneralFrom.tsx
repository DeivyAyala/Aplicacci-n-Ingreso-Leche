import { Card, CardContent } from "@/components/ui/card"
import { CardTitulo } from "./CardTitulo"
import { CalendarIcon, TruckIcon } from "lucide-react"
import { InputCard } from "./InputCard"
import { Label } from "@radix-ui/react-label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PropsRegitros } from "@/pages/Registro/types/ingresoShema"

interface propsInfo {
    formState: PropsRegitros
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    onCustomChange: <K extends keyof PropsRegitros>(
        field: K,
        value: PropsRegitros[K]
    ) => void
}



export const InfGeneralFrom = ({formState, onInputChange, onCustomChange}: propsInfo) => {
  return (
     <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
        <CardTitulo
            icono = {<CalendarIcon className="h-5 w-5" />}
            title="Información General" 
        />

        <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <InputCard 
                  name="date" 
                  title="Fecha" 
                  type="date" 
                  value={formState.date} 
                  className="text-amber-800 font-medium" 
                  onInputChange={onInputChange} 
                />
                <InputCard 
                  name="time" 
                  title="Hora" 
                  type="time" 
                  value={formState.time} 
                  className="text-amber-800 font-medium" 
                  onInputChange={onInputChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="provider" className="text-amber-800 font-medium flex items-center gap-2">
                      <TruckIcon className="h-4 w-4" />
                      Proveedor
                    </Label>
                    <Select value={formState.provider} onValueChange={(value) => onCustomChange("provider", value)}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
                        <SelectValue placeholder="Seleccionar proveedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proveedor1">Finca La Esperanza</SelectItem>
                        <SelectItem value="proveedor2">Hacienda San José</SelectItem>
                        <SelectItem value="proveedor3">Granja Los Alpes</SelectItem>
                        <SelectItem value="proveedor4">Finca El Paraíso</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <InputCard
                    name="remission" 
                    title="Nro de Remision" 
                    type="number" 
                    value={formState.remission} 
                    className="text-amber-800 font-medium" 
                    onInputChange={onInputChange} 
                />
            </div>
        </CardContent>
    </Card>
  )
}
