import { Button } from "@/components/ui/button"
import { HistoryIcon, LogOutIcon, UserIcon, MenuIcon } from "lucide-react"
import { Link, useLocation } from "react-router"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const Header = () => {
  const location = useLocation()

  const navItems = [
    { name: "Inicio", path: "/", icon: null },
    { name: "Ingresos de Leche", path: "/ingreso", icon: null },
    { name: "Historial", path: "/historial", icon: HistoryIcon },
    { name: "Reportes", path: "/reportes", icon: null },
    { name: "Configuración", path: "/configuracion", icon: null },
    
  ]

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              NC
            </div>
            <h1 className="text-xl font-bold text-foreground">NUTTRE&CO</h1>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.name} to={item.path} className="w-full">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 w-full ${
                      isActive
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Perfil + Logout (Desktop) */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">Juan Pérez</span>
            </div>

            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 bg-transparent"
              >
                <LogOutIcon className="h-4 w-4" />
                Salir
              </Button>
            </Link>
          </div>

          {/* Menú Móvil */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                      NC
                    </div>
                    NUTTRE&CO
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                      <Link key={item.name} to={item.path}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          size="sm"
                          className={`flex items-center gap-2 w-full justify-start ${
                            isActive
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          {item.name}
                        </Button>
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-6 border-t border-border pt-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">Juan Pérez</span>
                </div>

                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 bg-transparent w-full"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Salir
                  </Button>
                </Link>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
