import { useEffect, useState } from "react"
import { gestionApi } from "@/api/gestionApi"
import { toast } from "sonner"
import type { Provider } from "../Admin/Items/provider/types/Provider"
import type { StaffProps } from "../Admin/Items/staff/types/Staff"
import type { TankProps } from "../Admin/Items/tanks/types/Tank"




export const useOptions = () => {
  const [providers, setProviders] = useState<Provider[]>([])
  const [supervisors, setSupervisors] = useState<StaffProps[]>([])
  const [analysts, setAnalysts] = useState<StaffProps[]>([])
  const [tanks, setTanks] = useState<TankProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [prov, sup, anal, tanq] = await Promise.all([
          gestionApi.get("/proveedor"),
          gestionApi.get("/personal?role=Supervisor"),
          gestionApi.get("/personal?role=Calidad"),
          gestionApi.get("/tanque"),
        ])

        // 🔥 Transformación correcta al tipo Provider
        setProviders(
          prov.data.proveedor.map((p: any) => ({
            _id: p._id,
            id: p._id,           // Compatibilidad
            name: p.name ?? p.nombre ?? "",
            nit: p.nit ?? "",
            email: p.email ?? "",
            phone: p.phone ?? "",
            address: p.address ?? "",
          }))
        )

        setSupervisors(sup.data.personal ?? [])
        setAnalysts(anal.data.personal ?? [])
        setTanks(tanq.data.tanques ?? [])

      } catch (error: any) {
        console.error("Error cargando listas:", error)
        if (error.response?.status === 401) {
          toast.error("Sesión expirada.")
        } else {
          toast.error("Error al cargar opciones.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOptions()
  }, [])

  return {
    providers,
    supervisors,
    analysts,
    tanks,
    loading,
  }
}