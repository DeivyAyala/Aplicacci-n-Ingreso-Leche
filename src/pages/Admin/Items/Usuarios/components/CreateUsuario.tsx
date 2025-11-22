import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { ImageIcon } from "lucide-react"
import type { UserRole } from "../types/User"

interface UserForm {
  name: string
  lastName: string
  email: string
  phone: string
  rol: UserRole
  password: string
  imageUrl?: string
}

interface PropsCreateUsuario {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  previewImage: string | null
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  newUser: UserForm
  setNewUser: React.Dispatch<React.SetStateAction<UserForm>>
  handleCreate: () => void
}

export const CreateUsuario = ({
  isModalOpen,
  setIsModalOpen,
  previewImage,
  handleImageChange,
  newUser,
  setNewUser,
  handleCreate,
}: PropsCreateUsuario) => {
  return (
    <CustomModal
      open={isModalOpen}
      title="Agregar nuevo usuario"
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

        {/* Campos */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Apellidos"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Correo electrónico"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Teléfono"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />

        {/* Rol */}
        <select
          className="w-full border rounded-lg px-3 py-2 bg-white"
          value={newUser.rol}
          onChange={(e) => setNewUser({ ...newUser, rol: e.target.value as UserRole })}
        >
          <option value="Administrador">Administrador</option>
          <option value="Operador">Operador</option>
        </select>

        {/* Contraseña predeterminada */}
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Contraseña predeterminada"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
