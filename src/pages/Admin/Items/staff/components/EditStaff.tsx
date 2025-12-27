import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { ImageIcon, TrashIcon } from "lucide-react"
import type { StaffProps } from "../types/Staff"
import { useForm } from "react-hook-form"

interface PropsEditStaff {
  open: boolean
  onClose: () => void
  staff: StaffProps | null
  onSave: (updated: StaffProps) => void
  setSelectedFileEdit: React.Dispatch<React.SetStateAction<File | null>>
}

export const EditStaff = ({ open, onClose, staff, onSave, setSelectedFileEdit }: PropsEditStaff) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

    const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<StaffProps>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "Supervisor",
      active: true,
      imageUrl: null
    }
  })

  useEffect(() => {
    if (staff) {
      reset(staff)
      setPreviewImage(staff.imageUrl || null)
    }
  }, [staff, reset])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFileEdit(file)

    const reader = new FileReader()
    reader.onloadend = () => setPreviewImage(reader.result as string)
    reader.readAsDataURL(file)

    setValue("imageUrl", null) // Se actualizará luego desde el backend
  };

  const handleDeleteImage = () => {
    setPreviewImage(null)
    setSelectedFileEdit(null)
    setValue("imageUrl", null)
  }


  const onSubmit = (formData: StaffProps) => {
    onSave({
      ...formData,
      imageUrl: previewImage ?? null,
      updatedAt: new Date().toISOString(),
    })

    onClose()
  }

  return (
    <CustomModal open={open} title="Editar personal" onClose={onClose} size="md">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Imagen */}
        <div className="flex flex-col items-center">
          {previewImage ? (
            <div className="relative">
              <img
                src={previewImage}
                className="w-24 h-24 rounded-full object-cover border border-amber-300 shadow-sm"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute -top-2 -right-2 bg-white border border-amber-300 rounded-full p-1 hover:bg-amber-100"
              >
                <TrashIcon className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full border border-dashed border-amber-300 text-amber-600 bg-amber-50">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}

          <label className="mt-3 cursor-pointer text-sm text-amber-700 font-medium hover:underline">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            Cambiar imagen
          </label>
        </div>

        {/* Nombre */}
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nombre"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Correo"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Teléfono"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              minLength: { value: 7, message: "Teléfono muy corto" }
            })}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Rol */}
        <select
          className="w-full border rounded-lg px-3 py-2"
          {...register("role", { required: "El rol es obligatorio" })}
        >
          <option value="Supervisor">Supervisor</option>
          <option value="Calidad">Calidad</option>
        </select>

        {/* Activo */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("active")} />
          <label className="text-sm">Activo</label>
        </div>

        <div className="flex justify-end pt-3">
          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
            Guardar cambios
          </Button>
        </div>
      </form>
    </CustomModal>
  )
}
