import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, BarrelIcon, CalendarIcon, ClockIcon, EditIcon, SaveIcon,  TruckIcon, UserCheck } from "lucide-react"
import { InputCard } from "./InputsCard"
import type { PropsRegitros } from '../../../types/typeRegistro';

interface GeneralInfoProps {
    remission: PropsRegitros
    isEditing: boolean
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onCustomChange: <K extends keyof PropsRegitros>(
        field: K,
        value: PropsRegitros[K]
    ) => void
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    handleSave: () => void

}

export const GeneralInfoCard = ({remission, isEditing, onInputChange, setIsEditing, handleSave}: GeneralInfoProps) => {

  return (
    <Card className="border-amber-200">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-amber-900">
                <img
                  src="/public/IconoLeche.png"
                  alt="Remisión"
                  className="h-8 w-8 rounded object-cover border border-amber-200"
                />
                Información General
            </CardTitle>
            <div className="flex gap-2">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    <EditIcon className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSave} 
                      className="bg-amber-600 text-white hover:bg-amber-700">
                      <SaveIcon className="h-4 w-4 mr-1" />
                      Guardar
                    </Button>
                  </>
                )}
            </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-amber-600" />
                <InputCard
                  isEditing={isEditing}
                  title="Fecha"
                  type="date"
                  name="date"
                  value={remission.date}
                  onChange={onInputChange}
                />
              </div> 
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-amber-600" />
                <InputCard
                  title="Hora"
                  isEditing={isEditing}
                  type="time"
                  name="time"
                  value={remission.time}
                  onChange={onInputChange}
                />
              </div> 
              <div className="flex items-center gap-3">
                <TruckIcon className="h-5 w-5 text-amber-600" />
                <InputCard 
                  title="Proveedor"
                  isEditing={isEditing}
                  type="text"
                  name="provider"
                  value={remission.provider}
                  onChange={onInputChange}
                />
              </div>
            </div>   
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-amber-600" />
                <InputCard 
                  title="Supervisor de Turno"
                  isEditing={isEditing}
                  type="text"
                  name="supervisor"
                  value={remission.supervisor}
                  onChange={onInputChange}
                />  
              </div> 
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-amber-600" />
                 <InputCard 
                  title="Analista de Laboratorio"
                  isEditing={isEditing}
                  type="text"
                  name="analyst"
                  value={remission.analyst}
                  onChange={onInputChange}
                />
              </div> 
              <div className="flex items-center gap-3">
                <BarrelIcon className="h-5 w-5 text-amber-600" />
                <InputCard
                  title="Tanque de Descarga"
                  isEditing= {isEditing}
                  type="text"
                  name="tank"
                  value={remission.tank}
                  onChange={onInputChange}
                />
              </div>
            </div>
        </CardContent>
    </Card>
  )
}
