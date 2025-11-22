import { Route, Routes } from "react-router"
import { InicioPage } from "../Admin/Items/Inicio/InicioPage"
import { IngresoPage } from "../Admin/Items/Ingreso/IngresoPage"


import { RegistroPage } from "../Admin/Items/RemisionDetalles/RegistroPage"
import { ProveedorPage } from "../Admin/Items/Proveedor/ProveedorPage"
import { UsuarioPage } from "../Admin/Items/Usuarios/UsuarioPage"
import { TanquePage } from "../Admin/Items/Tanques/TanquePage"
import { PersonalPage } from "../Admin/Items/Personal/PersonalPage"
import { RemissionPage } from "../Admin/Items/Historial/RemissionPage"

export const AdmPanelRoutes = () => {
  return (
    <Routes>
      <Route path="adm/inicio" element={<InicioPage/>}/>
      <Route path="adm/ingreso" element={<IngresoPage />} />
      <Route path="adm/remission" element={<RemissionPage />} />
      <Route path="adm/proveedor" element={ <ProveedorPage/> }/>
      <Route path="adm/usuario" element={ <UsuarioPage/> }/>
      <Route path="adm/tanque" element = { <TanquePage /> } />
      <Route path="adm/personal" element = { <PersonalPage /> } />
      <Route path="adm/registro/:id" element={<RegistroPage />} />
      <Route path="*" element={<InicioPage/>} />
    </Routes>
  )
}
