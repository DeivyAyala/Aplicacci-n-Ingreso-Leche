import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { EyeIcon, SearchIcon } from "lucide-react"
import { useState } from "react"
import { SearchHeader } from "../../Components/SearchHeader"
import type { User, UserRole } from "./types/User"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { CustomTable } from "../../Components/CustomTable"
import { ActionMenu } from "../../Components/ActionMenu"
import { EditUsuario } from "./components/EditUsusario"
import { CreateUsuario } from "./components/CreateUsuario"
import { ViewUser } from "./components/ViewUser"
import { Button } from "@/components/ui/button"



const initialUsers: User[] = [
  {
      id: "1",
      name: "yefree",
      lastName: "Ayala",
      email: "yefree@gmail.com",
      password: "123456",
      phone: "3135567782",
      rol: "Administrador",
      imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
     
  },
   {
      id: "2",
      name: "Ferney",
      lastName: "Ayala",
      email: "Ferneye@gmail.com",
      password: "123456",
      phone: "318490495",
      rol: "Operador",
      imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
   
  }
]

export const UsuarioPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [newUser, setNewUser] = useState<{
  name: string
  lastName: string
  email: string
  phone: string
  rol: UserRole
  password: string
  imageUrl?: string
}>({
  name: "",
  lastName: "",
  email: "",
  phone: "",
  rol: "Operador",
  password: "",
  imageUrl: "",
})

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //Crear Ususario
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => 
        setPreviewImage(reader.result as string)
        setNewUser((prev) => ({ ...prev, imageUrl: reader.result as string }))
    }
  }
  const handleCreate = () => {
    if (!newUser.name) return
    const newItem = {
      ...newUser,
      id: Date.now().toString(),
      imageUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
      rol: newUser.rol as "Administrador" | "Operador",
    }
    setUsers([...users, newItem])
    setNewUser({ 
      name: "",
      lastName: "",
      email: "",
      phone: "",
      rol: "Operador",
      password: "",
      imageUrl: ""  })
    setPreviewImage(null)
    setIsModalOpen(false)
  }

  //Editar Ususario 
  const handleEdit = (id: string) => {
    const user = users.find((p) => p.id === id)
    if (user) {
      setSelectedUser(user)
      setIsEditModalOpen(true)
    }
  }
  const handleSaveEdit = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((p) => (p.id === updatedUser.id ? updatedUser : p))
    )
  }

  //Ver Ususario
  const handleView = (id: string) => {
    const user = users.find((p) => p.id === id)
    if (user) {
      setSelectedUser(user)
      setIsViewModalOpen(true)
    }
  }

  //Eliminar Ususario
  const handleDelete = (id: string) => {
    setUsers(users.filter((p) => p.id !== id))
  }
  const columns = [
    { key: "name", label: "Nombre", render: (u: any) => <AvatarWithName name={u.name} imageUrl={u.imageUrl} /> },
    {key: "lastName", label: "Apellido" },
    { key: "phone", label: "Contacto" },
    { key: "rol", label: "Rol" },
    {
      key: "acciones",
      label: "Acciones",
      render: (u: any) => (
        <ActionMenu
          onDelete={() => handleDelete(u.id)}
          onEdit={() => handleEdit(u.id)}
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
    <div className="min-h-screen bg-amber-50/30">
      <CustomJumbotron 
          title="Usuarios"
          subtitle="Información completa sobre los Usuarios"
      />
      <main className="container mx-auto px-6 py-8" >
            {/* Header */}
        <Card className="border-amber-200 mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <SearchIcon className="h-5 w-5" />
                Gestión de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <SearchHeader 
                    title="Usuario"
                    searchTerm ={searchTerm}
                    onSearchChange={setSearchTerm} 
                    onCreateClick={() => setIsModalOpen(true)}
                />
            </CardContent>
        </Card>
        <CustomTable
            data={filteredUsers}
            columns={columns}
            emptyMessage="No se encontraron Usuarios"
        />
      </main>

      <CreateUsuario
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        previewImage={previewImage}
        handleImageChange={handleImageChange}
        newUser={newUser}
        setNewUser={setNewUser}
        handleCreate={handleCreate}
        
      />

      <ViewUser
        isOpen = {isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={selectedUser}
      />

      <EditUsuario
        open = {isEditModalOpen}
        onClose = { ()=> setIsEditModalOpen(false) }
        user={selectedUser}
        onSave={handleSaveEdit}
      />



    </div>


  )
}
