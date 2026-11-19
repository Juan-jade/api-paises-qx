// Funciones auxiliares compartidas por los demás módulos.

export const CONTINENTES = {
  AF: 'África',
  AN: 'Antártida',
  AS: 'Asia',
  EU: 'Europa',
  NA: 'América del Norte',
  OC: 'Oceanía',
  SA: 'América del Sur'
};

export function escapeHTML(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export function formatNumber(n) {
  return new Intl.NumberFormat('es-CO').format(n ?? 0);
}

// Traduce al español con el propio navegador (Intl.DisplayNames).
// tipo: 'region' (país), 'language' (idioma) o 'currency' (moneda).
// Si el navegador no conoce el código, devuelve el texto de respaldo.
export function traducir(tipo, codigo, respaldo = codigo) {
  try {
    return new Intl.DisplayNames(['es'], { type: tipo }).of(codigo) || respaldo;
  } catch {
    return respaldo;
  }
}

// Quita tildes y pasa a minúsculas para que "peru" encuentre "Perú".
export function normalizar(texto) {
  return String(texto ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function debounce(fn, ms = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
