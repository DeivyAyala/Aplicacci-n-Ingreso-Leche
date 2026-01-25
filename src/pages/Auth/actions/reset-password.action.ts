import { gestionApi } from "@/api/gestionApi"

export interface ResetPasswordResponse {
  ok: boolean
  msg: string
}

interface ResetPasswordPayload {
  token: string
  password: string
}

export const resetPasswordAction = async ({
  token,
  password,
}: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
  const { data } = await gestionApi.post<ResetPasswordResponse>(
    "/auth/reset-password",
    { token, password }
  )

  return data
}

