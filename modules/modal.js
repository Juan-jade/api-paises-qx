// Ventana con el detalle de un país.

import { getCountryByCode } from './api.js';
import { showAlert } from './alerts.js';
import { escapeHTML, CONTINENTES, traducir } from './utils.js';
import { nombreES, urlBandera } from './cards.js';

function fila(etiqueta, valor) {
  return `<div><dt class="text-sm text-ink/60">${etiqueta}</dt><dd class="font-semibold">${valor}</dd></div>`;
}

function plantilla(pais) {
  const nombre = nombreES(pais);
  const idiomas = (pais.languages ?? [])
    .map((i) => escapeHTML(traducir('language', i.code, i.name))).join(', ') || 'Sin datos';
  const monedas = (pais.currency ?? '').split(',').map((c) => c.trim()).filter(Boolean)
    .map((c) => `${escapeHTML(traducir('currency', c, c))} (${escapeHTML(c)})`).join(', ') || 'Sin datos';
  const continente = CONTINENTES[pais.continent?.code] ?? pais.continent?.name ?? 'Sin datos';
  const subdivisiones = pais.states?.length ? String(pais.states.length) : 'Sin datos';
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pais.name)}`;

  return `
    <img src="${escapeHTML(urlBandera(pais.code, 640))}" alt="Bandera de ${escapeHTML(nombre)}" class="aspect-[3/2] w-full object-cover">
    <div class="p-6">
      <h2 class="font-display text-3xl font-extrabold">${escapeHTML(nombre)}</h2>
      <p class="text-ink/70">${escapeHTML(pais.native)}</p>
      <dl class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        ${fila('Capital', escapeHTML(pais.capital ?? 'Sin capital'))}
        ${fila('Continente', escapeHTML(continente))}
        ${fila('Código del país', escapeHTML(pais.code))}
        ${fila('Subdivisiones', subdivisiones)}
        ${fila('Idiomas', idiomas)}
        ${fila('Monedas', monedas)}
      </dl>
      <a href="${escapeHTML(mapa)}" target="_blank" rel="noopener" class="mt-6 inline-block font-semibold text-sea underline">Ver en el mapa</a>
    </div>`;
}

export async function openCountryDetail(codigo) {
  const dialogo = document.getElementById('detail');
  const cuerpo = document.getElementById('detail-body');

  cuerpo.innerHTML = '<div class="skeleton aspect-[3/2]"></div><div class="space-y-3 p-6"><div class="skeleton h-8 w-1/2 rounded"></div><div class="skeleton h-4 w-full rounded"></div></div>';
  if (!dialogo.open) dialogo.showModal();

  try {
    const pais = await getCountryByCode(codigo);
    cuerpo.innerHTML = plantilla(pais);
  } catch (error) {
    console.error(error);
    cuerpo.innerHTML = '<p class="p-10 text-center">No pudimos cargar el detalle de este país.</p>';
    showAlert('Error al cargar el detalle. Inténtalo de nuevo.', 'error');
  }
}

export function initModal() {
  const dialogo = document.getElementById('detail');

  dialogo.addEventListener('click', (e) => {
    if (e.target === dialogo || e.target.closest('[data-close]')) dialogo.close();
  });
}
