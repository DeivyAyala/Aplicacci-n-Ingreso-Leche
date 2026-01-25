import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DashboardTank } from "../types/Dashboard"

interface TanksStatusCardProps {
  tanks: DashboardTank[]
}

const STATUS_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  OK: { label: "Operativo", className: "bg-emerald-100 text-emerald-700" },
  ALERTA_ALTA: { label: "Alerta", className: "bg-red-100 text-red-700" },
  ALERTA_BAJA: { label: "Alerta", className: "bg-amber-100 text-amber-700" },
  FUERA_SERVICIO: { label: "Fuera servicio", className: "bg-gray-200 text-gray-700" },
}

const formatLiters = (value?: number) =>
  new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value ?? 0)

export const TanksStatusCard = ({ tanks }: TanksStatusCardProps) => {
  return (
    <Card className="h-full xl:row-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Estado de los tanques</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tanks.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No hay tanques disponibles.
          </div>
        )}
        {tanks.slice(0, 4).map((tank) => {
          const status = STATUS_STYLES[tank.status] ?? STATUS_STYLES.OK
          return (
            <div
              key={tank._id}
              className="flex items-center justify-between rounded-xl border border-amber-100 bg-white/80 px-4 py-3 shadow-sm"
            >
              <div>
                <div className="font-medium">{tank.name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatLiters(tank.currentCapacity)} / {formatLiters(tank.capacity)} L
                </div>
              </div>
              <Badge className={status.className}>{status.label}</Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
