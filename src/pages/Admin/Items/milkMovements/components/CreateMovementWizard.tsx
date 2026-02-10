import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomModal } from "../../../Components/CustomModal";
import { ConfirmModal } from "../../../Components/ConfirmModal";
import type { TankProps } from "../../tanks/types/Tank";
import type {
  MovementProcesType,
  MovementsType,
} from "../types/MilkMovement";
import { useCreateMovimiento } from "../../../hook/useCreateMovement";
import { toUtcFromBogota } from "../../../Helpers/dateTime";

interface CreateMovementWizardProps {
  open: boolean;
  onClose: () => void;
  initialType?: MovementsType;
  tanks: TankProps[];
  recentClients: string[];
}

const processOptions: MovementProcesType[] = [
  "Planta",
  "Derivados/Fermentados",
  "Planta UHT",
];

const movementOptions: Array<{
  value: MovementsType;
  label: string;
  description: string;
}> = [
  {
    value: "PROCESO",
    label: "Enviar a proceso",
    description: "Sacar leche de un tanque para enviarla a planta",
  },
  {
    value: "TRASLADO",
    label: "Transferir entre tanques",
    description: "Mover leche entre tanques sin cambiar inventario total",
  },
  {
    value: "VENTA",
    label: "Venta ocasional",
    description: "Salida por venta puntual",
  },
];

const formatLiters = (value: number) =>
  new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(value);

const toBogotaDateTimeLocal = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}`;
};

export const CreateMovementWizard = ({
  open,
  onClose,
  initialType,
  tanks,
  recentClients,
}: CreateMovementWizardProps) => {
  const { createMovimientoAsync, isPending } = useCreateMovimiento();

  const [step, setStep] = useState(1);
  const [movementType, setMovementType] = useState<MovementsType | "">("");
  const [originTank, setOriginTank] = useState("");
  const [destinationTank, setDestinationTank] = useState("");
  const [quantity, setQuantity] = useState("");
  const [processType, setProcessType] = useState<MovementProcesType | "">("");
  const [client, setClient] = useState("");
  const [movementDate, setMovementDate] = useState(
    toBogotaDateTimeLocal(new Date())
  );
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMovementType(initialType ?? "");
    setStep(initialType ? 2 : 1);
    setOriginTank("");
    setDestinationTank("");
    setQuantity("");
    setProcessType("");
    setClient("");
    setMovementDate(toBogotaDateTimeLocal(new Date()));
  }, [open, initialType]);

  const originTankData = useMemo(
    () => tanks.find((tank) => tank._id === originTank),
    [tanks, originTank]
  );
  const destinationTankData = useMemo(
    () => tanks.find((tank) => tank._id === destinationTank),
    [tanks, destinationTank]
  );

  const originInventory = originTankData?.currentCapacity ?? 0;
  const destinationInventory = destinationTankData?.currentCapacity ?? 0;
  const destinationCapacity = destinationTankData?.capacity ?? 0;
  const destinationFree = destinationCapacity - destinationInventory;
  const quantityValue = Number(quantity) || 0;

  const originRemaining = originInventory - quantityValue;
  const destinationResult = destinationInventory + quantityValue;

  const inventoryExceeded =
    Boolean(originTankData) && quantityValue > originInventory;
  const destinationExceeded =
    movementType === "TRASLADO" &&
    Boolean(destinationTankData) &&
    quantityValue > destinationFree;
  const destinationEqualsOrigin =
    movementType === "TRASLADO" &&
    originTank &&
    destinationTank &&
    originTank === destinationTank;

  const canContinueStep1 = Boolean(movementType);
  const canContinueStep2 =
    Boolean(originTank) &&
    quantityValue > 0 &&
    !inventoryExceeded &&
    !destinationEqualsOrigin &&
    !destinationExceeded &&
    (movementType !== "TRASLADO" || Boolean(destinationTank)) &&
    (movementType !== "PROCESO" || Boolean(processType)) &&
    (movementType !== "VENTA" || client.trim().length > 0);

  const quickSetQuantity = (percent: number) => {
    if (!originTankData) return;
    const newValue = Math.round(originInventory * percent);
    setQuantity(String(newValue));
  };

  const handleConfirm = async () => {
    if (!canContinueStep2 || !movementType) return;
    try {
      await createMovimientoAsync({
        type: movementType,
        processType: movementType === "PROCESO" ? processType : undefined,
        originTank,
        destinationTank: movementType === "TRASLADO" ? destinationTank : undefined,
        client: movementType === "VENTA" ? client : undefined,
        quantity: quantityValue,
        movementDate: toUtcFromBogota(movementDate) || undefined,
      });
      onClose();
    } catch (error) {
      console.error("Error al crear movimiento:", error);
    }
  };

  return (
    <CustomModal
      open={open}
      title="Crear movimiento"
      onClose={onClose}
      size="xl"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-amber-700">
          <span>Paso {step} de 3</span>
          <div className="flex gap-2">
            {[1, 2, 3].map((index) => (
              <span
                key={index}
                className={`h-2 w-8 rounded-full ${
                  step >= index ? "bg-amber-500" : "bg-amber-200"
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-3">
            {movementOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setMovementType(option.value)}
                className={`rounded-xl border p-4 text-left transition ${
                  movementType === option.value
                    ? "border-amber-400 bg-amber-50"
                    : "border-amber-200 hover:border-amber-300"
                }`}
              >
                <h3 className="font-semibold text-amber-900">{option.label}</h3>
                <p className="text-sm text-amber-700">{option.description}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-amber-800 mb-1 block">
                  Tanque origen
                </label>
                <select
                  value={originTank}
                  onChange={(e) => setOriginTank(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
                >
                  <option value="">Selecciona un tanque</option>
                  {tanks.map((tank) => (
                    <option key={tank._id} value={tank._id} disabled={!tank.active}>
                      {tank.name} - {formatLiters(tank.currentCapacity)} L -{" "}
                      {tank.active ? "Activo" : "Inactivo"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-amber-800 mb-1 block">
                  Cantidad
                </label>
                <Input
                  type="number"
                  min={0}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
                {originTankData && (
                  <div className="mt-2 space-y-2">
                    <input
                      type="range"
                      min={0}
                      max={originInventory}
                      value={Number(quantity) || 0}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full accent-amber-500"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[0.25, 0.5, 0.75, 1].map((percent) => (
                        <Button
                          key={percent}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => quickSetQuantity(percent)}
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                        >
                          {Math.round(percent * 100)}%
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {inventoryExceeded && (
                  <p className="text-sm text-red-600 mt-2">
                    Excede inventario disponible
                  </p>
                )}
              </div>

              {movementType === "TRASLADO" && (
                <div>
                  <label className="text-sm font-medium text-amber-800 mb-1 block">
                    Tanque destino
                  </label>
                  <select
                    value={destinationTank}
                    onChange={(e) => setDestinationTank(e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
                  >
                    <option value="">Selecciona un tanque</option>
                    {tanks.map((tank) => (
                      <option key={tank._id} value={tank._id} disabled={!tank.active}>
                        {tank.name} - Capacidad {formatLiters(tank.capacity)} L -{" "}
                        Actual {formatLiters(tank.currentCapacity)} L
                      </option>
                    ))}
                  </select>
                  {destinationEqualsOrigin && (
                    <p className="text-sm text-red-600 mt-2">
                      El tanque destino debe ser diferente al tanque de origen
                    </p>
                  )}
                  {destinationExceeded && (
                    <p className="text-sm text-red-600 mt-2">
                      Excede capacidad disponible en destino
                    </p>
                  )}
                </div>
              )}

              {movementType === "PROCESO" && (
                <div>
                  <label className="text-sm font-medium text-amber-800 mb-1 block">
                    Tipo de proceso
                  </label>
                  <select
                    value={processType}
                    onChange={(e) =>
                      setProcessType(e.target.value as MovementProcesType)
                    }
                    className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400"
                  >
                    <option value="">Selecciona un proceso</option>
                    {processOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {movementType === "VENTA" && (
                <div>
                  <label className="text-sm font-medium text-amber-800 mb-1 block">
                    Cliente
                  </label>
                  <Input
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Nombre del cliente"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                  {recentClients.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {recentClients.map((recent) => (
                        <button
                          key={recent}
                          type="button"
                          onClick={() => setClient(recent)}
                          className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm"
                        >
                          {recent}
                        </button>
                      ))}
                    </div>
                  )}
                  {client.trim().length === 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      El cliente es obligatorio
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-3">
              <h4 className="font-semibold text-amber-900">Resumen en vivo</h4>
              <div className="text-sm text-amber-800 space-y-2">
                <p>
                  Inventario actual:{" "}
                  <span className="font-semibold">
                    {formatLiters(originInventory)} L
                  </span>
                </p>
                <p>
                  Cantidad a mover:{" "}
                  <span className="font-semibold">
                    {formatLiters(quantityValue)} L
                  </span>
                </p>
                <p>
                  Inventario resultante:{" "}
                  <span className="font-semibold">
                    {formatLiters(originRemaining)} L
                  </span>
                </p>
                {movementType === "TRASLADO" && (
                  <>
                    <p>
                      Espacio libre destino:{" "}
                      <span className="font-semibold">
                        {formatLiters(destinationFree)} L
                      </span>
                    </p>
                    <p>
                      Destino resultante:{" "}
                      <span className="font-semibold">
                        {formatLiters(destinationResult)} L
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 space-y-3">
              <h4 className="font-semibold text-amber-900">Confirmacion</h4>
              <div className="text-sm text-amber-800 space-y-2">
                <p>
                  Origen:{" "}
                  <span className="font-semibold">
                    {originTankData?.name ?? "-"} ({formatLiters(originInventory)} L)
                  </span>{" "}
                  ? {formatLiters(originRemaining)} L
                </p>
                {movementType === "TRASLADO" && (
                  <p>
                    Destino:{" "}
                    <span className="font-semibold">
                      {destinationTankData?.name ?? "-"} (
                      {formatLiters(destinationInventory)} L)
                    </span>{" "}
                    ? {formatLiters(destinationResult)} L
                  </p>
                )}
                {movementType === "PROCESO" && (
                  <p>
                    Tipo de proceso:{" "}
                    <span className="font-semibold">{processType}</span>
                  </p>
                )}
                {movementType === "VENTA" && (
                  <p>
                    Cliente: <span className="font-semibold">{client}</span>
                  </p>
                )}
                <p>
                  Cantidad:{" "}
                  <span className="font-semibold">
                    {formatLiters(quantityValue)} L
                  </span>
                </p>
                <div>
                  <label className="text-sm font-medium text-amber-800 mb-1 block">
                    Fecha/hora
                  </label>
                  <Input
                    type="datetime-local"
                    value={movementDate}
                    onChange={(e) => setMovementDate(e.target.value)}
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => (step === 1 ? onClose() : setStep(step - 1))}
            className="border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            {step === 1 ? "Cancelar" : "Volver"}
          </Button>
          {step < 3 ? (
            <Button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !canContinueStep1 : !canContinueStep2}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Siguiente
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setOpenConfirm(true)}
              disabled={!canContinueStep2 || isPending}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isPending ? "Guardando..." : "Confirmar movimiento"}
            </Button>
          )}
        </div>
      </div>
      <ConfirmModal
        open={openConfirm}
        title="Confirmar movimiento"
        message="Verifica los datos antes de continuar. Esta accion no se puede deshacer."
        onConfirm={() => {
          setOpenConfirm(false);
          handleConfirm();
        }}
        onCancel={() => setOpenConfirm(false)}
        confirmText={isPending ? "Guardando..." : "Confirmar"}
      />
    </CustomModal>
  );
};
