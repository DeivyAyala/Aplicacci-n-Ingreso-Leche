import { Card, CardContent } from "@/components/ui/card"
import { CardTitulo } from "./CardTitulo"
import { UserCog, FlaskConical } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import type { PropsRegitros } from "@/pages/Registro/types/ingresoShema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropsResponsables {
  formState: PropsRegitros
  onCustomChange: <K extends keyof PropsRegitros>(
    field: K,
    value: PropsRegitros[K]
  ) => void
}

export const ResponsablesForm = ({ formState, onCustomChange }: PropsResponsables) => {
  return (
    <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
      <CardTitulo 
        title="Responsables del Turno" 
        icono={<UserCog className="h-5 w-5" />} 
      />

      <CardContent className="p-6 space-y-4">
        {/* === Supervisor de Turno === */}
        <div className="space-y-2">
          <Label htmlFor="supervisor" className="text-amber-800 font-medium flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            Supervisor de Turno
          </Label>
          <Select 
            value={formState.supervisor || ""} 
            onValueChange={(value) => onCustomChange("supervisor", value)}
          >
            <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
              <SelectValue placeholder="Seleccionar Supervisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="carlos_rojas">Carlos Rojas</SelectItem>
              <SelectItem value="maria_quintero">María Quintero</SelectItem>
              <SelectItem value="julian_garcia">Julián García</SelectItem>
              <SelectItem value="laura_perez">Laura Pérez</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* === Analista de Laboratorio === */}
        <div className="space-y-2">
          <Label htmlFor="analista" className="text-amber-800 font-medium flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Analista de Laboratorio
          </Label>
          <Select 
            value={formState.analyst || ""} 
            onValueChange={(value) => onCustomChange("analyst", value)}
          >
            <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
              <SelectValue placeholder="Seleccionar Analista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="andres_mendez">Andrés Méndez</SelectItem>
              <SelectItem value="sofia_castro">Sofía Castro</SelectItem>
              <SelectItem value="camilo_ramos">Camilo Ramos</SelectItem>
              <SelectItem value="natalia_ortega">Natalia Ortega</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
