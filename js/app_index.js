const meses = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let notas = JSON.parse(localStorage.getItem("notas")) || [];

const calendario = document.getElementById('calendario');
const panelNotas = document.getElementById('panel-notas');
const btnListar = document.getElementById('btn-listar');
const btnLimpiar = document.getElementById('btn-limpiar');

mostrarMeses();

btnListar.addEventListener("click", listarNotas);
btnLimpiar.addEventListener("click", limpiarNotas);

function mostrarMeses() {
  calendario.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    let total = 0;

    for (let n = 0; n < notas.length; n++) {
      if (Number(notas[n].mes) === i) {
        total++;
      }
    }

    let div = document.createElement("div");
    div.className = "mes";

    if (total > 0) {
      div.classList.add("conNotas");
    }

    div.textContent = `
      ${meses[i]}
      ${total} nota${total !== 1 ? "s" : ""}
    `;

    div.addEventListener("click", function () {
      window.location.href = "mes.html?mes=" + i;
    });

    calendario.appendChild(div);
  }
}

function listarNotas() {
  panelNotas.innerHTML = "";

  if (notas.length === 0) {
    panelNotas.textContent = "No hay notas";
    return;
  }

  for (let i = 0; i < notas.length; i++) {
    panelNotas.textContent += `
      ${meses[notas[i].mes]} - ${notas[i].titulo}
    `;
  }
}

function limpiarNotas() {
  if (confirm("¿Eliminar todo?")) {
    localStorage.removeItem("notas");
    notas = [];
    mostrarMeses();
    panelNotas.textContent = "No hay notas";
  }
}