export const toUtcFromBogota = (dateTimeLocal: string | Date | null | undefined): string | null => {
  if (!dateTimeLocal) {
    return null;
  }

  if (typeof dateTimeLocal !== "string") {
    return new Date(dateTimeLocal).toISOString();
  }

  if (dateTimeLocal.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(dateTimeLocal)) {
    return new Date(dateTimeLocal).toISOString();
  }

  const normalized = dateTimeLocal.length === 10
    ? `${dateTimeLocal}T00:00:00-05:00`
    : dateTimeLocal.length === 16
      ? `${dateTimeLocal}:00-05:00`
      : dateTimeLocal.length === 19
        ? `${dateTimeLocal}-05:00`
        : dateTimeLocal;

  return new Date(normalized).toISOString();
};

export const toUtcFromBogotaDateTime = (
  date: string | null | undefined,
  time: string | null | undefined
): string | null => {
  if (!date || !time) {
    return null;
  }

  return toUtcFromBogota(`${date}T${time}`);
};

export const getBogotaTodayDateString = (): string => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

export const getUtcTodayDateString = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const toBogotaDateParts = (
  value: string | Date | null | undefined
): { date: string; time: string } | null => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

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
  const pick = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const year = pick("year");
  const month = pick("month");
  const day = pick("day");
  const hour = pick("hour");
  const minute = pick("minute");

  if (!year || !month || !day || !hour || !minute) return null;

  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`,
  };
};
