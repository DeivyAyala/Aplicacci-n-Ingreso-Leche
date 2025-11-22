
import { SearchIcon, PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchHeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onCreateClick: () => void
  title: string
}

export const SearchHeader = ({ searchTerm, onSearchChange, onCreateClick, title }: SearchHeaderProps) => (
<>
    <div className="flex items-center gap-2 w-full sm:w-1/2">
        <Input
          type="text"
          placeholder={`Buscar ${title.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-amber-200 focus:ring-amber-400"
        />
        <SearchIcon className="text-amber-600" />
    </div>

        <Button
          className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2"
          onClick={onCreateClick}
        >
          <PlusIcon className="h-4 w-4" />
          Nuevo {title}
        </Button>
</>
    

)
