import { Route, Routes } from "react-router"
import { OperadorInicio } from "../Operador/OperadorInicio"
// import { OperadorInicio } from "../Operador/OperadorInicio"

export const OperadorRoutes = () => {
  return (
    <Routes>
      <Route path="operador/inicio" element={<OperadorInicio />} />
      <Route path="*" element={<OperadorInicio />} />
    </Routes>
  )
}
