import * as XLSX from "xlsx"
import type { RemisionCardData } from "../Items/remissions/components/RemisionCard"

export const exportDataExcel = (filtroRegistros: RemisionCardData[]) => {
    //Generar Encabezados de el excel a exportar  
    const exportsData = filtroRegistros.map((registro)=>({  
      "ID Remisión": registro.id,
      Fecha: registro.date,
      Hora: registro.time,
      "Volumen Remisión (L)": registro.volume,
      "Volumen Real (L)": registro.realVolume,
      Tanque: registro.tankName,
      Proveedor: registro.providerName,
      Calidad: registro.analyst?.name ?? "Sin analista",
      Supervisor: registro.supervisor?.name ?? "Sin supervisor",
      "Ususario de Registro": registro.userName,
      "Notas": registro.notes.join(", "),
    }))



    const wb = (XLSX.utils as any).book_new() //crea un workbook vacío (el archivo Excel).
    const ws = (XLSX.utils as any).json_to_sheet(exportsData) //convierte tu arreglo de objetos en una hoja (worksheet).

    //Definir ancho de columnas 

    const colWidths: { wch: number }[] = [
    { wch: 14 }, // ID Remisión
    { wch: 12 }, // Fecha
    { wch: 8 },  // Hora
    { wch: 8 }, // Volumen Remisión
    { wch: 8 }, // Volumen Real
    { wch: 12 }, // Tanque
    { wch: 20 }, // Proveedor
    { wch: 20 }, // Calidad
    { wch: 20 }, // Supervisor
    { wch: 15 }, // Usuario
    { wch: 30 }, // notas
  ];
  ws["!cols"] = colWidths;

    //Agregar la Hoja al libro
    (XLSX.utils as any).book_append_sheet(wb, ws, "Remisiones")

    //Generar Nombre Dinamico con fecha 
    const today = new Date().toISOString().split("T")[0]
    const filename = `Remisiones_${today}.xlsx`

    //Guardar Archivo
    XLSX.writeFile(wb, filename)
  }
