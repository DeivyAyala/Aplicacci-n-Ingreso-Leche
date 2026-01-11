import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { ImageIcon, TrashIcon } from "lucide-react"
import type { Provider } from "../types/Provider"
import { useForm } from "react-hook-form"


interface PropsEditProveedor {
  open: boolean
  onClose: () => void
  provider: Provider | null
  onSave: (updated: Provider) => void
  setSelectedFileEdit: React.Dispatch<React.SetStateAction<File | null>>
}

export const EditProvider = ({ open, onClose, provider, onSave, setSelectedFileEdit }: PropsEditProveedor) => {

  // const [form, setForm] = useState<Partial<Provider>>({})
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<Provider>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nit: "",
      address: "",
      active: true,
      imageUrl: null,
      inCharge: ""
    }
  })

    useEffect(() => {
    if (provider) {
      reset(provider)
      setPreviewImage(provider.imageUrl || null)
    }
  }, [provider])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(!file) return

    setSelectedFileEdit(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreviewImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleDeleteImage = () => {
    setPreviewImage(null)
    setSelectedFileEdit(null)
    setValue("imageUrl", null)
  }

  const onSumbit = (data: Provider) => {
    // Aquí puedes manejar el guardado de los datos editados
    onSave({ 
      ...data,
      imageUrl: previewImage ?? null,
      updatedAt: new Date().toISOString(),
     })
    onClose()
  }

  // const handleSave = () => {
  //   if (!provider) return
  //   onSave({
  //     ...provider,
  //     ...form,
  //     imageUrl: previewImage ?? null,
  //     updatedAt: new Date().toISOString().split("T")[0],
  //   })
  //   onClose()
  // }

  return (
    <CustomModal open={open} title="Editar proveedor" onClose={onClose} size="md">
      <form className="space-y-4" onSubmit={handleSubmit(onSumbit)} >
        {/* Imagen */}
        <div className="flex flex-col items-center">
          { previewImage ? (
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

        {/* Campos editables */}
        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nombre del proveedor"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Dirección"
            {...register("address")}
          />
        </div> 
        
         <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="NIT"
            {...register("nit", { 
              required: "El NIT es obligatorio",
              minLength: { value: 7, message: "NIT demasiado corto" }
            })}
          />
          {errors.nit && <p className="text-red-500 text-sm">{errors.nit.message}</p>}
        </div>

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

        <div>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Encargado"
            {...register("inCharge")}
          />
        </div>  

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
