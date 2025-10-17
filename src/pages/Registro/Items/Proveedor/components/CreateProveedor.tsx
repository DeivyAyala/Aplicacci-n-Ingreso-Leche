import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Registro/Components/CustomModal"
import { ImageIcon } from "lucide-react"

interface ProviderForm {
  name: string
  nit: string
  email: string
  phone: string
  inCharge: string
  imageUrl?: string
}


interface propsCreateProveedor {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    previewImage: string | null
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    newProvider: ProviderForm
    setNewProvider:  React.Dispatch<React.SetStateAction<ProviderForm>>
    handleCreate: () => void
}

export const CreateProveedor = ({
    isModalOpen,
    setIsModalOpen, 
    previewImage, 
    handleImageChange, 
    newProvider, 
    setNewProvider, 
    handleCreate
}: propsCreateProveedor) => {


  return (
    <CustomModal
        open={isModalOpen}
        title="Agregar nuevo proveedor"
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <div className="space-y-3">
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
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nombre del proveedor"
            value={newProvider.name}
            onChange={(e) =>
              setNewProvider({ ...newProvider, name: e.target.value })
            }
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="NIT"
            value={newProvider.nit}
            onChange={(e) =>
              setNewProvider({ ...newProvider, nit: e.target.value })
            }
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Correo electrónico"
            value={newProvider.email}
            onChange={(e) =>
              setNewProvider({ ...newProvider, email: e.target.value })
            }
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Teléfono"
            value={newProvider.phone}
            onChange={(e) =>
              setNewProvider({ ...newProvider, phone: e.target.value })
            }
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Encargado"
            value={newProvider.inCharge}
            onChange={(e) =>
              setNewProvider({ ...newProvider, inCharge: e.target.value })
            }
          />
          <div className="flex justify-end pt-3">
            <Button
              onClick={handleCreate}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Guardar
            </Button>
          </div>
        </div>
      </CustomModal>
  )
}
