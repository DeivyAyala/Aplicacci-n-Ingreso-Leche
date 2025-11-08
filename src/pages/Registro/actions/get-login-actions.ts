import { gestionApi } from "@/api/gestionApi"
import type { LoginInterface } from "@/pages/Auth/types/typeLogin"



export const getLoginActions = async (email: string, password: string) => {
  try {
    const { data } = await gestionApi.post<LoginInterface>('/auth/login', {
      email,
      password,
    })

    // Guarda el token en el navegador
    localStorage.setItem('token', data.token)

    console.log('✅ Token guardado correctamente:', data.token)
    return data
  } catch (error: any) {
    console.error('❌ Error al iniciar sesión:', error)
    throw error
  }
}