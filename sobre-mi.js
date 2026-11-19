import { renderLayout } from './modules/layout.js';
import { perfil } from './modules/perfil.js';
import { escapeHTML } from './modules/utils.js';

renderLayout('sobre-mi');

const e = escapeHTML;
document.getElementById('perfil').innerHTML = `
  <div class="md:col-span-3">
    <h1 class="font-display text-4xl font-extrabold md:text-5xl">${e(perfil.nombre)}</h1>
    <p class="mt-2 text-xl text-sea">${e(perfil.rol)}</p>
    <p class="mt-4 max-w-2xl text-lg text-ink/80">${e(perfil.bio)}</p>
  </div>

  <section class="md:col-span-1">
    <h2 class="font-display text-xl font-semibold">Habilidades</h2>
    <ul class="mt-3 flex flex-wrap gap-2">
      ${perfil.habilidades.map((h) => `<li class="rounded-full bg-white px-3 py-1 text-sm font-medium">${e(h)}</li>`).join('')}
    </ul>
    <h2 class="mt-8 font-display text-xl font-semibold">Enlaces</h2>
    <ul class="mt-3 space-y-2">
      ${perfil.enlaces.map((l) => `<li><a class="font-semibold text-sea underline" href="${e(l.href)}" target="_blank" rel="noopener">${e(l.texto)}</a></li>`).join('')}
    </ul>
  </section>

  <section class="md:col-span-2">
    <h2 class="font-display text-xl font-semibold">Proyectos</h2>
    <ul class="mt-3 space-y-3">
      ${perfil.proyectos.map((p) => `
        <li class="rounded-xl bg-white p-4 shadow-sm">
          <h3 class="font-semibold">${e(p.nombre)}</h3>
          <p class="text-ink/80">${e(p.detalle)}</p>
        </li>`).join('')}
    </ul>
  </section>`;
