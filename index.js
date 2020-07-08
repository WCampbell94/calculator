class Calculator {
	constructor(previousOperandText, currentOperandText) {
		this.previousOperandText = previousOperandText;
		this.currentOperandText = currentOperandText;
		this.reset = false;
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
		this.previousOperation = undefined;
		this.thirdNum = "";
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.operation !== undefined) {
			if (operation === "+" || operation === "-") {
				this.previousOperand = this.operate(
					this.operation,
					this.previousOperand,
					this.currentOperand
				);
			} else if (operation === "x" || operation === "÷") {
				if (this.thirdNum && this.previousOperation) {
					this.operate(
						this.operation,
						this.previousOperand,
						this.currentOperand
					);
				} else {
					// Hold on to the previous item and operation to prefrom after this
					this.thirdNum = this.previousOperand;
					this.previousOperation = this.operation;
				}
				this.operation = operation;
			}
		}

		this.previousOperand = this.currentOperand;
		this.operation = operation;
		this.currentOperand = "";
		calculator.updateDisplay();
	}

	//checkEntryLog() {}
	//x = this.previousOperand y= this.currentOperand
	operate(op, x, y) {
		let computation;
		const previous = parseFloat(x);
		const current = parseFloat(y);
		if (isNaN(previous) || isNaN(current)) return;
		switch (op) {
			case "+":
				computation = previous + current;
				break;
			case "-":
				computation = previous - current;
				break;
			case "x":
				computation = previous * current;
				break;
			case "÷":
				computation =
					current != 0 ? previous / current : alert("Trying to divide by 0???");

				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.reset = true;
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString().split(".");
		const intNumber = parseFloat(stringNumber[0]);
		const decimalNumber = stringNumber[1];
		let integerDisplay;
		if (isNaN(intNumber)) {
			integerDisplay = "";
		} else {
			integerDisplay = intNumber.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalNumber != null) {
			return `${integerDisplay}.${decimalNumber}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandText.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation !== undefined) {
			this.previousOperandText.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else this.previousOperandText.innerText = "";
	}
}

const numbersBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const acBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const viewLog = document.createElement("p");
document.body.appendChild(viewLog);

const calculator = new Calculator(previousOperandText, currentOperandText);
calculator.clear();

function Delete() {
	calculator.delete();
	calculator.updateDisplay();
}

function Clear() {
	calculator.clear();
	calculator.updateDisplay();
}

function Compute() {
	calculator.operate(
		calculator.operation,
		calculator.previousOperand,
		calculator.currentOperand
	);
	if (calculator.thirdNum && calculator.previousOperation) {
		calculator.operate(
			calculator.previousOperation,
			calculator.thirdNum,
			calculator.currentOperand
		);
	}
	calculator.updateDisplay();
}

numbersBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (
			calculator.previousOperand === "" &&
			calculator.currentOperand !== "" &&
			calculator.reset
		) {
			calculator.currentOperand = "";
			calculator.reset = false;
		}
		calculator.appendNumber(btn.innerText);
		calculator.updateDisplay();
	});
});

operationBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculator.chooseOperation(btn.innerText);
	});
});

acBtn.addEventListener("click", Clear);

deleteBtn.addEventListener("click", Delete);

equalsBtn.addEventListener("click", Compute);

window.addEventListener("keydown", (e) => {
	e.preventDefault();
	if (e.keyCode === 13) {
		Compute();
	}
	if (e.keyCode === 8) {
		Delete();
	}
	if (e.keyCode === 27) {
		Clear();
	}
	if (!isNaN(e.key) || e.key === ".") {
		calculator.appendNumber(e.key);
		calculator.updateDisplay();
	}
	if (event.key === "-") {
		calculator.chooseOperation(e.key);
	}
	if (event.key === "*" || event.key === "x") {
		calculator.chooseOperation("x");
	}
	if (event.key === "+") {
		calculator.chooseOperation(e.key);
	}
	if (event.key === "/") {
		calculator.chooseOperation("÷");
	}
});
//What a good calculatore does to follow Order of Opersations
//first two operands held pending execution
// if next entry is equals then compute
//if not check what operator was used
// 6 + 3... waiting for next input
// enters + or - then 6 + 3 evaluates this is associative property being invoked
// enters X or / then 6 + 3 waits for next number and
// 6 x 3 + 6 x 3 = 18 + 18 = 36
// 6 + 4 / 2 = 8 not 5

// get current operand
//get operation
// get second operand
// get second operation
// if second operation = + || -  then first operand = result
// new first operand +/- second
