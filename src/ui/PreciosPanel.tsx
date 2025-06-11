import React, { useState, useEffect } from "react";
import { getAllSettings, updatePrices } from "./style/GetSettings";

export default function PreciosPanel() {
    const initialSettings = getAllSettings();
    const [precioA, setPrecioA] = useState(initialSettings.precioA);
    const [precioM, setPrecioM] = useState(initialSettings.precioM);
    const [precioC, setPrecioC] = useState(initialSettings.precioC);

    useEffect(() => {
        const currentSettings = getAllSettings();
        setPrecioA(currentSettings.precioA);
        setPrecioM(currentSettings.precioM);
        setPrecioC(currentSettings.precioC);
    }, []);

    const handleSave = () => {
        updatePrices(precioA, precioM, precioC);
        alert("Precios actualizados y guardados!");
    };

    return (
        <div className="border border-neutral-400/20 shadow-lg rounded-md w-full p-3 flex flex-col items-center gap-1.5">
            <h3 className="text-lg font-semibold self-baseline">Precios Panel</h3>
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                <div className="flex flex-col items-center">
                    <label htmlFor="precioA" className="mb-1 text-sm font-medium">Auto</label>
                    <input
                        id="precioA"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            margin: 0,
                        }}
                        className="py-3 text-center bg-neutral-600/10 appearance-none rounded-lg w-24"
                        type="number"
                        value={precioA}
                        onChange={(e) => setPrecioA(parseFloat(e.target.value))}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="precioM" className="mb-1 text-sm font-medium">Moto</label>
                    <input
                        id="precioM"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            margin: 0,
                        }}
                        className="py-3 text-center bg-neutral-600/10 appearance-none rounded-lg w-24"
                        type="number"
                        value={precioM}
                        onChange={(e) => setPrecioM(parseFloat(e.target.value))}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="precioC" className="mb-1 text-sm font-medium">Camioneta</label>
                    <input
                        id="precioC"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            margin: 0,
                        }}
                        className="py-3 text-center bg-neutral-600/10 appearance-none rounded-lg w-24"
                        type="number"
                        value={precioC}
                        onChange={(e) => setPrecioC(parseFloat(e.target.value))}
                    />
                </div>
            </div>
            <button
                onClick={handleSave}
                className="mt-3 py-2 px-6 rounded-full text-black bg-white/60 hover:bg-white/30 focus:bg-white/30 transition-colors cursor-pointer"
            >
                Guardar Precios
            </button>
        </div>
    );
}