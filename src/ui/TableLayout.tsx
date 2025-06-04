'use client';
import React, { useEffect, useState } from "react";
import Table from "./Table";
import RandomToggle from "./RandomToggle";
import InfoPanel from "./InfoPanel";
import { getClaseEstilo } from "./style/GetClaseEstilo";

const precioM = 800 as number;
const precioA = 1500 as number;
const precioC = 1800 as number;

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
  const [toggleEnabled, setToggleEnabled] = useState(false);

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
      if (toggleEnabled) {
        nuevaPatente = Math.floor(100000 + Math.random() * 900000);
        const existeEnAC = patentesAC.includes(nuevaPatente);
        const existeEnM = patentesM.includes(nuevaPatente);
        if (!existeEnAC && !existeEnM) {
          break;
        }
      } else {
        const input = prompt("Ingrese una patente de 6 dígitos");
        if (input === null) {
          return;
        }
        if (/^\d{6}$/.test(input)) {
          nuevaPatente = parseInt(input, 10);
          const existeEnAC = patentesAC.includes(nuevaPatente);
          const existeEnM = patentesM.includes(nuevaPatente);
          if (!existeEnAC && !existeEnM) {
            break;
          } else {
            alert("La patente ya está registrada.");
          }
        }
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

  function toggle() {
    setToggleEnabled(!toggleEnabled);
  }

  function handleClick(tipo: "AC" | "M", setClickedIndex: (i: number) => void, patentes: number[], setMostRecentlyClicked: (t: "AC" | "M") => void) {
    return (indice: number, e: React.MouseEvent) => {
      switch (e.detail) {
        case 1:
          setClickedIndex(indice);
          setMostRecentlyClicked(tipo);
          break;
        case 2:
          recaudarPatente(patentes[indice]);
          break;
      }
    };
  }

  const handleClickAC = handleClick("AC", setClickedIndexAC, patentesAC, setMostRecentlyClicked);
  const handleClickM = handleClick("M", setClickedIndexM, patentesM, setMostRecentlyClicked);

  const tipo = mostRecentlyClicked;
  const clickedIndex = tipo === "AC" ? clickedIndexAC : clickedIndexM;
  const lugar = tipo === "AC" ? lugaresAC[clickedIndex] : lugaresM[clickedIndex];
  const patente = tipo === "AC" ? patentesAC[clickedIndex] : patentesM[clickedIndex];
  const clase = getClaseEstilo(lugar);

  return (
    <div className="flex justify-center gap-4">
      <RandomToggle toggleEnabled={toggleEnabled} toggle={toggle} />
      {lugaresAC.length > 0 && lugaresM.length > 0 && (
        <>
          <Table
            tipo="AC"
            lugares={lugaresAC}
            patentes={patentesAC}
            recaudacion={recaudacionAC}
            clickEvento={handleClickAC}
            agregarPatente={indice => agregarPatente("AC", indice)}
          />
          <Table
            tipo="M"
            lugares={lugaresM}
            patentes={patentesM}
            recaudacion={recaudacionM}
            clickEvento={handleClickM}
            agregarPatente={indice => agregarPatente("M", indice)}
          />
        </>
      )}
      <InfoPanel
        clickedIndex={clickedIndex}
        tipo={tipo}
        lugar={lugar}
        patente={patente}
        clase={clase}
        recaudarPatente={recaudarPatente}
        eliminarPatente={eliminarPatente}
      />
    </div>
  );
}