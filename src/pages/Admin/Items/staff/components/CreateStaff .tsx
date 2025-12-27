import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import type { StaffProps } from "../types/Staff"


interface PropsCreateStaff {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  previewImage: string | null
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCreate: (formData: StaffProps) => void
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>
}

export const CreateStaff = ({
  isModalOpen,
  setIsModalOpen,
  previewImage,
  handleImageChange,
  handleCreate, 
  setPreviewImage,
  setSelectedFile
}: PropsCreateStaff) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<StaffProps>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "Supervisor",
      imageUrl: null
    }
  })

  // resetea el formulario cuando se abre/cierra
useEffect(() => {
  if (!isModalOpen) {
    reset();              // limpiamos el formulario
    setPreviewImage(null) // limpiamos imagen
    setSelectedFile(null) // limpiamos file en el padre (debes pasarlo como prop)
  }
}, [isModalOpen]);


  const onSubmit = (data: StaffProps) => {
    handleCreate(data)
  }

  return (
    <CustomModal
      open={isModalOpen}
      title="Agregar nuevo personal"
      onClose={() => setIsModalOpen(false)}
      size="md"
    >
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Imagen */}
        <div className="flex flex-col items-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Vista previa"
              className="w-24 h-24 rounded-full object-cover border border-amber-300 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full border border-dashed border-amber-300 text-amber-600 bg-amber-50">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}

          <label className="mt-3 cursor-pointer text-sm text-amber-700 font-medium hover:underline">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            Subir imagen
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
            placeholder="Correo electrónico"
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
              minLength: { value: 7, message: "Teléfono demasiado corto" }
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

        {/* Botón */}
        <div className="flex justify-end pt-3">
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Guardar
          </Button>
        </div>
      </form>
    </CustomModal>
  )
}
