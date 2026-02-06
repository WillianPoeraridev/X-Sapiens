const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
const list = document.getElementById("habit-list");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  list.innerHTML = "";

  habits.forEach((habit) => {
    const li = document.createElement("li");
    li.className = habit.done ? "done" : "";

    const span = document.createElement("span");
    span.textContent = habit.name;

    const button = document.createElement("button");
    button.textContent = habit.done ? "Desmarcar" : "Feito hoje";

    button.addEventListener("click", () => {
      habit.done = !habit.done;
      saveHabits();
      renderHabits();
    });

    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
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
