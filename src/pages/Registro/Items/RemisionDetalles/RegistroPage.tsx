import { CustomJumbotron } from "../../Components/CustomJumbotron"
import {  useNavigate, useParams } from "react-router"
// import { Header } from "./components/Header"
import { Notes } from "./components/Notes"
import { QuickActions } from "./components/QuickActions"
import { Firma } from "./components/Firma"

import { GeneralInfoCard } from "./components/GeneralInfoCard"
import { VolumenCard } from "./components/VolumenCard"
import { QualityCard } from "./components/QualityCard"
import { useRegistro } from "@/pages/hook/useRegistro"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"


export const RegistroPage = () => {

  const navigate = useNavigate()

  const onBack = () =>{
    navigate('/adm/historial')
  }
  
  const {id} = useParams()
  // console.log("ID recibido desde URL (antes de conversión):", id)

  const {
    remission,
    isEditing,
    setIsEditing,
    onInputChange,
    onCustomChange,
    addNote,
    removeNote,
    handleSave,
    handleDelete
  } = useRegistro(id!)

  return (
     <div className="min-h-screen bg-amber-50/30">
      {/* Header */}
      {/* <Header/> */}

      {/* Boton de Volver  */}
      <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Volver al Historial
          </Button>
      </div>  

      {/* Custom Jumbotron */}
      <CustomJumbotron 
      title={`Detalles de Remisión ${remission.remission}`}
      subtitle="Información completa del ingreso de leche"
      />
  
      
    
      {/* Main */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Columna Derecha  - Main Detalles */}
          <div className="lg:col-span-2 space-y-6">

            {/* Información Basica  */}
            <GeneralInfoCard 
              remission={remission}
              isEditing={isEditing}
              onInputChange={onInputChange}
              onCustomChange={onCustomChange}
              handleSave={handleSave}
              setIsEditing={setIsEditing}
            />         

            {/* Información de Volúmenes */}
            <VolumenCard 
              remission={remission}
              isEditing={isEditing}
              onCustomChange={onCustomChange}
            />
            {/*  Parámetros de Calidad */}
            <QualityCard 
              remission={remission}
              isEditing={isEditing}
              onCustomChange={onCustomChange}
            />

          </div>

          {/* Columna derecha de acciones rapidas, firma y notas  */}
          <div className="space-y-6">

            {/* Acciones */}
            <QuickActions 
              handleDelete={handleDelete}
              isEditing={isEditing}
              onClickEditing={() => setIsEditing(!isEditing)}
              />

            {/* Firma */}
            <Firma 
              user={remission.user}
              date={remission.date}
              time={remission.time}
            />

            {/* Seccion de Notas */}
            <Notes 
              notes={remission.notes}
              onAddNote={addNote}
              onRemoveNote={removeNote}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
