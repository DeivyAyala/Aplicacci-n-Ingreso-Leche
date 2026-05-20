import { Route, Routes } from "react-router"
import { OperatorHomePage } from "../Operator/OperatorHomePage"
import { ReceptionPage } from "../Admin/Items/reception/ReceptionPage"
import { RemissionPage } from "../Admin/Items/remissions/RemissionPage"
import { DetailsPage } from "../Admin/Items/remissionDetails/DetailsPage"
import { MilkMovementsPage } from "../Admin/Items/milkMovements/MilkMovementsPage"

export const OperadorRoutes = () => {
  return (
    <Routes>
      <Route path="operador/inicio" element={<OperatorHomePage />} />
      <Route
        path="operador/recepcion"
        element={
          <ReceptionPage
            backUrl="/operador/inicio"
            successUrl="/operador/remisiones"
          />
        }
      />
      <Route
        path="operador/remisiones"
        element={
          <RemissionPage
            showDelete={false}
            showExport={false}
            detailsBasePath="/operador/remisiones"
          />
        }
      />
      <Route
        path="operador/remisiones/:id"
        element={
          <DetailsPage
            backUrl="/operador/remisiones"
            showDelete={false}
          />
        }
      />
      <Route
        path="operador/movimientos"
        element={
          <MilkMovementsPage
            showDelete={false}
            showExport={false}
          />
        }
      />
      <Route path="*" element={<OperatorHomePage />} />
    </Routes>
  )
}
