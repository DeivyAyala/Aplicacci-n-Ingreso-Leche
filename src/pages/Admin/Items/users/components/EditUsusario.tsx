import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { ImageIcon, TrashIcon } from "lucide-react"
import type { User, UserRole } from "../types/User"

interface PropsEditUsuario {
  open: boolean
  onClose: () => void
  user: User | null
  onSave: (updated: User) => void
}

export const EditUsuario = ({ open, onClose, user, onSave }: PropsEditUsuario) => {
  const [form, setForm] = useState<Partial<User>>({})
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setForm(user)
      setPreviewImage(user.imageUrl || null)
    }
  }, [user])

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
    if (!user) return
    onSave({
      ...user,
      ...form,
      imageUrl: previewImage ?? null,
    } as User)
    onClose()
  }

  return (
    <CustomModal open={open} title="Editar usuario" onClose={onClose} size="md">
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
          placeholder="Nombre"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Apellidos"
          value={form.lastName || ""}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Correo electrónico"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Teléfono"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* Rol */}
        <select
          className="w-full border rounded-lg px-3 py-2 bg-white"
          value={form.rol || "Operador"}
          onChange={(e) => setForm({ ...form, rol: e.target.value as UserRole })}
        >
          <option value="Administrador">Administrador</option>
          <option value="Operador">Operador</option>
        </select>

        <div className="flex justify-end pt-3">
          <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 text-white">
            Guardar cambios
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
