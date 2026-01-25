import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "../Auth/Pages/Login/LoginPage"
import { RegisterPage } from "../Auth/Pages/Register/RegisterPage"
import { VerifyEmailPage } from "../Auth/Pages/Verify/VerifyEmailPage"
import { RecuperarPasswordPage } from "../Auth/Pages/RecuperarContraseña/RecuperarPasswordPage"
import { ResetPasswordPage } from "../Auth/Pages/ResetPassword/ResetPasswordPage"

export const AuthLoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="auth/login" />} />
      <Route path="auth/login" element={<LoginPage />} />
      <Route path="auth/register" element={<RegisterPage />} />
      <Route path="verify" element={<VerifyEmailPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="auth/forgot-password" element={<RecuperarPasswordPage />} />
      <Route path="auth/recuperarContraseña" element={<RecuperarPasswordPage />} />
    </Routes>
  )
}



