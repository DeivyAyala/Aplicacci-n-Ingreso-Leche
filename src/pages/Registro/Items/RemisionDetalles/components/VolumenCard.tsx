import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScaleIcon } from "lucide-react"
import { InputCard } from "./InputsCard"
import type { PropsRegitros } from "../../../types/typeRegistro"


interface propsVolumen {
    remission: PropsRegitros
    isEditing: boolean
    onCustomChange: <K extends keyof PropsRegitros>(
        field: K,
        value: PropsRegitros[K]
    ) => void
}

export const VolumenCard = ({remission, isEditing, onCustomChange}: propsVolumen) => {
  return (
   <Card className="border-amber-200">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
                <ScaleIcon className="h-5 w-5" />
                Información de Volúmenes
            </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <InputCard
                isEditing = {isEditing}
                title="Volumen de Remisión (L)"
                type="number"
                name="number"
                value={remission.volume}
                onChange={(e) => onCustomChange("volume", Number(e.target.value))}
            />
            <InputCard
                title="Volumen Real Recibido (L)"
                isEditing= {isEditing}
                type="number"
                name="number"
                value={remission.realVolume}
                onChange={(e) => onCustomChange("realVolume", Number(e.target.value))}
            />
            <div className="md:col-span-2">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-amber-700">Diferencia:</span>
                    <span
                      className={`font-medium ${
                         (remission?.volume ?? 0) - (remission?.realVolume ?? 0)  > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      { (remission?.volume ?? 0) - (remission?.realVolume ?? 0) > 0 ? "-" : "+"}
                      {Math.abs((remission?.volume ?? 0) - (remission?.realVolume ?? 0))}L
                    </span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}
