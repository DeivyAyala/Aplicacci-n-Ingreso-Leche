import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardInventoryDistribution } from "../types/Dashboard"

interface InventoryDistributionCardProps {
  data: DashboardInventoryDistribution[]
}

const COLORS = ["#60a5fa", "#f59e0b", "#34d399", "#f97316", "#a78bfa", "#22c55e"]

const formatPercent = (value?: number) =>
  new Intl.NumberFormat("es-CO", { maximumFractionDigits: 1 }).format(value ?? 0)

export const InventoryDistributionCard = ({
  data,
}: InventoryDistributionCardProps) => {
  const total = data.reduce((sum, item) => sum + (item.percent || 0), 0) || 1
  const segments = data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
    percent: (item.percent / total) * 100,
  }))

  const gradient = segments
    .reduce((acc, segment, index) => {
      const start = segments
        .slice(0, index)
        .reduce((sum, current) => sum + current.percent, 0)
      const end = start + segment.percent
      return [...acc, `${segment.color} ${start}% ${end}%`]
    }, [] as string[])
    .join(", ")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Distribucion del inventario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div
            className="h-40 w-40 rounded-full shadow-inner"
            style={{
              background: `conic-gradient(${gradient || "#e5e7eb 0 100%"})`,
            }}
          >
            <div className="m-6 h-28 w-28 rounded-full bg-white/90" />
          </div>
        </div>
        <div className="space-y-3 text-sm">
          {segments.length === 0 && (
            <div className="text-center text-muted-foreground">
              Sin datos de inventario.
            </div>
          )}
          {segments.map((item) => (
            <div key={item.tankId} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <span className="font-medium">{formatPercent(item.percent)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
