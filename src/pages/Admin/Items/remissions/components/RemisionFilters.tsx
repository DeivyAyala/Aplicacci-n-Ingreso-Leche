import { Input } from "@/components/ui/input"
import { FilterBox } from "./FilterBox";

type Filters = {
  dateFrom: string;
  dateTo: string;
  provider: string;
  tank: string;
  user: string;
  volumeRange: string;
};

interface props {
    filters: Filters,
    setFilters:  React.Dispatch<React.SetStateAction<Filters>>
    
}

const tanks = ["Tanque 1", "Tanque 2", "Tanque 3","Tanque 4" ];
const VolumenRango = [
  {value : "0-100" , title : "0-100L"},
  {value : "101-200" , title : "101-200L"},
  {value : "201-300" , title : "201-300L"},
  {value : "301-400" , title : "301-400L"}
]


export const RemisionFilters = ({filters, setFilters}:props) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 p-4 bg-amber-50/50 rounded-lg border border-amber-200">
        <FilterBox title="Fecha Desde">
            <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="border-amber-200 focus:border-amber-400"
            />
        </FilterBox>
        <FilterBox title="Fecha Hasta" >
            <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="border-amber-200 focus:border-amber-400"
            />
        </FilterBox>
        <FilterBox title="Proveedor">
            <Input
                placeholder="Nombre del proveedor"
                value={filters.provider}
                onChange={(e) => setFilters({ ...filters, provider: e.target.value })}
                className="border-amber-200 focus:border-amber-400"
            />
        </FilterBox>
        <FilterBox title="Tanque">
          <select
            value={filters.tank}
            onChange={(e) => setFilters({ ...filters, tank: e.target.value })}
            className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
          >
              <option value="">Todos</option>
              {tanks.map((q)=>(
                <option key={q} value={q}>{q}</option>
                ))}
          </select>
        </FilterBox>
        <FilterBox title="Usuario">
          <Input
            placeholder="Nombre del usuario"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
            className="border-amber-200 focus:border-amber-400"
          />
        </FilterBox> 
        <FilterBox title="Volumen"  >
          <select
            value={filters.volumeRange}
            onChange={(e) => setFilters({ ...filters, volumeRange: e.target.value })}
            className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
          >
            <option value="">Todos</option>
            {VolumenRango.map((rango)=>(
              <option value={rango.value}>{rango.title}</option>
            ))}
            
          </select>
        </FilterBox>
     </div>
  )
}
