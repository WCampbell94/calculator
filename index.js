//DOM manipulation
const displayText = document.querySelector("p");

//Calculator operation
let operationMemory = [];
let inputs = "";
let result = 0;

function operate(operation, x, y = operationMemory[-1]) {
	result = operation(x, y);
	displayText.textContent = `${result}`;
}

function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return y != 0 ? x / y : "Trying to divide by zero??";
}

function clear() {
	operationMemory = [];
}

// Handles number inputs
document.querySelector(".numbers").addEventListener("click", (e) => {
	displayText.textContent += `${e.target.textContent}`;
	if (e.target.textContent == "Clear") {
		inputs = "";
	} else inputs += e.target.textContent;
	console.log(inputs);
	console.log(operationMemory);
});

document.querySelector(".functions").addEventListener("click", (e) => {
	if (inputs != "") {
		operationMemory.push(parseInt(inputs));
	}

	displayText.textContent += ` ${e.target.textContent} `;
	if (e.target.textContent == "+") {
		operationMemory.push("+");
		inputs = "";
		console.log(operationMemory);
	} else if (e.target.textContent == "-") {
		operationMemory.push("-");
		inputs = "";
		console.log(operationMemory);
	} else if (e.target.textContent == "X") {
		operationMemory.push("x");
		inputs = "";
		console.log(operationMemory);
	} else if (e.target.textContent == "/") {
		operationMemory.push("/");
		inputs = "";
		console.log(operationMemory);
	} else if (e.target.textContent == "=") {
		console.log(operationMemory);
		if (operationMemory[1] == "+") {
			operate(add, operationMemory[0], operationMemory[2]);
			operationMemory = [result];
		}
		if (operationMemory[1] == "-") {
			operate(subtract, operationMemory[0], operationMemory[2]);
			operationMemory = [result];
		}
		if (operationMemory[1] == "x") {
			operate(multiply, operationMemory[0], operationMemory[2]);
			operationMemory = [result];
		}
		if (operationMemory[1] == "/") {
			operate(divide, operationMemory[0], operationMemory[2]);
			operationMemory = [result];
		}
		inputs = "";
	} else {
		displayText.textContent = "";
		inputs = "";
		operationMemory = [];
		result = 0;
	}
});
//operationMemory[operationMemory.length - 1] == "Clear" ||
