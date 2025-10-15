import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropsRegitros } from "@/Registro/types/typeRegistro"
import { StarIcon, CalendarIcon, TruckIcon, UserIcon, EyeIcon, TrashIcon } from "lucide-react"
import { Link } from "react-router"



interface props{
    registro: PropsRegitros
}

export const RemisionCard = ({registro}: props) => {

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
    <Card key={registro.id} className="border-amber-200 hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
                    <img
                      src="/public/IconoLeche.png"
                      alt="Remisión"
                      className="h-10 w-10 rounded-lg object-cover border border-amber-200"
                    />
                    {registro.id}
                </CardTitle>
                <Badge className={`${getQualityColor(registro.quality)} border`}>
                    <StarIcon className="h-3 w-3 mr-1" />
                    {registro.quality}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">

            {/* Contenido Basico */}
            <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-amber-600" />
                      <span className="text-amber-800 font-medium">{registro.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-amber-600 text-xs">Hora:</span>
                        <span className="text-amber-800 font-medium">{registro.time}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-amber-600" />
                    <span className="text-amber-800 font-medium">{registro.provider}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-900">{registro.user}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    <Link to={`/registro/${registro.id}`}>Ver Detalles</Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-red-50 bg-transparent"
                    // onClick={() => handleDelete(registro.id)} // función que tú definas
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Eliminar
                  </Button>
                </div>    
            </div>
        </CardContent>
    </Card>
  )
}
