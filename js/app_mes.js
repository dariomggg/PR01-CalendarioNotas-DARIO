const meses = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const params = new URLSearchParams(window.location.search);
const mes = Number(params.get("mes"));

const tituloMes = document.getElementById('titulo-mes');
const listaNotas = document.getElementById('lista-notas');
const form = document.getElementById('form-nota');
const inputTitulo = document.getElementById('titulo');
const inputDescripcion = document.getElementById('descripcion');
const errores = document.getElementById('errores');

let notas = JSON.parse(localStorage.getItem("notas")) || [];

tituloMes.textContent = "Notas de " + meses[mes];

mostrarNotas();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let titulo = inputTitulo.value.trim();
  let descripcion = inputDescripcion.value.trim();

  if (titulo === "" || descripcion === "") {
    errores.textContent = "Completa todos los campos";
    return;
  }

  errores.textContent = "";

  let nuevaNota = {
    id: Date.now(),
    mes: mes,
    titulo: titulo,
    descripcion: descripcion
  };

  notas.push(nuevaNota);

  localStorage.setItem("notas", JSON.stringify(notas));

  form.reset();
  mostrarNotas();
});

function mostrarNotas() {
  listaNotas.innerHTML = "";

  let hayNotas = false;

  for (let i = 0; i < notas.length; i++) {
    if (Number(notas[i].mes) === mes) {
      hayNotas = true;

      listaNotas.innerHTML += `
        <li>
          <strong>${notas[i].titulo}</strong>
          <p>${notas[i].descripcion}</p>
          <button onclick="editarNota(${notas[i].id})">Editar</button>
          <button onclick="eliminarNota(${notas[i].id})">Eliminar</button>
        </li>
      `;
    }
  }

  if (!hayNotas) {
    listaNotas.textContent = "No hay notas en este mes";
  }
}

function eliminarNota(id) {
  if (confirm("¿Eliminar nota?")) {
    let nuevasNotas = [];

    for (let i = 0; i < notas.length; i++) {
      if (notas[i].id !== id) {
        nuevasNotas.push(notas[i]);
      }
    }

    notas = nuevasNotas;
    localStorage.setItem("notas", JSON.stringify(notas));
    mostrarNotas();
  }
}

function editarNota(id) {
  let nota = null;

  for (let i = 0; i < notas.length; i++) {
    if (notas[i].id === id) {
      nota = notas[i];
    }
  }

  let nuevoTitulo = prompt("Nuevo título", nota.titulo);
  let nuevaDescripcion = prompt("Nueva descripción", nota.descripcion);

  if (nuevoTitulo && nuevaDescripcion) {
    nota.titulo = nuevoTitulo;
    nota.descripcion = nuevaDescripcion;

    localStorage.setItem("notas", JSON.stringify(notas));
    mostrarNotas();
  }
}