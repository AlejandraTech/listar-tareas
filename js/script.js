// Verificar si hay tareas almacenadas en el Local Storage al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

// Manejar el evento de envío del formulario para agregar tareas
document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener el valor de la nueva tarea
    const newTaskValue = document.getElementById("newTask").value;

    // Validar que la tarea no esté vacía
    if (newTaskValue.trim() !== "") {
      // Agregar la tarea a la lista
      addTask(newTaskValue);

      // Limpiar el campo de entrada
      document.getElementById("newTask").value = "";

      // Guardar la lista de tareas en el Local Storage
      saveTasks();
    }
  });

// Función para agregar una nueva tarea a la lista
function addTask(taskText) {
  const taskList = document.getElementById("taskList");

  // Crear un nuevo elemento de lista
  const taskItem = document.createElement("li");

  // Agregar la tarea al elemento de lista
  taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete">Eliminar</button>
        <button class="complete">Completar</button>
    `;

  // Manejar el evento de clic en el botón de eliminar
  taskItem.querySelector(".delete").addEventListener("click", function () {
    taskItem.remove();
    saveTasks();
  });

  // Manejar el evento de clic en el botón de completar
  taskItem.querySelector(".complete").addEventListener("click", function () {
    taskItem.classList.toggle("completed");
    saveTasks();
  });

  // Agregar el elemento de lista a la lista principal
  taskList.appendChild(taskItem);
}

// Función para cargar las tareas desde el Local Storage al cargar la página
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = savedTasks;

    // Vincular eventos a las tareas cargadas
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        button.parentElement.remove();
        saveTasks();
      });
    });

    const completeButtons = document.querySelectorAll(".complete");
    completeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        button.parentElement.classList.toggle("completed");
        saveTasks();
      });
    });
  }
}

// Función para guardar las tareas en el Local Storage
function saveTasks() {
  const taskList = document.getElementById("taskList");
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Esperar a que el documento esté completamente cargado
$(document).ready(function () {
  // Manejar el evento de envío del formulario con jQuery
  $("#taskForm").submit(function (event) {
    event.preventDefault();

    // Obtener el valor de la nueva tarea
    const newTaskValue = $("#newTask").val();

    // Validar que la tarea no esté vacía
    if (newTaskValue.trim() !== "") {
      // Agregar la tarea a la lista usando jQuery
      addTask(newTaskValue);

      // Limpiar el campo de entrada
      $("#newTask").val("");

      // Guardar la lista de tareas en el Local Storage
      saveTasks();
    }
  });

  // Función para agregar una nueva tarea a la lista usando jQuery
  function addTask(taskText) {
    const taskList = $("#taskList");

    // Crear un nuevo elemento de lista usando jQuery
    const taskItem = $("<li>")
      .html(
        `
            <span>${taskText}</span>
            <button class="delete">Eliminar</button>
            <button class="complete">Completar</button>
        `
      )
      .appendTo(taskList);

    // Manejar el evento de clic en el botón de eliminar usando jQuery
    taskItem.find(".delete").click(function () {
      taskItem.remove();
      saveTasks();
    });

    // Manejar el evento de clic en el botón de completar usando jQuery
    taskItem.find(".complete").click(function () {
      taskItem.toggleClass("completed");
      saveTasks();
    });
  }

  // Función para cargar las tareas desde el Local Storage al cargar la página
  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const taskList = $("#taskList");
      taskList.html(savedTasks);

      // Vincular eventos a las tareas cargadas usando jQuery
      taskList.find(".delete").click(function () {
        $(this).parent().remove();
        saveTasks();
      });

      taskList.find(".complete").click(function () {
        $(this).parent().toggleClass("completed");
        saveTasks();
      });
    }
  }

  // Función para guardar las tareas en el Local Storage
  function saveTasks() {
    const taskList = $("#taskList");
    localStorage.setItem("tasks", taskList.html());
  }

  // Cargar las tareas al iniciar la aplicación
  loadTasks();
});
