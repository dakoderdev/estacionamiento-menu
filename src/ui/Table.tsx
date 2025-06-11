import React from 'react';
import { getCurrentPrecio } from './style/GetSettings';

interface PropsEspacioEstacionamiento {
    estado: "D" | "A" | "C" | "M";
    patente: number;
    indice: number;
    tipo: "AC" | "M";
    clickEvento: (indice: number, e: React.MouseEvent) => void;
    agregarPatente: () => void;
}

function TableButton({ estado, patente, indice, clickEvento, agregarPatente }: PropsEspacioEstacionamiento) {
    let claseFondo = "bg-neutral-600/10 border-transparent";
    let claseTexto = "text-neutral-300/10";

    switch (estado) {
        case "M":
            claseFondo = "bg-emerald-600/10 border-emerald-600/20";
            claseTexto = "text-emerald-300";
            break;
        case "A":
            claseFondo = "bg-blue-600/10 border-blue-600/20";
            claseTexto = "text-blue-300";
            break;
        case "C":
            claseFondo = "bg-pink-600/10 border-pink-600/20";
            claseTexto = "text-pink-300";
            break;
    }

    function formatoPatente(patente: number): string {
        return patente.toString().padStart(6, "0");
    }

    return (
        <button
            onClick={e => {
                clickEvento(indice, e);
                if (patente === 0) {
                    agregarPatente();
                }
            }}
            className={`${claseFondo} hover:scale-105 focus-within:scale-105 transition-transform min-h-8 min-w-20 cursor-pointer w-full flex justify-center items-center border rounded-xl font-mono relative ${claseTexto} group`}
        >
            {patente === 0 ? (
                <>
                    {indice + 1}
                    <span
                        aria-label="Agregar patente"
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <span className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pb-0.5 transition-opacity bg-neutral-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-lg font-bold shadow">
                            +
                        </span>
                    </span>
                </>
            ) : (
                formatoPatente(patente)
            )}
        </button>
    );
}

interface PropsPantallaEstacionamiento {
    tipo: "AC" | "M";
    lugares: ("D" | "A" | "C" | "M")[];
    lugar: "D" | "A" | "C" | "M";
    patentes: number[];
    recaudacion: number;
    clickEvento: (indice: number, e: React.MouseEvent) => void;
    agregarPatente: (indice: number) => void;
}

export default function Table({ tipo, lugares, lugar, patentes, recaudacion, clickEvento, agregarPatente }: PropsPantallaEstacionamiento) {
    let tipoTitulo: string;
    let precio = getCurrentPrecio(lugar);
    switch (tipo) {
        case "AC":
            tipoTitulo = "Autos/Camionetas";
            break;
        case "M":
            tipoTitulo = "Motocicletas";
            break;
        default:
            tipoTitulo = "Placeholder";
            break;
    }
    function formatoRecaudacion() {
        return recaudacion.toLocaleString()
    }
    return (
        <div>
            <div className="border border-neutral-400/20 shadow-lg rounded-md w-fit p-3 grid grid-cols-5 gap-1.5">
                <div className="flex items-center gap-2 col-span-full relative">
                    <h3 className="text-lg font-semibold">{tipoTitulo}</h3>
                    <span
                        className={`flex items-center gap-0.25 bg-green-600/20 text-green-300 text-xs mr-2 pl-2.5 pr-2.25 py-0.5 rounded-full transition-transform duration-300 ${recaudacion > 0 ? "animate-bounce-alt" : ""}`}
                        key={recaudacion}
                    >
                        ${formatoRecaudacion()}
                        <span
                            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-3 opacity-0 animate-up"
                            aria-hidden="true"
                        >
                            ${precio}
                        </span>
                    </span>
                </div>
                {lugares.map((estado, indice) => (
                    <TableButton
                        key={`${tipo}-${indice}`}
                        estado={estado}
                        patente={patentes[indice]}
                        indice={indice}
                        tipo={tipo}
                        clickEvento={(indice, e) => clickEvento(indice, e)}
                        agregarPatente={() => agregarPatente(indice)}
                    />
                ))}
            </div>
        </div>
    );
}