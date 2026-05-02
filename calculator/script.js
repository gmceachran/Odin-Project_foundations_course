(function () {
  const displayEl = document.getElementById('display');

  let displayValue = '0';

  let firstNumber = null;
  let chosenOperator = null;

  let waitingForNewOperand = false;
  let typedSecondOperand = false;
  let justPressedEquals = false;

  let divideByZeroJokeMode = false;

  const DIV_BY_ZERO_TOKEN = {};

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) {
      return DIV_BY_ZERO_TOKEN;
    }
    return a / b;
  }

  function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        return b;
    }
  }

  function formatForScreen(value) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return String(value);
    }
    let n = Math.round(value * 1e8) / 1e8;
    let s = n.toString();
    if (s.length > 14) {
      s = Number(n.toPrecision(10)).toString();
    }
    return s;
  }

  function paintDisplay() {
    displayEl.textContent = divideByZeroJokeMode
      ? '∞? Try again, hotshot'
      : displayValue;
  }

  function resetAll() {
    displayValue = '0';
    firstNumber = null;
    chosenOperator = null;
    waitingForNewOperand = false;
    typedSecondOperand = false;
    justPressedEquals = false;
    divideByZeroJokeMode = false;
    paintDisplay();
  }

  function readDisplayNumber() {
    const n = parseFloat(displayValue);
    return Number.isNaN(n) ? 0 : n;
  }

  function pressDigit(digit) {
    if (divideByZeroJokeMode) return;

    if (justPressedEquals) {
      displayValue = digit;
      firstNumber = null;
      chosenOperator = null;
      typedSecondOperand = false;
      waitingForNewOperand = false;
      justPressedEquals = false;
      paintDisplay();
      return;
    }

    if (waitingForNewOperand) {
      displayValue = digit;
      waitingForNewOperand = false;
      typedSecondOperand = true;
      paintDisplay();
      return;
    }

    if (displayValue === '0' && digit !== '0') {
      displayValue = digit;
    } else if (displayValue === '0' && digit === '0') {
      return;
    } else {
      displayValue += digit;
    }
    paintDisplay();
  }

  function pressOperator(nextOp) {
    if (divideByZeroJokeMode) return;

    const inputValue = readDisplayNumber();

    if (firstNumber === null) {
      firstNumber = inputValue;
    } else if (chosenOperator && typedSecondOperand) {
      const next = operate(chosenOperator, firstNumber, inputValue);
      if (next === DIV_BY_ZERO_TOKEN) {
        divideByZeroJokeMode = true;
        paintDisplay();
        return;
      }
      firstNumber = next;
      displayValue = formatForScreen(next);
      paintDisplay();
    }

    chosenOperator = nextOp;
    waitingForNewOperand = true;
    typedSecondOperand = false;
    justPressedEquals = false;
  }

  function pressEquals() {
    if (divideByZeroJokeMode) return;
    if (chosenOperator === null || firstNumber === null) return;
    if (!typedSecondOperand) return;

    const secondNumber = readDisplayNumber();
    const result = operate(chosenOperator, firstNumber, secondNumber);

    if (result === DIV_BY_ZERO_TOKEN) {
      divideByZeroJokeMode = true;
      paintDisplay();
      return;
    }

    displayValue = formatForScreen(result);
    firstNumber = null;
    chosenOperator = null;
    typedSecondOperand = false;
    waitingForNewOperand = true;
    justPressedEquals = true;
    paintDisplay();
  }

  document.querySelector('.calculator').addEventListener('click', function (event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const number = target.getAttribute('data-number');
    if (number !== null) {
      pressDigit(number);
      return;
    }

    const op = target.getAttribute('data-operator');
    if (op !== null) {
      pressOperator(op);
      return;
    }

    const action = target.getAttribute('data-action');
    if (action === 'clear') {
      resetAll();
    } else if (action === 'equals') {
      pressEquals();
    }
  });

  window.calculator = { add, subtract, multiply, divide, operate };

  resetAll();
})();
