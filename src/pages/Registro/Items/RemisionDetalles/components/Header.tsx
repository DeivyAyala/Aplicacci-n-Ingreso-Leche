import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, UserIcon } from "lucide-react"
import { useNavigate } from "react-router"


export const Header = () => {
    const navigate = useNavigate()

  return (
    <header className="border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={()=> navigate(-1)} className="flex items-center gap-2 hover:bg-amber-100">
                <ArrowLeftIcon className="h-4 w-4" />
                Volver al Historial
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600 text-white font-bold text-lg">
                  NC
                </div>
                <h1 className="text-xl font-bold text-amber-900">NUTTRE&CO</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <UserIcon className="h-4 w-4 text-amber-600" />
                </div>
                <span className="font-medium text-amber-900">Juan Pérez</span>
              </div>
            </div>
          </div>
        </div>
    </header>
  )
}
