import { useState } from "react"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  EyeIcon, SearchIcon } from "lucide-react"

import { SearchHeader } from "../../Components/SearchHeader"
import { AvatarWithName } from "../../Components/AvatarWithName"
import { StatusBadge } from "../../Components/StatusBadge"
import { ActionMenu } from "../../Components/ActionMenu"
import { CustomTable } from "../../Components/CustomTable"
import { Button } from "@/components/ui/button"
import { CreateProveedor } from "./components/CreateProveedor"
import { ViewProveedor } from "./components/ViewProveedor "
import type { Provider } from "./types/Provider"
import { EditProveedor } from "./components/EditProveedor"



// Datos de ejemplo
const initialProviders: Provider[] = [
  {
    id: "1",
    name: "Lácteos El Campo",
    nit: "900123456-7",
    email: "contacto@elcampo.com",
    phone: "3101234567",
    inCharge: "Carlos Gómez",
    active: true,
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    createdAt: "2025-10-10",
    updatedAt: "2025-10-15",
  },
  {
    id: "2",
    name: "Leches del Norte",
    nit: "901987654-3",
    email: "ventas@lechesnorte.com",
    phone: "3209876543",
    inCharge: "María Pérez",
    active: false,
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    createdAt: "2025-10-11",
    updatedAt: "2025-10-13",
  },
]


export const ProveedorPage = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [providers, setProviders] = useState<Provider[]>(initialProviders)

  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProvider, setNewProvider] = useState({
    name: "",
    nit: "",
    email: "",
    phone: "",
    inCharge: ""
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedEditProvider, setSelectedEditProvider] = useState<Provider | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  //Ver 
  const handleView = (id: string) => {
    const provider = providers.find((p) => p.id === id)
    if (provider) {
      setSelectedProvider(provider)
      setIsViewModalOpen(true)
    }
  }

  //Editar
  const handleEdit = (id: string) => {
  const provider = providers.find((p) => p.id === id)
  if (provider) {
    setSelectedEditProvider(provider)
    setIsEditModalOpen(true)
  }
}


 const handleSaveEdit = (updatedProvider: Provider) => {
  setProviders((prev) =>
    prev.map((p) => (p.id === updatedProvider.id ? updatedProvider : p))
  )
}


  const filteredProviders = providers.filter((prov) =>
    prov.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setNewProvider((prev) => ({ ...prev, imageUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreate = () => {
    if (!newProvider.name) return
    const newItem = {
      ...newProvider,
      id: Date.now().toString(),
      imageUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
      active: true,
    }
    setProviders([...providers, newItem])
    setNewProvider({ name: "", nit: "", email: "", phone: "", inCharge: "",  })
    setPreviewImage(null)
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setProviders(providers.filter((p) => p.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setProviders(
      providers.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    )
  }


  const columns = [
    { key: "name", label: "Nombre", render: (u: any) => <AvatarWithName name={u.name} imageUrl={u.imageUrl} /> },
    { key: "email", label: "Email" },
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
          emptyMessage="No se encontraron usuarios" 
        />
      </main>

      {/* Modales */}
      <CreateProveedor 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        previewImage={previewImage}
        handleImageChange={handleImageChange}
        newProvider={newProvider}
        setNewProvider={setNewProvider}
        handleCreate={handleCreate}
      />

      <ViewProveedor 
        isOpen = {isViewModalOpen}
        onClose = {() => setIsViewModalOpen(false)}  
        provider = {selectedProvider}
      />

      <EditProveedor 
        open = {isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        provider={selectedEditProvider}
        onSave={handleSaveEdit}
      />


    
    </div>

  )
}


