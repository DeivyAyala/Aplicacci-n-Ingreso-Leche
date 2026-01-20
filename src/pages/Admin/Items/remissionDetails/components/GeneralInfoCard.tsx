// GeneralInfoCard.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, BarrelIcon, CalendarIcon, ClockIcon, EditIcon, SaveIcon, TruckIcon, UserCheck } from "lucide-react"
import { InputCard } from "./InputsCard"
import type { PropsRegitros } from '../../../types/typeRegistro'
import type { Provider } from "../../provider/types/Provider"
import type { StaffProps } from "../../staff/types/Staff"
import type { TankProps } from "../../tanks/types/Tank"



interface GeneralInfoProps {
  remission: PropsRegitros
  isEditing: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCustomChange: <K extends keyof PropsRegitros>(field: K, value: PropsRegitros[K]) => void
  handleSave: () => void
  setIsEditing: (value: boolean) => void
  isTankFull: boolean
  isCapacityExceeded: boolean
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
  isTankFull,
  isCapacityExceeded,
  providers,
  supervisors,
  analysts,
  tanks,
}: GeneralInfoProps) => {

  const activeProviders = providers.filter(p => p.active);
  const activeSupervisors = supervisors.filter(s => s.active)
  const activeAnalysts = analysts.filter(a => a.active)
  const activeTanks = tanks.filter(t => t.active)

  const providerOptions =
    remission.provider &&
    !activeProviders.find(p => p._id === remission.provider?._id)
      ? [
          {
            _id: remission.provider._id,
            name: `${remission.provider.name} (Inactivo)`
          },
          ...activeProviders
        ]
      : activeProviders;

    
  const supervisorOptions =
    remission.supervisor &&
    !activeSupervisors.find(p => p._id === remission.supervisor?._id)
      ? [
          {
            _id: remission.supervisor._id,
            name: `${remission.supervisor.name} (Inactivo)`
          },
          ...activeSupervisors
        ]
      : activeSupervisors;

  const analystsOptions =
    remission.analyst &&
    !activeAnalysts.find(p => p._id === remission.analyst?._id)
      ? [
          {
            _id: remission.analyst._id,
            name: `${remission.analyst.name} (Inactivo)`
          },
          ...activeAnalysts
        ]
      : activeAnalysts;

  const tanksOptions =
    remission.tank &&
    !activeTanks.find(p => p._id === remission.tank?._id)
      ? [
          {
            _id: remission.tank._id,
            name: `${remission.tank.name} (Inactivo)`
          },
          ...activeTanks
        ]
      : activeTanks;

  


  return (
    <Card className="border-amber-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-amber-900">
          <img src="/public/IconoLeche.png" alt="Remisión" className="h-8 w-8 rounded object-cover border border-amber-200" />
          Información General
        </CardTitle>

        <div className="flex gap-2">
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)} 
              className="border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <EditIcon className="h-4 w-4 mr-1" /> Editar
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" size="sm" 
                onClick={() => setIsEditing(false)} 
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave} 
                disabled={isTankFull || isCapacityExceeded}
                className="bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-60"
              >
                <SaveIcon className="h-4 w-4 mr-1"/> Guardar
              </Button>
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

          <div className="flex flex-col gap-1">
            {/* Título + icono */}
            <div className="flex items-center gap-2">
              <TruckIcon className="h-5 w-5 text-amber-600" />
              <span className="font-semibold text-amber-900 text-sm">
                Proveedor
              </span>
            </div>

            {/* Selector o texto */}
            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.provider?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = providers.find(
                    p => String(p._id ?? p.id ?? "") === sel
                  )
                  onCustomChange(
                    "provider",
                    found
                      ? { _id: String(found._id ?? found.id), name: found.name }
                      : ({ _id: sel, name: "" } as any)
                  )
                }}
              >
                <option value="">Seleccionar proveedor</option>
                {providerOptions.map(p => (
                  <option
                    key={String(p._id ?? p._id)}
                    value={String(p._id ?? p._id)}
                  >
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-amber-900 pl-7">
                {remission.provider?.name || "Sin proveedor"}
              </span>
            )}

            {/* Estados */}
            {remission.provider &&
              !providers.find(
                p => p._id === remission.provider?._id && p.active
              ) && (
                <p className="text-amber-600 text-[13px]">
                  ⚠️ Este proveedor está inactivo.
                </p>
            )}

            {!remission.provider && (
              <p className="text-red-500 text-[13px]">
                ⚠️ El proveedor original fue eliminado.
                Debes seleccionar un proveedor activo para continuar.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-amber-600" />
              <span className="font-semibold text-amber-900 text-sm">
                Supervisor
              </span>
            </div>
                    
            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.supervisor?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = supervisors.find(s => String(s._id) === sel)
                  onCustomChange(
                    "supervisor",
                    found
                      ? { _id: found._id, name: found.name }
                      : ({ _id: sel, name: "" } as any)
                  )
                }}
              >
                <option value="">Seleccionar supervisor</option>
                {supervisorOptions.map(s => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            ) : (
              <span className="text-amber-900 pl-7">
                {remission.supervisor?.name || "Sin supervisor"}
              </span>
            )}
          
            {remission.supervisor &&
              !supervisors.find(
                s => s._id === remission.supervisor?._id && s.active
              ) && (
                <p className="text-amber-600 text-[13px]">
                  ⚠️ Este supervisor está inactivo.
                </p>
            )}
          
            {!remission.supervisor && (
              <p className="text-red-500 text-[13px]">
                ⚠️ El supervisor original fue eliminado.
                Debes seleccionar uno activo.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-amber-600" />
              <span className="font-semibold text-amber-900 text-sm">
                Analista de calidad
              </span>
            </div>

            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.analyst?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = analysts.find(a => String(a._id) === sel)
                  onCustomChange(
                    "analyst",
                    found
                      ? { _id: found._id, name: found.name }
                      : ({ _id: sel, name: "" } as any)
                  )
                }}
              >
                <option value="">Seleccionar analista</option>
                {analystsOptions.map(a => (
                  <option key={a._id} value={a._id}>{a.name}</option>
                ))}
              </select>
            ) : (
              <span className="text-amber-900 pl-7">
                {remission.analyst?.name || "Sin analista"}
              </span>
            )}

            {remission.analyst &&
              !analysts.find(
                a => a._id === remission.analyst?._id && a.active
              ) && (
                <p className="text-amber-600 text-[13px]">
                  ⚠️ Este analista está inactivo.
                </p>
            )}

            {!remission.analyst && (
              <p className="text-red-500 text-[13px]">
                ⚠️ El analista original fue eliminado.
                Debes seleccionar uno activo.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BarrelIcon className="h-5 w-5 text-amber-600" />
              <span className="font-semibold text-amber-900 text-sm">
                Tanque
              </span>
            </div>

            {isEditing ? (
              <select
                className="border rounded-md p-2 w-full"
                value={String(remission.tank?._id ?? "")}
                onChange={e => {
                  const sel = String(e.target.value)
                  const found = tanks.find(t => String(t._id ?? t.id) === sel)
                  onCustomChange(
                    "tank",
                    found
                      ? { _id: String(found._id ?? found.id), name: found.name }
                      : ({ _id: sel, name: "" } as any)
                  )
                }}
              >
                <option value="">Seleccionar tanque</option>
                {tanksOptions.map(t => (
                  <option
                    key={String(t._id )}
                    value={String(t._id)}
                    disabled={t.currentCapacity >= t.capacity}
                  >
                    {t.name}{t.currentCapacity >= t.capacity ? " (Lleno)" : ""}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-amber-900 pl-7">
                {remission.tank?.name || "Sin tanque"}
              </span>
            )}

            {isEditing && isTankFull && (
              <p className="text-red-500 text-[13px]">
                El tanque seleccionado esta lleno. Selecciona otro tanque.
              </p>
            )}

            {remission.tank &&
              !tanks.find(
                t => t._id === remission.tank?._id && t.active
              ) && (
                <p className="text-amber-600 text-[13px]">
                  ⚠️ Este tanque está inactivo.
                </p>
            )}

            {!remission.tank && (
              <p className="text-red-500 text-[13px]">
                ⚠️ El tanque original fue eliminado.
                Debes seleccionar uno activo.
              </p>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
