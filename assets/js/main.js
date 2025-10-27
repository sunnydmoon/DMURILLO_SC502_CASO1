console.log('saludo:', saludo);
console.log('nombre:', nombre);
console.log('curso:', curso);
console.log('institución:', institucion);

// Ejemplo de funciones
function registrar() {
    console.log('Función registrar ejecutada');
}

const mostrar = () => {
    console.log('Función mostrar ejecutada');
}

registrar();
mostrar();

// Esperar que el DOM cargue
document.addEventListener("DOMContentLoaded", async function () {
    console.log('Mi página terminó de cargar');

    // Intentar cargar data.json solo si el localStorage está vacío
    if (!localStorage.getItem('estudiantes')) {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            localStorage.setItem('estudiantes', JSON.stringify(data.estudiantes));
            console.log('Se cargó data.json (estructura inicial).');
        } catch (error) {
            console.log('No se pudo cargar data.json:', error);
        }
    }

    // Referencia al formulario
    const form = document.querySelector('#formEstudiante');
    form.addEventListener('submit', submitFormulario);

    // Cargar registros almacenados al inicio
    cargarEstudiantes();
});

// Función principal para manejar el formulario
const submitFormulario = (event) => {
    event.preventDefault();
    console.log('Evento submit del formulario ejecutado');

    const form = document.querySelector('#formEstudiante');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Datos obtenidos del formulario:', data);
    // Validaciones básicas
     if (!data.nombre || !data.apellidos || !data.nota) {
        console.log('Error: Debe completar todos los campos antes de registrar.');
        return;
    }

    if (data.nota < 0 || data.nota > 100) {
        console.log('Error: La nota debe estar entre 0 y 100.');
        return;
    }

    // Crear objeto estudiante
    const estudiante = {
        nombre: data.nombre,
        apellidos: data.apellidos,
        nota: Number(data.nota)
    };

    console.log('Estudiante creado:', estudiante);

    // Guardar en localStorage
    let registros = JSON.parse(localStorage.getItem('estudiantes')) || [];
    registros.push(estudiante);
    localStorage.setItem('estudiantes', JSON.stringify(registros));

    console.log(`El estudiante ${estudiante.nombre} ${estudiante.apellidos} fue registrado correctamente.`);

    form.reset();

    // Mostrar lista actualizada en consola
    cargarEstudiantes();
};

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