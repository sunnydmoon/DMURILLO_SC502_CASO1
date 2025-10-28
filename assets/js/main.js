// Ejemplo de funciones
function registrar() {
    console.log('Función registrar ejecutada');
}

const mostrar = () => {
    console.log('Función mostrar ejecutada');
}

registrar();
mostrar();


//Intento de datos ingresados del formulario de manera remota
const ESTUDIANTES = [
  { nombre: 'Daniela', apellidos: 'Murillo Delgado', nota: 95 },
  { nombre: 'Joseph', apellidos: 'Sancho Porras', nota: 78 },
  { nombre: 'Elsiel', apellidos: 'Baltonado Serrano', nota: 88 }
];
const CLAVE = 'estudiantes';

function leerEstudiantes() {
  const datos = localStorage.getItem(CLAVE);
  if (datos) {
    return JSON.parse(datos);
  } else {
    return [];
  }
}

function guardarEstudiantes(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

function inicializarDatos() {
  const lista = leerEstudiantes();
  if (lista.length === 0) {
    console.log('Estudiantes sin ingresar');
    guardarEstudiantes(ESTUDIANTES);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada completamente');

  inicializarDatos();

  const form = document.querySelector('#formEstudiante');
  form.addEventListener('submit', manejarFormulario);

  mostrarEstudiantes();
});

//Carga de datos JSON
fetch('data.json')
  .then(res => res.json())
  .then(json => {
    console.log('Datos cargados desde data.json:', json.estudiantes);
    guardarEstudiantes(json.estudiantes);
    mostrarEstudiantes();
  })
  .catch(() => {
    console.log('No se encontró data.json o no se pudo cargar. Se usará la semilla local.');
    inicializarDatos();
    mostrarEstudiantes();
  });

// Función principal para manejar el formulario
function manejarFormulario(evento) {
  evento.preventDefault();
  console.log('Envío del formulario en proceso');

  const form = document.querySelector('#formEstudiante');
  const nombre = form.nombre.value.trim();
  const apellidos = form.apellidos.value.trim();
  const nota = form.nota.value.trim();

  //Lista de estudiantes
  function mostrarEstudiantes() {
  const lista = leerEstudiantes();
  console.log('Lista de estudiantes ingresados:');

  if (lista.length === 0) {
    console.log('No hay registros guardados.');
  } else {
    for (let i = 0; i < lista.length; i++) {
      console.log(`#${i + 1}: ${lista[i].nombre} ${lista[i].apellidos} - Nota: ${lista[i].nota}`);
    }
  }
}

    // Validaciones
    if (nombre === '' || apellidos === '' || nota === '') {
    console.log('Rellene los datos a faltar por favor');
    return;
  }

  if (nota < 0 || nota > 100) {
    console.log('La nota no cumple con los requerimientos, intentelo otra vez');
    return;
  }

  const estudiante = {
    nombre: nombre,
    apellidos: apellidos,
    nota: Number(nota)
  };

  console.log('Nuevo estudiante registrado:', estudiante);

  const registros = leerEstudiantes();
  registros.push(estudiante);
  guardarEstudiantes(registros);

  console.log(`El registro ingresado fue del estudiante: ${estudiante.nombre} ${estudiante.apellidos}, con una nota de ${estudiante.nota}`);

  form.reset();
  mostrarEstudiantes();
}

//Funcion mostrar estudiantes en consola
function mostrarEstudiantes() {
  const lista = leerEstudiantes();
  console.log('Lista de estudiantes almacenados:');

  if (lista.length === 0) {
    console.log('No hay registros guardados.');
  } else {
    for (let i = 0; i < lista.length; i++) {
      console.log(`#${i + 1}: ${lista[i].nombre} ${lista[i].apellidos} - Nota: ${lista[i].nota}`);
    }
  }
}

// Cargar y mostrar los registros almacenados
const cargarEstudiantes = () => {
    console.log('Cargando estudiantes desde localStorage...');
    const registros = JSON.parse(localStorage.getItem('estudiantes')) || [];

    if (registros.length === 0) {
        console.log('No hay estudiantes registrados.');
    } else {
        registros.forEach((est, index) => {
            console.log(`#${index + 1} ➜ ${est.nombre} ${est.apellidos} - Nota: ${est.nota}`);
        });
    }
};