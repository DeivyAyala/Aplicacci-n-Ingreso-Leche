import { useState, useEffect, useRef } from "react"
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
  const menuRef = useRef<HTMLDivElement>(null)

  // 👇 Detectar clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    // Limpieza al desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div ref={menuRef} className="relative flex justify-center">
      <Button
        variant="outline"
        size="sm"
        className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
        onClick={() => setOpen((prev) => !prev)}
      >
        Elegir Acción <MoreVerticalIcon className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-10 bg-white border border-amber-200 rounded-md shadow-lg z-20 w-40">
          <div className="px-3 py-2 border-b text-sm font-semibold text-amber-800">
            Acciones
          </div>
          <button
            onClick={() => {
              setOpen(false)
              onEdit?.()
            }}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-amber-700 hover:bg-amber-50"
          >
            <EditIcon className="h-4 w-4" /> Editar
          </button>

          {isActive !== undefined && (
            <button
              onClick={() => {
                setOpen(false)
                onToggleActive?.()
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-amber-700 hover:bg-amber-50"
            >
              <BanIcon className="h-4 w-4" /> {isActive ? "Desactivar" : "Activar"}
            </button>
          )}

          <button
            onClick={() => {
              setOpen(false)
              onDelete?.()
            }}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" /> Eliminar
          </button>
        </div>
      )}
    </div>
  )
}
