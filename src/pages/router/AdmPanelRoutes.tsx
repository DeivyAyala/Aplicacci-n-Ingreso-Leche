import { Route, Routes } from "react-router"
import { InicioPage } from "../Admin/Items/dashboard/InicioPage"
import { IngresoPage } from "../Admin/Items/reception/IngresoPage"


import { RegistroPage } from "../Admin/Items/remissionDetails/RegistroPage"
import { ProveedorPage } from "../Admin/Items/provider/ProveedorPage"
import { UsuarioPage } from "../Admin/Items/users/UsuarioPage"
import { TanquePage } from "../Admin/Items/tanks/TanquePage"
import { PersonalPage } from "../Admin/Items/staff/PersonalPage"
import { RemissionPage } from "../Admin/Items/remissions/RemissionPage"

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
