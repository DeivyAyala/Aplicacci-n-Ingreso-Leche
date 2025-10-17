
import { useState } from "react"
import { BanIcon, EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionMenuProps {
  onEdit?: () => void
  onToggleActive?: () => void
  onDelete?: () => void
  isActive?: boolean
}

export const ActionMenu = ({ onEdit, onToggleActive, onDelete, isActive }: ActionMenuProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative flex justify-center">
      <Button
        variant="outline"
        size="sm"
        className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
        onClick={() => setOpen(!open)}
      >
        Elegir Acción <MoreVerticalIcon className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-10 bg-white border border-amber-200 rounded-md shadow-md z-50 w-40">
          <div className="px-3 py-2 border-b text-sm font-semibold text-amber-800">Acciones</div>
          <button
            onClick={onEdit}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-amber-700 hover:bg-amber-50"
          >
            <EditIcon className="h-4 w-4" /> Editar
          </button>
          <button
            onClick={onToggleActive}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-amber-700 hover:bg-amber-50"
          >
            <BanIcon className="h-4 w-4" /> {isActive ? "Desactivar" : "Activar"}
          </button>
          <button
            onClick={onDelete}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" /> Eliminar
          </button>
        </div>
      )}
    </div>
  )
}
