import React from "react";
import { getClaseEstilo } from "../style/GetClaseEstilo";

interface TicketData {
  patente: number;
  lugar: "A" | "C" | "D" | "M";
  fechaIngreso: string;
  fechaEgreso: string;
  horaIngreso: string;
  horaEgreso: string;
  amPmIngreso: "AM" | "PM";
  amPmEgreso: "AM" | "PM";
}

interface TicketPopupsProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: TicketData | null;
}

function formatoPatente(patente: number): string {
  return patente.toString().padStart(6, "0");
}

function tiempoTotal(
    fechaIngreso: string,
    horaIngreso: string,
    amPmIngreso: "AM" | "PM",
    fechaEgreso: string,
    horaEgreso: string,
    amPmEgreso: "AM" | "PM"
): string {
    // Combine date and time strings into ISO format
    function toDateTime(fecha: string, hora: string, ampm: "AM" | "PM") {
    if (!fecha || !hora) return null;
    // Convert "hh:mm" and AM/PM to 24h
    let [h, m] = hora.split(":").map(Number);
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    // Convert "DD/MM/YYYY" to "YYYY-MM-DD"
    const [day, month, year] = fecha.split("/");
    const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    return new Date(`${isoDate}T${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:00`);
}

    const d1 = toDateTime(fechaIngreso, horaIngreso, amPmIngreso);
    const d2 = toDateTime(fechaEgreso, horaEgreso, amPmEgreso);

    if (!d1 || !d2 || isNaN(d1.getTime()) || isNaN(d2.getTime())) return "No disponible";

    let ms = d2.getTime() - d1.getTime();
    if (ms < 0) return "No disponible";

    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
}

const TicketPopups: React.FC<TicketPopupsProps> = ({
  isOpen,
  onClose,
  ticketData,
}) => {
  if (!isOpen || !ticketData) return null;
  const clase = getClaseEstilo(ticketData.lugar);
  return (
    <div className="fixed inset-0 z-50 flex font-sans items-center justify-center bg-background/60 backdrop-blur-md">
      <div className="z-200 border border-neutral-400/20 bg-background/85 rounded-lg shadow-lg p-8 min-w-[320px] relative">
        <button
          className="absolute top-2 right-2 w-5 flex items-center justify-center h-5 cursor-pointer hover:opacity-80 transition-opacity text-2xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold pb-6 mb-6 border-b border-neutral-400/20 border-dashed text-center">
          Ticket de Estacionamiento
        </h2>
        <div className="flex flex-col text-lg">
          <span
            className={`self-center border font-medium text-xl py-2 px-4 mb-1 flex flex-nowrap justify-center items-center rounded-xl w-fit font-mono ${clase.texto} ${clase.fondo} ${clase.borde}`}
          >
            {formatoPatente(ticketData.patente)}
          </span>
          <span className="self-center text-sm text-center pb-3 opacity-60">
            {ticketData.lugar === "A"
              ? "Auto"
              : ticketData.lugar === "C"
                ? "Camioneta"
                : ticketData.lugar === "M"
                  ? "Motocicleta"
                  : "Desconocido"}
          </span>
          <div className="space-y-3">
            <div className="rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-300">
                  HORA DE INGRESO
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">Fecha:</span>
                  <span className="font-mono text-sm text-white">
                    {ticketData.fechaIngreso || "No registrada"}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs opacity-70">Hora:</span>
                  <span className="font-mono text-sm text-white">
                    {ticketData.horaIngreso ? (
                      <>
                        {ticketData.horaIngreso}
                        <span className="ml-1 text-xs font-semibold">
                          {ticketData.amPmIngreso}
                        </span>
                      </>
                    ) : (
                      "No registrada"
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-300">
                  HORA DE EGRESO
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">Fecha:</span>
                  <span className="font-mono text-sm text-white">
                    {ticketData.fechaEgreso || "No registrada"}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs opacity-70">Hora:</span>
                  <span className="font-mono text-sm text-white">
                    {ticketData.horaEgreso ? (
                      <>
                        {ticketData.horaEgreso}
                        <span className="ml-1 text-xs font-semibold">
                          {ticketData.amPmEgreso}
                        </span>
                      </>
                    ) : (
                      "No registrada"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">Tiempo total:</span>
                  <span className="font-mono text-sm text-white">
                    {tiempoTotal(
                      ticketData.fechaIngreso,
                      ticketData.horaIngreso,
                      ticketData.amPmIngreso,
                      ticketData.fechaEgreso,
                      ticketData.horaEgreso,
                      ticketData.amPmEgreso
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-2 border-t border-dashed border-gray-700">
            <p className="text-xs opacity-70">
              Conserve este ticket hasta su salida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPopups;
