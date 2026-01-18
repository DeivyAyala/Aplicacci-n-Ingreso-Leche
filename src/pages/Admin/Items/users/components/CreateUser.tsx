import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { ImageIcon } from "lucide-react"
import type { User } from "../types/User"
import { useForm } from "react-hook-form"
import { useEffect } from "react"


interface PropsCreateUser {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  previewImage: string | null
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCreate: (formData: User) => void
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>
}

export const CreateUser = ({
  isModalOpen,
  setIsModalOpen,
  previewImage,
  handleImageChange,
  handleCreate,
  setSelectedFile,
  setPreviewImage
}: PropsCreateUser) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<User>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      rol: "Operador",
      imageUrl: null
    }
  })

  useEffect(() => {
    if(!isModalOpen){
      reset()
      setPreviewImage(null)
      setSelectedFile(null)
    }
  }, [ isModalOpen ])

  const onSunmit = (data: User) => {
    handleCreate(data)
  }

  return (
    <CustomModal
      open={isModalOpen}
      title="Agregar nuevo usuario"
      onClose={() => setIsModalOpen(false)}
      size="md"
    >
      <form className="space-y-3" onSubmit={handleSubmit(onSunmit)} >
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

        {/* Campos */}
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nombre"
           {...register("name", {required: "El nombre es obligatorio" })}
          />
          {errors.name && (<p className="text-red-500 text-sm">{errors.name.message}</p>)}
        </div>
        
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Apellidos"
             {...register("lastName", {required: "El Apellido es obligatorio" })}
          />
          {errors.lastName && (<p className="text-red-500 text-sm">{errors.lastName.message}</p>)}
        </div>
        
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Correo electrónico"
           {...register("email", {
              required: "El Email es obligatorio", 
              pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" }  
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Teléfono"
          {...register("phone")}
        />

        {/* Rol */}
        <select
          className="w-full border rounded-lg px-3 py-2 bg-white"
          {...register("rol")}
          defaultValue="Operador"
        >
          <option value="Operador">Operador</option>
          <option value="Administrador">Administrador</option>
        </select>


        {/* Contraseña predeterminada */}
        <div>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Contraseña predeterminada"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        


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
