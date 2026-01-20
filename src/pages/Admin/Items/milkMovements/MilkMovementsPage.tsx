import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TruckIcon } from "lucide-react"
import { CustomJumbotron } from "../../Components/CustomJumbotron"

export const MilkMovementsPage = () => {
  return (
    <div className="min-h-screen bg-amber-50/30">
      <CustomJumbotron
        title="Movimientos y Salidas de Leche"
        subtitle="Seguimiento de los movimientos de leche saliente y registros de despacho"
      />

      <main className="container mx-auto px-6 py-8">
        <Card className="border-amber-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <TruckIcon className="h-5 w-5" />
              Movimientos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-800">
            Start recording milk movements and outputs from this section.
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
