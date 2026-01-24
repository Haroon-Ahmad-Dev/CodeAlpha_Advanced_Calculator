const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let input = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.textContent));
});

function handleInput(value) {

  if (value === "AC") {
    input = "";
    updateDisplay("");
    return;
  }

  if (value === "DEL") {
    input = input.slice(0, -1);
    updateDisplay(input);
    return;
  }

  if (value === "=") {
    try {
      const result = eval(
        input.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
      );
      input = result.toString();
      updateDisplay(input);
    } catch {
      updateDisplay("Error");
      input = "";
    }
    return;
  }

  input += value;
  updateDisplay(input);
}

/* Keyboard Support */
document.addEventListener("keydown", e => {
  const map = {
    "*": "×",
    "/": "÷",
    "-": "−",
    "+": "+",
    "Enter": "=",
    "Backspace": "DEL",
    "Escape": "AC"
  };

  if (!isNaN(e.key) || e.key === ".") handleInput(e.key);
  else if (map[e.key]) handleInput(map[e.key]);
});
