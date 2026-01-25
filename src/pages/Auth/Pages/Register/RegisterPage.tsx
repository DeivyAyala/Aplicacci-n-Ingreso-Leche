import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { HeaderFooter } from "../components/HeaderFooter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import {  Separator } from "@radix-ui/react-select"
import { User, Mail } from "lucide-react"
import { useState, type FormEvent } from "react"

import { Link } from "react-router"
// import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Titulo } from "../components/Titulo"
import { toast } from "sonner"
import { useAuthStore } from "../../store/auth.store"
import { PasswordField } from "../Login/ui/PasswordField"








export const RegisterPage = () => {
  const { register, user } = useAuthStore()
  const [isPosting, setIsPosting] = useState(false)

  const handleRegister = async(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setIsPosting(true)
    const notify = (type: "success" | "error", message: string) => {
      const t = toast as any
      if (t?.[type]) t[type](message)
      else if (typeof t === "function") t(message)
    }

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get('name') as string
      const lastName = formData.get('lastName') as string
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const result = await register(name, lastName, email, password);
      if (result.ok) {
        notify("success", result.msg || "Creado exitosamente, revisa tu email")
        (e.target as HTMLFormElement).reset()
        return
      }
      notify("error", result.msg || "Correo ya esta Registrado")
    } finally {
      setIsPosting(false)
    }
  }



  return (
    <HeaderFooter>
      {<Card className="border-border shadow-lg">
        <Titulo 
          titulo="Crear Cuenta Nueva" 
          subtitulo="Completa los datos para crear tu cuenta"
        />

          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Juan"
                      name="name"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Pérez"
                      name="lastName"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@empresa.com"
                    name="email"
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <PasswordField 
                    value={user?.password}
                    name="password"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  Acepto los{" "}
                  <Button variant="link" className="px-0 text-primary hover:text-primary/80 h-auto">
                    términos y condiciones
                  </Button>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isPosting}
              >
                {isPosting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  "Crear Cuenta"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <div className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Button
                variant="link"
                className="px-0 text-primary hover:text-primary/80 font-medium"
              >
                <Link to="/auth/login">
                   Iniciar sesión
                </Link> 
              </Button>
            </div>
          </CardFooter>
        </Card>}
    </HeaderFooter>
  )
}
