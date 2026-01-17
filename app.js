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
// ===== 2-Minute Puzzle (Step 3: grid + order tapping, no timer yet) =====

const puzzleGrid = document.getElementById("puzzleGrid");
const puzzleStatus = document.getElementById("puzzleStatus");
const startPuzzleBtn = document.getElementById("startPuzzleBtn");

let puzzleActive = false;
let nextNumber = 1;

function shuffle(array) {
  // Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildPuzzleGrid() {
  puzzleGrid.innerHTML = "";

  const nums = Array.from({ length: 20 }, (_, i) => i + 1);
  shuffle(nums);

  nums.forEach((n) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "puzzle-tile";
    btn.textContent = String(n);

    btn.addEventListener("click", () => {
      if (!puzzleActive) return;

      if (n === nextNumber) {
        btn.classList.add("correct");
        btn.disabled = true;
        nextNumber += 1;

        if (nextNumber === 21) {
          puzzleStatus.textContent = "✅ Puzzle complete! (Timer comes next)";
          puzzleActive = false;
          startPuzzleBtn.disabled = false;
        } else {
          puzzleStatus.textContent = `Good! Next: ${nextNumber}`;
        }
      } else {
        btn.classList.add("wrong");
        setTimeout(() => btn.classList.remove("wrong"), 250);
      }
    });

    puzzleGrid.appendChild(btn);
  });
}

startPuzzleBtn.addEventListener("click", () => {
  puzzleActive = true;
  nextNumber = 1;
  startPuzzleBtn.disabled = true;
  puzzleStatus.textContent = "Go! Tap 1 → 20 in order.";
  buildPuzzleGrid();
});

// Optional: show a grid immediately (not active until Start)
buildPuzzleGrid();
