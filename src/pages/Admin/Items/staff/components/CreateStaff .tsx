import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { ImageIcon } from "lucide-react"

export type StaffRole = "Calidad" | "Supervisor"

export interface StaffForm {
  name: string
  email: string
  phone?: string
  role: StaffRole
  imageUrl?: string | null
}

interface PropsCreateStaff {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  previewImage: string | null
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  newStaff: StaffForm
  setNewStaff: React.Dispatch<React.SetStateAction<StaffForm>>
  handleCreate: () => void
}

export const CreateStaff = ({
  isModalOpen,
  setIsModalOpen,
  previewImage,
  handleImageChange,
  newStaff,
  setNewStaff,
  handleCreate
}: PropsCreateStaff) => {
  return (
    <CustomModal
      open={isModalOpen}
      title="Agregar nuevo personal"
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

        {/* Nombre */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Nombre del personal"
          value={newStaff.name}
          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        />

        {/* Correo */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Correo electrónico"
          value={newStaff.email}
          onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
        />

        {/* Teléfono */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Teléfono"
          value={newStaff.phone || ""}
          onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
        />

        {/* Rol */}
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={newStaff.role}
          onChange={(e) =>
            setNewStaff({ ...newStaff, role: e.target.value as StaffRole })
          }
        >
          <option value="">Seleccionar rol</option>
          <option value="Calidad">Calidad</option>
          <option value="Supervisor">Supervisor</option>
        </select>

        {/* Botón */}
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
