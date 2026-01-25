import { gestionApi } from "@/api/gestionApi"

export interface VerifyEmailResponse {
  ok: boolean
  msg: string
}

export const verifyEmailAction = async (token: string): Promise<VerifyEmailResponse> => {
  const { data } = await gestionApi.get<VerifyEmailResponse>("/auth/verify", {
    params: { token },
  })
  return data
}
