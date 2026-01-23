"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropletIcon,
  TrendingUpIcon,
  PackageIcon,
  ArrowUpRightIcon,
  FactoryIcon,
  ShoppingCartIcon,
} from "lucide-react"


import { CustomJumbotron } from "../../Components/CustomJumbotron"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import { useGetDashboard } from "../../hook/useGetDashboard"
import { useDashboardStore } from "../../store/dashboardStore"
import type { DashboardRange } from "./types/Dashboard"
import { DashboardRangeSelect } from "./components/DashboardRangeSelect"
import { KpiCard } from "./components/KpiCard"
import { ChartCard } from "./components/ChartCard"
import { InventoryDistributionCard } from "./components/InventoryDistributionCard"
import { TanksStatusCard } from "./components/TanksStatusCard"

export const DashboardPage = () => {
  const [range, setRange] = useState<DashboardRange>("day")
  const { isLoading, isError } = useGetDashboard({ range })
  const dashboard = useDashboardStore((state) => state.dashboard)

  const formatNumber = (value?: number) =>
    new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value ?? 0)

  if (isLoading) {
    return <CustomFullScreenLoading message="Cargando dashboard..." />
  }

  if (isError) {
    return (
      <>
        <CustomJumbotron
          title="Dashboard - Nutre Leche Control"
          subtitle="Vision general del inventario y movimientos de leche en tiempo real"
        />
        <main className="container mx-auto px-6 py-8">
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No se pudo cargar el dashboard.
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  const receptionLiters = dashboard?.kpis.receptionLiters ?? 0
  const outputsLiters = dashboard?.kpis.outputsLiters ?? 0
  const outputsProcess = dashboard?.kpis.outputsToProcessLiters ?? 0
  const outputsSales = dashboard?.kpis.outputsSalesLiters ?? 0
  const inventoryLiters = dashboard?.kpis.inventoryLiters ?? 0
  const alertTanks = dashboard?.kpis.alertTanks ?? 0

  return (
    <>
      <main className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-amber-950">
              Panel general
            </h2>
            <p className="text-sm text-muted-foreground">
              Revisa recepciones, salidas e inventario con filtros rapidos.
            </p>
          </div>
          <DashboardRangeSelect value={range} onChange={setRange} />
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <KpiCard
            title="Recepcion total"
            value={`${formatNumber(receptionLiters)} L`}
            icon={<DropletIcon className="h-5 w-5 text-sky-500" />}
            badge={
              <Badge className="bg-emerald-100 text-emerald-700">
                <TrendingUpIcon className="mr-1 h-3 w-3" />
                +4%
              </Badge>
            }
            footer={
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <ArrowUpRightIcon className="h-3 w-3 text-emerald-500" />
                  {formatNumber(receptionLiters / 10)} hoy
                </span>
                <span>{formatNumber(receptionLiters)} L</span>
              </div>
            }
            className="bg-sky-50/60"
          />

          <KpiCard
            title="Salidas total"
            value={`${formatNumber(outputsLiters)} L`}
            icon={<FactoryIcon className="h-5 w-5 text-amber-500" />}
            badge={
              <Badge className="bg-amber-100 text-amber-700">
                <TrendingUpIcon className="mr-1 h-3 w-3" />
                +2%
              </Badge>
            }
            footer={
              <div className="flex items-center justify-between text-xs">
                <span>{formatNumber(outputsProcess)} proceso</span>
                <span>{formatNumber(outputsSales)} ventas</span>
              </div>
            }
            className="bg-amber-50/70"
          />

          <KpiCard
            title="Inventario"
            value={`${formatNumber(inventoryLiters)} L`}
            icon={<PackageIcon className="h-5 w-5 text-emerald-600" />}
            badge={
              <Badge className="bg-emerald-100 text-emerald-700">
                {formatNumber(alertTanks)} alerta
              </Badge>
            }
            footer={
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <ShoppingCartIcon className="h-3 w-3" />
                  Al dia
                </span>
                <span>{formatNumber(inventoryLiters / 12)} L/dia</span>
              </div>
            }
            className="bg-emerald-50/60"
          />

          <TanksStatusCard tanks={dashboard?.tanks ?? []} />
          <ChartCard
            labels={dashboard?.chart.labels ?? []}
            reception={dashboard?.chart.reception ?? []}
            outputs={dashboard?.chart.outputs ?? []}
            range={range}
            onRangeChange={setRange}
          />

          <InventoryDistributionCard
            data={dashboard?.inventoryDistribution ?? []}
          />
        </div>
      </main>
    </>
  )
}
