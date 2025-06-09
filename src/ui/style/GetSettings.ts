const precioA = 1500;
const precioM = 800;
const precioC = 1800;

const capacidadAC = 30;
const capacidadM = 20;
let ultimoPrecio = 0;

export function getCurrentPrecio(lugar: "D" | "A" | "C" | "M") {
  switch (lugar) {
    case "A":
      ultimoPrecio = precioA;
      break;
    case "C":
      ultimoPrecio = precioC;
      break;
    case "M":
      ultimoPrecio = precioM;
      break;
  }
  return ultimoPrecio;
}

export function getAllSettings() {
  return { precioA, precioM, precioC, capacidadAC, capacidadM };
}