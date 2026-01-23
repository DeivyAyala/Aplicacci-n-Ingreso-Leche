import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DashboardRange } from "../types/Dashboard"

interface DashboardRangeSelectProps {
  value: DashboardRange
  onChange: (value: DashboardRange) => void
  size?: "sm" | "default"
}

const RANGE_LABELS: Record<DashboardRange, string> = {
  day: "Hoy",
  week: "Ultimos 7 dias",
  month: "Este mes",
  year: "Este ano",
}

export const DashboardRangeSelect = ({
  value,
  onChange,
  size = "default",
}: DashboardRangeSelectProps) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as DashboardRange)}>
      <SelectTrigger size={size} className="min-w-[160px]">
        <SelectValue placeholder="Selecciona rango" />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(RANGE_LABELS) as DashboardRange[]).map((range) => (
          <SelectItem key={range} value={range}>
            {RANGE_LABELS[range]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
