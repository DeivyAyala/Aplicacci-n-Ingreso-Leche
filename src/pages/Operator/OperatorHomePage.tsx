import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropletIcon,
  TruckIcon,
  PackageIcon,
  AlertTriangleIcon,
  ClipboardListIcon,
  ArrowRightIcon,
} from "lucide-react"
import { useGetDashboard } from "@/pages/Admin/hook/useGetDashboard"
import { useDashboardStore } from "@/pages/Admin/store/dashboardStore"
import { KpiCard } from "@/pages/Admin/Items/dashboard/components/KpiCard"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"

export const OperatorHomePage = () => {
  const { isLoading } = useGetDashboard({ range: "day" })
  const dashboard = useDashboardStore((state) => state.dashboard)

  const formatNumber = (value?: number) =>
    new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value ?? 0)

  if (isLoading) {
    return <CustomFullScreenLoading message="Cargando datos del día..." />
  }

  const receptionLiters = dashboard?.kpis.receptionLiters ?? 0
  const outputsLiters = dashboard?.kpis.outputsLiters ?? 0
  const inventoryLiters = dashboard?.kpis.inventoryLiters ?? 0
  const alertTanks = dashboard?.kpis.alertTanks ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-amber-950">Resumen del día</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Vista general del estado actual de recepción e inventario
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Litros recibidos hoy"
          value={`${formatNumber(receptionLiters)} L`}
          icon={<DropletIcon className="h-5 w-5 text-sky-500" />}
          className="bg-sky-50/60"
        />
        <KpiCard
          title="Litros salidos hoy"
          value={`${formatNumber(outputsLiters)} L`}
          icon={<TruckIcon className="h-5 w-5 text-amber-500" />}
          className="bg-amber-50/70"
        />
        <KpiCard
          title="Inventario total"
          value={`${formatNumber(inventoryLiters)} L`}
          icon={<PackageIcon className="h-5 w-5 text-emerald-600" />}
          className="bg-emerald-50/60"
        />
        <KpiCard
          title="Tanques en alerta"
          value={String(alertTanks)}
          icon={<AlertTriangleIcon className="h-5 w-5 text-red-500" />}
          className={alertTanks > 0 ? "bg-red-50/60" : "bg-gray-50/60"}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-amber-200 hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <ClipboardListIcon className="h-5 w-5" />
              Registrar recepción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700 mb-4">
              Registra el ingreso de leche de un proveedor al tanque correspondiente.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white w-full"
            >
              <Link to="/operador/recepcion">
                Ir a Recepción <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-amber-200 hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <TruckIcon className="h-5 w-5" />
              Registrar movimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700 mb-4">
              Registra salidas, traslados entre tanques o envíos a proceso.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white w-full"
            >
              <Link to="/operador/movimientos">
                Ir a Movimientos <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
