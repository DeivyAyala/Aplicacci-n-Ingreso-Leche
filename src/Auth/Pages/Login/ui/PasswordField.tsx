import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Lock } from "lucide-react"
import { useState } from 'react';


interface props{
    value: string,
    name:string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasswordField = ({value, name, onChange}: props) => {
    const [showPassword, setshowPassword] = useState(false)

  return (
    <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                    id="password"
                    type={showPassword ? "text" : "password"} //Para ocultar o no contraseña
                    placeholder="••••••••"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="pl-10 pr-10 h-11"
                    required
                  />
        <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setshowPassword(!showPassword)}
        >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" /> //Boton de ocultar el password
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
        </Button>
    </div>  
  )
}
