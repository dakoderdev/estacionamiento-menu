'use client';
import React, { useEffect, useState } from "react";
import Table from "./Table";
import RandomToggle from "./RandomToggle";
import InfoPanel from "./InfoPanel";
import Historial from "./Historial";
import PreciosPanel from "./PreciosPanel";
import { getClaseEstilo } from "./style/GetClaseEstilo";
import { getAllSettings } from "./style/GetSettings";
import TicketPopups from "./popups/TicketPopups";
import HistorialPopups from "./popups/HistorialPopups";
import EditarPopups from "./popups/EditarPopups";

// Move this function outside the component to avoid infinite re-renders
function generarPatenteUnica(patentesAC: number[], patentesM: number[]): number {
  while (true) {
    const nueva = Math.floor(100000 + Math.random() * 900000);
    if (!patentesAC.includes(nueva) && !patentesM.includes(nueva)) {
      return nueva;
    }
  }
}

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

  const initialSettings = getAllSettings();
  const capacidadAC = initialSettings.capacidadAC;
  const capacidadM = initialSettings.capacidadM;

  function getInfoSeleccionada() {
    const tipo = mostRecentlyClicked;
    const clickedIndex = tipo === "AC" ? indiceSeleccionadoAC : indiceSeleccionadoM;
    const lugar = tipo === "AC" ? lugaresAC[clickedIndex] : lugaresM[clickedIndex];
    const patente = tipo === "AC" ? patentesAC[clickedIndex] ?? 0 : patentesM[clickedIndex] ?? 0;
    return { tipo, clickedIndex, lugar, patente };
  }

  const info = getInfoSeleccionada();
  const clase = getClaseEstilo(info.lugar);

  const inicializarEstacionamiento = React.useCallback(() => {
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
  }, [capacidadAC, capacidadM]);

  useEffect(() => {
    inicializarEstacionamiento();
  }, [inicializarEstacionamiento]);

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
    const { precioA, precioM, precioC } = getAllSettings();

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
    const max = tipo === "AC" ? 30 : 20;
    const nuevoLugarStr = prompt(`Ingrese un lugar vacio del 1 al ${max} donde quieras reubicar`);
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

  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<{
    patente: number;
    lugar: "A" | "C" | "D" | "M";
    fechaIngreso: string;
    fechaEgreso: string;
    horaIngreso: string;
    horaEgreso: string;
    amPmIngreso: "AM" | "PM";
    amPmEgreso: "AM" | "PM";
  } | null>(null);

  function ticketPatente(tipo: "AC" | "M") {
    const lugar = tipo === "AC" ? lugaresAC[indiceSeleccionadoAC] : lugaresM[indiceSeleccionadoM];
    const ingreso = [...historial]
      .reverse()
      .find(h => h.patente === info.patente && h.evento === "Agregado");
    const fechaIngreso = ingreso?.fecha || "";
    const horaIngreso = ingreso?.hora || "";
    const amPmIngreso = ingreso?.amPm === "AM" || ingreso?.amPm === "PM" ? ingreso.amPm : "AM";
    const now = new Date();
    const fechaEgreso = new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(now);
    const horaEgreso = new Intl.DateTimeFormat('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);
    const amPmEgreso = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(now).includes('AM') ? 'AM' : 'PM';
    setTicketData({
      patente: info.patente,
      lugar,
      fechaIngreso,
      fechaEgreso,
      horaIngreso,
      horaEgreso,
      amPmIngreso: amPmIngreso as "AM" | "PM",
      amPmEgreso: amPmEgreso as "AM" | "PM",
    });
    setHistorialModalOpen(false);
    setTicketModalOpen(!ticketModalOpen);
  }

  const [historialModalOpen, setHistorialModalOpen] = useState(false);

  function historialPatente(patente: number) {
    console.log(patente);
    setHistorialModalOpen(!historialModalOpen);
  }

  const [editarModalOpen, setEditarModalOpen] = useState(false);

  function editarPatente(patente: number) {
    console.log(patente);
    setEditarModalOpen(!editarModalOpen);
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
    <div className="grid lg:grid-cols-2 mx-auto gap-4 w-fit">
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
        ticketPatente={() => ticketPatente(info.tipo)}
        historialPatente={() => historialPatente(info.patente)}
        editarPatente={() => editarPatente(info.patente)}
      />
      <PreciosPanel />
      <TicketPopups
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        ticketData={ticketData}
      />
      <HistorialPopups
        historial={historial.filter(h => h.patente === info.patente)}
        isOpen={historialModalOpen}
        onClose={() => setHistorialModalOpen(false)}
        />
      <EditarPopups
        isOpen={editarModalOpen}
        onClose={() => setEditarModalOpen(false)}
        patenteInicial={info.patente}
        tipoInicial={info.lugar as "A" | "C" | "M"}
        onSave={(nuevaPatente: number, nuevoTipo : "A" | "C" | "M") => {
            // Determine if the type is changing between AC and M
            const isChangingGrid =
            (info.lugar === "A" || info.lugar === "C") && nuevoTipo === "M" ||
            info.lugar === "M" && (nuevoTipo === "A" || nuevoTipo === "C");

            if (isChangingGrid) {
            if (nuevoTipo === "M") {
              // Move from AC to M
              const emptyIndex = lugaresM.findIndex(l => l === "D");
              if (emptyIndex === -1) {
              alert("No hay lugares disponibles para motos.");
              setEditarModalOpen(false);
              return;
              }
              // Remove from AC
              const nuevasLugaresAC = [...lugaresAC];
              const nuevasPatentesAC = [...patentesAC];
              nuevasLugaresAC[info.clickedIndex] = "D";
              nuevasPatentesAC[info.clickedIndex] = 0;
              setLugaresAC(nuevasLugaresAC);
              setPatentesAC(nuevasPatentesAC);

              // Add to M
              const nuevasLugaresM = [...lugaresM];
              const nuevasPatentesM = [...patentesM];
              nuevasLugaresM[emptyIndex] = "M";
              nuevasPatentesM[emptyIndex] = nuevaPatente;
              setLugaresM(nuevasLugaresM);
              setPatentesM(nuevasPatentesM);

              logEvento(emptyIndex, "M", "Editado", nuevaPatente);
            } else {
              // Move from M to AC (A or C)
              const emptyIndex = lugaresAC.findIndex(l => l === "D");
              if (emptyIndex === -1) {
              alert("No hay lugares disponibles para autos/camionetas.");
              setEditarModalOpen(false);
              return;
              }
              // Remove from M
              const nuevasLugaresM = [...lugaresM];
              const nuevasPatentesM = [...patentesM];
              nuevasLugaresM[info.clickedIndex] = "D";
              nuevasPatentesM[info.clickedIndex] = 0;
              setLugaresM(nuevasLugaresM);
              setPatentesM(nuevasPatentesM);

              // Add to AC
              const nuevasLugaresAC = [...lugaresAC];
              const nuevasPatentesAC = [...patentesAC];
              nuevasLugaresAC[emptyIndex] = nuevoTipo;
              nuevasPatentesAC[emptyIndex] = nuevaPatente;
              setLugaresAC(nuevasLugaresAC);
              setPatentesAC(nuevasPatentesAC);

              logEvento(emptyIndex, nuevoTipo, "Editado", nuevaPatente);
            }
            } else {
            // Same grid, just update
            if (info.tipo === "AC") {
              const nuevasPatentes = [...patentesAC];
              const nuevasLugares = [...lugaresAC];
              nuevasPatentes[info.clickedIndex] = nuevaPatente;
              if (nuevoTipo === "A" || nuevoTipo === "C") {
                nuevasLugares[info.clickedIndex] = nuevoTipo;
              }
              setPatentesAC(nuevasPatentes);
              setLugaresAC(nuevasLugares);
              logEvento(info.clickedIndex, nuevoTipo, "Editado", nuevaPatente);
            } else {
              const nuevasPatentes = [...patentesM];
              // tipo moto siempre es "M"
              nuevasPatentes[info.clickedIndex] = nuevaPatente;
              setPatentesM(nuevasPatentes);
              logEvento(info.clickedIndex, "M", "Editado", nuevaPatente);
            }
            }
            setEditarModalOpen(false);
        }}
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