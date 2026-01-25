
import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { Mail } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@radix-ui/react-select"
import { HeaderFooter } from "../components/HeaderFooter"
import { Titulo } from "../components/Titulo"
import { forgotPasswordAction } from "../../actions/forgot-password.action"

const SUCCESS_MESSAGE =
  "Si el correo existe te llegara un enlace para recuperar tu contrasena. ¡Revisa tu correo electronico!"

export const RecuperarPasswordPage = () => {
  const [isPosting, setIsPosting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPosting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = String(formData.get("email") || "").trim()
      if (email) {
        await forgotPasswordAction(email)
      }
    } catch (error) {
      // No revelamos errores para evitar filtrar correos validos
    } finally {
      setDone(true)
      setIsPosting(false)
    }
  }

  return (
    <HeaderFooter>
      <Card className="border-border shadow-lg">
        <Titulo
          titulo="Recuperar Contraseña"
          subtitulo="Te enviaremos un enlace para restablecer tu acceso"
        />

        <CardContent className="space-y-4">
          {done ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {SUCCESS_MESSAGE}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electronico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@empresa.com"
                    className="h-11 pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full bg-primary hover:bg-primary/90"
                disabled={isPosting}
              >
                {isPosting ? "Enviando enlace..." : "Enviar enlace"}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            Volver a{" "}
            <Button variant="link" className="h-auto px-0 font-medium">
              <Link to="/auth/login">iniciar sesión</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </HeaderFooter>
  )
}
