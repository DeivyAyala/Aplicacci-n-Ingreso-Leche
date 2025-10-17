import { useState } from "react"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BanIcon, EditIcon, MoreVerticalIcon, PlusIcon, SearchIcon, TrashIcon, EyeIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Provider {
  id: string
  name: string
  nit: string
  email: string
  phone: string
  inCharge: string
  active: boolean
  imageUrl: string
}

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
  },
]

export const ProveedorPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [providers, setProviders] = useState<Provider[]>(initialProviders)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const filteredProviders = providers.filter((prov) =>
    prov.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

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
            <div className="flex items-center gap-2 w-full sm:w-1/2">
              <Input
                type="text"
                placeholder="Buscar proveedor por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-amber-200 focus:ring-amber-400"
              />
              <SearchIcon className="text-amber-600" />
            </div>

            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2"
              onClick={() => alert("Abrir modal para agregar proveedor")}
            >
              <PlusIcon className="h-4 w-4" />
              Nuevo Proveedor
            </Button>
          </CardContent>
        </Card>

        {/* Tabla de proveedores */}
        <Card className="border-amber-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {/* Encabezado */}
              <div className="min-w-[800px] grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_0.5fr] gap-2 border-b border-amber-200 bg-amber-100/60 text-amber-800 font-semibold text-sm px-4 py-2">
                <div>Nombre</div>
                <div>NIT</div>
                <div className="hidden sm:block">Email</div>
                <div>Estado</div>
                <div className="text-center">Acciones</div>
                <div className="text-center">Ver</div>
              </div>

              {/* Filas */}
              {filteredProviders.map((prov) => (
                <div
                  key={prov.id}
                  className="min-w-[800px] grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_0.5fr] gap-2 items-center px-4 py-3 border-b border-amber-100 hover:bg-amber-50 text-sm relative"
                >
                  {/* Imagen + nombre */}
                  <div className="flex items-center gap-3 text-amber-900 font-medium">
                    <img
                      src={prov.imageUrl}
                      alt={prov.name}
                      className="w-9 h-9 rounded-full object-cover border border-amber-200"
                    />
                    {prov.name}
                  </div>

                  <div className="text-amber-700">{prov.nit}</div>
                  <div className="hidden sm:block text-amber-700">{prov.email}</div>

                  {/* Estado */}
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prov.active
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {prov.active ? "Activo" : "Inactivo"}
                    </span>
                  </div>

                  {/* Botón menú */}
                  <div className="flex justify-center relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                      onClick={() => toggleMenu(prov.id)}
                    >
                      Elegir Acción <MoreVerticalIcon className="h-4 w-4" />
                    </Button>

                    {/* Menú desplegable */}
                    {openMenuId === prov.id && (
                      <div className="absolute right-0 top-10 bg-white border border-amber-200 rounded-md shadow-md z-50 w-40">
                        <div className="px-3 py-2 border-b text-sm font-semibold text-amber-800">
                          Acciones
                        </div>
                        <button
                          onClick={() => alert(`Editar proveedor ${prov.name}`)}
                          className="w-full text-left px-3 py-2 flex items-center gap-2 text-amber-700 hover:bg-amber-50"
                        >
                          <EditIcon className="h-4 w-4" /> Editar datos
                        </button>
                        <button
                          onClick={() => handleToggleActive(prov.id)}
                          className="w-full text-left px-3 py-2 flex items-center gap-2 text-amber-700 hover:bg-amber-50"
                        >
                          <BanIcon className="h-4 w-4" />{" "}
                          {prov.active ? "Desactivar" : "Activar"}
                        </button>
                        <button
                          onClick={() => handleDelete(prov.id)}
                          className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4" /> Eliminar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Botón Ver */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                      onClick={() => alert(`Ver detalles de ${prov.name}`)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Si no hay resultados */}
              {filteredProviders.length === 0 && (
                <div className="text-center text-amber-700 py-10 min-w-[800px]">
                  No se encontraron proveedores
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
