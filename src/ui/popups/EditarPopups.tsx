import React, { useState, useEffect } from "react";

interface EditarPopupsProps {
  isOpen: boolean;
  onClose: () => void;
  patenteInicial?: number;
  tipoInicial?: "A" | "C" | "M";
  onSave: (nuevaPatente: number, nuevoTipo: "A" | "C" | "M") => void;
}

const EditarPopups: React.FC<EditarPopupsProps> = ({
  isOpen,
  onClose,
  patenteInicial = 0,
  tipoInicial = "A",
  onSave,
}) => {
  const [patente, setPatente] = useState(patenteInicial.toString());
  const [tipo, setTipo] = useState<"A" | "C" | "M">(tipoInicial);

  useEffect(() => {
    setPatente(patenteInicial.toString());
    setTipo(tipoInicial);
  }, [patenteInicial, tipoInicial, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const patenteNum = parseInt(patente, 10);
    if (isNaN(patenteNum) || patente.length !== 6) {
      alert("La patente debe ser un número de 6 dígitos");
      return;
    }
    onSave(patenteNum, tipo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md">
      <div className="relative border border-neutral-400/20 bg-background/85 rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90%]">
        <button
          className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity text-2xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold pb-4 mb-4 border-b border-neutral-400/20 border-dashed text-center">
          Editar Patente
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm opacity-70 mb-1">Patente</label>
            <input
              type="text"
              value={patente}
              maxLength={6}
              onChange={(e) => setPatente(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-md border border-neutral-600/30 bg-neutral-700/30 p-2 font-mono text-center text-white"
              placeholder="000000"
            />
          </div>

          <div>
            <label className="block text-sm opacity-70 mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "A" | "C" | "M")}
              className="w-full rounded-md border border-neutral-600/30 bg-neutral-700/30 p-2 text-white"
            >
              <option value="A">Auto</option>
              <option value="C">Camioneta</option>
              <option value="M">Moto</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-4 bg-blue-600/30 border border-blue-600/30 hover:bg-blue-600/50 transition-colors text-blue-300 font-semibold py-2 rounded-md"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarPopups;
