import { Outlet } from "react-router"
import { OperatorSidebar } from "./components/OperatorSidebar"

interface OperatorLayoutProps {
  role: string
  userName?: string
}

export const OperatorLayout = ({ role, userName }: OperatorLayoutProps) => {
  return (
    <div className="flex h-screen bg-[#FFFDF9]">
      <OperatorSidebar role={role} userName={userName} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
