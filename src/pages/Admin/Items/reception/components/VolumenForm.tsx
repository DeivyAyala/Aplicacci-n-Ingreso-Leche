import { Card, CardContent } from "@/components/ui/card"
import { CardTitulo } from "./CardTitulo"
import { InputCard } from "./InputCard"
import { Beaker, DropletIcon } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import type { PropsRegitros } from "@/pages/Admin/types/ingresoShema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface propsVolumen {
    formState: PropsRegitros
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    onCustomChange: <K extends keyof PropsRegitros>(
        field: K,
        value: PropsRegitros[K]
    ) => void
}

export const VolumenForm = ({formState,  onCustomChange}: propsVolumen) => {
  return (
     <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
        <CardTitulo 
            title="Volúmenes" 
            icono={<DropletIcon className="h-5 w-5" />}
        />

        <CardContent className="p-6 space-y-4">

            <InputCard 
                name="volume" 
                title="Volumen de Remisión (L)" 
                type="number"
                placeholder="0"
                value={formState.volume}
                className="text-amber-800 font-medium"
                onInputChange={(e) => onCustomChange("volume", Number(e.target.value))} 
            />

            <InputCard 
                name="realVolume"
                title="Volumen Real Recibido (L)"
                type="number"
                placeholder="0"
                value={formState.realVolume}
                className="text-amber-800 font-medium"
                onInputChange={(e) => onCustomChange("realVolume", Number(e.target.value))}
            />
                
            <div className="space-y-2">
                <Label htmlFor="price" className="text-amber-800 font-medium flex items-center gap-2">
                  <Beaker className="h-4 w-4" />
                  Tanque de Descarga
                </Label>
                <Select value={formState.provider} onValueChange={(value) => onCustomChange("provider", value)}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
                        <SelectValue placeholder="Seleccionar Tanque" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tanque1">Tanque 1</SelectItem>
                        <SelectItem value="tanque2">Tanque 2</SelectItem>
                        <SelectItem value="tanque3">Tanque 3</SelectItem>
                        <SelectItem value="tanque4">Tanque 4</SelectItem>
                      </SelectContent>
                    </Select>
            </div>
        </CardContent>
    </Card>
  )
}
