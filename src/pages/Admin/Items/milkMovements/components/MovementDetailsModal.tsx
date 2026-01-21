import { CustomModal } from "@/pages/Admin/Components/CustomModal";
import type { Movement } from "../types/MilkMovement";

interface MovementDetailsModalProps {
  open: boolean;
  onClose: () => void;
  movement: Movement | null;
}

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("es-CO");
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("es-CO");
};

const formatQuantity = (value?: number) =>
  `${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value ?? 0)} L`;

const getTankName = (tank?: Movement["originTank"]) => {
  if (!tank) return "-";
  return typeof tank === "string" ? tank : tank.name ?? "-";
};

const getUserName = (user?: Movement["user"]) => {
  if (!user) return "-";
  if (typeof user === "string") return user;
  return user.name ?? user._id ?? "-";
};

export const MovementDetailsModal = ({
  open,
  onClose,
  movement,
}: MovementDetailsModalProps) => {
  if (!movement) return null;

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Detalles del movimiento"
      size="lg"
    >
      <div className="space-y-4 text-amber-900">
        <div className="grid gap-3 md:grid-cols-2">
          <p>
            <span className="font-semibold">Fecha:</span>{" "}
            {formatDate(movement.movementDate)}
          </p>
          <p>
            <span className="font-semibold">Tipo:</span> {movement.type ?? "-"}
          </p>
          <p>
            <span className="font-semibold">Cantidad:</span>{" "}
            {formatQuantity(movement.quantity)}
          </p>
          <p>
            <span className="font-semibold">Tanque origen:</span>{" "}
            {getTankName(movement.originTank)}
          </p>
          <p>
            <span className="font-semibold">Tanque destino:</span>{" "}
            {getTankName(movement.destinationTank)}
          </p>
          <p>
            <span className="font-semibold">Proceso:</span>{" "}
            {movement.processType ?? "-"}
          </p>
          <p>
            <span className="font-semibold">Cliente:</span>{" "}
            {movement.client ?? "-"}
          </p>
          <p>
            <span className="font-semibold">Usuario:</span>{" "}
            {getUserName(movement.user)}
          </p>
        </div>
        <div className="border-t border-amber-100 pt-3 text-sm text-amber-800">
          <p>
            <span className="font-semibold">Creado:</span>{" "}
            {formatDateTime(movement.createdAt)}
          </p>
          <p>
            <span className="font-semibold">Actualizado:</span>{" "}
            {formatDateTime(movement.updatedAt)}
          </p>
        </div>
      </div>
    </CustomModal>
  );
};
