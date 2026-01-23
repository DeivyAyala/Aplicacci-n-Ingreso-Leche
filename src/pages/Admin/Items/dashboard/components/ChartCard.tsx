import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardRangeSelect } from "./DashboardRangeSelect"
import type { DashboardRange } from "../types/Dashboard"

interface ChartCardProps {
  labels: string[]
  reception: number[]
  outputs: number[]
  range: DashboardRange
  onRangeChange: (range: DashboardRange) => void
}

export const ChartCard = ({
  labels,
  reception,
  outputs,
  range,
  onRangeChange,
}: ChartCardProps) => {
  const maxValue = Math.max(1, ...reception, ...outputs)

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-lg">Recepciones y salidas</CardTitle>
        <DashboardRangeSelect value={range} onChange={onRangeChange} size="sm" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex h-56 items-end gap-3 overflow-x-auto rounded-xl bg-gradient-to-b from-white to-amber-50/40 px-4 pb-4 pt-6">
          {labels.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No hay datos para mostrar.
            </div>
          )}
          {labels.map((label, index) => {
            const receptionValue = reception[index] ?? 0
            const outputsValue = outputs[index] ?? 0
            const receptionHeight = Math.max(8, (receptionValue / maxValue) * 180)
            const outputsHeight = Math.max(8, (outputsValue / maxValue) * 180)

            return (
              <div key={label + index} className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1">
                  <div
                    className="w-3 rounded-md bg-sky-400 shadow-sm"
                    style={{ height: receptionHeight }}
                    title={`Recepcion: ${receptionValue}`}
                  />
                  <div
                    className="w-3 rounded-md bg-amber-400 shadow-sm"
                    style={{ height: outputsHeight }}
                    title={`Salidas: ${outputsValue}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-sky-400" />
            Recepciones
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-amber-400" />
            Salidas
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
