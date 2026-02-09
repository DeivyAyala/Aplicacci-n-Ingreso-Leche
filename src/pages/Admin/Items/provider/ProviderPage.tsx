import { useEffect, useState } from "react"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  EyeIcon, SearchIcon } from "lucide-react"
import { SearchHeader } from "../../Components/SearchHeader"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { StatusBadge } from "../../Components/StatusBadge"
import { ActionMenu } from "../../Components/ActionMenu"
import { CustomTable } from "../../Components/CustomTable"
import { Button } from "@/components/ui/button"
import type { Provider } from "./types/Provider"
import { CreateProvider } from "./components/CreateProvider"
import { EditProvider } from "./components/EditProvider"
import { ViewProvider } from "./components/ViewProvider "
import { useProviderStore } from "../../store/providerStore"
import { useGetProvider } from "../../hook/useGetProvider"
import { useCreateProvider } from "../../hook/useCreateProvider"
import { useUploadProviderImage } from "../../hook/useUploadProviderImage"
import { useEditProvider } from "../../hook/useEditProvider"
import { toast } from "sonner"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import { useDeleteProvider } from "../../hook/useDeleteProvider"
import { ConfirmModal } from "../../Components/ConfirmModal"



export const ProviderPage = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const { createProviderAsync, isPending: creating} = useCreateProvider()
  const { uploadProviderImageAsync, isPending: uploading  } = useUploadProviderImage()
  const { editProviderAsync, isPending: editing } = useEditProvider()
  const [selectedFileEdit, setSelectedFileEdit] = useState<File | null>(null);
  const {deleteProviderAsync, isPending: deleting} = useDeleteProvider()


  const { providers, setProviders, toggleProviderActive, updateProvider } = useProviderStore()

  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedEditProvider, setSelectedEditProvider] = useState<Provider | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [providerToDelete, setProviderToDelete] = useState<string | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);



  
  const filteredProviders = providers.filter((prov) =>
    prov.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: fetchedProviders = [], isLoading } = useGetProvider()

  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;
    
    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

const handleCreate = async (formData: Provider) => {
  try {
    const dataToSend = {
      ...formData,
      active: true, 
    };

    const newProviderCreated = await createProviderAsync(dataToSend);

    if (selectedFile && newProviderCreated._id) {
      await uploadProviderImageAsync({
        id: newProviderCreated._id,
        image: selectedFile,
      });
    }

    setIsModalOpen(false);
    toast.success(`Proveedor "${newProviderCreated.name}" creado con éxito`);

  } catch (error) {
    console.error("Error al crear el proveedor:", error);
    toast.error("Error al crear el proveedor");
  }
};

  //Ver 

  const handleView = (id: string) => {
    const providerFound = providers.find((p) => p._id === id)
    if(providerFound) {
      setSelectedProvider(providerFound)
      setIsViewModalOpen(true)  
    }
  }

  //Editar
  const handleEdit = (id: string) => {
    const Provider = providers.find((p) => p._id === id)
    if (Provider) {
      setSelectedEditProvider(Provider)
      setIsEditModalOpen(true)
    }
  }

  const handleSaveEdit = async(updated: Provider) => {
    try {
      if(!updated._id){
        toast.error("El proveedor no tiene ID")
        return
      }
      let finalImageUrl = updated.imageUrl;

      if (selectedFileEdit) {
        finalImageUrl = await uploadProviderImageAsync({
          id: updated._id,
          image: selectedFileEdit,
        });
      }
      await editProviderAsync({
        id: updated._id,
        name: updated.name,
        addres: updated.address,
        nit: updated.nit,
        email: updated.email,
        phone: updated.phone,
        inCharge: updated.inCharge,
        active: updated.active,
        imageUrl: finalImageUrl,
      });

      updateProvider({
        ...updated,
        imageUrl: finalImageUrl,
      });

      
      setIsEditModalOpen(false); 
      setSelectedFileEdit(null);
      toast.success(`Proveedor "${updated.name}" actualizado con éxito`);

    } catch (error) {
      toast.error("Error al editar el proveedor");
      console.error("Error al editar:", error);
    }
  }


  const handleDelete = async() => {
    if(!providerToDelete) return;

    try {
      await deleteProviderAsync(providerToDelete);
      setProviders(providers.filter((p) => p._id !== providerToDelete));
      toast.success("Proveedor eliminado correctamente");
      setOpenConfirmDelete(false);
      setProviderToDelete(null);

    } catch (error) {
      console.error("Error eliminando personal:", error);
      toast.error("Error al eliminar personal");
    }
  }
  
  useEffect(() => {
    if(fetchedProviders.length > 0) {
      setProviders(fetchedProviders)
    }
  }, [fetchedProviders])

  const handleToggleActive = async(id: string) => {
    const providerFound = providers.find((p) => p._id === id)
    if(!providerFound) return

    const newActiveState = !providerFound.active;

    try {
      await editProviderAsync({
        id,
        active: newActiveState,
      })

      toggleProviderActive(id);

      if(newActiveState) {
        toast.success(`Proveedor "${providerFound.name}" activado`)
      } else {
        toast.success(`Proveedor "${providerFound.name}" desactivado`)  
      }


    } catch (error) {
      console.error("Error al actualizar el estado del proveedor:", error);
      toast.error("No se pudo actualizar el estado del proveedor");
    }
  }

  if( creating ||editing || uploading ) {
    return <CustomFullScreenLoading/>
  }


  const columns = [
    { key: "name", label: "Nombre", render: (u: any) => <AvatarWithName name={u.name} imageUrl={u.imageUrl} /> },
    { key: "email", label: "Email" },
    { key: "active", label: "Estado", render: (u: any) => <StatusBadge active={u.active} /> },
    {
      key: "acciones",
      label: "Acciones",
      render: (u: any) => (
        <ActionMenu
          isActive={u.active}
          onEdit={() => handleEdit(u._id)}
          onToggleActive={() => handleToggleActive(u._id)}
          onDelete={ () => {
            setProviderToDelete(u._id),
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
    return <CustomFullScreenLoading message={'Cargando Proveedores....'}/>
  }

  return (
    <>
      <div className="min-h-screen bg-amber-50/30">
        <CustomJumbotron 
          title={`Proveedores`}
          subtitle="Información completa sobre los proveedores"
        />

        <main className="container mx-auto px-6 py-8">
          {/* Header */}
          <Card className="border-amber-200 mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <SearchIcon className="h-5 w-5" />
                Gestión de Proveedores
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <SearchHeader 
                title="Proveedor"  
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onCreateClick={()=> setIsModalOpen(true)} 
              />
            </CardContent>
          </Card>

          {/* Tabla de proveedores */}
          <CustomTable 
            data={filteredProviders} 
            columns={columns} 
            emptyMessage="No se encontraron Proveedores" 
          />
        </main>

        {/* Modales */}
        <CreateProvider 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          previewImage={previewImage}
          handleImageChange={handleImageChange}
          handleCreate={handleCreate}
          setSelectedFile={setSelectedFile}
          setPreviewImage={setPreviewImage}
        />

        <ViewProvider 
          isOpen = {isViewModalOpen}
          onClose = {() => setIsViewModalOpen(false)}  
          provider = {selectedProvider}
        />

        <EditProvider 
          open = {isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          provider={selectedEditProvider}
          onSave={handleSaveEdit}
          setSelectedFileEdit={setSelectedFileEdit}
        />

      </div>

      <ConfirmModal
        open={openConfirmDelete}
        onCancel={() => setOpenConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Eliminar Proveedor"
        message="¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer."
        confirmText={deleting ? "Eliminando..." : "Eliminar"}
      />
    </>
  )
}


  