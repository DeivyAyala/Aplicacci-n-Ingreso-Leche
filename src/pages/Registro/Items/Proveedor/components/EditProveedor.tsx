import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Registro/Components/CustomModal"
import { ImageIcon, TrashIcon } from "lucide-react"
import type { Provider } from "../types/Provider"


interface PropsEditProveedor {
  open: boolean
  onClose: () => void
  provider: Provider | null
  onSave: (updated: Provider) => void
}

export const EditProveedor = ({ open, onClose, provider, onSave }: PropsEditProveedor) => {
  // const [form, setForm] = useState({
  //   name: provider?.name || "",
  //   nit: provider?.nit || "",
  //   email: provider?.email || "",
  //   phone: provider?.phone || "",
  //   inCharge: provider?.inCharge || "",
  //   imageUrl: provider?.imageUrl || null,
  // })

  const [form, setForm] = useState<Partial<Provider>>({})
  const [previewImage, setPreviewImage] = useState<string | null>(null)

    useEffect(() => {
    if (provider) {
      setForm(provider)
      setPreviewImage(provider.imageUrl || null)
    }
  }, [provider])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setPreviewImage(null)
    setForm((prev) => ({ ...prev, imageUrl: null }))
  }

  const handleSave = () => {
    if (!provider) return
    onSave({
      ...provider,
      ...form,
      imageUrl: previewImage ?? null,
      updatedAt: new Date().toISOString().split("T")[0],
    })
    onClose()
  }

  return (
    <CustomModal open={open} title="Editar proveedor" onClose={onClose} size="md">
      <div className="space-y-4">
        {/* Imagen */}
        <div className="flex flex-col items-center">
          {form.imageUrl ? (
            <div className="relative">
              <img
                src={form.imageUrl}
                alt="Vista previa"
                className="w-24 h-24 rounded-full object-cover border border-amber-300 shadow-sm"
              />
              <button
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
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            {form.imageUrl ? "Cambiar imagen" : "Subir imagen"}
          </label>
        </div>

        {/* Campos editables */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Nombre del proveedor"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="NIT"
          value={form.nit}
          onChange={(e) => setForm({ ...form, nit: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Encargado"
          value={form.inCharge}
          onChange={(e) => setForm({ ...form, inCharge: e.target.value })}
        />

        <div className="flex justify-end pt-3">
          <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 text-white">
            Guardar cambios
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
