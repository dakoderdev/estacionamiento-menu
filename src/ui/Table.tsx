'use client';
import React, { useState } from "react";

const capacidadAC = 30;
const capacidadM = 20;
const RecaudacionAC = 1800;
const RecaudacionM = 45700;

const LugaresAC = Array(capacidadAC).fill("D") as ("D" | "A" | "C")[];
const LugaresM = Array(capacidadM).fill("D") as ("D" | "M")[];
const PatentesAC = Array(capacidadAC).fill(0) as number[];
const PatentesM = Array(capacidadM).fill(0) as number[];

const indicesMAsignados = new Set<number>();
while (indicesMAsignados.size < 5) {
  const indice = Math.floor(Math.random() * capacidadM);
  if (!indicesMAsignados.has(indice)) {
    LugaresM[indice] = "M";
    PatentesM[indice] = Math.floor(100000 + Math.random() * 900000);
    indicesMAsignados.add(indice);
  }
}

const indicesAAsignados = new Set<number>();
while (indicesAAsignados.size < 5) {
  const indice = Math.floor(Math.random() * capacidadAC);
  if (!indicesAAsignados.has(indice)) {
    LugaresAC[indice] = "A";
    PatentesAC[indice] = Math.floor(100000 + Math.random() * 900000);
    indicesAAsignados.add(indice);
  }
}

const indicesCAsignados = new Set<number>();
while (indicesCAsignados.size < 5) {
  const indice = Math.floor(Math.random() * capacidadAC);
  if (!indicesAAsignados.has(indice) && !indicesCAsignados.has(indice)) {
    LugaresAC[indice] = "C";
    PatentesAC[indice] = Math.floor(100000 + Math.random() * 900000);
    indicesCAsignados.add(indice);
  }
}

interface PropsEspacioEstacionamiento {
  estado: "D" | "A" | "C" | "M";
  patente: number;
  indice: number;
}

function EspacioEstacionamiento({ estado, patente, indice }: PropsEspacioEstacionamiento) {
  const [mostrandoPopover, setMostrandoPopover] = useState(false);

  let bgColorClass = "bg-neutral-600/10 border-transparent";
  let textColorClass = "text-neutral-300/10";

  switch (estado) {
    case "D":
      break;
    case "M":
      bgColorClass = "bg-emerald-600/10 border-emerald-600/20";
      textColorClass = "text-emerald-300";
      break;
    case "A":
      bgColorClass = "bg-blue-600/10 border-blue-600/20";
      textColorClass = "text-blue-300";
      break;
    case "C":
      bgColorClass = "bg-pink-600/10 border-pink-600/20";
      textColorClass = "text-pink-300";
      break;
    default:
      bgColorClass = "bg-neutral-600/10 border-transparent";
  }

  return (
    <div
      className={`${bgColorClass} min-h-8 min-w-20 w-full flex flex-nowrap justify-center items-center border rounded-xl font-medium font-[family-name:var(--font-geist-mono)] relative ${textColorClass}`}
      onMouseEnter={() => setMostrandoPopover(true)}
      onMouseLeave={() => setMostrandoPopover(false)}
    >
      {patente === 0 ? indice + 1 : patente}

      {mostrandoPopover && (
        <div className="absolute bg-neutral-700 text-white text-xs p-1 rounded shadow-md z-10 -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          Información aleatoria del espacio {indice + 1}
        </div>
      )}
    </div>
  );
}

interface PropsPantallaEstacionamiento {
  tipo: "autosCamionetas" | "motos";
  lugares: ("D" | "A" | "C" | "M")[];
  patentes: number[];
  recaudacion: number;
}

export function PantallaEstacionamiento({ tipo, lugares, patentes, recaudacion }: PropsPantallaEstacionamiento) {
  return (
    <div>
      <div className="border border-neutral-400/20 shadow-lg rounded-md w-fit p-3 grid grid-cols-5 gap-1.5">
        <div className="flex gap-2 items-center col-span-full">
          <h3 className="text-lg font-semibold">{tipo === "autosCamionetas" ? "Autos/Camionetas" : "Motos"}</h3>
          <span className="flex items-center gap-0.25 bg-green-600/20 text-green-300 text-xs mr-2 pl-2.5 pr-2.25 py-0.5 rounded-full">
            ${recaudacion}
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.25" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" /></svg>
          </span>
        </div>
        {lugares.map((estado, indice) => (
          <EspacioEstacionamiento
            key={indice}
            estado={estado}
            patente={patentes[indice]}
            indice={indice}
          />
        ))}
      </div>
    </div>
  );
}

export default function DisposicionEstacionamiento() {
  return (
    <div className="flex justify-center gap-4">
      <PantallaEstacionamiento
        tipo="autosCamionetas"
        lugares={LugaresAC}
        patentes={PatentesAC}
        recaudacion={RecaudacionAC}
      />
      <PantallaEstacionamiento
        tipo="motos"
        lugares={LugaresM}
        patentes={PatentesM}
        recaudacion={RecaudacionM}
      />
    </div>
  );
}