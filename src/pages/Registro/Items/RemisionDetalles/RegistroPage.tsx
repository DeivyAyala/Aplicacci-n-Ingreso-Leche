// RegistroPage.tsx
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { useNavigate, useParams } from "react-router"
import { Notes } from "./components/Notes"
import { QuickActions } from "./components/QuickActions"
import { Firma } from "./components/Firma"
import { GeneralInfoCard } from "./components/GeneralInfoCard"
import { VolumenCard } from "./components/VolumenCard"
import { Button } from "@/components/ui/button"
import { useIngreso } from "./hook/useIngreso"

import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useOptions } from "@/pages/hook/useOptions"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import type { PropsRegitros } from "../../types/typeRegistro"



export const RegistroPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { isLoading, data, mutation } = useIngreso(id || '')
  const { providers, supervisors, analysts, tanks, loading: loadingOptions } = useOptions()

  const providerList   = providers 
  const supervisorList = supervisors
  const analystList    = analysts
  const tankList       = tanks


  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<PropsRegitros | null>(null)

  useEffect(() => {
  if (!data?.ingreso) return;

  const ingreso = data.ingreso;

  // Convertir customDate a date + time
  const fecha = new Date(ingreso.customDate);

  const date = fecha.toISOString().split("T")[0];
  const time = fecha.toISOString().split("T")[1].slice(0, 5);

  const base: PropsRegitros = {
    id: ingreso._id,
    date,
    time,
    customDate: ingreso.customDate,
    provider: ingreso.provider,
    supervisor: ingreso.supervisor,
    analyst: ingreso.analyst,
    tank: ingreso.tank,
    user: ingreso.user,
    volume: ingreso.volume,
    realVolume: ingreso.realVolume,
    notes: ingreso.notes ?? []
  };

  setFormData(base);
}, [data]);


  // DEBUG: ver shapes (quita en prod)
  useEffect(() => {
    console.log('providerList', providerList)
    console.log('formData', formData)
  }, [providerList, formData])

  if (isLoading || loadingOptions || !formData) {
    return <CustomFullScreenLoading/>
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData(prev => {
      if (!prev) return prev
      const updated = { ...prev, [name]: value }

      if (name === "date" || name === "time") {
        const newDate = name === "date" ? value : prev.date
        const newTime = name === "time" ? value : prev.time
        updated.customDate = `${newDate}T${newTime}:00.000Z`
      }

      return updated as PropsRegitros
    })
  }


  const onCustomChange = (field: keyof PropsRegitros, value: any) => {
    setFormData(prev => prev ? ({ ...prev, [field]: value } as PropsRegitros) : prev)
  }

  const handleSumbit = async (ingresoLike: Partial<PropsRegitros>) => {
    // prepara payload: backend espera ids simples para relaciones
    const payload: any = {
      ...ingresoLike,
      customDate: ingresoLike.customDate, 
      provider: (ingresoLike.provider as any)?._id ?? (ingresoLike.provider as any) ?? "",
      supervisor: (ingresoLike.supervisor as any)?._id ?? (ingresoLike.supervisor as any) ?? "",
      analyst: (ingresoLike.analyst as any)?._id ?? (ingresoLike.analyst as any) ?? "",
      tank: (ingresoLike.tank as any)?._id ?? (ingresoLike.tank as any) ?? ""
    }

    await mutation.mutateAsync(payload, {
      onSuccess: (res) => {
        toast.success('Registro actualizado correctamente')
        navigate(`/adm/registro/${res.id}`)
      },
      onError: (err) => {
        console.error(err)
        toast.error('Error al actualizar')
      }
    })
  }

  const handleSave = async () => {
    if (!formData) return
    await handleSumbit(formData)
    setIsEditing(false)
  }

  const onBack = () => navigate("/adm/historial")

  return (
    <div className="min-h-screen bg-amber-50/30">
      <div className="mb-6 px-6 pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent">
          
          Volver al Historial
        </Button>
      </div>

      <CustomJumbotron title="Detalles de Remisión" subtitle={`Registro de ${formData.provider.name} - ${formData.date}`} />

      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <GeneralInfoCard
              remission={formData}
              isEditing={isEditing}
              onInputChange={onInputChange}
              onCustomChange={onCustomChange}
              handleSave={handleSave}
              setIsEditing={setIsEditing}
              providers={providerList}
              supervisors={supervisorList}
              analysts={analystList}
              tanks={tankList}
            />
            <VolumenCard remission={formData} isEditing={isEditing} onCustomChange={onCustomChange} />
          </div>

          <div className="space-y-6">
            <QuickActions handleDelete={() => {}} isEditing={isEditing} onClickEditing={() => setIsEditing(v => !v)} />
            <Firma user={formData.user.name} date={formData.date} time={formData.time} />
            <Notes notes={formData.notes} onAddNote={() => {}} onRemoveNote={() => {}} />
          </div>
        </div>
      </main>
    </div>
  )
}
