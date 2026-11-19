# Atlas: explorador de países

Página web hecha con HTML5, Tailwind CSS, un `styles.css` propio y JavaScript con módulos.
Consume la API pública [Countries](https://countries.trevorblades.com) (GraphQL) con `fetch` y `async/await`.

## Páginas

| Página | Archivo | Qué hace |
| --- | --- | --- |
| Países | `index.html` | Busca por nombre, filtra por continente y abre el detalle de cada país (capital, idiomas y monedas). |
| Reto de 50 clics | `reto.html` | Al llegar a 50 clics aparece un mensaje de agradecimiento y bendición. |
| Sobre mí | `sobre-mi.html` | Información personal, armada a partir de `modules/perfil.js`. |

## Estructura

```
atlas-paises/
├── index.html
├── reto.html
├── sobre-mi.html
├── styles.css          # animaciones y detalles propios
├── main.js             # página de países: importa los módulos y los inicia
├── reto.js             # página del reto
├── sobre-mi.js         # página "Sobre mí"
└── modules/
    ├── alerts.js       # alertas de la interfaz
    ├── api.js          # peticiones a la API
    ├── cards.js        # tarjetas y esqueletos de carga
    ├── contador.js     # lógica del reto de 50 clics
    ├── layout.js       # encabezado y pie compartidos
    ├── modal.js        # ventana de detalle
    ├── navigation.js   # menú para celular
    ├── perfil.js       # tus datos para la página "Sobre mí"
    └── utils.js        # funciones auxiliares
```

## Cómo abrirlo

Los módulos de JavaScript no funcionan abriendo el archivo con doble clic. Usa la extensión **Live Server** de VS Code:
clic derecho sobre `index.html` y luego **Open with Live Server**.

## Personalizar "Sobre mí"

Edita el objeto `perfil` en `modules/perfil.js` (nombre, bio, habilidades, proyectos y enlaces).
