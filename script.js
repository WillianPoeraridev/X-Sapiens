const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
const list = document.getElementById("habit-list");


let habits = JSON.parse(localStorage.getItem("habits")) || [];
 // Estado do app: lista de hábitos persistida no navegador (MVP sem backend).
 // Decisão: localStorage para reduzir escopo e focar em DOM/eventos.
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
    const ok = confirm(`Excluir o hábito "${habit.name}"?`);
    if (!ok) return;

    habits = habits.filter((item) => item.id !== habit.id);
    saveHabits();
    renderHabits();
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";

  editButton.addEventListener("click", () => {
    const nextName = prompt("Editar h\u00e1bito:", habit.name);
    if (nextName === null) return;

    const trimmedName = nextName.trim();
    if (!trimmedName) return;

    habit.name = trimmedName;
    saveHabits();
    renderHabits();
  });

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.appendChild(toggleButton);
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

function renderHabits() {
 // Decisão: renderização "simples" (recria a lista) para manter o código fácil de manter no MVP.
 // Para listas enormes, seria melhor atualizar só o item alterado.

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

 // Decisão: normalizar texto (trim + lower) para evitar duplicados por variação de caixa/espaços.
  const normalized = habitName.toLowerCase();
  const alreadyExists = habits.some(
    (h) => h.name.trim().toLowerCase() === normalized
  );

  if (alreadyExists) {
    alert("Esse hábito já existe na lista.");
    return;
  }

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
