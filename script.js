const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
const list = document.getElementById("habit-list");

let currentFilter = "all";
let habits = JSON.parse(localStorage.getItem("habits")) || []; // Carrega hábitos do localStorage ou inicia com lista vazia.

const filterButtons = document.querySelectorAll(".filter");

function updateStats() {
  const total = habits.length;
  const doneCount = habits.filter((h) => h.done).length;
  const pendingCount = total - doneCount;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  const totalEl = document.getElementById("stat-total");
  const pendingEl = document.getElementById("stat-pending");
  const doneEl = document.getElementById("stat-done");
  const percentEl = document.getElementById("stat-percent");
  const barEl = document.getElementById("stat-progressbar");

  // Se o painel ainda não existir no DOM, não faz nada (seguro para MVP).
  if (!totalEl || !pendingEl || !doneEl || !percentEl || !barEl) return;

  totalEl.textContent = String(total);
  pendingEl.textContent = String(pendingCount);
  doneEl.textContent = String(doneCount);
  percentEl.textContent = `${percent}%`;

  barEl.style.width = `${percent}%`;

  const progress = document.querySelector(".progress");
  if (progress) progress.setAttribute("aria-valuenow", String(percent));
}

function setActiveFilterButton() {
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === currentFilter);
  });
}  // Decisão: usar dataset para associar cada botão ao seu filtro, facilitando a manutenção e evitando hardcoding.

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    setActiveFilterButton();
    renderHabits();
  });
});

function getVisibleHabits() {
  if (currentFilter === "pending") return habits.filter((h) => !h.done);
  if (currentFilter === "done") return habits.filter((h) => h.done);
  return habits;
}

// Estado do app: lista de hábitos persistida no navegador (MVP sem backend).
// Decisão: localStorage para reduzir escopo e focar em DOM/eventos.
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderEmptyState(visibleCount) {
  let emptyState = document.getElementById("empty-state");

  if (!emptyState) {
    emptyState = document.createElement("p");
    emptyState.id = "empty-state";
    emptyState.className = "empty-state";

    const filtersContainer = document.querySelector(".filters");
    (filtersContainer ?? form).insertAdjacentElement("afterend", emptyState);
  }

  if (visibleCount === 0) {
    emptyState.style.display = "block";

    if (habits.length === 0) {
      emptyState.textContent = "Nenhum hábito ainda. Adicione o primeiro 👆";
      return;
    }

    emptyState.textContent =
      currentFilter === "done"
        ? "Nenhum hábito concluído ainda."
        : currentFilter === "pending"
        ? "Nenhum hábito pendente."
        : "Nenhum hábito para mostrar.";
  } else {
    emptyState.style.display = "none";
  }
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
    const nextName = prompt("Editar hábito:", habit.name);
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
  // Decisão: renderização "simples" (recria a lista) para manter o código fácil no MVP.
  // Para listas enormes, seria melhor atualizar só o item alterado.

  list.innerHTML = "";

  const visibleHabits = getVisibleHabits();
  renderEmptyState(visibleHabits.length);

  visibleHabits.forEach((habit) => {
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

setActiveFilterButton();
renderHabits(console.log("App iniciado"));
