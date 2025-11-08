import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { useNavigate, useParams } from "react-router"
import { Notes } from "./components/Notes"
import { QuickActions } from "./components/QuickActions"
import { Firma } from "./components/Firma"
import { GeneralInfoCard } from "./components/GeneralInfoCard"
import { VolumenCard } from "./components/VolumenCard"
import { useRegistro } from "@/pages/hook/useRegistro"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { useIngreso } from "../../hook/useIngreso"

export const RegistroPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useIngreso()

  const onBack = () => navigate("/adm/historial")

  // ✅ Esperar que los datos se carguen
  if (isLoading) {
    return <p className="text-center mt-20 text-amber-800">Cargando datos...</p>
  }

  // ✅ Buscar el ingreso por ID
  const ingreso = data?.ingresos?.find((item) => item._id === id)

  if (!ingreso) {
    return (
      <div className="text-center mt-20 text-amber-800">
        <p>No se encontró el registro solicitado.</p>
        <Button onClick={onBack} className="mt-4">
          Volver al Historial
        </Button>
      </div>
    )
  }

  // ✅ Procesar los datos para mostrarlos correctamente
  const fecha = new Date(ingreso.customDate)
  const date = fecha.toISOString().split("T")[0]
  const time = fecha.toISOString().split("T")[1].slice(0, 5)

  const remission = {
    id: ingreso._id,
    date,
    time,
    provider: ingreso.provider?.name || "Sin proveedor",
    volume: ingreso.volume,
    realVolume: ingreso.realVolume,
    user: ingreso.user?.name || "Sin usuario",
    notes: ingreso.notes || [],
    supervisor: ingreso.supervisor?.name || "",
    analyst: ingreso.analyst?.name || "",
    tank: ingreso.tank?.name || "Sin tanque",
  }

  const {
    isEditing,
    setIsEditing,
    onInputChange,
    onCustomChange,
    addNote,
    removeNote,
    handleSave,
    handleDelete,
  } = useRegistro(remission.id)

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Botón Volver */}
      <div className="mb-6 px-6 pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver al Historial
        </Button>
      </div>

      {/* Encabezado */}
      <CustomJumbotron
        title="Detalles de Remisión"
        subtitle={`Registro de ${remission.provider} - ${remission.date}`}
      />

      {/* Contenido principal */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 space-y-6">
            <GeneralInfoCard
              remission={remission}
              isEditing={isEditing}
              onInputChange={onInputChange}
              onCustomChange={onCustomChange}
              handleSave={handleSave}
              setIsEditing={setIsEditing}
            />

            <VolumenCard
              remission={remission}
              isEditing={isEditing}
              onCustomChange={onCustomChange}
            />
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            <QuickActions
              handleDelete={handleDelete}
              isEditing={isEditing}
              onClickEditing={() => setIsEditing(!isEditing)}
            />

            <Firma user={remission.user} date={remission.date} time={remission.time} />

            <Notes notes={remission.notes} onAddNote={addNote} onRemoveNote={removeNote} />
          </div>
        </div>
      </main>
    </div>
  )
}
