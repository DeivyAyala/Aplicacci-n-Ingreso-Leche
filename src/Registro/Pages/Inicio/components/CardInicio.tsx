import { Card, CardContent } from "@/components/ui/card"

interface props {
    title: string,
    dato: string,
    escala: string,
    className?: string,
    
}

export const CardInicio = ({title, dato, escala, className}: props) => {
  return (
    <Card>
        <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{title}</p>
                  <p className={`text-xl font-bold ${className}`}>{dato}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className={`${className} text-xs`}>{escala}</span>
                </div>
              </div>
        </CardContent>
    </Card>
  )
}
