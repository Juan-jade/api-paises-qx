// EDITA AQUÍ tus datos. La página "Sobre mí" se arma a partir de este objeto.

export const perfil = {
  nombre: 'Juan Pablo Gomez Cardona',
  rol: 'Estudiante de desarrollo de software',
  bio: 'Estudiante del semillero de quipux, me gusta aprender nuevas cosas.',
  habilidades: ['HTML5', 'CSS', 'Tailwind CSS', 'JavaScript', 'Java', 'Spring Boot', 'MySQL', 'SQL', 'Git y GitHub'],
  proyectos: [
    { nombre: 'Sistema académico UCO', detalle: 'Backend con Spring Boot, Java y MySQL, documentado con Swagger. Incluye paneles de estudiante y profesor.' },
    { nombre: 'Pharmabrisa', detalle: 'Proyecto web con páginas HTML y hojas de estilo CSS organizadas por cada página.' },
    { nombre: 'Ejercicios SQL (quipux_db)', detalle: 'Consultas SELECT, UPDATE y DELETE sobre las tablas de estudiantes y materias.' },
    { nombre: 'Atlas: explorador de países', detalle: 'Este proyecto: HTML, Tailwind y módulos de JavaScript conectados a una API pública.' }
  ],
  enlaces: [
    { texto: 'Mi GitHub', href: 'https://github.com/Juan-jade' }
  ]
};
