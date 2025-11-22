import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FilterIcon, SearchIcon } from "lucide-react"

interface props {
    searchTerm: string,
    setSearchTerm: (value: React.SetStateAction<string>) => void,
    showFilters: boolean,
    setShowFilters: (value: React.SetStateAction<boolean>) => void
}

export const SearchBox = ({searchTerm, setSearchTerm, showFilters, setShowFilters}:props) => {
  return (
    <div className="flex gap-4">
        <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
            <Input
                placeholder="Buscar por ID de remisión, proveedor o usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
        </div>
            <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
            <FilterIcon className="h-4 w-4" />
                Filtros Avanzados
            </Button>
    </div>
  )
}
