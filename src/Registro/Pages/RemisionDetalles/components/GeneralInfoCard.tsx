import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, DollarSignIcon, EditIcon, SaveIcon, StarIcon, TruckIcon, UserIcon } from "lucide-react"
import { InputCard } from "./InputsCard"
import { Badge } from "@/components/ui/badge"
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

export const GeneralInfoCard = ({remission, isEditing, onInputChange, onCustomChange, setIsEditing, handleSave}: GeneralInfoProps) => {

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Excelente":
        return "bg-green-100 text-green-800 border-green-200"
      case "Buena":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Regular":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Deficiente":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
      }
  }

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
                <UserIcon className="h-5 w-5 text-amber-600" />
                <div>
                  <label className="text-sm font-medium text-amber-800">Usuario Registrador</label>
                  <p className="text-amber-900 font-medium">{remission.user}</p>
                </div>
              </div> 
              <div className="flex items-center gap-3">
                <StarIcon className="h-5 w-5 text-amber-600" />
                <div>
                  <label className="text-sm font-medium text-amber-800">Calidad General</label>
                  <Badge className={`${getQualityColor(remission.quality ?? "")} border mt-1`}>{remission.quality}</Badge>
                </div>
              </div> 
              <div className="flex items-center gap-3">
                <DollarSignIcon className="h-5 w-5 text-amber-600" />
                <InputCard
                  title="Precio por Litro"
                  isEditing= {isEditing}
                  type="number"
                  name="number"
                  value={remission.price}
                  onChange={(e) => onCustomChange("price", Number(e.target.value))}
                />
              </div>
            </div>
        </CardContent>
    </Card>
  )
}
