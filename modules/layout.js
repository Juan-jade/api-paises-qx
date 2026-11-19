// Encabezado y pie de página compartidos por todas las páginas.

import { initNavigation } from './navigation.js';

const ENLACES = [
  { id: 'inicio', texto: 'Países', href: 'index.html' },
  { id: 'reto', texto: 'Reto de 50 clics', href: 'reto.html' },
  { id: 'sobre-mi', texto: 'Sobre mí', href: 'sobre-mi.html' }
];

export function renderLayout(paginaActual) {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  if (header) {
    const items = ENLACES.map(({ id, texto, href }) => {
      const activo = id === paginaActual;
      return `<li><a href="${href}" ${activo ? 'aria-current="page"' : ''}
        class="block py-2 font-medium hover:text-sea ${activo ? 'text-sea underline underline-offset-8' : ''}">${texto}</a></li>`;
    }).join('');

    header.innerHTML = `
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Principal">
        <a href="index.html" class="font-display text-xl font-extrabold">Atlas</a>
        <button id="menu-btn" type="button" aria-expanded="false" aria-controls="menu"
                class="rounded-lg p-2 md:hidden" aria-label="Abrir menú">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
        <ul id="menu" class="absolute left-0 top-full hidden w-full border-b border-ink/10 bg-white px-4 py-2 md:static md:flex md:w-auto md:gap-6 md:border-0 md:bg-transparent md:p-0">
          ${items}
        </ul>
      </nav>`;
  }

  if (footer) footer.textContent = 'Proyecto Atlas. Datos de Countries API.';

  initNavigation();
}
