import { getClaseEstilo } from "./style/GetClaseEstilo";

const CarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 mr-1"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
  </svg>
);

const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 mr-1"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
  </svg>
);

const MotorbikeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 mr-1">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
    <path d="M13 6h2l1.5 3l2 4" />
  </svg>
);

const getVehicleIcon = (tipo: "A" | "C" | "M" | "D") => {
  switch (tipo) {
    case "A":
      return <CarIcon />;
    case "C":
      return <TruckIcon />;
    case "M":
      return <MotorbikeIcon />;
    case "D":
    default:
      return <CarIcon />;
  }
};

export default function InfoPanel({
  clickedIndex,
  tipo,
  lugar,
  patente,
  clase,
  recaudarPatente,
  reubicarPatente,
  eliminarPatente,
}: {
  clickedIndex: number;
  tipo: "AC" | "M";
  lugar: "A" | "C" | "M" | "D";
  patente?: number;
  clase: ReturnType<typeof getClaseEstilo>;
  recaudarPatente: (patente: number) => void;
  reubicarPatente: (patente: number) => void;
  eliminarPatente: () => void;
}) {

  function formatoPatente(patente: number): string {
    return patente.toString().padStart(6, "0");
  }
    
  return (
    <div className="fixed flex items-center gap-3 p-3 border rounded-md shadow-lg bottom-3 left-3 border-neutral-400/20 bg-background/85 backdrop-blur-sm">
      <div className="flex flex-col aspect-5/4 h-14.5 justify-center items-center">
        <div
          className={`border-x-2 text-lg font-[family-name:var(--font-geist-mono)] ${clase.borde} transition-colors px-2`}
        >
          <p>{clickedIndex + 1}</p>
        </div>
        <p className="text-xs text-center opacity-60">
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
      <h3
        className={`${
          patente === 0 ? "hidden" : ""
        } transition-colors absolute -top-[1px] left-1.5 -translate-y-full font-medium font-[family-name:var(--font-geist-mono)] min-h-8 min-w-23 flex flex-nowrap justify-center items-center border-x border-t rounded-t-xl w-fit ${clase.fondo} ${clase.texto} ${clase.bordeFondo}`}
      >
        {getVehicleIcon(lugar)}
        {formatoPatente(patente || 0)}
      </h3>
      {patente !== 0 && (
        <div className="pl-3 text-lg h-14.5 gap-1.5 flex flex-col items-baseline border-l border-neutral-400/20">
          <div className="flex justify-between gap-3">
            <button
              onClick={() => recaudarPatente(patente || 0)}
              className={`text-xs ${clase.textoAlt} ${clase.fondoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors`}
            >
              Recaudar
            </button>
            <button
              onClick={() => reubicarPatente(patente || 0)}
              className={`text-xs ${clase.textoAlt} ${clase.fondoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors`}
            >
              Reubicar
            </button>
            <button
              onClick={eliminarPatente}
              className={`text-xs ${clase.textoAlt} ${clase.fondoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors`}
            >
              Eliminar
            </button>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => alert("Funcionalidad no implementada")} className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 focus:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>
            </button>
            <button onClick={() => alert("Funcionalidad no implementada")} className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 focus:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /><path d="M12 8v4l3 3" /></svg>
            </button>
            <button onClick={() => alert("Funcionalidad no implementada")} className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 focus:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
