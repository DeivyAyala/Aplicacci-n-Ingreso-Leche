import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { EyeIcon, SearchIcon } from "lucide-react"
import { SearchHeader } from "../../Components/SearchHeader"
import { useEffect, useState } from "react"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { StatusBadge } from "../../Components/StatusBadge"
import { ActionMenu } from "../../Components/ActionMenu"
import { Button } from "@/components/ui/button"
import { CustomTable } from "../../Components/CustomTable"
import type { TankProps } from "./types/Tank"
import { CreateTank } from "./components/CreateTank"
import { EditTank } from "./components/EditTank"
import { ViewTank } from "./components/ViewTank"
import { useTanksStore } from "../../store/tanksStore"
import { useGetTanks } from "../../hook/useGetTanks"
import { useCreateTank } from "../../hook/useCreeateTank"
import { toast } from "sonner"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import { useEditTank } from "../../hook/useEditTank"
import { useDeleteTank } from "../../hook/useDeleteTank"
import { ConfirmModal } from "../../Components/ConfirmModal"



export const TanksPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { createTankAsync, isPending: creating } = useCreateTank()
  const { editTankAsync, isPending: editing } = useEditTank()
  const {deleteTankAsync, isPending: deleting } = useDeleteTank()


  const { tanks, setTanks, toggleTankActive, updateTank } = useTanksStore()

  const [selectedEditTank, setSelectedEditTank] = useState<TankProps | null>(null)
  const [selectedTank, setSelectedTank] = useState<TankProps | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tankToDelete, setTankToDelete] = useState<String | null>(null)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);



  const { data: fetchedTanks = [], isLoading} = useGetTanks()
  
  const filteredtanks = tanks.filter((tank) =>
    tank.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    if (fetchedTanks.length > 0) {
      setTanks(fetchedTanks)
    }
  }, [fetchedTanks])

  // Crear 
  const handleCreate =  async(formData: TankProps) => {
    try {
      const dataToSend = {
        ...formData,
        active: true,
      }

      const newTankCreated = await createTankAsync(dataToSend)
      setTanks([...tanks, newTankCreated]);

      setIsModalOpen(false)
      toast.success(`Tanque "${newTankCreated.name}" creado correctamente`)
     
    } catch (error) {
      console.error("Error al crear el tanque:", error)
      toast.error("Error al crear el tanque")
    }
    
  }

  //Editar
  const handleEdit = (id: string) => {
    const tank = tanks.find((t) => t._id === id)
    if (tank) {
      setSelectedEditTank(tank)
      setIsEditModalOpen(true)
    }
  }

  const handleSaveEdit = async(updated: TankProps) => {
    try {
      if(!updated._id){
        toast.error("ID del tanque no encontrado")
        return
      }

      await editTankAsync({
        id: updated._id,
        name: updated.name,
        capacity: updated.capacity,
        active: updated.active,
      })

      updateTank(updated)

      setIsEditModalOpen(false)
      toast.success(`Tanque "${updated.name}" actualizado correctamente`)

      console.log('Tanque Actualizado', updated)

    } catch (error) {
      toast.error("Error al actualizar el tanque")
      console.error("Error al actualizar el tanque:", error)
    }
  }

  //Ver 
  const handleView = (id: string) => {
    const tank = tanks.find((t) => t._id === id)
    if (tank) {
      setSelectedTank(tank)
      setIsViewModalOpen(true)
    }
  }

  const handleDelete = async() => {
    if(!tankToDelete) return

    try {
      await deleteTankAsync(tankToDelete);
      setTanks(tanks.filter((t) => t._id !== tankToDelete));
      toast.success("Tanque eliminado correctamente");
      setOpenConfirmDelete(false);
      setTankToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el tanque:", error);
      toast.error("Error al eliminar el tanque");
    }
  }

  const handleToggleActive = async(id: string) => {
    const tankFound = tanks.find((t) => t._id === id)
    if(!tankFound) return

    const newActiveState = !tankFound.active

    try {
      await editTankAsync({
        id,
        active: newActiveState,
      })

      toggleTankActive(id)

      if(newActiveState) {
        toast.success(`Tanque "${tankFound.name}" activado correctamente`)
      } else {
        toast.success(`Tanque "${tankFound.name}" desactivado correctamente`)
      }

    } catch (error) {
      console.error("Error al cambiar el estado del tanque:", error)
      toast.error("Error al cambiar el estado del tanque")
    }

  }

  if(creating || editing ) {
    return <CustomFullScreenLoading />
  }

  const columns = [
      { key: "name", label: "Nombre", render: (u: any) => <AvatarWithName name={u.name} 
          imageUrl= "https://img.freepik.com/vector-premium/tanque-almacenamiento-leche-isometrica_592324-1634.jpg" /> },
      { key: "capacity", label: "Capacidad (L)" },
      { key: "estado", label: "Estado", render: (u: any) => <StatusBadge active={u.active} /> },
      {
        key: "acciones",
        label: "Acciones",
        render: (u: any) => (
          <ActionMenu
            isActive={u.active}
            onEdit={() => handleEdit(u._id)}
            onToggleActive={() => handleToggleActive(u._id)}
            onDelete={() =>{
              setTankToDelete(u._id);
              setOpenConfirmDelete(true);
            }}
          />
        ),
      },
      {
        key: "ver",
        label: "Ver",
        render: (u: any) => (
          <Button
            onClick={() => handleView(u._id)}
            variant="outline"
            size="icon"
            className="border-amber-200 text-amber-700 hover:bg-amber-50 rounded-lg"
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
        ),
      },
  ]

  if(isLoading) {
    return <CustomFullScreenLoading message="Cargando Tanques de Almacenamiento..."/>
  }
  return (
    <>
      <div  className="min-h-screen bg-amber-50/30" >
        <CustomJumbotron 
            title={`Tanques / Silos `}
            subtitle="Gestión Completa Sobre Tanques/Silos"
        />
        <main className="container mx-auto px-6 py-8">
          <Card className="border-amber-200 mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <SearchIcon className="h-5 w-5" />
                Gestión de Tanques
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <SearchHeader 
                title="Tanque"  
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onCreateClick={()=> setIsModalOpen(true)} 
              />
            </CardContent>
          </Card>
          <CustomTable 
            data={filteredtanks} 
            columns={columns} 
            emptyMessage="No se encontraron Tanques" 
          />
        </main>
        <CreateTank
          isModalOpen = {isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCreate={handleCreate}
        />
        <EditTank
          open = {isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          tank={selectedEditTank}
          onSave={handleSaveEdit}
        />
        <ViewTank
          isOpen = {isViewModalOpen}
          onClose = {() => setIsViewModalOpen(false)} 
          tank={selectedTank} 
        />     
      </div>

      <ConfirmModal
        open={openConfirmDelete}
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar este tanque? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => {
          setOpenConfirmDelete(false);
          setTankToDelete(null);
        }}
        confirmText={deleting ? "Eliminando..." : "Eliminar"}
      />
    </>

  )
}
