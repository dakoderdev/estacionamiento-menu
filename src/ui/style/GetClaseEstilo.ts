function getClaseEstilo(estado: "A" | "C" | "M" | "D") {
  switch (estado) {
    case "A":
      return {
        borde: "border-blue-600/40",
        bordeAlt: "border-blue-700/80",
        fondo: "bg-blue-600/10 hover:bg-blue-600/20",
        fondoAlt: "bg-blue-500 hover:bg-blue-800",
        texto: "text-blue-300",
        textoAlt: "text-black",
        bordeFondo: "border-blue-600/20",
      };
    case "C":
      return {
        borde: "border-pink-500/40",
        bordeAlt: "border-pink-700/80",
        fondo: "bg-pink-600/10 hover:bg-pink-600/20",
        fondoAlt: "bg-pink-500 hover:bg-pink-800",
        texto: "text-pink-300",
        textoAlt: "text-black",
        bordeFondo: "border-pink-600/20",
      };
    case "M":
      return {
        borde: "border-emerald-400/40",
        bordeAlt: "border-emerald-700/80",
        fondo: "bg-emerald-600/10 hover:bg-emerald-600/20",
        fondoAlt: "bg-emerald-500 hover:bg-emerald-800",
        texto: "text-emerald-300",
        textoAlt: "text-black",
        bordeFondo: "border-emerald-600/20",
      };
    default:
      return {
        borde: "border-neutral-400/40",
        bordeAlt: "border-neutral-700/80",
        fondo: "bg-neutral-600/10",
        fondoAlt: "bg-neutral-500 hover:bg-neutral-800",
        texto: "text-neutral-300",
        textoAlt: "text-black",
        bordeFondo: "border-neutral-600/20",
      };
  }
}

export { getClaseEstilo };