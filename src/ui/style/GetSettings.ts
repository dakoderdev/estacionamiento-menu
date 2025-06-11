// src/ui/style/GetSettings.ts

// Initialize with default values first
let precioA = 1500;
let precioM = 800;
let precioC = 1800;

const capacidadAC = 30;
const capacidadM = 20;
let ultimoPrecio = 0;

if (typeof window !== 'undefined') {
  precioA = parseFloat(localStorage.getItem('precioA') ?? '') || 1500;
  precioM = parseFloat(localStorage.getItem('precioM') ?? '') || 800;
  precioC = parseFloat(localStorage.getItem('precioC') ?? '') || 1800;
}

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

export function updatePrices(newPrecioA: number, newPrecioM: number, newPrecioC: number) {
  if (typeof window !== 'undefined') {
    precioA = newPrecioA;
    precioM = newPrecioM;
    precioC = newPrecioC;
    localStorage.setItem('precioA', newPrecioA.toString());
    localStorage.setItem('precioM', newPrecioM.toString());
    localStorage.setItem('precioC', newPrecioC.toString());
  } else {
    console.warn("Attempted to update prices server-side, but localStorage is not available.");
    precioA = newPrecioA; 
    precioM = newPrecioM;
    precioC = newPrecioC;
  }
}