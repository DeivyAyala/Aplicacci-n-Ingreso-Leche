import { Button } from "@/components/ui/button"
import { CustomModal } from "@/pages/Admin/Components/CustomModal"
import { SimpleSwitch as Switch } from "@/components/ui/SimpleSwitch"

interface TankForm {
  name: string
  capacity: number
  active: boolean
}

interface PropsCreateTanque {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  newTank: TankForm
  setNewTank: React.Dispatch<React.SetStateAction<TankForm>>
  handleCreate: () => void
}

export const CreateTanque = ({
  isModalOpen,
  setIsModalOpen,
  newTank,
  setNewTank,
  handleCreate,
}: PropsCreateTanque) => {
  return (
    <CustomModal
      open={isModalOpen}
      title="Agregar nuevo tanque"
      onClose={() => setIsModalOpen(false)}
      size="md"
    >
      <div className="space-y-4">
        {/* Nombre del tanque */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Nombre del tanque"
          value={newTank.name}
          onChange={(e) => setNewTank({ ...newTank, name: e.target.value })}
        />

        {/* Capacidad */}
        <input
          type="number"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Capacidad (litros)"
          value={newTank.capacity}
          onChange={(e) =>
            setNewTank({ ...newTank, capacity: Number(e.target.value) })
          }
        />

        {/* Estado activo */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Activo</label>
          <Switch
            checked={newTank.active}
            onChange={(val) => setNewTank({ ...newTank, active: val })}
          />
        </div>

        {/* Botón guardar */}
        <div className="flex justify-end pt-3">
          <Button
            onClick={handleCreate}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Guardar
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
