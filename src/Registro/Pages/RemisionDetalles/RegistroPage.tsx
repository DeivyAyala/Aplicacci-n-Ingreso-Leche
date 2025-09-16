import { CustomJumbotron } from "@/Registro/Components/CustomJumbotron"
import {  useParams } from "react-router"
import { Header } from "./components/Header"
import { Notes } from "./components/Notes"
import { QuickActions } from "./components/QuickActions"
import { Firma } from "./components/Firma"
import { useRegistro } from "@/Registro/hook/useRegistro"
import { GeneralInfoCard } from "./components/GeneralInfoCard"
import { VolumenCard } from "./components/VolumenCard"
import { QualityCard } from "./components/QualityCard"

export const RegistroPage = () => {
  
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
      <Header/>

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
