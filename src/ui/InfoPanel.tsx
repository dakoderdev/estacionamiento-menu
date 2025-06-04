import { getClaseEstilo } from "./style/GetClaseEstilo";

export default function InfoPanel({
  clickedIndex,
  tipo,
  lugar,
  patente,
  clase,
  recaudarPatente,
  eliminarPatente,
}: {
  clickedIndex: number;
  tipo: "AC" | "M";
  lugar: "A" | "C" | "M" | "D";
  patente: number;
  clase: ReturnType<typeof getClaseEstilo>;
  recaudarPatente: (patente: number) => void;
  eliminarPatente: () => void;
}) {
  return (
    <div className="absolute bottom-3 left-3 flex items-center gap-3 border border-neutral-400/20 shadow-lg rounded-md p-3">
      <div className="flex flex-col aspect-5/4 h-14.5 justify-center items-center">
        <div
          className={`border-x-2 text-lg font-[family-name:var(--font-geist-mono)] ${clase.borde} transition-colors px-2`}
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
      <h3
        className={`${
          patente === 0 ? "hidden" : ""
        } transition-colors absolute -top-[1px] left-1.5 -translate-y-full font-medium font-[family-name:var(--font-geist-mono)] min-h-8 min-w-20 flex flex-nowrap justify-center items-center border-x border-t rounded-t-xl w-fit ${clase.fondo} ${clase.texto} ${clase.bordeFondo}`}
      >
        {patente}
      </h3>
      {patente !== 0 && (
        <div className="pl-3 text-lg h-14.5 gap-1.5 flex flex-col items-baseline border-l border-neutral-400/20">
          <div className="flex gap-3 justify-between">
            <button
              onClick={() => recaudarPatente(patente)}
              className={`text-xs ${clase.textoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors ${clase.fondoAlt}`}
            >
              Recaudar
            </button>
            <button
              className={`text-xs ${clase.textoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors ${clase.fondoAlt}`}
            >
              Reubicar
            </button>
            <button
              onClick={eliminarPatente}
              className={`text-xs ${clase.textoAlt} font-medium min-h-8 px-7 cursor-pointer rounded-full transition-colors ${clase.fondoAlt}`}
            >
              Eliminar
            </button>
          </div>
          <div className="flex gap-1.5">
            <button className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
              {/* ...SVG... */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>
            </button>
            <button className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
              {/* ...SVG... */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /><path d="M12 8v4l3 3" /></svg>
            </button>
            <button className="text-xs py-0.5 px-2 rounded-full bg-white/60 hover:bg-white/30 transition-colors cursor-pointer grow text-black justify-center items-center flex">
              {/* ...SVG... */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
