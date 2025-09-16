import { useState } from "react"
import { useRegistroById } from "./useRegistroById"
import { useForm } from "./useForm"

export const useRegistro = ( id: string) => {
    const {registro} = useRegistroById(id)
    // console.log("Registro en RegistroPage:", registro)

    const [isEditing, setIsEditing] = useState(false)  //Controla si esta editando 

    const {formState:remission, onInputChange, onCustomChange} = useForm(registro ?? {
        id: "",
        date: "",
        time: "",
        provider: "",
        remission: "",
        volume: 0,
        realVolume: 0,
        fat: 0,
        protein: 0,
        temperature: 0,
        pH: 0,
        density: 0,
        quality: "",
        user: "",
        price: 0,
        firma: "",
        notes: []
    } ) 

    //Formato de Hora 
    const formatter = new Intl.DateTimeFormat("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })

    //Agregar Una Nota al arreglo
    const addNote = (note: string) => {
      onCustomChange("notes", [
        ...(remission.notes || []),
        `${formatter.format(new Date())}: ${note}`,
      ])
    }

     //Elimina una nota del arreglo.
    const removeNote = (index: number) => {
        if (!remission) return
        onCustomChange(
          "notes",
          remission.notes.filter((_, i) => i !== index),
        )
    }
    // Simula guardar cambios en la API y sale del modo edición.
    const handleSave = () => {
      console.log("[v0] Saving remission:", remission)
      setIsEditing(false)
    }

    // Simula borrar la remisión y vuelve atrás con
    const handleDelete = () => {
      console.log("[v0] Deleting remission:", remission.id)
    }

    return{
        remission,
        isEditing,
        setIsEditing,
        onInputChange,
        onCustomChange,
        addNote,
        removeNote,
        handleSave,
        handleDelete
    }

}
