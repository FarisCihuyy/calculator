const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
  document.getElementById("toggle-circle").classList.toggle("active");

  document.documentElement.classList.toggle("dark");
});

const display = document.getElementById("display");

document.addEventListener("keydown", (e) => {
  const key = e.key;
  //regex untuk memastikan key = angka 0-9
  if (/^\d$/.test(key)) {
    if (display.value === "0") {
      display.value = key;
      return;
    }
    if (display.value.length >= 10 && display.value.length <= 15) {
      display.style.fontSize = "2rem";
    } else if (display.value.length > 15) {
      console.log("lebih dari 15");
      return;
    }
    display.value += key;
  } else if (/^[+\-*/]$/.test(key)) {
    display.value += key;
  } else if (key === ".") {
    display.value += key;
  } else if (key === "Enter" || key === "=") {
    try {
      document.getElementById("expression").value += `${display.value} =\n`;
      // eslint-disable-next-line no-eval
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
    if (display.value.length < 1) {
      display.value = "0";
      document.getElementById("expression").value = "";
    }
  }
});
