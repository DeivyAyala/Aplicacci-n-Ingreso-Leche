import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DownloadIcon,
  EyeIcon,
  FactoryIcon,
  TrashIcon,
  ShuffleIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { CustomTable } from "../../Components/CustomTable"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import { useGetMovements } from "../../hook/useGetMovements"
import { useMovementsStore } from "../../store/movementsStore"
import { useGetTanks } from "../../hook/useGetTanks"
import { useTanksStore } from "../../store/tanksStore"
import type { Movement, MovementsType } from "./types/MilkMovement"
import { MovementsBox } from "./components/MovementsBox"
import { CreateMovementWizard } from "./components/CreateMovementWizard"
import { MovementDetailsModal } from "./components/MovementDetailsModal"
import { useDeleteMovement } from "../../hook/useDeleteMovement"
import { ConfirmModal } from "../../Components/ConfirmModal"
import { exportMovementsExcel } from "../../Helpers/ExportMovementsExcel"



export const MilkMovementsPage = () => {
  const { isLoading } = useGetMovements()
  const { movements, setMovements } = useMovementsStore()
  const { tanks, setTanks } = useTanksStore()
  const { data: fetchedTanks = [] } = useGetTanks()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [openWizard, setOpenWizard] = useState(false)
  const [wizardType, setWizardType] = useState<MovementsType | undefined>(
    undefined
  )
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [movementToDelete, setMovementToDelete] = useState<Movement | null>(null)

  const { deleteMovementAsync, isPending: deleting } = useDeleteMovement()
  const [filters, setFilters] = useState({
    type: "",
    originTank: "",
    destinationTank: "",
    client: "",
    dateFrom: "",
    dateTo: "",
  })

  useEffect(() => {
    if (fetchedTanks.length > 0) {
      setTanks(fetchedTanks)
    }
  }, [fetchedTanks, setTanks])

  const recentClients = useMemo(() => {
    const clients = movements
      .map((movement) => movement.client?.trim())
      .filter((client): client is string => Boolean(client))
    return Array.from(new Set(clients)).slice(0, 6)
  }, [movements])

  if (isLoading) {
    return <CustomFullScreenLoading message="Cargando movimientos..." />
  }

  const filteredMovements = movements.filter((movement) => {
    const searchValue = searchTerm.toLowerCase()
    const originName =
      typeof movement.originTank === "string"
        ? movement.originTank
        : movement.originTank?.name ?? ""
    const destinationName =
      typeof movement.destinationTank === "string"
        ? movement.destinationTank
        : movement.destinationTank?.name ?? ""
    const movementDate = movement.movementDate
      ? new Date(movement.movementDate).toISOString().split("T")[0]
      : ""

    const matchesSearch =
      !searchTerm ||
      [
        movement._id ?? "",
        movement.type ?? "",
        movement.client ?? "",
        originName,
        destinationName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)

    const matchesType =
      !filters.type || (movement.type ?? "").toLowerCase() === filters.type.toLowerCase()
    const matchesOriginTank =
      !filters.originTank ||
      (typeof movement.originTank === "string"
        ? movement.originTank === filters.originTank
        : movement.originTank?._id === filters.originTank)
    const matchesDestinationTank =
      !filters.destinationTank ||
      (typeof movement.destinationTank === "string"
        ? movement.destinationTank === filters.destinationTank
        : movement.destinationTank?._id === filters.destinationTank)
    const matchesClient =
      !filters.client ||
      (movement.client ?? "").toLowerCase().includes(filters.client.toLowerCase())
    const matchesDateFrom =
      !filters.dateFrom || movementDate >= filters.dateFrom
    const matchesDateTo =
      !filters.dateTo || movementDate <= filters.dateTo

    return (
      matchesSearch &&
      matchesType &&
      matchesOriginTank &&
      matchesDestinationTank &&
      matchesClient &&
      matchesDateFrom &&
      matchesDateTo
    )
  })

  const formatDate = (date?: string) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("es-CO")
  }

  const formatQuantity = (value?: number) =>
    `${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value ?? 0)} L`

  const renderType = (type?: string) => {
    if (type === "TRASLADO") return "🔁 Traslado"
    if (type === "PROCESO") return "🏭 Proceso"
    if (type === "VENTA") return "💰 Venta"
    return "-"
  }

  const renderDetails = (movement: Movement) => {
    if (movement.type === "TRASLADO") {
      const destination =
        typeof movement.destinationTank === "string"
          ? movement.destinationTank
          : movement.destinationTank?.name ?? "-"
      return `Destino: ${destination}`
    }
    if (movement.type === "PROCESO") {
      return `Proceso: ${movement.processType ?? "-"}`
    }
    if (movement.type === "VENTA") {
      return `Cliente: ${movement.client ?? "-"}`
    }
    return "-"
  }

  const handleView = (movement: Movement) => {
    setSelectedMovement(movement)
    setOpenDetails(true)
  }

  const handleDelete = (movement: Movement) => {
    setMovementToDelete(movement)
    setOpenConfirmDelete(true)
  }

  const handleConfirmDelete = async () => {
    if (!movementToDelete?._id) return
    try {
      await deleteMovementAsync(movementToDelete._id)
      setMovements(movements.filter((m) => m._id !== movementToDelete._id))
      setOpenConfirmDelete(false)
      setMovementToDelete(null)
    } catch (error) {
      console.error("Error al eliminar movimiento:", error)
    }
  }

  const columns = [
    { key: "movementDate", label: "Fecha", render: (m: Movement) => formatDate(m.movementDate) },
    { key: "type", label: "Tipo", render: (m: Movement) => renderType(m.type) },
    {
      key: "originTank",
      label: "Tanque origen",
      render: (m: Movement) =>
        typeof m.originTank === "string" ? m.originTank : m.originTank?.name ?? "-",
    },
    { key: "details", label: "Detalles", render: (m: Movement) => renderDetails(m) },
    { key: "quantity", label: "Cantidad", render: (m: Movement) => formatQuantity(m.quantity) },
    {
      key: "acciones",
      label: "Acciones",
      render: (m: Movement) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleView(m)}
            variant="outline"
            size="icon"
            className="border-amber-200 text-amber-700 hover:bg-amber-50 rounded-lg"
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleDelete(m)}
            variant="outline"
            size="icon"
            className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-amber-50/30">
      <CustomJumbotron
        title="Movimientos y Salidas de Leche"
        subtitle="Seguimiento de los movimientos de leche saliente y registros de despacho"
      />

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">

          <Card
            className="border-amber-200 hover:shadow-md transition cursor-pointer"
            onClick={() => {
              setWizardType("PROCESO")
              setOpenWizard(true)
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <FactoryIcon className="h-6 w-6" />
                Enviar a proceso
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-800">
              Registra movimientos internos para procesamiento de leche.
            </CardContent>
          </Card>


          <Card
            className="border-amber-200 hover:shadow-md transition cursor-pointer"
            onClick={() => {
              setWizardType("TRASLADO")
              setOpenWizard(true)
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <ShuffleIcon className="h-6 w-6" />
                Transferir entre tanques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-800">
              Controla traslados entre tanques y ajustes de inventario.
            </CardContent>
          </Card>

          <Card
            className="border-amber-200 hover:shadow-md transition cursor-pointer"
            onClick={() => {
              setWizardType("VENTA")
              setOpenWizard(true)
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-900">
                <ShoppingCartIcon className="h-6 w-6" />
                Venta ocasional
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-800">
              Registra ventas puntuales y salidas directas de leche.
            </CardContent>
          </Card>
          
        </div>
          <MovementsBox
            searchTerm = {searchTerm} 
            setSearchTerm={setSearchTerm}
            showFilters ={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
            tanks={tanks}
            onCreateMovement={() => {
              setWizardType(undefined)
              setOpenWizard(true)
            }}
          />

        <Card className="border-amber-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <TruckIcon className="h-5 w-5" />
              Movimientos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-800">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-amber-800">
                Mostrando{" "}
                <span className="font-semibold">{filteredMovements.length}</span>{" "}
                movimientos
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportMovementsExcel(filteredMovements)}
                className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                <DownloadIcon className="h-4 w-4" />
                Exportar
              </Button>
            </div>
            <CustomTable
              data={filteredMovements}
              columns={columns}
              emptyMessage="No se encontraron movimientos"
            />
          </CardContent>
        </Card>
      </main>
      <CreateMovementWizard
        open={openWizard}
        onClose={() => setOpenWizard(false)}
        initialType={wizardType}
        tanks={tanks}
        recentClients={recentClients}
      />
      <MovementDetailsModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        movement={selectedMovement}
      />
      <ConfirmModal
        open={openConfirmDelete}
        title="Confirmar eliminacion"
        message="Estas seguro de que deseas eliminar este movimiento? Esta accion no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setOpenConfirmDelete(false)
          setMovementToDelete(null)
        }}
        confirmText={deleting ? "Eliminando..." : "Eliminar"}
      />
    </div>
  )
}
