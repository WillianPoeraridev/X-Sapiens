const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
const list = document.getElementById("habit-list");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderEmptyState() {
  let emptyState = document.getElementById("empty-state");

  if (!emptyState) {
    emptyState = document.createElement("p");
    emptyState.id = "empty-state";
    emptyState.className = "empty-state";
    emptyState.textContent =
      "Nenhum hábito ainda. Adicione o primeiro 👆";
    form.insertAdjacentElement("afterend", emptyState);
  }

  emptyState.style.display = habits.length === 0 ? "block" : "none";
}

function renderHabitItem(habit) {
  const li = document.createElement("li");
  li.className = habit.done ? "done" : "";

  const span = document.createElement("span");
  span.textContent = habit.name;

  const toggleButton = document.createElement("button");
  toggleButton.textContent = habit.done ? "Desmarcar" : "Feito hoje";

  toggleButton.addEventListener("click", () => {
    habit.done = !habit.done;
    saveHabits();
    renderHabits();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";
  deleteButton.className = "danger";

  deleteButton.addEventListener("click", () => {
    habits = habits.filter((item) => item.id !== habit.id);
    saveHabits();
    renderHabits();
  });

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.appendChild(toggleButton);
  actions.appendChild(deleteButton);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

function renderHabits() {
  list.innerHTML = "";
  renderEmptyState();

  habits.forEach((habit) => {
    list.appendChild(renderHabitItem(habit));
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const habitName = input.value.trim();
  if (!habitName) return;

  habits.push({
    id: Date.now(),
    name: habitName,
    done: false,
  });

  input.value = "";
  saveHabits();
  renderHabits();
});

renderHabits();
