// Alertas (toasts) de la interfaz.

const ESTILOS = {
  info: 'bg-sea text-white',
  success: 'bg-emerald-700 text-white',
  error: 'bg-rose-700 text-white'
};

export function showAlert(mensaje, tipo = 'info', duracion = 4000) {
  const contenedor = document.getElementById('alerts');
  if (!contenedor) return;

  const alerta = document.createElement('div');
  alerta.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
  alerta.className = `alert-enter pointer-events-auto rounded-lg px-4 py-3 shadow-lg ${ESTILOS[tipo] ?? ESTILOS.info}`;
  alerta.textContent = mensaje;
  contenedor.appendChild(alerta);

  setTimeout(() => alerta.classList.add('alert-leave'), duracion);
  setTimeout(() => alerta.remove(), duracion + 300);
}
