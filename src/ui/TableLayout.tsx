'use client';
import React, { useEffect, useState } from "react";
import Table from "./Table";

const precioM = 800 as number;
const precioA = 1500 as number;
const precioC = 1800 as number;

function getClaseEstilo(estado: "A" | "C" | "M" | "D") {
  switch (estado) {
    case "A":
      return {
        borde: "border-blue-600/40",
        fondo: "bg-blue-600/10 hover:bg-blue-600/20",
        fondoAlt: "bg-blue-500 hover:bg-blue-800",
        texto: "text-blue-300",
        textoAlt: "text-black",
        bordeFondo: "border-blue-600/20",
      };
    case "C":
      return {
        borde: "border-pink-500/40",
        fondo: "bg-pink-600/10 hover:bg-pink-600/20",
        fondoAlt: "bg-pink-500 hover:bg-pink-800",
        texto: "text-pink-300",
        textoAlt: "text-black",
        bordeFondo: "border-pink-600/20",
      };
    case "M":
      return {
        borde: "border-emerald-400/40",
        fondo: "bg-emerald-600/10 hover:bg-emerald-600/20",
        fondoAlt: "bg-emerald-500 hover:bg-emerald-800",
        texto: "text-emerald-300",
        textoAlt: "text-black",
        bordeFondo: "border-emerald-600/20",
      };
    default:
      return {
        borde: "border-neutral-400/40",
        fondo: "bg-neutral-600/10",
        fondoAlt: "bg-neutral-500 hover:bg-neutral-800",
        texto: "text-neutral-300",
        textoAlt: "text-black",
        bordeFondo: "border-neutral-600/20",
      };
  }
}

export default function Tables() {
  const capacidadAC = 30;
  const capacidadM = 20;

  const [lugaresAC, setLugaresAC] = useState<("D" | "A" | "C")[]>([]);
  const [patentesAC, setPatentesAC] = useState<number[]>([]);
  const [lugaresM, setLugaresM] = useState<("D" | "M")[]>([]);
  const [patentesM, setPatentesM] = useState<number[]>([]);
  const [clickedIndexAC, setClickedIndexAC] = useState(0);
  const [clickedIndexM, setClickedIndexM] = useState(0);
  const [mostRecentlyClicked, setMostRecentlyClicked] = useState<"AC" | "M">("AC");
  const [recaudacionAC, setRecaudacionAC] = useState(0);
  const [recaudacionM, setRecaudacionM] = useState(0);

  useEffect(() => {
    const nuevaLugaresAC = Array(capacidadAC).fill("D") as ("D" | "A" | "C")[];
    const nuevaPatentesAC = Array(capacidadAC).fill(0);
    const nuevaLugaresM = Array(capacidadM).fill("D") as ("D" | "M")[];
    const nuevaPatentesM = Array(capacidadM).fill(0);

    const indicesMAsignados = new Set<number>();
    while (indicesMAsignados.size < 5) {
      const indice = Math.floor(Math.random() * capacidadM);
      if (!indicesMAsignados.has(indice)) {
        nuevaLugaresM[indice] = "M";
        nuevaPatentesM[indice] = Math.floor(100000 + Math.random() * 900000);
        indicesMAsignados.add(indice);
      }
    }

    const indicesAAsignados = new Set<number>();
    while (indicesAAsignados.size < 5) {
      const indice = Math.floor(Math.random() * capacidadAC);
      if (!indicesAAsignados.has(indice)) {
        nuevaLugaresAC[indice] = "A";
        nuevaPatentesAC[indice] = Math.floor(100000 + Math.random() * 900000);
        indicesAAsignados.add(indice);
      }
    }

    const indicesCAsignados = new Set<number>();
    while (indicesCAsignados.size < 5) {
      const indice = Math.floor(Math.random() * capacidadAC);
      if (!indicesAAsignados.has(indice) && !indicesCAsignados.has(indice)) {
        nuevaLugaresAC[indice] = "C";
        nuevaPatentesAC[indice] = Math.floor(100000 + Math.random() * 900000);
        indicesCAsignados.add(indice);
      }
    }

    setLugaresAC(nuevaLugaresAC);
    setPatentesAC(nuevaPatentesAC);
    setLugaresM(nuevaLugaresM);
    setPatentesM(nuevaPatentesM);
  }, []);

  const tipo = mostRecentlyClicked;
  const clickedIndex = tipo === "AC" ? clickedIndexAC : clickedIndexM;
  const lugar = tipo === "AC" ? lugaresAC[clickedIndex] : lugaresM[clickedIndex];
  const patente = tipo === "AC" ? patentesAC[clickedIndex] : patentesM[clickedIndex];
  const clase = getClaseEstilo(lugar);

  function eliminarPatente() {
    if (tipo === "AC") {
      const nuevaLugares = [...lugaresAC];
      const nuevasPatentes = [...patentesAC];

      nuevaLugares[clickedIndexAC] = "D";
      nuevasPatentes[clickedIndexAC] = 0;

      setLugaresAC(nuevaLugares);
      setPatentesAC(nuevasPatentes);
    } else {
      const nuevaLugares = [...lugaresM];
      const nuevasPatentes = [...patentesM];

      nuevaLugares[clickedIndexM] = "D";
      nuevasPatentes[clickedIndexM] = 0;

      setLugaresM(nuevaLugares);
      setPatentesM(nuevasPatentes);
    }
  }

  function recaudarPatente(patente: number) {
    if (tipo === "AC") {
      if (lugar === "A") {
        setRecaudacionAC(recaudacionAC + precioA);
      } else if (lugar === "C") {
        setRecaudacionAC(recaudacionAC + precioC);
      }
    } else if (tipo === "M" && lugar === "M") {
      setRecaudacionM(recaudacionM + precioM);
    }

    eliminarPatente();
  }

  function agregarPatente(tipo: "AC" | "M", indice: number) {
    const randomLugares = Math.random() > 0.5 ? "A" : "C";
    let nuevaPatente = 0;
    while (true) {
      const input = prompt("Ingrese una patente de 6 dígitos");
      if (input === null) {
        return;
      }
      if (/^\d{6}$/.test(input)) {
        nuevaPatente = parseInt(input, 10);
        break;
      }
    }

    if (tipo === "AC") {
      if (lugaresAC[indice] !== "D") return;

      const nuevaLugares = [...lugaresAC];
      const nuevasPatentes = [...patentesAC];

      nuevaLugares[indice] = randomLugares;
      nuevasPatentes[indice] = nuevaPatente;

      setLugaresAC(nuevaLugares);
      setPatentesAC(nuevasPatentes);
    } else {
      if (lugaresM[indice] !== "D") return;

      const nuevaLugares = [...lugaresM];
      const nuevasPatentes = [...patentesM];

      nuevaLugares[indice] = "M";
      nuevasPatentes[indice] = nuevaPatente;

      setLugaresM(nuevaLugares);
      setPatentesM(nuevasPatentes);
    }
  }

  return (
    <div className="flex justify-center gap-4">
      {lugaresAC.length > 0 && lugaresM.length > 0 && (
        <>
          <Table
            tipo="AC"
            lugares={lugaresAC}
            patentes={patentesAC}
            recaudacion={recaudacionAC}
            clickEvento={(indice: number, e: React.MouseEvent) => {
              switch (e.detail) {
                case 1:
                  setClickedIndexAC(indice);
                  setMostRecentlyClicked("AC");
                  break;
                case 2:
                  recaudarPatente(patentesAC[indice]);
                  break;
              }
            }}
            agregarPatente={(indice) => agregarPatente("AC", indice)}
          />
          <Table
            tipo="M"
            lugares={lugaresM}
            patentes={patentesM}
            recaudacion={recaudacionM}
            clickEvento={(indice: number, e: React.MouseEvent) => {
              switch (e.detail) {
                case 1:
                  setClickedIndexM(indice);
                  setMostRecentlyClicked("M");
                  break;
                case 2:
                  recaudarPatente(patentesM[indice]);
                  break;
              }
            }}
            agregarPatente={(indice) => agregarPatente("M", indice)}
          />
        </>
      )}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 border border-neutral-400/20 shadow-lg rounded-md p-3">
        <div className="flex flex-col aspect-5/4 h-14.5 justify-center items-center">
          <div
            className={`border-x-2 font-[family-name:var(--font-geist-mono)] ${clase.borde} transition-colors px-2`}
          >
            <p>{clickedIndex + 1}</p>
          </div>
          <p className="text-xs opacity-60 text-center">
            {tipo === "AC"
              ? lugar === "A"
                ? "Auto"
                : lugar === "C"
                  ? "Camioneta"
                  : "Vacío"
              : lugar === "M"
                ? "Motocicleta"
                : "Vacío"}
          </p>
        </div>
        <h3 className={`${patente === 0 ? "hidden" : ""} transition-colors absolute -top-[1px] left-1.5 -translate-y-full font-medium font-[family-name:var(--font-geist-mono)] min-h-8 min-w-20 flex flex-nowrap justify-center items-center border-x border-t rounded-t-xl w-fit ${clase.fondo} ${clase.texto} ${clase.bordeFondo}`}
        >
          {patente}
        </h3>
        {patente !== 0 && (
          <div className="pl-3 text-lg h-14.5 gap-1.5 flex flex-col items-baseline border-l border-neutral-400/20">
            <div className="flex gap-3 justify-between">
              <button onClick={() => recaudarPatente(patente)} className={`text-xs ${clase.textoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors ${clase.fondoAlt}`}>
                Recaudar
              </button>
              <button className={`text-xs ${clase.textoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors ${clase.fondoAlt}`}>
                Reubicar
              </button>
              <button onClick={eliminarPatente} className={`text-xs ${clase.textoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors ${clase.fondoAlt}`}>
                Eliminar
              </button>
            </div>
            <div className="flex gap-1.5">
              <button className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>
              </button>
              <button className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /><path d="M12 8v4l3 3" /></svg>
              </button>
              <button className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}