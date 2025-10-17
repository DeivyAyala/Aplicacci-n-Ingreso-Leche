import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, StickyNoteIcon, TrashIcon } from "lucide-react"
import { useState } from "react"

interface propsNotes {
    notes: string[]
    onAddNote: (note:string) => void
    onRemoveNote : (index:number) => void
}


export const Notes = ({notes, onAddNote, onRemoveNote}: propsNotes) => {

    const [newNote, setNewNote] = useState("")

    const handleAddNote = () => { //Al Agregar la nota quita los espacios
    if (newNote.trim()) {
      onAddNote(newNote.trim())
      setNewNote("")
    }
  }
    

  return (
     <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <StickyNoteIcon className="h-5 w-5" />
                  Notas y Observaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Note */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="Agregar nueva nota..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="border-amber-200 focus:border-amber-400 resize-none"
                    rows={3}
                  />
                  <Button
                    size="sm"
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="w-full bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Agregar Nota
                  </Button>
                </div>

                {/* Existing Notes */}
                <div className="space-y-2">
                  {notes.map((note, index) => (
                    <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg group">
                      <p className="text-sm text-amber-800">{note}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemoveNote (index)}
                        className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <TrashIcon className="h-3 w-3 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <p className="text-sm text-amber-600 text-center py-4">No hay notas registradas</p>
                  )}
                </div>
              </CardContent>
            </Card>
  )
}
