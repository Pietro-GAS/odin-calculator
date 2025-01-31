const body = document.querySelector("body");
const display = document.querySelector(".display");
let displayValue = [];
let currentOperator = "";

// Math functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
            // break;
        case "-":
            return subtract(a, b);
            // break;
        case "*":
            return multiply(a, b);
            // break;
        case "/":
            return divide(a, b);
            // break;
    };
};

// Button functionality

const numberBtns = document.querySelectorAll("button.number");
const operatorBtns = document.querySelectorAll("button.operator:not(#equal)");
const equalBtn = document.querySelector("#equal");

for (let button of numberBtns) {
    button.addEventListener("click", () => {
        if(display.textContent.length < 9 && !isNaN(+display.textContent)) {
            display.textContent = display.textContent.concat(button.textContent);
        } else if (isNaN(+display.textContent)) {
            display.textContent = button.textContent;
        };
    });
};

for (let button of operatorBtns) {
    button.addEventListener("click", () => {
        if (currentOperator == "") {
            displayValue[0] = Number(display.textContent);
            displayValue[1] = Number(display.textContent);
        } else {
            displayValue[0] = Number(display.textContent);
            displayValue[1] = operate(currentOperator, displayValue[1], displayValue[0]);       
        };
        display.textContent = button.textContent;        
        currentOperator = button.textContent;
        });
};