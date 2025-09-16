
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

import {
  DropletIcon,
  TrendingUpIcon,
  UsersIcon,
  PlusIcon,
  FileTextIcon,
  EyeIcon,
  FlaskConicalIcon,
  BarChart3Icon
} from "lucide-react"
import { CustomJumbotron } from "@/Registro/Components/CustomJumbotron"
import { Header } from "@/Registro/Components/Header"
import { CardInicio } from "./components/CardInicio"
import { Registros } from "@/Registro/Data/Registros"
import { QuilityCard } from "../Historial/components/QuilityCard"
import { Link } from "react-router"

export const InicioPage = () => {

  const totaLitros = Registros.reduce((acc, i) => acc + i.realVolume, 0)
  const totalProveedores = new Set(Registros.map(i => i.provider)).size
  const promedioGrasa = (Registros.reduce((acc, i)=> acc + i.fat, 0)/Registros.length).toFixed(2)
  const promedioProteina = (Registros.reduce((acc, i)=> acc + i.protein, 0)/Registros.length).toFixed(2)
  const temperaturaPromedio = (Registros.reduce((acc, i)=> acc + i.temperature, 0)/Registros.length).toFixed(2)
  const pHPromedio = (Registros.reduce((acc, i)=> acc + i.pH, 0)/Registros.length).toFixed(2)
  const densidadPromedio = (Registros.reduce((acc, i)=> acc + i.density, 0)/Registros.length).toFixed(4)

  return (
    <>
      {/* Header */}
      <Header/>
      
      {/*Titulo y Subtitulo */}
     <CustomJumbotron 
      title="Registro de Ingreso de Leche" 
      subtitle="Monitorea la calidad, cantidad y gestiona los ingresos de leche en tiempo real" 
     />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 ">

          {/* Resumen Diario */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3Icon className="h-5 w-5 text-primary" />
                Resumen Diario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Litros recibidos</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                    +4%
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DropletIcon className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{totaLitros}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Proveedores activos</span>
                  <Badge variant="outline" className="text-muted-foreground">
                    Sin cambios
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{totalProveedores}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calidad Promedio */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FlaskConicalIcon className="h-5 w-5 text-primary" />
                Calidad Promedio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Grasa (%)</span>
                  <span className="text-sm text-muted-foreground">{promedioGrasa}%</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-muted-foreground">Meta: 3.6 - 4.2%</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Proteína (%)</span>
                  <span className="text-sm text-muted-foreground">{promedioProteina}%</span>
                </div>
                <Progress value={64} className="h-2" />
                <p className="text-xs text-muted-foreground">Meta: 3.1 - 3.4%</p>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rapidas  */}
          <Card className="lg:col-span-1 md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
             
                <Button className="w-full justify-start gap-2 h-12 bg-primary hover:bg-primary/90">
                    <PlusIcon className="h-4 w-4" />
                      <Link to="ingreso">
                        Nuevo Ingreso
                      </Link>  
                </Button>
             

              <Button variant="outline" className="w-full justify-start gap-2 h-12 bg-transparent">
                <EyeIcon className="h-4 w-4" />
                <Link to="historial" >
                  Ver Remisiones
                </Link>
              </Button>

              <Button className="w-full justify-start gap-2 h-12 bg-green-600 hover:bg-green-700 text-white">
                <FileTextIcon className="h-4 w-4" />
                Generar Reporte
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Datos Adicionales */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardInicio title="Temperatura Promedio" dato={`${temperaturaPromedio}°C`} escala="°C" className="text-blue-600"/>
          <CardInicio title="pH Promedio" dato={pHPromedio} escala="pH" className="text-red-600"/>
          <CardInicio title="Densidad" dato={`${densidadPromedio}°g/ml`} escala="g/ml" className="text-purple-600"/>
          <QuilityCard/>
        </div>
      </main>
    </>
  )
}
