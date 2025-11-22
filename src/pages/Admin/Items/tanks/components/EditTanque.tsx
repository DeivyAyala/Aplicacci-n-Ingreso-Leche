import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import type { TankProps } from "../types/Tank"
import { SimpleSwitch as Switch } from "@/components/ui/SimpleSwitch"

interface PropsEditTanque {
  open: boolean
  onClose: () => void
  tank: TankProps | null
  onSave: (updated: TankProps) => void
}

export const EditTanque = ({ open, onClose, tank, onSave }: PropsEditTanque) => {
  const [form, setForm] = useState<Partial<TankProps>>({})

  useEffect(() => {
    if (tank) {
      setForm(tank)
    }
  }, [tank])

  const handleSave = () => {
    if (!tank) return
    onSave({
      ...tank,
      ...form,
      updatedAt: new Date().toISOString().split("T")[0],
    })
    onClose()
  }

  return (
    <CustomModal open={open} title="Editar tanque" onClose={onClose} size="md">
      <div className="space-y-4">
        {/* Nombre */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Nombre del tanque"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Capacidad */}
        <input
          type="number"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Capacidad (litros)"
          value={form.capacity ?? ""}
          onChange={(e) =>
            setForm({ ...form, capacity: Number(e.target.value) })
          }
        />

        {/* Estado activo */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Activo</label>
          <Switch
            checked={form.active ?? false}
            onChange={(val) => setForm({ ...form, active: val })}
          />
        </div>

        {/* Botón de guardar */}
        <div className="flex justify-end pt-3">
          <Button
            onClick={handleSave}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
