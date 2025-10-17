
import { LoginPage } from "../Auth/Pages/Login/LoginPage"
import { RegisterPage } from "../Auth/Pages/CrearCuenta/RegisterPage"
import { Navigate, Route, Routes } from "react-router"
import { RecuperarPasswordPage } from "../Auth/Pages/RecuperarContraseña/RecuperarPasswordPage"

export const AuthLoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="auth/login" />} />
      <Route path="auth/login" element={<LoginPage />} />
      <Route path="auth/crearCuenta" element={<RegisterPage />} />
       <Route path="auth/recuperarContraseña" element={<RecuperarPasswordPage />} />
    </Routes>
  )
}
