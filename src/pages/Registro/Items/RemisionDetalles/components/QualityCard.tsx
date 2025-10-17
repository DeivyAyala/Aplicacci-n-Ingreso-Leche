import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskRoundIcon } from "lucide-react"
import { InputCard } from "./InputsCard"
import type { PropsRegitros } from "../../../types/typeRegistro"

interface propsQuality {
    remission : PropsRegitros
    isEditing : boolean
    onCustomChange: <K extends keyof PropsRegitros>(
        field: K,
        value: PropsRegitros[K]
    ) => void
}


export const QualityCard = ({remission, isEditing, onCustomChange}: propsQuality) => {
  return (
    <Card className="border-amber-200">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
                <FlaskRoundIcon className="h-5 w-5" />
                Parámetros de Calidad
            </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
            <InputCard 
                title="Grasa (%)"
                isEditing = {isEditing}
                type="number"
                name="number"
                step="0.1"
                value={remission.fat}
                onChange={(e) => onCustomChange("fat", Number(e.target.value))}
                children={<p className="text-xs text-amber-600 mt-1">Meta: 3.6 - 4.2%</p>}
            />
            <InputCard 
                title="Proteína (%)"
                isEditing= {isEditing}
                type="number"
                name="number"
                step="0.1"
                value={remission.protein}
                onChange={(e) => onCustomChange("protein", Number(e.target.value))}
                children={<p className="text-xs text-amber-600 mt-1">Meta: 3.1 - 3.4%</p>}
            />
            <InputCard 
                title="Densidad (g/ml)"
                isEditing= {isEditing}
                type="number"
                name="number"
                step="0.001"
                value={remission.density}
                onChange={(e) => onCustomChange("density", Number(e.target.value))}
                children={<p className="text-xs text-amber-600 mt-1">Meta: 1.028 - 1.034</p>}
            />
            <InputCard 
                title="Temperatura (°C)"
                isEditing={isEditing}
                type="number"
                name="number"
                step="0.1"
                value={remission.temperature}
                onChange={(e) => onCustomChange("temperature", Number(e.target.value))}
                children={<p className="text-xs text-amber-600 mt-1">Meta: ≤ 4°C</p>}
            />
            <InputCard 
                title="pH"
                isEditing={isEditing}
                type="number"
                name="number"
                step="0.1"
                value={remission.pH}
                onChange={(e) => onCustomChange("pH", Number(e.target.value))}
                children={<p className="text-xs text-amber-600 mt-1">Meta: 6.6 - 6.8</p>}
            />
        </CardContent>
    </Card>
  )
}
