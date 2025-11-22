import { Route, Routes } from "react-router"

import { ReceptionPage } from "../Admin/Items/reception/ReceptionPage"

import { RemissionPage } from "../Admin/Items/remissions/RemissionPage"
import { DashboardPage } from "../Admin/Items/dashboard/DashboardPage"
import { ProviderPage } from "../Admin/Items/provider/ProviderPage"
import { DetailsPage } from "../Admin/Items/remissionDetails/DetailsPage"
import { StaffPage } from "../Admin/Items/staff/StaffPage"
import { TanksPage } from "../Admin/Items/tanks/TanksPage"
import { UserPage } from "../Admin/Items/users/UserPage"

export const AdmPanelRoutes = () => {
  return (
    <Routes>
      <Route path="adm/dashboard" element={<DashboardPage/>}/>
      <Route path="adm/reception" element={<ReceptionPage />} />
      <Route path="adm/remission" element={<RemissionPage />} />
      <Route path="adm/providers" element={ <ProviderPage/> }/>
      <Route path="adm/users" element={ <UserPage/> }/>
      <Route path="adm/tanks" element = { <TanksPage /> } />
      <Route path="adm/staff" element = { <StaffPage /> } />
      <Route path="adm/registro/:id" element={<DetailsPage />} />
      <Route path="*" element={<DashboardPage/>} />
    </Routes>
  )
}
