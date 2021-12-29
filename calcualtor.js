class Calculator {
    constructor(currentElement, historyElement) {
      this.currentElementReference = currentElement;
      this.historyElementReference = historyElement;
      this.resetAll();
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.currentElementReference.innerText = this.current;
      this.historyElementReference.innerText =
        this.history + " " + (this.operator || "");
    }
  
    operatorClicked(operator) {
      this.history = this.current || this.history;
      this.operator = operator;
      this.current = "";
    }
  
    operandClicked(operand) {
        console.log(operand == '.' , this.current.toString().includes('.'))
      if(operand == '.' && this.current.toString().includes('.')){
          return;
      }
      this.current = this.isEqualClicked ? '' : this.current;
      this.isEqualClicked = false;
      this.current = this.current.toString() + operand.toString();
    }
  
    formatNumber(num) {
      return num;
    }
  
    doOperation(operator) {}
  
    calculate(operand1, operator, operand2) {
      switch (operator) {
        case "+":
          return +operand1 + +operand2;
          break;
        case "−":
          return +operand1 - +operand2;
          break;
        case "×":
          return +operand1 * +operand2;
          break;
        case "÷":
          return +operand1 / +operand2;
          break;
        case "%":
          return +operand1 % +operand2;
          break;
        default:
          NaN;
      }
    }
  
    equalsClick() {
      if (this.history) {
        this.current = this.calculate(this.history, this.operator, this.current);
        this.history = "";
        this.operator = "";
      }
      this.isEqualClicked = true;
    }
  
    resetAll() {
      this.current = "";
      this.history = "";
      this.operator = "";
    }
  
    backspace() {
      console.log(this.current);
      this.current = this.current.toString().slice(0, -1);
    }
  }
  
  const btnAllClear = document.querySelector(
    ".calculator--button[data-all-clear]"
  );
  const btnDelete = document.querySelector(".calculator--button[data-delete]");
  const operands = document.querySelectorAll(".calculator--button[data-operand]");
  const operators = document.querySelectorAll(
    ".calculator--button[data-operator]"
  );
  const btnEquals = document.querySelector(".calculator--button[data-equals]");
  
  const historyElement = document.querySelector(".calculator--display .history");
  const currentElement = document.querySelector(".calculator--display .current");
  
  const calculator = new Calculator(currentElement, historyElement);
  
  btnAllClear.addEventListener("click", () => {
    calculator.resetAll();
    calculator.updateDisplay();
  });
  
  btnDelete.addEventListener("click", () => {
    calculator.backspace();
    calculator.updateDisplay();
  });
  
  operands.forEach((operand) => {
    operand.addEventListener("click", () => {
      calculator.operandClicked(operand.dataset.operand);
      calculator.updateDisplay();
    });
  });
  
  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      //console.log(operator.dataset.operator);
      calculator.operatorClicked(operator.dataset.operator);
      calculator.updateDisplay();
    });
  });
  
  btnEquals.addEventListener("click", () => {
    calculator.equalsClick();
    calculator.updateDisplay();
  });