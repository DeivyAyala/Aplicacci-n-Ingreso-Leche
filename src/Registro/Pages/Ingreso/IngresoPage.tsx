
import React from "react"
import { Card, CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  FlaskConicalIcon,
  SaveIcon,
  ArrowLeftIcon,
} from "lucide-react"
import { Header } from "@/Registro/Components/Header"
import { CustomJumbotron } from "@/Registro/Components/CustomJumbotron"
import { useForm } from "@/Registro/hook/useForm"
import { CardTitulo } from "./components/CardTitulo"
import { InputCard } from "./components/InputCard"
import { InfGeneralFrom } from "./components/InfGeneralFrom"
import { VolumenForm } from "./components/VolumenForm"
import { FirmaFrom } from "./components/FirmaFrom"
import { ingresoSchema} from "@/Registro/types/ingresoShema"
import { useNavigate } from "react-router"
import type { PropsRegitros } from "@/Registro/types/typeRegistro"





const emptyIngresoForm: PropsRegitros ={
  id: "",
  date: "",
  time: "",
  provider: "",
  remission: "",
  volume: "" as unknown as number,  // 👈 inicia vacío
  realVolume: "" as unknown as number,
  fat: "" as unknown as number,
  protein: "" as unknown as number,
  temperature: "" as unknown as number,
  pH: "" as unknown as number,
  density: "" as unknown as number,
  price: "" as unknown as number,
  quality: "",
  user: "",
  firma: "",
  notes:[]

}



export const IngresoPage = () => {
  const {formState, onInputChange, onCustomChange, onResetForm} = useForm(emptyIngresoForm)
  const navigate = useNavigate()

  const onBack = () =>{
    navigate('/')
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = ingresoSchema.safeParse(formState)

    if(!result.success){
      console.log("Errores de Validación", result.error.format())
      return
    }
    console.log("Datos Validados:", formState)
    onResetForm()
  }

  const parametrosCalidad: {
  name: keyof PropsRegitros //Identifica el name como una key de PropsRegistrp
  title: string
  type: string
  step?: string
  placeholder?: string
  fullWidth?: boolean
}[] = [
    { name: "fat", title: "Grasa (%)", type: "number", step: "0.1", placeholder: "0.0" },
    { name: "protein", title: "Proteína (%)", type: "number", step: "0.1", placeholder: "0.0" },
    { name: "temperature", title: "Temperatura (°C)", type: "number", step: "0.1", placeholder: "0.0" },
    { name: "pH", title: "pH", type: "number", step: "0.1", placeholder: "0.0" },
    { name: "density", title: "Densidad (g/ml)", type: "number", step: "0.001", placeholder: "0.000" , fullWidth: true }
  ]

  return (

    <>
    {/*Header */}
    <Header/>
    
    {/* Titulo */}
    <CustomJumbotron
    title="Ingreso de Leche"
    subtitle="Registra los datos de calidad y cantidad de la recepción de leche"
    />
    {/* Contenido */}
      <main className="container mx-auto px-6 py-8">
        
        {/* Boton de Volver  */}
        <div className="mb-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver al Inicio
            </Button>
        </div>


        <form onSubmit={onSubmit}>
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Información General */}
            <InfGeneralFrom 
              formState={formState}
              onInputChange={onInputChange}
              onCustomChange={onCustomChange}
            />

            {/* Volúmenes */}
            <VolumenForm 
              formState={formState}
              onInputChange={onInputChange}
              onCustomChange={onCustomChange}
            />

            {/* Parámetros de Calidad */}
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              
              <CardTitulo 
                icono={<FlaskConicalIcon className="h-5 w-5" />} 
                title="Parámetros de Calidad" 
              />

              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {
                    parametrosCalidad.map(({name, title, type, step, placeholder, fullWidth}) =>(
                      <div key={name} className={fullWidth ? "col-span-2" : ""} > 
                        <InputCard 
                          name={name}
                          title={title}
                          type={type}
                          step={step}
                          placeholder={placeholder}
                          value={formState[name] as string | number }
                          onInputChange={onInputChange}
                          className="text-amber-800 font-medium"
                        />
                      </div>
                    ))
                  }
                </div>          
              </CardContent>
            </Card>

            {/* Evaluación y Firma */}
            <FirmaFrom
              formState={formState}
              onCustomChange={onCustomChange}
            />
          </div>

          {/* Botones de Acción */}
          <div className="mt-8 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              // onClick={onBack}
              className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8"
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Guardar Ingreso
            </Button>
          </div>
        </form>
      </main>
    </>

  )
}
