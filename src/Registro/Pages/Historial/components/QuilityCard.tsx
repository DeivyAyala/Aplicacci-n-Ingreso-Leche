import { Card, CardContent } from "@/components/ui/card"
import { Registros } from "@/Registro/Data/Registros"

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

export const QuilityCard = () => {

    const qualityCounts = Registros.reduce((acc, i)=>{
        acc[i.quality] = (acc[i.quality] || 0) + 1
        return acc
    }, {} as Record<string, number>) 

    const qualities = ["Excelente", "Buena", "Regular", "Deficiente"]

  return (
   <Card>
        <CardContent className="lg:p-2">
            <p className="text-sm text-muted-foreground mb-2" >Calidad General</p>
            <div className="grid grid-cols-2 gap-2" >
                {
                    qualities.map((quality) => (
                        <div
                            key={quality}
                            className={`flex items-center justify-between rounded-lg border px-2 py-1 ${getQualityColor(quality)}`}
                        >
                            <span className="text-xs font-medium">{quality}</span>
                            <span className="text-xs font-bold"></span>
                            {qualityCounts[quality] || 0}
                        </div>
                    ))
                }
            </div>
        </CardContent>
    </Card>
  )
}
