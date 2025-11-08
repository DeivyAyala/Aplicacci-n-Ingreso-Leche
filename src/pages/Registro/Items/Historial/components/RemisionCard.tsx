import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { CalendarIcon, TruckIcon, UserIcon, EyeIcon, TrashIcon, BarrelIcon } from "lucide-react"
import { Link } from "react-router"



interface props{
    registro: PropsRegitros
    index: number
}

export const RemisionCard = ({registro, index}: props) => {



return (
  <Card key={registro.id} className="border-amber-200 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
                  <img
                    src="/public/IconoLeche.png"
                    alt="Remisión"
                    className="h-10 w-10 rounded-lg object-cover border border-amber-200"
                  />
                  {index}
              </CardTitle>
              <Badge className="bg-amber-100 text-amber-700 border border-amber-300">
                  <BarrelIcon className="h-3 w-3 mr-1" />
                  {registro.tank.name}
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
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-amber-200">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-900">{registro.user}</span>
            </div>
            {/* CONTENEDOR DE BOTONES RESPONSIVO */}
            <div className="flex flex-wrap justify-end gap-2 w-full">
              <Button
                size="sm"
                variant="outline"
                className="
                  border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent
                  flex-1 min-w-[120px]
                "
              >
                <EyeIcon className="h-4 w-4 mr-1" />
                <Link to={`/adm/registro/${registro.id}`}>Ver Detalles</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="
                  border-amber-200 text-amber-700 hover:bg-red-50 bg-transparent
                  flex-1 min-w-[120px]
                "
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
