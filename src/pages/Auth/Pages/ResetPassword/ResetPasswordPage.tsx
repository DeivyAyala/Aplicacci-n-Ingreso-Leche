import { useMemo, useState, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@radix-ui/react-select"
import { HeaderFooter } from "../components/HeaderFooter"
import { Titulo } from "../components/Titulo"
import { PasswordField } from "../Login/ui/PasswordField"
import { resetPasswordAction } from "../../actions/reset-password.action"
import { toast } from "sonner"

export const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const tokenMissing = useMemo(() => token.trim().length === 0, [token])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (tokenMissing) {
      toast.error("Token no valido o ausente")
      return
    }

    if (password.length < 6) {
      toast.error("La contrasena debe tener al menos 6 caracteres")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Las contrasenas no coinciden")
      return
    }

    setIsPosting(true)
    try {
      const res = await resetPasswordAction({ token, password })
      if (res.ok) {
        toast.success("Contrasena actualizada")
        navigate("/auth/login")
        return
      }
      toast.error(res.msg || "No se pudo actualizar la contrasena")
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "No se pudo actualizar la contrasena")
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <HeaderFooter>
      <Card className="border-border shadow-lg">
        <Titulo
          titulo="Restablecer contrasena"
          subtitulo="Ingresa tu nueva contrasena para continuar"
        />

        <CardContent className="space-y-4">
          {tokenMissing ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              El enlace no es valido o ha expirado.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nueva contrasena</Label>
                <PasswordField
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contrasena</Label>
                <PasswordField
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-primary hover:bg-primary/90"
                disabled={isPosting}
              >
                {isPosting ? "Actualizando..." : "Actualizar"}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            Volver a{" "}
            <Button variant="link" className="h-auto px-0 font-medium">
              <Link to="/auth/login">iniciar sesion</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </HeaderFooter>
  )
}

