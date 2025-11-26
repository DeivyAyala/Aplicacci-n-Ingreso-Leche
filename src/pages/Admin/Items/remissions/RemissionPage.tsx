
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  SearchIcon,
  DownloadIcon,
} from "lucide-react"
import { RemisionCard } from "./components/RemisionCard"
import { SearchBox } from "./components/SearchBox"
import { RemisionFilters } from "./components/RemisionFilters"

// import { Header } from "../../Components/Header"
import { CustomJumbotron } from "../../Components/CustomJumbotron"

import { exportDataExcel } from "../../Helpers/ExportDataExcel"
import { useIngreso } from "../../hook/useIngresos"



export const RemissionPage =() => {

  const { data } = useIngreso()

  const registros = (data?.ingresos || []).map((item) => {
   const fecha = new Date(item.customDate)
   const date = fecha.toISOString().split("T")[0]
   const time = fecha.toISOString().split("T")[1].slice(0, 5)

   return {
     id: item._id,
     date,
     time,
     provider: item.provider?.name || "Sin proveedor",
     volume: item.volume,
     realVolume: item.realVolume,
     user: item.user?.name || "Sin usuario",
     notes: Array.isArray(item.notes) ? item.notes : [],
     supervisor: item.supervisor || "",
     analyst: item.analyst || "",
     tank: item.tank || "",
   }
  })



  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    provider: "",
    tank: "",
    user: "",
    volumeRange: "",
  })

  

  const filtroRegistros = registros.filter((registro) => {
    const matchesSearch =
      registro.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateFrom = !filters.dateFrom || registro.date >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || registro.date <= filters.dateTo;
    const matchesProvider =
      !filters.provider || registro.provider.toLowerCase().includes(filters.provider.toLowerCase());
    const matchesTank = !filters.tank || registro.tank === filters.tank;
    const matchesUser = !filters.user || registro.user.toLowerCase().includes(filters.user.toLowerCase());

    return matchesSearch && matchesDateFrom && matchesDateTo && matchesProvider && matchesTank && matchesUser
  })

  

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Header */}
            {/* <Header/> */}
      {/* Custom Jumbotron */}
      <CustomJumbotron
        title="Historial de Remisiones"
        subtitle="Consulta y gestiona el registro completo de ingresos de leche"
      />

      {/* Main */}
      <main className="container mx-auto px-6 py-8">
        {/* Busqueda y Filtros */}
        <Card className="mb-8 border-amber-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <SearchIcon className="h-5 w-5" />
              Búsqueda y Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Caja de Busqueda */}

            <SearchBox 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              showFilters={showFilters} 
              setShowFilters={setShowFilters} 
            />
            
            {/* Filtros avanzados */}
            {showFilters && (
              <RemisionFilters 
                filters={filters} 
                setFilters={setFilters}
              />
            )}
          </CardContent>
        </Card>

        {/* Mostrar el numero de resultados */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-amber-800">
            Mostrando <span className="font-semibold">{filtroRegistros.length}</span> remisiones
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportDataExcel(filtroRegistros)}
            className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
          >
            <DownloadIcon className="h-4 w-4" />
            Exportar
          </Button>
        </div>

       {/* Lista de Remisiones */}
        <div className="grid gap-6 grid-cols-2 [@media(max-width:460px)]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtroRegistros.map((registro, index) => (
            <RemisionCard 
              key={registro.id} 
              registro={registro} 
              index={index + 1}
            />
          ))}
        </div>

        {/* Si esta Vacio */}
        {filtroRegistros.length === 0 && (
          <Card className="border-amber-200">
            <CardContent className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-900 mb-2">No se encontraron remisiones</h3>
              <p className="text-amber-700">Intenta ajustar los filtros de búsqueda</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
