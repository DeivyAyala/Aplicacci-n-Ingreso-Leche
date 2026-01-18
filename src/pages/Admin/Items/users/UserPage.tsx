import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { EyeIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { SearchHeader } from "../../Components/SearchHeader"
import type { User } from "./types/User"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { CustomTable } from "../../Components/CustomTable"
import { ActionMenu } from "../../Components/ActionMenu"

import { ViewUser } from "./components/ViewUser"
import { Button } from "@/components/ui/button"
import { CreateUser } from "./components/CreateUser"
import { EditUser } from "./components/EditUser"
import { useUsersStore } from "../../store/usersStore"
import { useGetUsers } from "../../hook/useGetUsers"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import { useCreateUser } from "../../hook/useCreateUser"
import { useUploadUserImage } from "../../hook/useUploadUserImage"
import { toast } from "sonner"
import { useEditUser } from "../../hook/useEdithUser"
import { useDeleteUser } from "../../hook/useDeleteUser"
import { ConfirmModal } from "../../Components/ConfirmModal"



export const UserPage = () => {

  const { users, setUsers, updateUser } = useUsersStore()
  const { createUserAsync, isPending: creating } = useCreateUser()
  const { uploadUserImageAsync,  isPending: uploading  } = useUploadUserImage()
  const { editUserAsync, isPending: editing } = useEditUser()
  const [selectedFileEdit, setSelectedFileEdit] = useState<File | null>(null);
  const { deleteUserAsync, isPending: deleting } = useDeleteUser()


  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedEditUser, setSelectedEditUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const { data: fetchedUsers = [], isLoading } = useGetUsers()


  useEffect(() => {
    if(fetchedUsers.length > 0) {
      setUsers(fetchedUsers)
    }
  }, [fetchedUsers])

  const [previewImage, setPreviewImage] = useState<string | null>(null)
   const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(!file) return

    setSelectedFile(file)
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
  //Crear Ususario
const handleCreate = async (formData: User) => {
  try {
    const dataToSend = {
      name: formData.name.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      phone: formData.phone?.trim(),
      rol: formData.rol || "Operador",
    }

    console.log("DATA LIMPIA:", dataToSend)

    const newCreatedUser = await createUserAsync(dataToSend)

    if (selectedFile && newCreatedUser._id) {
      await uploadUserImageAsync({
        id: newCreatedUser._id,
        image: selectedFile,
      })
    }

    setIsModalOpen(false)
    toast.success(`Usuario "${newCreatedUser.name}" creado correctamente`)
  } catch (error) {
    console.error("Error al crear el Usuario:", error)
    toast.error("Error al crear el Usuario")
  }
}


  //Editar Ususario 
  const handleEdit = (id: string) => {
    const User = users.find((u) => u._id === id)
    if (User) {
      setSelectedEditUser(User)
      setIsEditModalOpen(true)
    }
  }
  const handleSaveEdit = async(updated: User) => {
    try {
      if(!updated._id){
        toast.error("El Usuario no tiene ID")
        return
      }

      let finalImageUrl = updated.imageUrl;

      if(selectedFileEdit) {
        finalImageUrl = await uploadUserImageAsync({
          id: updated._id,
          image: selectedFileEdit,
        });
      }

      await editUserAsync({
        id: updated._id,
        name: updated.name,
        lastName: updated.lastName,
        email: updated.email,
        phone: updated.phone,
        password: updated.password,
        rol: updated.rol,
        imageUrl: finalImageUrl,
      })

      updateUser({
        ...updated,
        imageUrl: finalImageUrl
      });

      setIsEditModalOpen(false)
      setSelectedEditUser(null)
      toast.success(`Usuario "${updated.name}" actualizado con éxito`)

    } catch (error) {
      toast.error("Error al editar el usuario");
      console.error("Error al editar:", error);
    }
  }

  //Ver Ususario
  const handleView = (id: string) => {
    const user = users.find((p) => p._id === id)
    if (user) {
      setSelectedUser(user)
      setIsViewModalOpen(true)
    }
  }

  //Eliminar Ususario
  const handleDelete = async() => {
    if(!userToDelete) return;
    try {
      await deleteUserAsync(userToDelete)
      toast.success("Usuario eliminado correctamente")
      setOpenConfirmDelete(false)
      setUserToDelete(null)
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      toast.error("Error al eliminar usuario");
    }
  }


  if(creating || uploading || editing) {
    return <CustomFullScreenLoading/>
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
          onEdit={() => handleEdit(u._id)}
          onDelete={() => {
            setUserToDelete(u._id)
            setOpenConfirmDelete(true)
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
    return <CustomFullScreenLoading message={'Cargando usuarios...'} />
  }

  return (
    <>
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

        <CreateUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          previewImage={previewImage}
          handleImageChange={handleImageChange}
          handleCreate={handleCreate}
          setSelectedFile={setSelectedFile}
          setPreviewImage={setPreviewImage}

        />

        <ViewUser
          isOpen = {isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          user={selectedUser}
        />

        <EditUser
          open = {isEditModalOpen}
          onClose = { ()=> setIsEditModalOpen(false) }
          user={selectedEditUser}
          onSave={handleSaveEdit}
          setSelectedFileEdit={setSelectedFileEdit}
        />
      </div>
      <ConfirmModal
        open={openConfirmDelete}
        onCancel={() => setOpenConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este ususario? Esta acción no se puede deshacer."
        confirmText={deleting ? "Eliminando..." : "Eliminar"}
      />
    </>



  )
}
