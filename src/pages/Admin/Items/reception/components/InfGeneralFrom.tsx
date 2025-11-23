import { Card, CardContent } from "@/components/ui/card"
import { CardTitulo } from "./CardTitulo"
import { CalendarIcon, TruckIcon } from "lucide-react"
import { InputCard } from "./InputCard"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Provider } from "../../provider/types/Provider"
import type { PropsRegitros } from "@/pages/Admin/types/typeRegistro"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"

interface propsInfo {
  formState: PropsRegitros
  providers: Provider[]
  register: UseFormRegister<PropsRegitros>
  setValue: UseFormSetValue<PropsRegitros>
  errors: any
}

export const InfGeneralFrom = ({ providers, register, setValue, formState, errors }: propsInfo) => {

  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
      <CardTitulo
        icono={<CalendarIcon className="h-5 w-5" />}
        title="Información General"
      />

      <CardContent className="p-6 space-y-4">

        {/* Fecha y hora */}
        <div className="grid grid-cols-2 gap-4">
          <InputCard
            title="Fecha Llegada del Proveedor"
            type="date"
            min={today}
            register={register("date", {
              required: "La fecha es obligatoria",
              validate: (value) =>
                value >= today || "No puedes seleccionar un día anterior al actual"
            })}
            className="text-amber-800 font-medium"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}

          <InputCard
            title="Hora Llegada del Proveedor"
            type="time"
            className="text-amber-800 font-medium"
            register={register("time", {
              required: "La hora es obligatoria"
            })}
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>

        {/* Select de Proveedor */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-amber-800 font-medium flex items-center gap-2">
              <TruckIcon className="h-4 w-4" />
              Proveedor
            </Label>

            <Select
              value={formState.provider?._id ?? ""}
              onValueChange={(value) => {
                const found = providers.find(p => p._id === value)
                if (found) {
                  setValue("provider", {
                    _id: found._id!,
                    name: found.name
                  })
                }
              }}
            >
              <SelectTrigger className="border-amber-200">
                <SelectValue placeholder="Seleccionar proveedor" />
              </SelectTrigger>

              <SelectContent>
                {providers.map((p) => (
                  <SelectItem key={p._id} value={p._id!}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            { errors.provider && (
              <p className="text-red-500 text-sm">{errors.provider.message}</p>
            )}

          </div>
        </div>

      </CardContent>
    </Card>
  );
};
