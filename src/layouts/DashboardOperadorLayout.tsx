import { Outlet } from "react-router"

interface Props {
  role: string
  userName?: string
}

export const DashboardOperadorLayout = ({ role, userName }: Props) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-orange-50 p-4 border-r">
        <h1 className="text-lg font-semibold">Panel Operador</h1>
        <p className="text-sm text-gray-600">{userName}</p>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
