//DOM manipulation

//Calculator operation
memory = [];
function operate(operation, x, y = memory[-1]) {
	memory += operation(x, y);
	return memory[0];
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
	return y != 0
		? x / y
		: "I know you arent trying to divide by zero on MY CALCULATOR???";
}

function clear() {
	memory = [];
}
console.log(operate(add, 2, 3));
console.log(operate(add, 2, 3));
console.log(memory);

clear();
console.log(memory);
