import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { EyeIcon, SearchIcon } from "lucide-react"
import { SearchHeader } from "../../Components/SearchHeader"
import { useEffect, useState } from "react"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { ActionMenu } from "../../Components/ActionMenu"
import { Button } from "@/components/ui/button"
import { CustomTable } from "../../Components/CustomTable"
import { StatusBadge } from "../../Components/StatusBadge"
import { CreateStaff, type StaffForm } from "./components/CreateStaff "
import type { StaffProps } from "./types/Staff"
import { EditStaff } from './components/EditStaff';
import { ViewStaff } from "./components/ViewStaff"
import { useGetStaff } from "../../hook/useGetStaff"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import { useCreateStaff } from "../../hook/useCreateStaff"
import { useUploadStaffImage } from "../../hook/useUploadStaffImage"
import { useEditStaff } from "../../hook/useEditStaff"
import { useDeleteStaff } from "../../hook/useDeleteStaff"
import { toast } from "sonner"
import { ConfirmModal } from "../../Components/ConfirmModal"
import { useStaffStore } from "../../store/staffStore"


export const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { createStaffAsync, isPending: creating } = useCreateStaff();
  const { uploadStaffImageAsync, isPending: uploading } = useUploadStaffImage();
  const { editStaffAsync, isPending: editing   } = useEditStaff()
  const [selectedFileEdit, setSelectedFileEdit] = useState<File | null>(null);
  const { deleteStaffAsync, isPending: deleting } = useDeleteStaff();

  const { staff, setStaff, toggleStaffActive, updateStaff } = useStaffStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStaff, setselectedStaff] = useState<StaffProps | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectEditStaff, setSelectEditStaff] = useState<StaffProps | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);

  
  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
 

  const { data: fetchedStaff = [], isLoading } = useGetStaff();


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file); // <-- guardar file real
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async (formData: StaffForm) => {
    try {
      let uploadedImageUrl = null;

      const newStaffCreated = await createStaffAsync(formData);

      // validar el ID ANTES de subir la imagen
      if (selectedFile && newStaffCreated._id) {
        uploadedImageUrl = await uploadStaffImageAsync({
          id: newStaffCreated._id,   // ahora typescript sabe que es string
          image: selectedFile
        });
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error al crear personal:", error.response?.data || error);
    }
  };


  const handleEdit = (id: string) => {
    const Staff = staff.find((s) => s._id === id)
    if (Staff) {
      setSelectEditStaff(Staff)
      setIsEditModalOpen(true)
    }
  }

  const handleSaveEdit = async (updated: StaffProps) => {
    try {
      if (!updated._id) {
        toast.error("ID inválido");
        return;
      }

      let finalImageUrl = updated.imageUrl;

      // ✔ Solo subimos imagen si existe
      if (selectedFileEdit) {
        finalImageUrl = await uploadStaffImageAsync({
          id: updated._id,
          image: selectedFileEdit, 
        });
      }

      await editStaffAsync({
        id: updated._id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        role: updated.role,
        active: updated.active,
        imageUrl: finalImageUrl,
      });

      updateStaff({ ...updated, imageUrl: finalImageUrl });

      setIsEditModalOpen(false);
      setSelectedFileEdit(null);
      toast.success(`Personal "${updated.name}" fue actualizado`);

    } catch (error) {
      console.error("Error al editar:", error);
    }
  };
  


  const handleView = (id: string) => {
    const staffFound = staff.find((p) => p._id === id);
    if (staffFound) {
      setselectedStaff(staffFound);
      setIsViewModalOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!staffToDelete) return;

    try {
      await deleteStaffAsync(staffToDelete);

      toast.success("Personal eliminado correctamente");

      setOpenConfirmDelete(false);
      setStaffToDelete(null);

    } catch (error) {
      console.error("Error eliminando personal:", error);
      toast.error("Error al eliminar personal");
    }
  };

  

// cuando cargue la data desde el backend → guardarla en Zustand
  useEffect(() => {
    if (fetchedStaff.length > 0) {
      setStaff(fetchedStaff);
    }
  }, [fetchedStaff]);
  
  
  
  const handleToggleActive = async (id: string) => {
    const staffFound = staff.find((s) => s._id === id);
    if (!staffFound) return;
    
    const newActiveState = !staffFound.active;
    
    try {
      // ✔ 1. Actualizar en backend solo el campo 'active'
      await editStaffAsync({
        id,
        active: newActiveState,
      });
    
      // ✔ 2. Actualizar estado global (UI)
      toggleStaffActive(id);
    
      // ✔ 3. Toast adecuado
      if (newActiveState) {
        toast.success(`Personal "${staffFound.name}" fue activado`);
      } else {
        toast.warning(`Personal "${staffFound.name}" fue desactivado`);
      }
    
    } catch (error) {
      console.error("Error al actualizar active:", error);
      toast.error("Hubo un error al cambiar el estado");
    }
  };


 
  if(creating || uploading || editing ) {
    return <CustomFullScreenLoading/>
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
            onToggleActive={() => handleToggleActive(s._id)}
            onDelete={() =>{
            setStaffToDelete(s._id);   // guardar id
            setOpenConfirmDelete(true); // abrir modal
            }}
            onEdit={() => handleEdit(s._id)}
        />
      ),
    },
      {
      key: "ver",
      label: "Ver",
      render: (s: any) => (
        <Button
          onClick={() => handleView(s._id)}
          variant="outline"
          size="icon"
          className="border-amber-200 text-amber-700 hover:bg-amber-50 rounded-lg"
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
      ),
    },
  ]
    

  if (isLoading) {
    return <CustomFullScreenLoading message ={'Cargando Personal....'} />;
  }



  return (
    <>
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
                handleCreate={handleCreate}
                setSelectedFile={setSelectedFile} 
                setPreviewImage={setPreviewImage}   
            />
            <EditStaff
                open = {isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                staff={selectEditStaff}
                onSave={handleSaveEdit}
                setSelectedFileEdit={setSelectedFileEdit}
            /> 
            <ViewStaff
                isOpen = {isViewModalOpen}
                onClose = {() => setIsViewModalOpen(false)}  
                staff = {selectedStaff}
            />
        </main>
      </div>

      <ConfirmModal
        open={openConfirmDelete}
        onCancel={() => setOpenConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Eliminar Personal"
        message="¿Estás seguro de que deseas eliminar este miembro del personal? Esta acción no se puede deshacer."
        confirmText={deleting ? "Eliminando..." : "Eliminar"}
      />
    </>

  )
}
