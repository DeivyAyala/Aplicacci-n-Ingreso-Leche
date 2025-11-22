import React from "react"
import { XIcon } from "lucide-react"

interface CustomModalProps {
  open: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export const CustomModal = ({
  open,
  title,
  onClose,
  children,
  size = "md",
}: CustomModalProps) => {
  if (!open) return null

  
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl border border-amber-100 w-full ${sizeClasses[size]} mx-4 relative animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-amber-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-amber-700 hover:text-amber-900 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
