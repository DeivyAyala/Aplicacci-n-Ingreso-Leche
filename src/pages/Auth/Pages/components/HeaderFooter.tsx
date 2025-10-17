import { Button } from "@/components/ui/button"
import { Milk } from "lucide-react"


export const HeaderFooter = ({children}:{children: React.ReactNode}) => {
  return (
   <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Milk className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">NUTTRE&CO</h1>
          <p className="text-muted-foreground">Sistema de Recepción de Leche</p>
        </div>

        {children}
        
        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© 2024 NUTTRE&CO. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Button variant="link" className="px-0 text-xs text-muted-foreground hover:text-foreground">
              Términos de servicio
            </Button>
            <Button variant="link" className="px-0 text-xs text-muted-foreground hover:text-foreground">
              Política de privacidad
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
