import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { StatusBadge } from "@/pages/Admin/Components/StatusBadge"
import type { TankProps } from "../types/Tank"

interface PropsViewTank {
  isOpen: boolean
  onClose: () => void
  tank: TankProps | null | undefined
}

export const ViewTank = ({ isOpen, onClose, tank }: PropsViewTank) => {
  if (!tank) return null

  return (
    <CustomModal open={isOpen} onClose={onClose} title="Detalles del tanque" size="md">
      <div className="flex flex-col items-center gap-4 text-center">

        {/* Imagen fija del tanque */}
        <img
          src="https://img.freepik.com/vector-premium/tanque-almacenamiento-leche-isometrica_592324-1634.jpg"
          alt="Tanque"
          className="w-28 h-28 rounded-full object-cover border border-amber-200 shadow-sm"
        />

        {/* Información del tanque */}
        <div className="w-full text-left space-y-2">
          <p>
            <span className="font-semibold text-amber-900">Nombre:</span> {tank.name}
          </p>
          <p>
            <span className="font-semibold text-amber-900">Capacidad:</span> {tank.capacity} litros
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-amber-900">Estado:</span>
            <StatusBadge active={tank.active} />
          </p>
          <p>
            <span className="font-semibold text-amber-900">Capacidad Actual:</span> {tank.currentCapacity} litros
          </p>

          <hr className="my-3 border-amber-200" />

          <p>
            <span className="font-semibold text-amber-900">Fecha de creación:</span>{" "}
            {tank.createdAt || "—"}
          </p>
          <p>
            <span className="font-semibold text-amber-900">Última actualización:</span>{" "}
            {tank.updatedAt || "—"}
          </p>
        </div>
      </div>
    </CustomModal>
  )
}
