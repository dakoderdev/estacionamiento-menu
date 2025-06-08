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


export default function Historial({ historial }: HistorialProps) {
  return (
    <div className="grid border border-neutral-400/20 w-full shadow-lg rounded-md overflow-hidden max-h-50"> {/* Removed p-3 and overflow-y-scroll here */}
      <h3 className="sticky top-0 bg-background z-50 text-lg font-semibold p-3">Historial</h3> {/* Added p-3 to the sticky header */}

      {/* This new div will hold the scrollable content and its padding */}
      <div className="overflow-y-scroll p-3 pt-0"> {/* Added p-3 here, and pt-0 to prevent double padding above the first item */}
        <div className="z-40 flex flex-col-reverse gap-2 w-fit mx-auto">
          {historial.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 w-full justify-between"
            >
              <h4 className={`${item.evento === "Recaudado" ? "text-green-300" : item.evento === "Eliminado" ? "text-red-300" : "text-blue-300"} opacity-50 text-sm min-w-20 font-medium w-fit truncate`}>{item.evento}</h4>
              <div className="grid grid-cols-[auto_auto_auto] gap-0.25">
                <span className={`${item.tipo === "A" ? "bg-blue-600/10 text-blue-300 border-blue-600/20" : item.tipo === "C" ? "bg-pink-600/10 text-pink-300 border-pink-600/20" : "bg-emerald-600/20 text-emerald-300 border-emerald-600/20"} w-fit border flex items-center gap-0.25 text-xs mr-2 pl-2.5 pr-2.25 py-0.5 rounded-full`}>
                  {item.patente}
                </span>
                <span className="w-fit flex items-center gap-0.25 bg-neutral-600/10 text-neutral-300 text-[0.5rem] mr-2 pl-2.5 pr-2.25 py-0.5 rounded-full"><b className="text-xs font-normal">{item.hora}</b>{item.amPm}</span>
                <span className="w-fit flex items-center gap-0.25 bg-neutral-600/10 text-neutral-300 text-xs mr-2 pl-2.5 pr-2.25 py-0.5 rounded-full">{item.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}