import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterIcon, SearchIcon } from "lucide-react"
import { FilterBox } from "../../remissions/components/FilterBox"
import { Input } from "@/components/ui/input"
import type { TankProps } from "../../tanks/types/Tank"

type Filters = {
    type: string,
    originTank: string,
    destinationTank: string,
    client: string,
    movementDate: string,
}

interface propsMovementBox {
    searchTerm: string,
    setSearchTerm: (value: React.SetStateAction<string>) => void,
    showFilters: boolean,
    setShowFilters: (value: React.SetStateAction<boolean>) => void,
    filters: Filters,
    setFilters:  React.Dispatch<React.SetStateAction<Filters>>
    tanks : TankProps[]
    onCreateMovement: () => void
}


export const MovementsBox = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  setFilters,
  filters,
  tanks,
  onCreateMovement,
}: propsMovementBox) => {
  return (
    <div>
        <Card className="border-amber-200 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <SearchIcon className="h-5 w-5" />
              Busqueda y Filtros
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
                <Input
                  placeholder="Buscar por tipo, cliente o tanques..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <Button
                className="bg-amber-600 hover:bg-amber-700"
                onClick={onCreateMovement}
              >
                Crear movimiento
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <FilterIcon className="h-4 w-4" />
              Filtros Avanzados
            </Button>

            {showFilters && (
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 p-4 bg-amber-50/50 rounded-lg border border-amber-200">
                <FilterBox title="Tipo">
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
                  >
                    <option value="">Todos</option>
                    <option value="PROCESO">PROCESO</option>
                    <option value="TRASLADO">TRASLADO</option>
                    <option value="VENTA">VENTA</option>
                  </select>
                </FilterBox>
                <FilterBox title="Tanque origen">
                  <select
                    value={filters.originTank}
                    onChange={(e) =>
                      setFilters({ ...filters, originTank: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
                  >
                    <option value="">Todos</option>
                    {tanks.map((tank) => (
                      <option key={tank._id} value={tank._id}>
                        {tank.name}
                      </option>
                    ))}
                  </select>
                </FilterBox>
                <FilterBox title="Tanque destino">
                  <select
                    value={filters.destinationTank}
                    onChange={(e) =>
                      setFilters({ ...filters, destinationTank: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
                  >
                    <option value="">Todos</option>
                    {tanks.map((tank) => (
                      <option key={tank._id} value={tank._id}>
                        {tank.name}
                      </option>
                    ))}
                  </select>
                </FilterBox>
                <FilterBox title="Cliente">
                  <Input
                    placeholder="Nombre del cliente"
                    value={filters.client}
                    onChange={(e) =>
                      setFilters({ ...filters, client: e.target.value })
                    }
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                </FilterBox>
                <FilterBox title="Fecha">
                  <Input
                    type="date"
                    value={filters.movementDate}
                    onChange={(e) =>
                      setFilters({ ...filters, movementDate: e.target.value })
                    }
                    className="border-amber-200 focus:border-amber-400"
                  />
                </FilterBox>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  )
}
