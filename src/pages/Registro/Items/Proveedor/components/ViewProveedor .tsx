import { CustomModal } from "@/pages/Registro/Components/CustomModal"
import { StatusBadge } from "@/pages/Registro/Components/StatusBadge"
import type { Provider } from "../types/Provider"




interface PropsViewProveedor {
  isOpen: boolean
  onClose: () => void
  provider: Provider | null | undefined
}

export const ViewProveedor = ({ isOpen, onClose, provider }: PropsViewProveedor) => {
  if (!provider) return null

  return (
    <CustomModal open={isOpen} onClose={onClose} title="Detalles del proveedor" size="md">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Imagen */}
        <img
          src={provider.imageUrl}
          alt={provider.name}
          className="w-24 h-24 rounded-full object-cover border border-amber-200 shadow-sm"
        />

        {/* Información */}
        <div className="w-full text-left space-y-2">
          <p><span className="font-semibold text-amber-900">Nombre:</span> {provider.name}</p>
          <p><span className="font-semibold text-amber-900">NIT:</span> {provider.nit}</p>
          <p><span className="font-semibold text-amber-900">Correo:</span> {provider.email}</p>
          <p><span className="font-semibold text-amber-900">Teléfono:</span> {provider.phone}</p>
          <p><span className="font-semibold text-amber-900">Encargado:</span> {provider.inCharge}</p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-amber-900">Estado:</span>
            <StatusBadge active={provider.active} />
          </p>

          <hr className="my-3 border-amber-200" />

          <p><span className="font-semibold text-amber-900">Fecha de creación:</span> {provider.createdAt}</p>
          <p><span className="font-semibold text-amber-900">Última actualización:</span> {provider.updatedAt}</p>
        </div>
      </div>
    </CustomModal>
  )
}
