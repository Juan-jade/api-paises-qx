// Menú de navegación para celular.

export function initNavigation() {
  const boton = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  if (!boton || !menu) return;

  const cerrar = () => {
    menu.classList.add('hidden');
    boton.setAttribute('aria-expanded', 'false');
  };

  boton.addEventListener('click', () => {
    const abierto = menu.classList.toggle('hidden') === false;
    boton.setAttribute('aria-expanded', String(abierto));
  });

  menu.querySelectorAll('a').forEach((enlace) => enlace.addEventListener('click', cerrar));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrar(); });
}
