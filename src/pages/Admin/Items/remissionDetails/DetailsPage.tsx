// RegistroPage.tsx
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { useNavigate, useParams } from "react-router"
import { Notes } from "./components/Notes"
import { QuickActions } from "./components/QuickActions"
import { GeneralInfoCard } from "./components/GeneralInfoCard"
import { VolumenCard } from "./components/VolumenCard"
import { Button } from "@/components/ui/button"
import { useIngreso } from "./hook/useIngresobyId"
import { toast } from "sonner"
import { useEffect, useMemo, useState } from "react"
import { useOptions } from "@/pages/hook/useOptions"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import type { PropsRegitros } from "../../types/typeRegistro"
import { useQueryClient } from "@tanstack/react-query"
import { Firm } from "./components/Firm"
import { useDeleteRemission } from "../../hook/useDeleteRemission"



export const DetailsPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { id } = useParams()


  
  const { isLoading, data , mutation } = useIngreso(id || '')
  const { providers, supervisors, analysts, tanks, loading: loadingOptions } = useOptions()
  
  const { deleteRemission, isPending } = useDeleteRemission() 

  const handleDelete = () => {
    deleteRemission(id)
    navigate('/adm/remission')
  }



  


  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<PropsRegitros | null>(null)

  useEffect(() => {
    if (!data?.ingreso) return;

    const ingreso = data.ingreso;
    const fecha = new Date(ingreso.customDate);
    

    const date = fecha.toISOString().split("T")[0];
    const time = fecha.toISOString().split("T")[1].slice(0, 5);

    const base: PropsRegitros = {
      id: ingreso._id,
      date,
      time,
      customDate: ingreso.customDate,

      provider: ingreso.provider ?? { _id: "", name: "Proveedor eliminado" },
      supervisor: ingreso.supervisor ?? { _id: "", name: "Supervisor eliminado" },
      analyst: ingreso.analyst ?? { _id: "", name: "Analista eliminado" },
      tank: ingreso.tank ?? { _id: "", name: "Tanque eliminado" },

      user: ingreso.user ?? { _id: "", name: "Usuario eliminado" },

      volume: ingreso.volume,
      realVolume: ingreso.realVolume,
      notes: ingreso.notes ?? [],
    };

    setFormData(base);
  }, [data]);

  const isSelectedTankFull = useMemo(() => {
    const selectedId = formData?.tank?._id
    if (!selectedId) return false
    const selected = tanks.find(t => t._id === selectedId)
    return !!selected && selected.currentCapacity >= selected.capacity
  }, [formData?.tank?._id, tanks])

  if ( loadingOptions || !formData || isPending) {
    return <CustomFullScreenLoading/>
  }

  if( isLoading ){
    return <CustomFullScreenLoading message="Cargando Detalles de la Remission"/>
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
    const payload: any = {
      ...ingresoLike,
      notes: ingresoLike.notes ?? [],
      customDate: ingresoLike.customDate, 
      provider: (ingresoLike.provider as any)?._id ?? (ingresoLike.provider as any) ?? "",
      supervisor: (ingresoLike.supervisor as any)?._id ?? (ingresoLike.supervisor as any) ?? "",
      analyst: (ingresoLike.analyst as any)?._id ?? (ingresoLike.analyst as any) ?? "",
      tank: (ingresoLike.tank as any)?._id ?? (ingresoLike.tank as any) ?? ""
    }

    await mutation.mutateAsync(payload, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["ingreso", res.id]); 
        toast.success('Registro actualizado correctamente')
      },
      onError: (err) => {
        console.error(err)
        toast.error('Error al actualizar')
      }
    })
  }

  const handleSave = async () => {
    if (!formData) return
      if (!formData.provider) {
      toast.error("Debes seleccionar un proveedor activo");
      return;
    }
    if (isSelectedTankFull) {
      toast.error("El tanque seleccionado esta lleno. Selecciona otro tanque")
      return
    }
    await handleSumbit(formData)
    setIsEditing(false)
  }

  const handleAddNote = (note: string) => {
    setFormData(prev =>
      prev
        ? ({
            ...prev,
            notes: [...(prev.notes ?? []), note],
          } as PropsRegitros)
        : prev
    )
  }

const handleRemoveNote = (index: number) => {
  setFormData(prev =>
    prev
      ? ({
          ...prev,
          notes: prev.notes?.filter((_, i) => i !== index) ?? [],
        } as PropsRegitros)
      : prev
  )
}



  const onBack = () => navigate("/adm/remission")

  return (
    <div className="min-h-screen bg-amber-50/30">
      <div className="mb-6 px-6 pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent">
          
          Volver al Historial
        </Button>
      </div>

      <CustomJumbotron 
        title="Detalles de Remisión" 
        subtitle={`Registro de ${formData.provider?.name ?? "Proveedor eliminado"} - ${formData.date}`} 
      />

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
              isTankFull={isSelectedTankFull}
              providers={providers}
              supervisors={supervisors}
              analysts={analysts}
              tanks={tanks}
            />
            <VolumenCard 
              remission={formData} 
              isEditing={isEditing} 
              onCustomChange={onCustomChange} 
            />
          </div>

          <div className="space-y-6">
            <QuickActions 
              handleDelete={handleDelete} 
              isEditing={isEditing} 
              onClickEditing={() => setIsEditing(v => !v)} 
            />
            <Firm 
              user={formData.user.name} 
              date={formData.date} 
              time={formData.time} 
            />

            <Notes
              isEditing={isEditing}
              notes={formData.notes} 
              onAddNote={handleAddNote} 
              onRemoveNote={handleRemoveNote} 
            />
          </div>
        </div>
      </main>
    </div>
  )
}
