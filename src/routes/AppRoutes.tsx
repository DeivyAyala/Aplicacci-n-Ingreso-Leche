import { DashboardLayout } from "@/layouts/DashboardLayout"
import { DashboardOperadorLayout } from "@/layouts/DashboardOperadorLayout"
import type { User } from "@/pages/Registro/Items/Usuarios/types/User"
import { AdmPanelRoutes } from "@/pages/router/AdmPanelRoutes"
import { AuthLoginRoutes } from "@/pages/router/AuthLoginRoutes"
import { OperadorRoutes } from "@/pages/router/OperadorRoutes"
import { Route, Routes } from "react-router"



interface AppRoutesProps {
  user?: User | null
}

export const AppRoutes = ({ user }: AppRoutesProps) => {
  if (!user) return <AuthLoginRoutes />

  if( user.rol === 'Administrador') {
    return(
      <Routes>
        <Route
          element={<DashboardLayout role={user.rol} userName={user.name} />}
        >
          <Route path="/*" element={<AdmPanelRoutes />} />
        </Route>
      </Routes>
    )
  }

if (user.rol === "Operador") {
    return (
      <Routes>
        <Route
          element={<DashboardOperadorLayout role={user.rol} userName={user.name} />}
        >
          <Route path="/*" element={<OperadorRoutes />} />
        </Route>
      </Routes>
    )
  }
 return <AuthLoginRoutes/>
}
