let cash = 0;
let streak = 0;
let selectedTask = null;

const cashEl = document.getElementById("cash");
const streakEl = document.getElementById("streak");
const selectedTaskEl = document.getElementById("selectedTask");
const completeBtn = document.getElementById("completeBtn");
const taskButtons = document.querySelectorAll(".task");

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
  // simple rewards for now
  cash += 10;
  streak += 1;

  // keep the selected task (so you can tap Complete repeatedly)
  render();
});

render();
