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
import { useGetStaff } from "../../hook/useGetStaff"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"
import { useCreateStaff } from "../../hook/useCreateStaff"
import { useUploadStaffImage } from "../../hook/useUploadStaffImage"
import { useEditStaff } from "../../hook/useEditStaff"
import { useForm } from "react-hook-form"




export const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: staff = [], isLoading } = useGetStaff();
  const { createStaffAsync, isPending: creating } = useCreateStaff();
  const { uploadStaffImageAsync, isPending: uploading } = useUploadStaffImage();
  const { editStaffAsync, isPending: editing   } = useEditStaff()
  const [selectedFileEdit, setSelectedFileEdit] = useState<File | null>(null);

  
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
  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [form, setForm] = useState<Partial<StaffProps>>({})
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<StaffProps>()


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

  const handleCreate = async () => {
    try {
      let uploadedImageUrl = null;

      // 1. Crear staff SIN imagen
      const cleanStaff = {
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        role: newStaff.role,
        // 👀 Importante: NO enviar imageUrl aquí
      };

      console.log("Payload enviado al backend:", cleanStaff);

      // 1. Crear el staff sin imagen
      const newStaffCreated = await createStaffAsync(cleanStaff);

      // 2. Si hay imagen, subirla con el id recién creado

      if (selectedFile) {
        uploadedImageUrl = await uploadStaffImageAsync({
          id: newStaffCreated._id,      // <- YA EXISTE
          image: selectedFile           // <- File real
        });
      }

      console.log("Imagen seleccionada:", selectedFile);

      setIsModalOpen(false);

    } catch (error : any) {
      console.error("Error al subir imagen:", error.response?.data || error);
    }
  };

  const handleEdit = (id: string) => {
    const Staff = staff.find((s) => s.id === id)
    if (Staff) {
      setSelectEditStaff(Staff)
      setIsEditModalOpen(true)
    }
  }
  const handleSaveEdit = async (updated: StaffProps) => {
    try {
      let finalImageUrl = updated.imageUrl;

      // Si el usuario subió una nueva imagen, hacer upload
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

      setIsEditModalOpen(false);
      setSelectedFileEdit(null);

    } catch (error) {
      console.error("Error al editar personal:", error);
    }
  };

  const handleView = (id: string) => {
    const staffFound = staff.find((p) => p._id === id);
    if (staffFound) {
      setselectedStaff(staffFound);
      setIsViewModalOpen(true);
    }
  };

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
                setSelectedFileEdit={setSelectedFileEdit}
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
