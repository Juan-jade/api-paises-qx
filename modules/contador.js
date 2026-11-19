// Lógica del reto de 50 clics.

import { showAlert } from './alerts.js';

const META = 50;
const ANIMOS = {
  10: 'Ya van 10. Sigue así.',
  25: 'Vas por la mitad. Tómate tu tiempo.',
  40: 'Solo faltan 10.'
};

export function initContador() {
  const $ = (id) => document.getElementById(id);
  const boton = $('click-btn');
  const conteo = $('clic-conteo');
  const barra = $('barra');
  const progreso = $('progreso');
  const mensaje = $('bendicion');
  const reiniciar = $('reiniciar');
  let clics = 0;

  function actualizar() {
    conteo.textContent = clics;
    barra.style.width = `${(clics / META) * 100}%`;
    progreso.setAttribute('aria-valuenow', clics);

    const terminado = clics >= META;
    boton.disabled = terminado;
    mensaje.classList.toggle('hidden', !terminado);
  }

  boton.addEventListener('click', () => {
    if (clics >= META) return;
    clics++;
    actualizar();
    if (ANIMOS[clics]) showAlert(ANIMOS[clics], 'info', 2500);
  });

  // Mantener Enter presionado no cuenta como clics nuevos.
  boton.addEventListener('keydown', (e) => { if (e.repeat) e.preventDefault(); });

  reiniciar.addEventListener('click', () => {
    clics = 0;
    actualizar();
    boton.focus();
  });

  actualizar();
}
