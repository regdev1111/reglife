// ----- Load saved data (or start fresh) -----
let cash = Number(localStorage.getItem("cash")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;
let selectedTask = null;

const cashEl = document.getElementById("cash");
const streakEl = document.getElementById("streak");
const selectedTaskEl = document.getElementById("selectedTask");
const completeBtn = document.getElementById("completeBtn");
const resetBtn = document.getElementById("resetBtn");
const taskButtons = document.querySelectorAll(".task");

function save() {
  localStorage.setItem("cash", String(cash));
  localStorage.setItem("streak", String(streak));
}

function render() {
  cashEl.textContent = `£${cash}`;
  streakEl.textContent = `${streak}`;
  selectedTaskEl.textContent = selectedTask ? selectedTask : "None";
  completeBtn.disabled = !selectedTask;
}

taskButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    taskButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedTask = btn.dataset.task;
    render();
  });
});

completeBtn.addEventListener("click", () => {
  cash += 10;
  streak += 1;
  save();
  render();
});

resetBtn.addEventListener("click", () => {
  cash = 0;
  streak = 0;
  save();
  render();
});

render();
