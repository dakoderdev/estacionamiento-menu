interface HistorialProps {
  historial: {
    indice: number;
    tipo: "A" | "C" | "M";
    evento: string;
    patente: number;
    fecha: string;
    hora: string;
    amPm: "AM" | "PM" | "";
  }[];
}

const ClockIcon = () => (
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
    className="h-3 w-3"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const CalendarIcon = () => (
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
    className="h-3 w-3"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
    <path d="M4 11h16" />
    <path d="M7 14h.01" />
    <path d="M10 14h.01" />
    <path d="M13 14h.01" />
    <path d="M16 14h.01" />
    <path d="M7 17h.01" />
    <path d="M10 17h.01" />
    <path d="M13 17h.01" />
    <path d="M16 17h.01" />
  </svg>
);

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
    className="h-3 w-3 mr-1"
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
    className="h-3 w-3 mr-1"
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
    className="h-3 w-3 mr-1">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
    <path d="M13 6h2l1.5 3l2 4" />
  </svg>
);

// SVG for Plus icon (from Tabler Icons: icon-tabler-plus)
const PlusIcon = () => (
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
    className="h-4 w-4" // Adjusted size
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5l0 14" />
    <path d="M5 12l14 0" />
  </svg>
);

const TrashIcon = () => (
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
    className="h-4 w-4"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
);

const DollarIcon = () => (
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
    className="h-4 w-4"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
    <path d="M12 3v3m0 12v3" />
  </svg>
);

const ArrowsIcon = () => (
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
    className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 9l4 -4l4 4m-4 -4v14" />
      <path d="M21 15l-4 4l-4 -4m4 4v-14" />
    </svg>
);

const getEventIcon = (evento: string) => {
  switch (evento) {
    case "Recaudado":
      return <DollarIcon />;
    case "Eliminado":
      return <TrashIcon />;
    case "Reubicado":
      return <ArrowsIcon />;
    default:
      return <PlusIcon />;
  }
};

const getEventColorClass = (evento: string) => {
  switch (evento) {
    case "Recaudado":
      return "text-green-300";
    case "Eliminado":
      return "text-red-300";
    case "Reubicado":
      return "text-indigo-300";
    default:
      return "text-blue-300";
  }
};

const getTipoBadgeClass = (tipo: "A" | "C" | "M") => {
  switch (tipo) {
    case "A":
      return "bg-blue-600/10 text-blue-300 border-blue-600/20";
    case "C":
      return "bg-pink-600/10 text-pink-300 border-pink-600/20";
    case "M":
      return "bg-emerald-600/20 text-emerald-300 border-emerald-600/20";
    default:
      return "bg-neutral-600/20 border border-neutral-600/30 text-neutral-300 border-neutral-600/20";
  }
};

const getVehicleIcon = (tipo: "A" | "C" | "M") => {
  switch (tipo) {
    case "A":
      return <CarIcon />;
    case "C":
      return <TruckIcon />;
    case "M":
      return <MotorbikeIcon />;
    default:
      return <CarIcon />;
  }
};

function formatoPatente(patente: number): string {
    return patente.toString().padStart(6, "0");
}

export default function Historial({ historial }: HistorialProps) {
  return (
    <div className="relative border border-neutral-400/20 w-full shadow-lg rounded-md overflow-hidden max-h-50">
      <h3 className="absolute top-0 w-[calc(100%-10px)] bg-background/85 border-b border-background backdrop-blur-sm z-10 text-lg font-semibold p-3 pb-1.5">
        Historial
      </h3>
      <div className="overflow-y-scroll pt-[3rem] h-full">
        <div className="flex flex-col-reverse gap-2 w-fit mx-auto p-3 pt-0">
          {historial.length === 0 ? (
            <div className="text-neutral-400 text-sm text-center py-4">
              No hay historial disponible.
            </div>
          ) : (
            historial.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 w-full justify-between"
              >
                <div
                  className={`flex items-center gap-1 opacity-50 text-sm min-w-20 font-medium w-fit truncate ${getEventColorClass(
                    item.evento
                  )}`}
                >
                  {getEventIcon(item.evento)}
                  {item.evento}
                </div>
                <div className="grid grid-cols-[auto_auto_auto] gap-0.25">
                  <span
                    className={`${getTipoBadgeClass(
                      item.tipo
                    )} w-fit border font-[family-name:var(--font-geist-mono)] flex items-center gap-0.5 text-xs mr-2 pl-2.5 pr-2.25 py-1 rounded-full`}
                  >
                    {getVehicleIcon(item.tipo)}
                    {formatoPatente(item.patente)}
                  </span>
                  <span className="w-fit flex items-center gap-0.5 bg-neutral-600/20 border border-neutral-600/30 text-neutral-300 text-[0.5rem] mr-2 pl-2.5 pr-2.25 py-1 rounded-full">
                    <ClockIcon />
                    <b className="text-xs font-normal">{item.hora}</b>
                    {item.amPm}
                  </span>
                  <span className="w-fit flex items-center gap-0.5 bg-neutral-600/20 border border-neutral-600/30 text-neutral-300 text-xs mr-2 pl-2.5 pr-2.25 py-1 rounded-full">
                    <CalendarIcon />
                    {item.fecha}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}