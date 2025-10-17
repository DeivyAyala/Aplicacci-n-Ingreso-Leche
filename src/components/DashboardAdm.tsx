import {
  HomeIcon,
  ClipboardListIcon,
  HistoryIcon,
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  FactoryIcon,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router"

interface DashboardAdmProps {
  role?: string
  userName?: string
}

export const DashboardAdm = ({
  role = "Administrador",
  userName = "Juan Pérez",
}: DashboardAdmProps) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems = [
    { name: "Inicio", path: "/adm/inicio", icon: HomeIcon },
    { name: "Ingresos de Leche", path: "/adm/ingreso", icon: ClipboardListIcon },
    { name: "Historial", path: "/adm/historial", icon: HistoryIcon },
    { name: "Proveedores", path: "/adm/proveedor", icon: FactoryIcon },
    { name: "Reportes", path: "/adm/reportes", icon: BarChart3Icon },
    { name: "Configuración", path: "/adm/configuracion", icon: SettingsIcon },
    
  ]

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="bg-[#FFF7ED] border border-[#F5E6D3]"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <XIcon className="h-6 w-6 text-[#EA580C]" />
          ) : (
            <MenuIcon className="h-6 w-6 text-[#EA580C]" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className="fixed md:static top-0 left-0 h-full w-64 bg-[#FFF9F3] border-r border-[#F6E9DA] flex flex-col justify-between z-40 shadow-md md:shadow-none"
          >
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3 px-6 py-5 border-b border-[#F6E9DA]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white font-bold text-lg shadow-sm">
                  NC
                </div>
                <div>
                  <h1 className="font-semibold text-[#1E1E1E] text-base">
                    NUTTRE&CO
                  </h1>
                  <p className="text-xs text-[#A78B7C]">
                    Sistema de Recepción
                  </p>
                </div>
              </div>

              {/* Navegación */}
              <nav className="mt-5 flex flex-col gap-1 px-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 768) setIsOpen(false)
                      }}
                    >
                      <div
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-[15px] transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#FB923C] to-[#EA580C] text-white shadow-sm"
                            : "text-[#5C4B3C] hover:bg-[#FFEBD3] hover:text-[#EA580C]"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Usuario y logout */}
            <div className="border-t border-[#F6E9DA] p-5">
              <div className="flex items-center gap-3 mb-4 bg-[#FFF4E5] p-3 rounded-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD9B5]">
                  <UserIcon className="h-5 w-5 text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    {userName}
                  </p>
                  <p className="text-xs text-[#A78B7C] capitalize">{role}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#FECACA] text-[#DC2626] bg-white hover:bg-[#FEE2E2] hover:text-[#B91C1C]"
              >
                <LogOutIcon className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
