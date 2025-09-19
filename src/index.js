const themeToggleBtn = document.getElementById("theme-toggle");
const display = document.getElementById("display");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll(".btn");

// 🔹 fungsi utama untuk handle input (baik tombol/keyboard)
function handleInput(value) {
  // Clear
  if (value === "C") {
    display.value = "0";
    expression.value = "";
    display.style.fontSize = "3.75rem";
    return;
  }

  // Plus/minus toggle
  if (value === "+/-") {
    if (expression.value) expression.value = "";

    if (display.value !== "0") {
      display.value = display.value.startsWith("-")
        ? display.value.slice(1)
        : `-${display.value}`;
    }

    return;
  }

  // Persen
  if (value === "%") {
    if (display.value !== "0" && display.value !== "") {
      expression.value = display.value + "%";
      display.value = display.value / 100;
    }
    return;
  }

  // Sama dengan (= / Enter)
  if (value === "=" || value === "Enter") {
    try {
      if (display.value === "0" && expression.value === "") return;
      expression.value = `${display.value}`;
      // eslint-disable-next-line no-eval
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
    return;
  }

  // Backspace
  if (value === "Backspace") {
    display.value = display.value.slice(0, -1);
    if (!display.value.length) {
      display.value = "0";
      expression.value = "";
    }
    return;
  }

  // 🔹 Angka
  if (/^\d$/.test(value)) {
    if (display.value === "0") {
      display.value = value;
    } else {
      // atur font-size kalau panjang teks
      if (display.value.length >= 10 && display.value.length <= 15) {
        display.style.fontSize = "2rem";
      } else if (display.value.length > 15) {
        return; // stop kalau lebih dari 15 digit
      }
      display.value += value;
    }
    return;
  }

  // 🔹 Operator
  if (/^[+\-*/]$/.test(value)) {
    if (display.value === "0" && value === "-") {
      display.value = "-"; // izinkan negatif awal
      return;
    }

    if (/[+\-*/]$/.test(display.value)) {
      if (!(display.value.length === 1 && display.value === "-")) {
        display.value = display.value.slice(0, -1);
      }
    }
    display.value += value;
    return;
  }

  // 🔹 Titik desimal
  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      display.value += value;
    }
    return;
  }
}

// ========== Event Binding ==========

// toggle dark mode
themeToggleBtn.addEventListener("click", () => {
  document.getElementById("toggle-circle").classList.toggle("active");
  document.documentElement.classList.toggle("dark");
});

// handle klik button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    handleInput(value);
  });
});

// handle keyboard
document.addEventListener("keydown", (e) => {
  handleInput(e.key);
});
