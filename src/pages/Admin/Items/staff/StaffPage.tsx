import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { EyeIcon, SearchIcon } from "lucide-react"
import { SearchHeader } from "../../Components/SearchHeader"
import { useState } from "react"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { ActionMenu } from "../../Components/ActionMenu"
import { Button } from "@/components/ui/button"
import { CustomTable } from "../../Components/CustomTable"
import { StatusBadge } from "../../Components/StatusBadge"
import { CreateStaff, type StaffForm } from "./components/CreateStaff "
import type { StaffProps } from "./types/Staff"
import { EditStaff } from './components/EditStaff';
import { ViewStaff } from "./components/ViewStaff"

const initialStaff: StaffProps[] = [
  {
      id: "1",
      name: "yefree Ayala",
      email: "yefree@gmail.com",
      phone: "3135567782",
      active: true,
      role: "Calidad",
      imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
     
  },
   {
      id: "2",
      name: "Ferney Ayala",
      email: "Ferneye@gmail.com",
      phone: "318490495",
      active: true,
      role: "Supervisor",
      imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
   
  }
]

export const StaffPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [staff, setStaff] = useState<StaffProps[]>(initialStaff)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedStaff, setselectedStaff] = useState<StaffProps | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectEditStaff, setSelectEditStaff] = useState<StaffProps | null>(null)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [newStaff, setNewStaff] = useState({
        name: "",
        email: "",
        phone: "",
        role: "Supervisor",
    } as StaffForm);
    const filteredStaff = staff.filter((staff) => 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0]
       if (file) {
         const reader = new FileReader()
         reader.onloadend = () => 
           setPreviewImage(reader.result as string)
           setNewStaff((prev) => ({ ...prev, imageUrl: reader.result as string }))
       }
     }

    const handleCreate = () => {
        if (!newStaff.name) return
        const newItem = {
            ...newStaff,
            id: Date.now().toString(),
            imageUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
            active: true,
            role: newStaff.role as "Calidad" | "Supervisor",
        }
        setStaff([...staff, newItem])
        setNewStaff({name: "",email: "", phone: "",  role: "Supervisor",  })
        setPreviewImage(null)
        setIsModalOpen(false)
    }

    const handleEdit = (id: string) => {
      const Staff = staff.find((s) => s.id === id)
      if (Staff) {
        setSelectEditStaff(Staff)
        setIsEditModalOpen(true)
      }
    }

    const handleSaveEdit = (updatedProvider: StaffProps) => {
      setStaff((prev) =>
        prev.map((s) => (s.id === updatedProvider.id ? updatedProvider : s))
      )
    }
    const handleView = (id: string) => {
      const Staff = staff.find((p) => p.id === id)
      if (Staff) {
        setselectedStaff(Staff)
        setIsViewModalOpen(true)
      }
    }



    


    const handleDelete = (id: string) => {
      setStaff(staff.filter((s) => s.id !== id))
    }

    const handleToggleActive = (id: string) => {
      setStaff(
        staff.map((s) =>
          s.id === id ? { ...s, active: !s.active } : s
        )
      )
    }
   

    const columns = [
    { key: "name", label: "Nombre", render: (s: any) => <AvatarWithName name={s.name} imageUrl={s.imageUrl} /> },
    { key: "phone", label: "Contacto" },
    { key: "role", label: "Rol" },
    { key: "active", label: "Estado", render: (s: any) => <StatusBadge active={s.active} /> },

    {
      key: "acciones",
      label: "Acciones",
      render: (s: any) => (
        <ActionMenu
            isActive={s.active}
            onToggleActive={() => handleToggleActive(s.id)}
            onDelete={() => handleDelete(s.id)}
            onEdit={() => handleEdit(s.id)}
        />
      ),
    },
      {
      key: "ver",
      label: "Ver",
      render: (s: any) => (
        <Button
          onClick={() => handleView(s.id)}
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
    <div className="min-h-screen bg-amber-50/30">
        <CustomJumbotron 
            title="Personal"
            subtitle="Información completa sobre el Personal de la empresa"
        />
        <main className="container mx-auto px-6 py-8" >
            <Card className="border-amber-200 mb-8">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-amber-900">
                    <SearchIcon className="h-5 w-5" />
                    Gestión de Usuarios
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <SearchHeader 
                        title="Personal"
                        searchTerm ={searchTerm}
                        onSearchChange={setSearchTerm} 
                        onCreateClick={() => setIsModalOpen(true)}
                    />
                </CardContent>
                <CustomTable
                    data={filteredStaff} 
                    columns={columns} 
                    emptyMessage="No se encontro Personal"
                />
            </Card>
            <CreateStaff
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                previewImage={previewImage}
                handleImageChange={handleImageChange}
                newStaff={newStaff}
                setNewStaff={setNewStaff}
                handleCreate={handleCreate}
            />
            <EditStaff
                open = {isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                staff={selectEditStaff}
                onSave={handleSaveEdit}
            /> 
            <ViewStaff
                isOpen = {isViewModalOpen}
                onClose = {() => setIsViewModalOpen(false)}  
                staff = {selectedStaff}
            />



        </main>
    </div>
  )
}
