import * as XLSX from "xlsx"
  export const exportDataExcel = (filtroRegistros:any[]) =>{
    //Generar Encabezados de el excel a exportar  
    const exportsData = filtroRegistros.map((registro)=>({  
      "ID Remisión": registro.id,
      Fecha: registro.date,
      Hora: registro.time,
      Proveedor: registro.provider,
      "Volumen Remisión (L)": registro.volume,
      "Volumen Real (L)": registro.realVolume,
      "Grasa (%)": registro.fat,
      "Proteína (%)": registro.protein,
      "Temperatura (°C)": registro.temperature,
      pH: registro.pH,
      "Densidad (g/mL)": registro.density,
      Calidad: registro.quality,
      Usuario: registro.user,
      "Precio por Litro": `$${registro.price}`,
      "Notas": registro.notes.join(", ")
    }))



    const wb = (XLSX.utils as any).book_new() //crea un workbook vacío (el archivo Excel).
    const ws = (XLSX.utils as any).json_to_sheet(exportsData) //convierte tu arreglo de objetos en una hoja (worksheet).

    //Definir ancho de columnas 

    const colWidths: { wch: number }[] = [
    { wch: 12 }, // ID Remisión
    { wch: 12 }, // Fecha
    { wch: 8 },  // Hora
    { wch: 20 }, // Proveedor
    { wch: 15 }, // Volumen Remisión
    { wch: 15 }, // Volumen Real
    { wch: 10 }, // Grasa
    { wch: 10 }, // Proteína
    { wch: 12 }, // Temperatura
    { wch: 8 },  // pH
    { wch: 12 },  // Densidad
    { wch: 12 }, // Calidad
    { wch: 15 }, // Usuario
    { wch: 15 }, // Precio
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