import { CustomModal } from "@/pages/Registro/Components/CustomModal"
import type { User } from "../types/User"






interface PropsViewUsuario {
  isOpen: boolean
  onClose: () => void
  user: User | null | undefined
}

export const ViewUser = ({ isOpen, onClose, user }: PropsViewUsuario) => {
     if (!user) return null
  return (
    <CustomModal open={isOpen} onClose={onClose} title="Detalles del usuario" size="md">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Imagen */}
        <img
          src={user.imageUrl}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border border-amber-200 shadow-sm"
        />

        {/* Información */}
        <div className="w-full text-left space-y-2">
          <p><span className="font-semibold text-amber-900">Nombre:</span> {user.name} {user.lastName}</p>
          <p><span className="font-semibold text-amber-900">Correo:</span> {user.email}</p>
          <p><span className="font-semibold text-amber-900">Teléfono:</span> {user.phone}</p>
          <p><span className="font-semibold text-amber-900">Rol:</span> {user.rol}</p>
          {/* <p className="flex items-center gap-2">
            <span className="font-semibold text-amber-900">Estado:</span>
            <StatusBadge active={user.active} />
          </p> */}

          <hr className="my-3 border-amber-200" />

          <p><span className="font-semibold text-amber-900">Fecha de creación:</span> {user.createdAt}</p>
          <p><span className="font-semibold text-amber-900">Última actualización:</span> {user.updatedAt}</p>
        </div>
      </div>
    </CustomModal>
  )
}
