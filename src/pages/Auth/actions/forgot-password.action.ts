import { gestionApi } from "@/api/gestionApi"

export interface ForgotPasswordResponse {
  ok: boolean
  msg: string
}

export const forgotPasswordAction = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  const { data } = await gestionApi.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    { email }
  )

  return data
}

