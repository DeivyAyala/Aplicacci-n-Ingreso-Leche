
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  SearchIcon,
  DownloadIcon,
} from "lucide-react"

import { Header } from "@/Registro/Components/Header"
import { CustomJumbotron } from "@/Registro/Components/CustomJumbotron"
import { Registros } from "@/Registro/Data/Registros"
import { RemisionCard } from "./components/RemisionCard"
import { SearchBox } from "./components/SearchBox"
import { RemisionFilters } from "./components/RemisionFilters"
import { exportDataExcel } from "@/Registro/Helpers/ExportDataExcel"



export const HistorialPage =() => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    provider: "",
    quality: "",
    user: "",
    volumeRange: "",
  })

  

  const filtroRegistros = Registros.filter((registro) => {
    const matchesSearch =
      registro.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateFrom = !filters.dateFrom || registro.date >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || registro.date <= filters.dateTo;
    const matchesProvider =
      !filters.provider || registro.provider.toLowerCase().includes(filters.provider.toLowerCase());
    const matchesQuality = !filters.quality || registro.quality === filters.quality;
    const matchesUser = !filters.user || registro.user.toLowerCase().includes(filters.user.toLowerCase());

    return matchesSearch && matchesDateFrom && matchesDateTo && matchesProvider && matchesQuality && matchesUser
  })


  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Header */}
            <Header/>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtroRegistros.map((registro) => (
            <RemisionCard key={registro.id} registro={registro}/>
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
