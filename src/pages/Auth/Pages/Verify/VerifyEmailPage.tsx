import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeaderFooter } from "../components/HeaderFooter"
import { Titulo } from "../components/Titulo"
import { verifyEmailAction } from "../../actions/verify-email.action"

type Status = "idle" | "loading" | "success" | "error"

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) {
      setStatus("error")
      setMessage("Token no encontrado")
      return
    }

    const run = async () => {
      try {
        setStatus("loading")
        const res = await verifyEmailAction(token)
        setStatus(res.ok ? "success" : "error")
        setMessage(res.msg)
      } catch (error: any) {
        setStatus("error")
        setMessage(error?.response?.data?.msg || "Error al verificar el correo")
      }
    }

    run()
  }, [searchParams])

  return (
    <HeaderFooter>
      <Card className="border-border shadow-lg">
        <Titulo
          titulo="Verificacion de correo"
          subtitulo="Confirma tu cuenta para poder iniciar sesion"
        />
        <CardContent className="space-y-3 text-center">
          {status === "loading" && <p>Verificando correo...</p>}
          {status === "success" && <p>{message || "Correo verificado correctamente"}</p>}
          {status === "error" && <p>{message || "No fue posible verificar el correo"}</p>}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="h-11">
            <Link to="/auth/login">Ir a iniciar sesion</Link>
          </Button>
        </CardFooter>
      </Card>
    </HeaderFooter>
  )
}
