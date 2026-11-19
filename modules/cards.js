// Dibuja las tarjetas de países en la página.

import { escapeHTML, CONTINENTES, traducir } from './utils.js';

export function nombreES(pais) {
  return traducir('region', pais.code, pais.name);
}

// Las banderas vienen de flagcdn.com a partir del código de 2 letras del país.
export function urlBandera(codigo, ancho = 320) {
  return `https://flagcdn.com/w${ancho}/${String(codigo).toLowerCase()}.png`;
}

export function primeraMoneda(pais) {
  const codigo = (pais.currency ?? '').split(',')[0].trim();
  return codigo ? traducir('currency', codigo, codigo) : 'Sin datos';
}

export function renderSkeletons(contenedor, cantidad = 8) {
  contenedor.innerHTML = Array.from({ length: cantidad }, () => `
    <li class="overflow-hidden rounded-xl bg-white" aria-hidden="true">
      <div class="skeleton aspect-[3/2]"></div>
      <div class="space-y-2 p-4">
        <div class="skeleton h-5 w-2/3 rounded"></div>
        <div class="skeleton h-4 w-1/2 rounded"></div>
      </div>
    </li>`).join('');
}

export function renderCards(contenedor, paises) {
  contenedor.innerHTML = paises.map((pais) => {
    const nombre = escapeHTML(nombreES(pais));
    const capital = escapeHTML(pais.capital?.[0] ?? 'Sin capital');
    const continente = escapeHTML(CONTINENTES[pais.continent?.code] ?? pais.continent?.name ?? '');
    const moneda = escapeHTML(primeraMoneda(pais));

    return `
    <li>
      <button type="button" data-code="${escapeHTML(pais.code)}"
              class="card block h-full w-full overflow-hidden rounded-xl bg-white text-left shadow-sm">
        <img src="${escapeHTML(urlBandera(pais.code))}" alt="Bandera de ${nombre}" loading="lazy"
             class="aspect-[3/2] w-full border-b border-ink/10 object-cover">
        <span class="block p-4">
          <span class="block font-display text-lg font-semibold">${nombre}</span>
          <span class="mt-1 block text-sm text-ink/70">${continente}</span>
          <span class="mt-3 block text-sm">Capital: <strong>${capital}</strong></span>
          <span class="block text-sm">Moneda: <strong>${moneda}</strong></span>
        </span>
      </button>
    </li>`;
  }).join('');
}
