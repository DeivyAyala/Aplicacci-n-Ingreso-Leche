import * as XLSX from "xlsx"
  export const exportDataExcel = (filtroRegistros:any[]) =>{
    //Generar Encabezados de el excel a exportar  
    const exportsData = filtroRegistros.map((registro)=>({  
      "ID Remisión": registro.id,
      Fecha: registro.date,
      Hora: registro.time,
      "Volumen Remisión (L)": registro.volume,
      "Volumen Real (L)": registro.realVolume,
      "Tanque": registro.tank.name,
      Proveedor: registro.provider,
      "Calidad": registro.analyst.name,
      "Supervisor": registro.supervisor.name,
      "Ususario de Registro": registro.user,
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