let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');

// Load tasks from localStorage
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.done));
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task.");

  createTaskElement(taskText, false);
  saveTasks();
  taskInput.value = "";
}

function createTaskElement(text, done) {
  const li = document.createElement("li");
  if (done) li.classList.add("done");

  li.innerHTML = `
    <span onclick="toggleDone(this)">${text}</span>
    <button onclick="deleteTask(this)">X</button>
  `;
  taskList.appendChild(li);
}

function toggleDone(span) {
  span.parentElement.classList.toggle("done");
  saveTasks();
}

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}