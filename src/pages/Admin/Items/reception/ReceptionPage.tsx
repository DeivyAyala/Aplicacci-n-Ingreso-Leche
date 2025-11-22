
import React from "react"
import { Button } from "@/components/ui/button"

import {
  SaveIcon,
  ArrowLeftIcon,
} from "lucide-react"

import { InfGeneralFrom } from "./components/InfGeneralFrom"
import { VolumenForm } from "./components/VolumenForm"


import { useNavigate } from "react-router"

import { ingresoSchema, type PropsRegitros } from "../../types/ingresoShema"

// import { Header } from "../../Components/Header"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { useForm } from "@/pages/hook/useForm"

import { NotesFrom } from "./components/NotesFrom"
import { ResponsibleForm } from "./components/ResponsibleForm"

const emptyIngresoForm: PropsRegitros = {
  id: "",
  date: "",
  time: "",
  provider: "",
  volume: "" as unknown as number, 
  realVolume: "" as unknown as number,
  user: "",
  supervisor: "",
  analyst: "",
  notes:[],
  tank: ""

}



export const ReceptionPage = () => {
  const {formState, onInputChange, onCustomChange, onResetForm} = useForm(emptyIngresoForm)
  const navigate = useNavigate()

  const onBack = () =>{
    navigate('/adm/inicio')
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

  return (

    <>
    {/*Header */}
    {/* <Header/> */}
    
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

            <ResponsibleForm
              formState={formState} 
              onCustomChange={onCustomChange}     
            />

            {/* Evaluación y Firma */}
            <NotesFrom
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
