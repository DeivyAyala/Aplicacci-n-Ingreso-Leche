import { DashboardLayout } from "@/layouts/DashboardLayout"
import { AdmPanelRoutes } from "@/pages/router/AdmPanelRoutes"
import { AuthLoginRoutes } from "@/pages/router/AuthLoginRoutes"
import { Route, Routes } from "react-router"



interface AppRoutesProps {
  user?: {
    name: string
    role: string
  }
}

export const AppRoutes = ({ user }: AppRoutesProps) => {
  if (!user) return <AuthLoginRoutes />

  return (
    <Routes>
      <Route
        element={<DashboardLayout role={user.role} userName={user.name} />}
      >
        <Route path="/*" element={<AdmPanelRoutes />} />
      </Route>
    </Routes>
  )
}
