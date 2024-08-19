// Get the elements for display
const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");

// Initialize variables
let currentOperand = "0";
let previousOperand = "";
let operation = undefined;

// Function to update the display
function updateDisplay() {
  currentOperandElement.innerText = currentOperand;
  if (operation != null) {
    previousOperandElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.innerText = "";
  }
}

// Function to append a number
function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand === "0" ? number : currentOperand + number;
}

// Function to choose an operation
function chooseOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
}

// Function to compute the result
function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  operation = undefined;
  previousOperand = "";
}

// Function to clear the calculator
function clear() {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
}

// Add event listeners to buttons
document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clear")) {
      clear();
    } else if (button.classList.contains("operator")) {
      if (button.innerText === "=") {
        compute();
      } else {
        chooseOperation(button.innerText);
      }
    } else {
      appendNumber(button.innerText);
    }
    updateDisplay();
  });
});

// Initial display update
updateDisplay();
