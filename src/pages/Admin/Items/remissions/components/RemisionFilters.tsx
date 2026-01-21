import { Input } from "@/components/ui/input"
import { FilterBox } from "./FilterBox";
import type { TankProps } from "../../tanks/types/Tank";

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
    tanks : TankProps[]
}





export const RemisionFilters = ({filters, setFilters, tanks}:props) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 p-4 bg-amber-50/50 rounded-lg border border-amber-200">
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
            onChange={(e) =>
              setFilters({ ...filters, tank: e.target.value })
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
        <FilterBox title="Usuario">
          <Input
            placeholder="Nombre del usuario"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
            className="border-amber-200 focus:border-amber-400"
          />
        </FilterBox> 
     </div>
  )
}
