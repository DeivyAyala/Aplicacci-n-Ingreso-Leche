
import { DashboardAdm } from "@/components/DashboardAdm"
import { Outlet } from "react-router"


interface DashboardLayoutProps {
  role: string
  userName?: string
}

export const DashboardLayout = ({ role, userName }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-[#FFFDF9]">
      <DashboardAdm role={role} userName={userName} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
