// INICIALIZACIÓN

document.addEventListener("DOMContentLoaded", function () { // evento: DOMContentLoaded
  cargarProyectos();

  document.getElementById("btnNuevoProyecto").addEventListener("click", function () { // evento: click
    agregarProyecto();
  });

  document.getElementById("nombreProyecto").addEventListener("keydown", function (event) { // evento: keydown
    if (event.key === "Enter") agregarProyecto();
  });
});


// LOCAL STORAGE

function obtenerProyectos() { // función: leer localStorage
  return JSON.parse(localStorage.getItem("proyectos") || "[]"); // JSON.parse
}

function guardarProyectos(proyectos) { // función: guardar localStorage
  localStorage.setItem("proyectos", JSON.stringify(proyectos)); // JSON.stringify
}


// CRUD PROYECTOS

function agregarProyecto() { // función: crear proyecto
  var input = document.getElementById("nombreProyecto"); // DOM: getElementById
  var nombre = input.value.trim(); // método: trim()
  if (nombre === "") return;

  var proyectos = obtenerProyectos();

  proyectos.push({ // método de arreglo: push()
    nombre: nombre,
    miembros: [],
    tareas: []
  });

  guardarProyectos(proyectos);
  input.value = "";
  cargarProyectos();
}

function eliminarProyecto(index) { // función: eliminar proyecto
  var proyectos = obtenerProyectos();
  proyectos.splice(index, 1); // método de arreglo: splice()
  guardarProyectos(proyectos);
  cargarProyectos();
}


// CRUD MIEMBROS

function agregarMiembro(indexProyecto) { // función: crear miembro
  var input = document.getElementById("miembro-" + indexProyecto);
  var nombre = input.value.trim();
  if (nombre === "") return;

  var proyectos = obtenerProyectos();
  proyectos[indexProyecto].miembros.push(nombre); // método de arreglo: push()

  guardarProyectos(proyectos);
  input.value = "";
  cargarProyectos();
}

function eliminarMiembro(indexProyecto, indexMiembro) { // función: eliminar miembro
  var proyectos = obtenerProyectos();
  var miembroEliminado = proyectos[indexProyecto].miembros[indexMiembro];
  proyectos[indexProyecto].miembros.splice(indexMiembro, 1); // método de arreglo: splice()

  proyectos[indexProyecto].tareas.forEach(function (tarea) { // método de arreglo: forEach()
    if (tarea.responsable === miembroEliminado) {
      tarea.responsable = "";
    }
  });

  guardarProyectos(proyectos);
  cargarProyectos();
}


// CRUD TAREAS

function agregarTarea(indexProyecto) { // función: crear tarea
  var inputNombre = document.getElementById("nombreTarea-" + indexProyecto);
  var selectResponsable = document.getElementById("responsableTarea-" + indexProyecto);
  var nombre = inputNombre.value.trim();
  if (nombre === "") return;

  var proyectos = obtenerProyectos();

  proyectos[indexProyecto].tareas.push({ // método de arreglo: push()
    nombre: nombre,
    responsable: selectResponsable.value, // atributo: .value del <select>
    completada: false
  });

  guardarProyectos(proyectos);
  inputNombre.value = "";
  cargarProyectos();
}

function toggleTarea(indexProyecto, indexTarea) { // función: actualizar tarea
  var proyectos = obtenerProyectos();
  proyectos[indexProyecto].tareas[indexTarea].completada =
    !proyectos[indexProyecto].tareas[indexTarea].completada; // operador: negación (!)
  guardarProyectos(proyectos);
  cargarProyectos();
}

function eliminarTarea(indexProyecto, indexTarea) { // función: eliminar tarea
  var proyectos = obtenerProyectos();
  proyectos[indexProyecto].tareas.splice(indexTarea, 1); // método de arreglo: splice()
  guardarProyectos(proyectos);
  cargarProyectos();
}


// RENDERIZADO

function cargarProyectos() { // función: renderizar proyectos
  var contenedor = document.getElementById("listaProyectos");
  contenedor.innerHTML = ""; // DOM: limpiar contenido
  var proyectos = obtenerProyectos();

  if (proyectos.length === 0) {
    contenedor.innerHTML = '<p class="vacio">No hay proyectos aún. ¡Crea uno!</p>';
    return;
  }

  var tmplProyecto = document.getElementById("template-proyecto"); // DOM: obtener template
  var tmplMiembro = document.getElementById("template-miembro");
  var tmplTarea = document.getElementById("template-tarea");

  proyectos.forEach(function (proyecto, i) { // método de arreglo: forEach()

    var card = tmplProyecto.content.cloneNode(true); // DOM: clonar template

    card.querySelector(".proyecto-nombre").textContent = proyecto.nombre; // DOM: querySelector + textContent

    card.querySelector(".btn-eliminar-proyecto").onclick = function () { // evento: onclick
      eliminarProyecto(i);
    };

    var inputMiembro = card.querySelector(".input-miembro");
    inputMiembro.id = "miembro-" + i; // atributo: id dinámico
    card.querySelector(".btn-agregar-miembro").onclick = function () {
      agregarMiembro(i);
    };

    var listaMiembros = card.querySelector(".lista-miembros");
    proyecto.miembros.forEach(function (miembro, j) {
      var li = tmplMiembro.content.cloneNode(true); // DOM: clonar template
      li.querySelector(".miembro-nombre").textContent = miembro;
      li.querySelector(".btn-eliminar-miembro").onclick = function () {
        eliminarMiembro(i, j);
      };
      listaMiembros.appendChild(li); // DOM: appendChild
    });

    var select = card.querySelector(".select-responsable");
    proyecto.miembros.forEach(function (m) {
      var opt = document.createElement("option"); // DOM: createElement
      opt.value = m;
      opt.textContent = m;
      select.appendChild(opt);
    });

    var inputTarea = card.querySelector(".input-tarea");
    inputTarea.id = "nombreTarea-" + i;
    select.id = "responsableTarea-" + i;
    card.querySelector(".btn-agregar-tarea").onclick = function () {
      agregarTarea(i);
    };

    var listaTareas = card.querySelector(".lista-tareas");
    proyecto.tareas.forEach(function (tarea, k) {
      var li = tmplTarea.content.cloneNode(true);
      var liEl = li.querySelector("li");

      if (tarea.completada) liEl.classList.add("tarea-completada"); // DOM: classList.add

      var checkbox = li.querySelector(".checkbox-tarea");
      checkbox.checked = tarea.completada; // atributo: checked
      checkbox.onchange = function () { // evento: onchange
        toggleTarea(i, k);
      };

      li.querySelector(".nombre-tarea").textContent = tarea.nombre;

      var badge = li.querySelector(".badge-responsable");
      if (tarea.responsable) {
        badge.textContent = tarea.responsable;
      } else {
        badge.textContent = "Sin asignar";
        badge.classList.add("sin-asignar"); // DOM: classList.add
      }

      li.querySelector(".btn-eliminar-tarea").onclick = function () {
        eliminarTarea(i, k);
      };
      listaTareas.appendChild(li);
    });

    contenedor.appendChild(card); // DOM: appendChild
  });
}
