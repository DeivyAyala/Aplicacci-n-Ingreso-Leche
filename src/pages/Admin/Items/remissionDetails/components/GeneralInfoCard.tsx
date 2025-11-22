// GeneralInfoCard.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, BarrelIcon, CalendarIcon, ClockIcon, EditIcon, SaveIcon, TruckIcon, UserCheck } from "lucide-react"
import { InputCard } from "./InputsCard"
import type { PropsRegitros } from '../../../types/typeRegistro'
import type { Provider } from "../../Proveedor/types/Provider"
import type { StaffProps } from "../../Personal/types/Staff"
import type { TankProps } from "../../Tanques/types/Tank"


interface GeneralInfoProps {
  remission: PropsRegitros
  isEditing: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCustomChange: <K extends keyof PropsRegitros>(field: K, value: PropsRegitros[K]) => void
  handleSave: () => void
  setIsEditing: (value: boolean) => void
  providers: Provider[]  // array directo
  supervisors: StaffProps[]
  analysts: StaffProps[]
  tanks: TankProps[]
}

export const GeneralInfoCard = ({
  remission,
  isEditing,
  onInputChange,
  onCustomChange,
  handleSave,
  setIsEditing,
  providers,
  supervisors,
  analysts,
  tanks,
}: GeneralInfoProps) => {

  return (
    <Card className="border-amber-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-amber-900">
          <img src="/public/IconoLeche.png" alt="Remisión" className="h-8 w-8 rounded object-cover border border-amber-200" />
          Información General
        </CardTitle>

        <div className="flex gap-2">
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="border-amber-200 text-amber-700 hover:bg-amber-50">
              <EditIcon className="h-4 w-4 mr-1" /> Editar
            </Button>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="border-gray-200 text-gray-700 hover:bg-gray-50">Cancelar</Button>
              <Button size="sm" onClick={handleSave} className="bg-amber-600 text-white hover:bg-amber-700"><SaveIcon className="h-4 w-4 mr-1"/> Guardar</Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-amber-600" />
            <InputCard isEditing={isEditing} title="Fecha" type="date" name="date" value={remission.date} onChange={onInputChange} />
          </div>

          <div className="flex items-center gap-3">
            <ClockIcon className="h-5 w-5 text-amber-600" />
            <InputCard title="Hora" isEditing={isEditing} type="time" name="time" value={remission.time} onChange={onInputChange} />
          </div>

          <div className="flex items-center gap-3">
            <TruckIcon className="h-5 w-5 text-amber-600" />
            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.provider?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = providers.find(p => String(p._id ?? p.id ?? "") === sel)
                  onCustomChange("provider", found ? { _id: String(found._id ?? found.id), name: found.name } : { _id: sel, name: "" } as any)
                }}
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map(p => <option key={String(p._id ?? p.id)} value={String(p._id ?? p.id)}>{p.name}</option>)}
              </select>
            ) : (
              <span>{remission.provider?.name || "Sin proveedor"}</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserCheck className="h-5 w-5 text-amber-600" />
            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.supervisor?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = supervisors.find(s => String(s._id) === sel)
                  onCustomChange("supervisor", found ? { _id: found._id, name: found.name } as any : { _id: sel, name: "" } as any)
                }}
              >
                <option value="">Seleccionar supervisor</option>
                {supervisors.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            ) : (
              <span>{remission.supervisor?.name || "Sin supervisor"}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-amber-600" />
            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.analyst?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = analysts.find(a => String(a._id) === sel)
                  onCustomChange("analyst", found ? { _id: found._id, name: found.name } as any : { _id: sel, name: "" } as any)
                }}
              >
                <option value="">Seleccionar analista</option>
                {analysts.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
              </select>
            ) : (
              <span>{remission.analyst?.name || "Sin analista"}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <BarrelIcon className="h-5 w-5 text-amber-600" />
            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.tank?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = tanks.find(t => String(t._id ?? t.id ?? "") === sel)
                  onCustomChange("tank", found ? { _id: String(found._id ?? found.id), name: found.name } : { _id: sel, name: "" } as any)
                }}
              >
                <option value="">Seleccionar tanque</option>
                {tanks.map(t => <option key={String(t._id ?? t.id)} value={String(t._id ?? t.id)}>{t.name}</option>)}
              </select>
            ) : (
              <span>{remission.tank?.name || "Sin tanque"}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
