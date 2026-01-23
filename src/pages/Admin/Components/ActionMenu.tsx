import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { BanIcon, EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionMenuProps {
  onEdit?: () => void
  onToggleActive?: () => void
  onDelete?: () => void
  isActive?: boolean
}

export const ActionMenu = ({
  onEdit,
  onToggleActive,
  onDelete,
  isActive,
}: ActionMenuProps) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        portalRef.current &&
        !portalRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (!rect) return
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right,
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [open])

  return (
    <div ref={menuRef} className="relative z-10 flex justify-center">
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
        onClick={() => setOpen((prev) => !prev)}
      >
        Elegir Acción <MoreVerticalIcon className="h-4 w-4" />
      </Button>

      {open &&
        createPortal(
          <div
            ref={portalRef}
            className="fixed z-[9999] w-40 rounded-md border border-amber-200 bg-white shadow-lg"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              transform: "translateX(-100%)",
            }}
          >
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
          </div>,
          document.body
        )}
    </div>
  )
}
