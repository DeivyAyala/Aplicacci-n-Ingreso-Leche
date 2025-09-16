import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangleIcon, EditIcon, TrashIcon } from "lucide-react"
import { useState } from "react"


interface propsAction {
    handleDelete: React.MouseEventHandler<HTMLButtonElement> | undefined
    onClickEditing : React.MouseEventHandler<HTMLButtonElement> | undefined
    isEditing : boolean
}


export const QuickActions = ({handleDelete, onClickEditing, isEditing}: propsAction) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false) //Controla si mostrar o no la confirmación de eliminación 

    
  return (
    <Card className="border-amber-200">
        <CardHeader>
            <CardTitle className="text-amber-900">Acciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <Button
                variant="outline"
                className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                onClick={onClickEditing}
            >
                <EditIcon className="h-4 w-4 mr-2" />
                {isEditing ? "Cancelar Edición" : "Editar Remisión"}
            </Button>

            <Button
                variant="outline"
                className="w-full border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                onClick={() => setShowDeleteConfirm(true)}
            >
                <TrashIcon className="h-4 w-4 mr-2" />
                    Eliminar Remisión
            </Button>
            {showDeleteConfirm && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangleIcon className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">¿Confirmar eliminación?</span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="flex-1 border-gray-200 text-gray-700"
                        >
                            Cancelar
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 text-white hover:bg-red-700"
                        >
                            Eliminar
                        </Button>
                    </div>
                </div>
            )}
        </CardContent>
    </Card>


  )
}
