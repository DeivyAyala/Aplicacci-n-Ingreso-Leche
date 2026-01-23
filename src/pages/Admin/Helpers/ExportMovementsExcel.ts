import * as XLSX from "xlsx";

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const getTankName = (tank: any) => {
  if (!tank) return "";
  if (typeof tank === "string") return tank;
  return tank.name ?? "";
};

const getUserName = (user: any) => {
  if (!user) return "";
  if (typeof user === "string") return user;
  return user.name ?? user._id ?? "";
};

export const exportMovementsExcel = (movements: any[]) => {
  const exportsData = movements.map((movement) => ({
    "ID Movimiento": movement._id ?? movement.id ?? "",
    Fecha: formatDate(movement.movementDate),
    Tipo: movement.type ?? "",
    "Tanque Origen": getTankName(movement.originTank),
    "Tanque Destino": getTankName(movement.destinationTank),
    Proceso: movement.processType ?? "",
    Cliente: movement.client ?? "",
    Cantidad: movement.quantity ?? 0,
    Usuario: getUserName(movement.user),
  }));

  const wb = (XLSX.utils as any).book_new();
  const ws = (XLSX.utils as any).json_to_sheet(exportsData);

  const colWidths: { wch: number }[] = [
    { wch: 18 },
    { wch: 12 },
    { wch: 12 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 12 },
    { wch: 18 },
  ];
  ws["!cols"] = colWidths;

  (XLSX.utils as any).book_append_sheet(wb, ws, "Movimientos");

  const today = new Date().toISOString().split("T")[0];
  const filename = `Movimientos_${today}.xlsx`;

  XLSX.writeFile(wb, filename);
};
