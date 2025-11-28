import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { StatusBadge } from "@/pages/Admin/Components/StatusBadge"
import type { StaffProps } from "../types/Staff"

interface PropsViewStaff {
  isOpen: boolean
  onClose: () => void
  staff: StaffProps | null | undefined
}

export const ViewStaff = ({ isOpen, onClose, staff }: PropsViewStaff) => {
  if (!staff) return null

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—"

    const date = new Date(dateString)
    return date.toLocaleString("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  }


  return (
    <CustomModal open={isOpen} onClose={onClose} title="Detalles del personal" size="md">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Imagen */}
        {staff.imageUrl ? (
          <img
            src={staff.imageUrl}
            alt={staff.name}
            className="w-24 h-24 rounded-full object-cover border border-amber-200 shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center rounded-full border border-dashed border-amber-300 bg-amber-50 text-amber-600">
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        {/* Información */}
        <div className="w-full text-left space-y-2">
          <p>
            <span className="font-semibold text-amber-900">Nombre:</span> {staff.name}
          </p>
          <p>
            <span className="font-semibold text-amber-900">Correo:</span> {staff.email}
          </p>
          {staff.phone && (
            <p>
              <span className="font-semibold text-amber-900">Teléfono:</span> {staff.phone}
            </p>
          )}
          <p>
            <span className="font-semibold text-amber-900">Rol:</span> {staff.role}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-amber-900">Estado:</span>
            <StatusBadge active={staff.active} />
          </p>

          <hr className="my-3 border-amber-200" />

          <p>
            <span className="font-semibold text-amber-900">Fecha de creación:</span>{" "}
            {formatDate(staff.createdAt)}
          </p>
          <p>
            <span className="font-semibold text-amber-900">Última actualización:</span>{" "}
            {formatDate(staff.updatedAt)}
          </p>
        </div>
      </div>
    </CustomModal>
  )
}
