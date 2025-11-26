
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomModal } from "./CustomModal"

interface ConfirmModalProps {
  open: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  size?: "sm" | "md" | "lg" | "xl"
}

export const ConfirmModal = ({
  open,
  title = "Confirmación",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  size = "sm",
}: ConfirmModalProps) => {
  return (
    <CustomModal open={open} onClose={onCancel} size={size} title={title}>
      <div className="flex flex-col items-center text-center space-y-4">
        
        <AlertTriangle className="h-12 w-12 text-amber-600" />

        <p className="text-amber-800 text-sm">{message}</p>

        <div className="flex gap-3 w-full justify-center pt-2">
          <Button
            variant="ghost"
            className="border border-amber-300 text-amber-700 hover:bg-amber-50"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
