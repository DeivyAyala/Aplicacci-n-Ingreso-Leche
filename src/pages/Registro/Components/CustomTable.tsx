import React from "react"

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
}

interface CustomTableProps<T> {
  data: T[]
  columns: Column<T>[]
  emptyMessage?: string
}

export function CustomTable<T>({
  data = [],
  columns = [],
  emptyMessage = "Sin datos disponibles",
}: CustomTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-amber-100 rounded-xl bg-white shadow-sm">
      <table className="min-w-full text-sm text-left border-collapse">

        <thead className="bg-amber-50 text-amber-800 font-semibold">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 whitespace-nowrap border-b border-amber-100"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Cuerpo */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-amber-700"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-amber-50 transition-colors border-b border-amber-100"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-3 text-amber-900 align-middle min-w-[100px] sm:min-w-[140px] md:min-w-[160px]"
                  >
                    {col.render ? (
                      col.render(item)
                    ) : (
                      <span
                        className="block truncate max-w-[100px] sm:max-w-[160px] md:max-w-[220px]"
                        title={String((item as any)[col.key])}
                      >
                        {(item as any)[col.key]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
