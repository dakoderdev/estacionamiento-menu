'use client';
import React, { useEffect, useState } from "react";
import Table from "./Table";
import RandomToggle from "./RandomToggle";
import InfoPanel from "./InfoPanel";
import Historial from "./Historial";
import { getClaseEstilo } from "./style/GetClaseEstilo";
import { getAllSettings } from "./style/GetSettings";

const { precioA, precioM, precioC, capacidadAC, capacidadM } = getAllSettings();

export default function Tables() {
  const [lugaresAC, setLugaresAC] = useState<("D" | "A" | "C")[]>([]);
  const [patentesAC, setPatentesAC] = useState<number[]>([]);
  const [lugaresM, setLugaresM] = useState<("D" | "M")[]>([]);
  const [patentesM, setPatentesM] = useState<number[]>([]);
  const [indiceSeleccionadoAC, setIndiceSeleccionadoAC] = useState(0);
  const [indiceSeleccionadoM, setIndiceSeleccionadoM] = useState(0);
  const [mostRecentlyClicked, setMostRecentlyClicked] = useState<"AC" | "M">("AC");
  const [recaudacionAC, setRecaudacionAC] = useState(0);
  const [recaudacionM, setRecaudacionM] = useState(0);
  const [toggleRandom, setToggleRandom] = useState(false);

  function generarPatenteUnica(patentesAC: number[], patentesM: number[]): number {
    while (true) {
      const nueva = Math.floor(100000 + Math.random() * 900000);
      if (!patentesAC.includes(nueva) && !patentesM.includes(nueva)) {
        return nueva;
      }
    }
  }

  function getInfoSeleccionada() {
    const tipo = mostRecentlyClicked;
    const clickedIndex = tipo === "AC" ? indiceSeleccionadoAC : indiceSeleccionadoM;
    const lugar = tipo === "AC" ? lugaresAC[clickedIndex] : lugaresM[clickedIndex];
    const patente = tipo === "AC" ? patentesAC[clickedIndex] ?? 0 : patentesM[clickedIndex] ?? 0;
    return { tipo, clickedIndex, lugar, patente };
  }

  const info = getInfoSeleccionada();
  const clase = getClaseEstilo(info.lugar);

  function inicializarEstacionamiento() {
    const estadoLugaresAC = Array(capacidadAC).fill("D") as ("D" | "A" | "C")[];
    const estadoPatentesAC = Array(capacidadAC).fill(0);
    const estadoLugaresM = Array(capacidadM).fill("D") as ("D" | "M")[];
    const estadoPatentesM = Array(capacidadM).fill(0);

    const indicesAsignadosM = new Set<number>();
    while (indicesAsignadosM.size < 10) {
      const indice = Math.floor(Math.random() * capacidadM);
      if (!indicesAsignadosM.has(indice)) {
        estadoLugaresM[indice] = "M";
        estadoPatentesM[indice] = generarPatenteUnica(estadoPatentesAC, estadoPatentesM);
        indicesAsignadosM.add(indice);
      }
    }

    const indicesAsignadosA = new Set<number>();
    while (indicesAsignadosA.size < 10) {
      const indice = Math.floor(Math.random() * capacidadAC);
      if (!indicesAsignadosA.has(indice)) {
        estadoLugaresAC[indice] = "A";
        estadoPatentesAC[indice] = generarPatenteUnica(estadoPatentesAC, estadoPatentesM);
        indicesAsignadosA.add(indice);
      }
    }

    const indicesAsignadosC = new Set<number>();
    while (indicesAsignadosC.size < 10) {
      const indice = Math.floor(Math.random() * capacidadAC);
      if (!indicesAsignadosA.has(indice) && !indicesAsignadosC.has(indice)) {
        estadoLugaresAC[indice] = "C";
        estadoPatentesAC[indice] = generarPatenteUnica(estadoPatentesAC, estadoPatentesM);
        indicesAsignadosC.add(indice);
      }
    }

    setLugaresAC(estadoLugaresAC);
    setPatentesAC(estadoPatentesAC);
    setLugaresM(estadoLugaresM);
    setPatentesM(estadoPatentesM);
  }

  useEffect(() => {
    inicializarEstacionamiento();
  }, []);

  const [historial, setHistorial] = useState<
    {
      indice: number;
      tipo: "A" | "C" | "M";
      evento: string;
      patente: number;
      fecha: string;
      hora: string;
      amPm: "AM" | "PM" | "";
    }[]
  >([]);

  function logEvento(indice: number, tipo: "A" | "C" | "M", evento: string, patente: number) {
    const now = new Date();

    const fecha = new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(now);

    const hora = new Intl.DateTimeFormat('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    let amPm = '';
    const amPmFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    const formattedAmPm = amPmFormatter.format(now);
    if (formattedAmPm.includes('AM')) {
      amPm = 'AM';
    } else if (formattedAmPm.includes('PM')) {
      amPm = 'PM';
    }

    const log = {
      indice,
      tipo,
      evento,
      patente,
      fecha,
      hora,
      amPm: amPm as "" | "AM" | "PM",
    };
    setHistorial(prev => [...prev, log]);
  }

  function eliminarPatente(tipo: "AC" | "M", indice: number, recaudado = false) {
    if (tipo === "AC") {
      const estadoLugares = [...lugaresAC];
      const nuevasPatentes = [...patentesAC];
      const tipoLugar = estadoLugares[indice]; // "A" | "C" | "D"
      estadoLugares[indice] = "D";
      nuevasPatentes[indice] = 0;
      setLugaresAC(estadoLugares);
      setPatentesAC(nuevasPatentes);
      if (tipoLugar === "A" || tipoLugar === "C") {
        logEvento(indice, tipoLugar, recaudado ? "Recaudado" : "Eliminado", patentesAC[indice]);
      }
    } else {
      const estadoLugares = [...lugaresM];
      const nuevasPatentes = [...patentesM];
      const tipoLugar = estadoLugares[indice]; // "M" | "D"
      estadoLugares[indice] = "D";
      nuevasPatentes[indice] = 0;
      setLugaresM(estadoLugares);
      setPatentesM(nuevasPatentes);
      if (tipoLugar === "M") {
        logEvento(indice, tipoLugar, recaudado ? "Recaudado" : "Eliminado", patentesM[indice]);
      }
    }
  }

  function recaudarPatente(tipo: "AC" | "M", indice: number) {
    const lugar = tipo === "AC" ? lugaresAC[indice] : lugaresM[indice];

    if (tipo === "AC") {
      if (lugar === "A") setRecaudacionAC(prev => prev + precioA);
      else if (lugar === "C") setRecaudacionAC(prev => prev + precioC);
    } else {
      if (lugar === "M") setRecaudacionM(prev => prev + precioM);
    }

    eliminarPatente(tipo, indice, true);
  }

  function reubicarPatente(tipo: "AC" | "M", indice: number) {
    const lugar = tipo === "AC" ? lugaresAC[indice] : lugaresM[indice];
    if (lugar === "D") return;
    let max = tipo === "AC" ? 30 : 20;
    let nuevoLugarStr = prompt(`Ingrese un lugar vacio del 1 al ${max} donde quieras reubicar`);
    if (!nuevoLugarStr) return;
    const nuevoIndice = parseInt(nuevoLugarStr, 10) - 1;
    if (isNaN(nuevoIndice) || nuevoIndice < 0 || nuevoIndice >= max) {
      alert("Índice inválido.");
      return;
    }
    const isAC = tipo === "AC";
    const lugares = isAC ? [...lugaresAC] : [...lugaresM];
    const patentes = isAC ? [...patentesAC] : [...patentesM];

    if (lugares[nuevoIndice] !== "D") {
      alert("Ese lugar no está vacío.");
      return;
    }

    logEvento(indice, lugar as "A" | "C" | "M", "Reubicado", patentes[indice]);

    lugares[nuevoIndice] = lugares[indice];
    patentes[nuevoIndice] = patentes[indice];
    lugares[indice] = "D";
    patentes[indice] = 0;

    if (isAC) {
      setLugaresAC(lugares as ("A" | "C" | "D")[]);
      setPatentesAC(patentes);
    } else {
      setLugaresM(lugares as ("M" | "D")[]);
      setPatentesM(patentes);
    }
  }

  function agregarPatente(tipo: "AC" | "M", indice: number) {
    const randomLugares = Math.random() > 0.5 ? "A" : "C";
    let nuevaPatente = 0;
    while (true) {
      if (toggleRandom) {
        nuevaPatente = generarPatenteUnica(patentesAC, patentesM);
        break;
      } else {
        const input = prompt("Ingrese una patente de 6 dígitos");
        if (input === null) {
          return;
        }
        if (/^\d{6}$/.test(input)) {
          const candidato = parseInt(input, 10);
          const existe = patentesAC.includes(candidato) || patentesM.includes(candidato);
          if (existe) {
            alert("La patente ya está registrada.");
            return;
          }
          nuevaPatente = candidato;
          break;
        }
      }
    }

    if (tipo === "AC") {
      if (lugaresAC[indice] !== "D") return;
      logEvento(indice, randomLugares, "Agregado", nuevaPatente); // Use randomLugares ("A" or "C")
      const estadoLugares = [...lugaresAC];
      const nuevasPatentes = [...patentesAC];
      estadoLugares[indice] = randomLugares;
      nuevasPatentes[indice] = nuevaPatente;
      setLugaresAC(estadoLugares);
      setPatentesAC(nuevasPatentes);
    } else {
      if (lugaresM[indice] !== "D") return;
      logEvento(indice, "M", "Agregado", nuevaPatente); // Always "M" for motos
      const estadoLugares = [...lugaresM];
      const nuevasPatentes = [...patentesM];
      estadoLugares[indice] = "M";
      nuevasPatentes[indice] = nuevaPatente;
      setLugaresM(estadoLugares);
      setPatentesM(nuevasPatentes);
    }
  }

  function toggle() {
    setToggleRandom(!toggleRandom);
  }

  function handleClick(
    tipo: "AC" | "M",
    setClickedIndex: React.Dispatch<React.SetStateAction<number>>,
    patentes: number[],
    setMostRecentlyClicked: React.Dispatch<React.SetStateAction<"AC" | "M">>
  ) {
    return (indice: number, e: React.MouseEvent) => {
      switch (e.detail) {
        case 1:
          setClickedIndex(indice);
          setMostRecentlyClicked(tipo);
          break;
        case 2:
          recaudarPatente(tipo, indice);
          break;
      }
    };
  }

  const handleClickAC = handleClick("AC", setIndiceSeleccionadoAC, patentesAC, setMostRecentlyClicked);
  const handleClickM = handleClick("M", setIndiceSeleccionadoM, patentesM, setMostRecentlyClicked);

  return (
    <div className="grid grid-cols-2 mx-auto gap-4 w-fit">
      <RandomToggle toggleRandom={toggleRandom} toggle={toggle} />
      {lugaresAC.length > 0 && lugaresM.length > 0 && (
        <>
          <Table
            tipo="AC"
            lugares={lugaresAC}
            lugar={info.lugar}
            patentes={patentesAC}
            recaudacion={recaudacionAC}
            clickEvento={handleClickAC}
            agregarPatente={indice => agregarPatente("AC", indice)}
          />
          <Table
            tipo="M"
            lugares={lugaresM}
            lugar={info.lugar}
            patentes={patentesM}
            recaudacion={recaudacionM}
            clickEvento={handleClickM}
            agregarPatente={indice => agregarPatente("M", indice)}
          />
          <Historial historial={historial} />
        </>
      )}
      <InfoPanel
        clickedIndex={info.clickedIndex}
        tipo={info.tipo}
        lugar={info.lugar}
        patente={info.patente}
        clase={clase}
        recaudarPatente={() => recaudarPatente(info.tipo, info.clickedIndex)}
        reubicarPatente={() => reubicarPatente(info.tipo, info.clickedIndex)}
        eliminarPatente={() => eliminarPatente(info.tipo, info.clickedIndex)}
      />
    </div>
  );
}

/*
Búsqueda de patente
Permite buscar una patente específica y resalta su ubicación en el estacionamiento.

Estadísticas y reportes
Muestra estadísticas como ocupación actual, recaudación total, recaudación por tipo de vehículo, tiempo promedio de estadía, etc.

Reserva de lugares
Permite reservar lugares para ciertos vehículos o tipos de usuarios.

Soporte para diferentes tarifas
Tarifas variables según el horario, el día o el tipo de vehículo.

Notificaciones
Alertas cuando el estacionamiento está lleno, cuando un lugar queda disponible, o cuando una patente lleva mucho tiempo estacionada.

Exportar datos
Opción para exportar el historial o las estadísticas a CSV o PDF.

Soporte para usuarios/roles
Diferentes niveles de acceso: administrador, operador, visitante.

Visualización gráfica
Un mapa visual del estacionamiento mostrando los lugares ocupados/libres y el tipo de vehículo.

Integración con cámaras o sensores
Simulación o integración real para detectar automáticamente la entrada/salida de vehículos.

Estas ideas pueden ayudarte a seguir expandiendo tu proyecto y hacerlo más útil y profesional.
*/