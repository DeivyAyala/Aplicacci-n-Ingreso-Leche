import { Card, CardContent } from "@/components/ui/card"
import { CardTitulo } from "./CardTitulo"
import { UserCog, FlaskConical } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PropsRegitros } from "@/pages/Admin/types/typeRegistro"
import type { StaffProps } from "../../staff/types/Staff"
import type { UseFormSetValue } from "react-hook-form"

interface PropsResponsables {
  formState: PropsRegitros
  supervisor: StaffProps[]
  analyst: StaffProps[]
  // register: UseFormRegister<PropsRegitros>
  setValue: UseFormSetValue<PropsRegitros>
  errors: any
}

export const ResponsibleForm = ({ formState, supervisor, analyst, setValue, errors }: PropsResponsables) => {
  
  const activeSupervisor = supervisor.filter(s => s.active)
  const activeAnalyst = analyst.filter(a => a.active)
  
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
            value={formState.supervisor?._id ?? ""}
            onValueChange={(value) => {
              const found = supervisor.find(p => p._id === value)
              if (found) {
                setValue("supervisor", {
                  _id: found._id!,
                  name: found.name
                })
              }
            }}
          >
            <SelectTrigger className="border-amber-200">
              <SelectValue placeholder="Seleccionar Supervisor" />
            </SelectTrigger>
            <SelectContent>
              {activeSupervisor.map((p) => (
                <SelectItem key={p._id} value={p._id!}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        { errors.supervisor && (
          <p className="text-red-500 text-sm">{errors.supervisor.message}</p>
        )}

        {/* === Analista de Laboratorio === */}
        <div className="space-y-2">
          <Label htmlFor="analista" className="text-amber-800 font-medium flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Analista de Laboratorio
          </Label>
         <Select
            value={formState.analyst?._id ?? ""}
            onValueChange={(value) => {
              const found = analyst.find(p => p._id === value)
              if (found) {
                setValue("analyst", {
                  _id: found._id!,
                  name: found.name
                })
              }
            }}
          >
            <SelectTrigger className="border-amber-200">
              <SelectValue placeholder="Seleccionar Analista de Laboratorio" />
            </SelectTrigger>
            <SelectContent>
              {activeAnalyst.map((p) => (
                <SelectItem key={p._id} value={p._id!}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          { errors.analyst && (
            <p className="text-red-500 text-sm">{errors.analyst.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
