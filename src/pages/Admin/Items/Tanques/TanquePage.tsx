import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { EyeIcon, SearchIcon } from "lucide-react"
import { SearchHeader } from "../../Components/SearchHeader"
import { useState } from "react"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { StatusBadge } from "../../Components/StatusBadge"
import { ActionMenu } from "../../Components/ActionMenu"
import { Button } from "@/components/ui/button"
import { CustomTable } from "../../Components/CustomTable"
import { CreateTanque } from "./components/CreateTanque"
import { EditTanque } from "./components/EditTanque"
import { ViewTanque } from "./components/ViewTanque"
import type { TankProps } from "./types/Tank"


const initialTanks: TankProps[] = [
  {
    id: "1",
    name: "Tanque 1",
    active: true,
    capacity: 1500,
    createdAt: "2025-10-10",
    updatedAt: "2025-10-15",
  },
  {
    id: "2",
    name: "Tanque",
    active: false,
    capacity: 1200,
    createdAt: "2025-10-11",
    updatedAt: "2025-10-13",
  },
]

export const TanquePage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [tanks, setTanks] = useState<TankProps[]>(initialTanks)

    const [newTank  , setNewTank] = useState({
      name: "",
      active: true,
      capacity: 0,
    })

    const [selectedEditTank, setSelectedEditTank] = useState<TankProps | null>(null)
    const [selectedTank, setSelectedTank] = useState<TankProps | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    
    const filteredtanks = tanks.filter((tank) =>
      tank.name.toLowerCase().includes(searchTerm.toLowerCase())
    )



    // Crear 
    const handleCreate = () => {
      if (!newTank.name) return
      const newItem = {
        ...newTank,
        id: Date.now().toString(),
        active: true,
      }
      setTanks([...tanks, newItem])
      setNewTank({ name: "",
      active: true,
      capacity: 0,  })
      setIsModalOpen(false)
    }

    //Editar
    const handleEdit = (id: string) => {
      const tank = tanks.find((t) => t.id === id)
      if (tank) {
        setSelectedEditTank(tank)
        setIsEditModalOpen(true)

      }
    }
    const handleSaveEdit = (updatedProvider: TankProps) => {
      setTanks((prev) =>
        prev.map((t) => (t.id === updatedProvider.id ? updatedProvider : t))
      )
    }

    //Ver 
    const handleView = (id: string) => {
      const tank = tanks.find((t) => t.id === id)
      if (tank) {
        setSelectedTank(tank)
        setIsViewModalOpen(true)
      }
    }


    const handleDelete = (id: string) => {
      setTanks(tanks.filter((t) => t.id !== id))
    }


    const handleToggleActive = (id: string) => {
    setTanks(
      tanks.map((t) =>
        t.id === id ? { ...t, active: !t.active } : t
      )
    )
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
              onEdit={() => handleEdit(u.id)}
              onToggleActive={() => handleToggleActive(u.id)}
              onDelete={() => handleDelete(u.id)}
            />
          ),
        },
        {
          key: "ver",
          label: "Ver",
          render: (u: any) => (
            <Button
              onClick={() => handleView(u.id)}
              variant="outline"
              size="icon"
              className="border-amber-200 text-amber-700 hover:bg-amber-50 rounded-lg"
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
          ),
        },
    ]

    return (
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
        <CreateTanque
          isModalOpen = {isModalOpen}
          setIsModalOpen={setIsModalOpen}
          newTank={newTank}
          setNewTank={setNewTank}
          handleCreate={handleCreate}
        />
        <EditTanque
          open = {isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          tank={selectedEditTank}
          onSave={handleSaveEdit}
        />
        <ViewTanque
          isOpen = {isViewModalOpen}
          onClose = {() => setIsViewModalOpen(false)} 
          tank={selectedTank} 
        />     

      </div>
    )
}
