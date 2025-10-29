import { Route, Routes } from "react-router"
import { InicioPage } from "../Registro/Items/Inicio/InicioPage"
import { IngresoPage } from "../Registro/Items/Ingreso/IngresoPage"
import { HistorialPage } from "../Registro/Items/Historial/HistorialPage"
import { ReportesPage } from "../Registro/Items/Reportes/ReportesPage"
import { ConfiguracionPage } from "../Registro/Items/Configuración/ConfiguracionPage"
import { RegistroPage } from "../Registro/Items/RemisionDetalles/RegistroPage"
import { ProveedorPage } from "../Registro/Items/Proveedor/ProveedorPage"
import { UsuarioPage } from "../Registro/Items/Usuarios/UsuarioPage"

export const AdmPanelRoutes = () => {
  return (
    <Routes>
      <Route path="adm/inicio" element={<InicioPage/>}/>
      {/* <Route index element={<InicioPage />} /> */}
      <Route path="adm/ingreso" element={<IngresoPage />} />
      <Route path="adm/historial" element={<HistorialPage />} />
      <Route path="adm/proveedor" element={ <ProveedorPage/> }/>
      <Route path="adm/usuario" element={ <UsuarioPage/> }/>
      <Route path="adm/reportes" element={<ReportesPage />} />
      <Route path="adm/configuracion" element={<ConfiguracionPage />} />
      <Route path="adm/registro/:id" element={<RegistroPage />} />
      
    </Routes>
  )
}
