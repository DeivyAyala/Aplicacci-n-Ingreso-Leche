import type { TankProps } from "../../tanks/types/Tank";

export type DashboardRange = "day" | "week" | "month" | "year";

export interface DashboardKpis {
  receptionLiters: number;
  outputsLiters: number;
  outputsToProcessLiters: number;
  outputsSalesLiters: number;
  inventoryLiters: number;
  activeTanks: number;
  alertTanks: number;
}

export interface DashboardChart {
  labels: string[];
  reception: number[];
  outputs: number[];
}

export type DashboardTank = Omit<
  TankProps,
  "id" | "createdAt" | "updatedAt" | "_id"
> & {
  _id: string;
  percent: number;
  status: string;
};

export interface DashboardInventoryDistribution {
  tankId: string;
  name: string;
  liters: number;
  percent: number;
}

export interface DashboardResponse {
  ok: boolean;
  range: DashboardRange;
  from: string;
  to: string;
  kpis: DashboardKpis;
  chart: DashboardChart;
  tanks: DashboardTank[];
  inventoryDistribution: DashboardInventoryDistribution[];
}
