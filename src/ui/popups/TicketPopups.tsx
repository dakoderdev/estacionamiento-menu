import React from "react";
import { getClaseEstilo } from "../style/GetClaseEstilo"


interface TicketData {
  patente: number;
  lugar: "A" | "C" | "D" | "M";
}

interface TicketPopupsProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: TicketData | null;
}

const TicketPopups: React.FC<TicketPopupsProps> = ({ isOpen, onClose, ticketData }) => {
  if (!isOpen || !ticketData) return null;
  const clase = getClaseEstilo(ticketData.lugar);
  return (
    <div className="fixed inset-0 z-50 flex font-sans items-center justify-center bg-background/60 backdrop-blur-md">
      <div className="border border-neutral-400/20 bg-background/85 rounded-lg shadow-lg p-8 min-w-[320px] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold pb-2 mb-4 border-b border-neutral-400/20 border-dashed text-center">Ticket de Estacionamiento</h2>
        <div className="flex flex-col text-lg">
            <span className={`self-center border font-medium min-h-8 min-w-23 flex flex-nowrap justify-center items-center rounded-xl w-fit font-mono ${clase.texto} ${clase.fondo} ${clase.borde}`}>
              {ticketData.patente}
            </span>
            <span className="self-center text-sm text-center pb-3 opacity-60">
              {ticketData.lugar === "A" ? "Auto" : ticketData.lugar === "C" ? "Camion" : ticketData.lugar === "M" ? "Auto" : "Moto"}
            </span>
        </div>
      </div>
    </div>
  );
};

export default TicketPopups;
