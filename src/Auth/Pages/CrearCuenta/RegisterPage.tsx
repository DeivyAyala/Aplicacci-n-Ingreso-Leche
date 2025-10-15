import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { HeaderFooter } from "../components/HeaderFooter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { SelectTrigger, Separator } from "@radix-ui/react-select"
import { User, UserCheck, EyeOff, Eye, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "@/Registro/hook/useForm"
import { useNavigate } from "react-router"
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Titulo } from "../components/Titulo"

const formData = {
  nombre : '',
  apellido: '',
  contraseña: '',
}

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [IsLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const {nombre, apellido, contraseña, email, onInputChange}= useForm(formData)

  const onSumbit = (e:any) =>{
    e.preventDefault();
    console.log({nombre, apellido, contraseña, role, email})
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
      navigate('/')
    }, 1000)
  }

  const onLogin = () =>{
    navigate('/login')
  }


  return (
    <HeaderFooter>
      {<Card className="border-border shadow-lg">
        <Titulo 
          titulo="Crear Cuenta Nueva" 
          subtitulo="Completa los datos para crear tu cuenta"
        />

          <CardContent className="space-y-4">
            <form onSubmit={onSumbit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Juan"
                      name="nombre"
                      value={nombre}
                      onChange={onInputChange}
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
                      id="apellido"
                      type="text"
                      placeholder="Pérez"
                      name="apellido"
                      value={apellido}
                      onChange={onInputChange}
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
                    value={email}
                    onChange={onInputChange}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger className="pl-10 h-11">
                      <SelectValue placeholder="Selecciona tu rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrador">Administrador</SelectItem>
                      <SelectItem value="operador">Operador</SelectItem>
                      <SelectItem value="calidad">Calidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contraseña"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    name="contraseña"
                    value={contraseña}
                    onChange={onInputChange}
                    className="pl-10 pr-10 h-11"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
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
                disabled={IsLoading}
              >
                {IsLoading ? (
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
                onClick={onLogin}
              >
                Iniciar sesión
              </Button>
            </div>
          </CardFooter>
        </Card>}
    </HeaderFooter>
  )
}
