// Archivo principal: importa los módulos y los pone a funcionar.

import { renderLayout } from './modules/layout.js';
import { showAlert } from './modules/alerts.js';
import { getAllCountries } from './modules/api.js';
import { renderCards, renderSkeletons, nombreES } from './modules/cards.js';
import { initModal, openCountryDetail } from './modules/modal.js';
import { debounce, normalizar } from './modules/utils.js';

const POR_PAGINA = 24;
const estado = { todos: [], filtrados: [], mostrados: POR_PAGINA, texto: '', region: '' };

const $ = (id) => document.getElementById(id);
const lista = $('countries');

function dibujar() {
  const visibles = estado.filtrados.slice(0, estado.mostrados);
  renderCards(lista, visibles);

  $('count').textContent = `${estado.filtrados.length} países encontrados`;
  $('empty').classList.toggle('hidden', estado.filtrados.length > 0);
  $('more').classList.toggle('hidden', estado.mostrados >= estado.filtrados.length);
}

function aplicarFiltros() {
  const texto = normalizar(estado.texto);
  estado.filtrados = estado.todos.filter((pais) => {
    const coincideRegion = !estado.region || pais.continent?.code === estado.region;
    const coincideTexto = !texto
      || normalizar(nombreES(pais)).includes(texto)
      || normalizar(pais.name).includes(texto)
      || normalizar(pais.native).includes(texto);
    return coincideRegion && coincideTexto;
  });
  estado.mostrados = POR_PAGINA;
  dibujar();
}

async function cargarPaises() {
  $('error').classList.add('hidden');
  $('count').textContent = 'Cargando países...';
  renderSkeletons(lista, 8);

  try {
    const datos = await getAllCountries();
    estado.todos = datos.sort((a, b) => nombreES(a).localeCompare(nombreES(b), 'es'));
    aplicarFiltros();
  } catch (error) {
    console.error(error);
    lista.innerHTML = '';
    $('count').textContent = '';
    $('error').classList.remove('hidden');
    showAlert('No se pudo conectar con la API de países.', 'error');
  }
}

function init() {
  renderLayout('inicio');
  initModal();

  $('search').addEventListener('input', debounce((e) => {
    estado.texto = e.target.value;
    aplicarFiltros();
  }));
  $('region').addEventListener('change', (e) => {
    estado.region = e.target.value;
    aplicarFiltros();
  });
  $('more').addEventListener('click', () => {
    estado.mostrados += POR_PAGINA;
    dibujar();
  });
  $('retry').addEventListener('click', cargarPaises);
  lista.addEventListener('click', (e) => {
    const tarjeta = e.target.closest('[data-code]');
    if (tarjeta) openCountryDetail(tarjeta.dataset.code);
  });

  cargarPaises();
}

init();
