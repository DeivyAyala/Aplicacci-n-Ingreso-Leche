
interface StatusBadgeProps {
  active: boolean
}

export const StatusBadge = ({ active }: StatusBadgeProps) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      active
        ? "bg-green-100 text-green-700 border border-green-200"
        : "bg-red-100 text-red-700 border border-red-200"
    }`}
  >
    {active ? "Activo" : "Inactivo"}
  </span>
)
