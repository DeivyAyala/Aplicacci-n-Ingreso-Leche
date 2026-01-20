import { Card, CardContent } from "@/components/ui/card"
import { CardTitulo } from "./CardTitulo"
import { InputCard } from "./InputCard"
import { Beaker, DropletIcon } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PropsRegitros } from "@/pages/Admin/types/typeRegistro"
import type { TankProps } from "../../tanks/types/Tank"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"


interface propsVolumen {
  formState: PropsRegitros
  tank: TankProps[]
  register: UseFormRegister<PropsRegitros>
  setValue: UseFormSetValue<PropsRegitros>
  errors: any   
}

export const VolumenForm = ({formState, tank, register, setValue, errors }: propsVolumen) => {

  const activeTanks = tank.filter(t => t.active)
  const selectedTank = tank.find(t => t._id === formState.tank?._id)
  const isSelectedTankFull = !!selectedTank && selectedTank.currentCapacity >= selectedTank.capacity

  return (
     <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
        <CardTitulo 
            title="Volúmenes" 
            icono={<DropletIcon className="h-5 w-5" />}
        />

        <CardContent className="p-6 space-y-4">
          <InputCard 
            title="Volumen de Remisión (L)" 
            type="number"
            placeholder="0"
            min="0"
            register={register("volume", {
              validate: (value) => 
                value > 0 || "El Volumen no puede ser menor o igual a 0"
            })}
            className="text-amber-800 font-medium"
          />
          {errors&& (
            <p className="text-red-500 text-sm">{errors.volume}</p>
          )}

            <InputCard 
                title="Volumen Real Recibido (L)"
                type="number"
                placeholder="0"
                min="0"
                register={register("realVolume", {
              validate: (value) => 
                value > 0 || "El Volumen no puede ser menor o igual a 0"
            })}
                className="text-amber-800 font-medium"
            />
            {errors&& (
              <p className="text-red-500 text-sm">{errors.realVolume}</p>
            )}
                
            <div className="space-y-2">
              <Label htmlFor="price" className="text-amber-800 font-medium flex items-center gap-2">
                <Beaker className="h-4 w-4" />
                Tanque de Descarga
              </Label>
              <Select
                value={formState.tank?._id ?? ""}
                onValueChange={(value) => {
                  const found = tank.find(p => p._id === value)
                  if (found) {
                    setValue("tank", {
                      _id: found._id!,
                      name: found.name
                    }, { shouldValidate: true, shouldDirty: true })
                  }
                }}
              >
                <SelectTrigger className="border-amber-200">
                  <SelectValue placeholder="Seleccionar Tanque" />
                </SelectTrigger>

                <SelectContent>
                  {activeTanks.map((p) => {
                    const isFull = p.currentCapacity >= p.capacity
                    return (
                      <SelectItem key={p._id} value={p._id!} disabled={isFull}>
                        {p.name}{isFull ? " (Lleno)" : ""}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {isSelectedTankFull && (
                <p className="text-red-500 text-sm">
                  El tanque seleccionado esta lleno. Selecciona otro tanque.
                </p>
              )}
              { errors.tank && (
                <p className="text-red-500 text-sm">{errors.tank.message}</p>
              )}
            </div>
        </CardContent>
    </Card>
  )
}
