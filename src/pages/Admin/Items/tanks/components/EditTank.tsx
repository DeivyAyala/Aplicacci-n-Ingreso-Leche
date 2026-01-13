
import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import type { TankProps } from "../types/Tank"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

interface PropsEditTank {
  open: boolean
  onClose: () => void
  tank: TankProps | null
  onSave: (updated: TankProps) => void
}

export const EditTank = ({ open, onClose, tank, onSave }: PropsEditTank) => {
  
  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors }
   } = useForm<TankProps>({
    defaultValues: {
      name: "",
      capacity: 0,
      active: true,
    }
  })

  useEffect(()=> {
    if(tank) {
       reset(tank)
    }
  }, [tank])

  const onSumbit = (data: TankProps) => {
    onSave({...data, updatedAt: new Date().toISOString() })
    onClose()
  }

  return (
    <CustomModal open={open} title="Editar tanque" onClose={onClose} size="md">
      <form className="space-y-4" onSubmit={handleSubmit(onSumbit)}>
        {/* Nombre */}
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nombre del tanque"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && (<p className="text-red-500 text-sm">{errors.name.message}</p>)}
        </div>
        

        {/* Capacidad */}
        <div>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Capacidad (litros)"
            {...register(
              "capacity", {required: "La capacidad es obligatoria", 
              min: {value: 1, message: "La capacidad debe ser al menos 1 litro"}})}
          />
          {errors.capacity && (<p className="text-red-500 text-sm">{errors.capacity.message}</p>)}
        </div>

        {/* Estado activo */}
        <div className="flex items-center justify-between">
          <input type="checkbox" {...register("active")} />
          <label className="text-sm">Activo</label>
        </div>

        {/* Botón de guardar */}
        <div className="flex justify-end pt-3">
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </CustomModal>
  )
}
