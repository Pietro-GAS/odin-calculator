const body = document.querySelector("body");
const display = document.querySelector(".display");
let displayValue = [];
let currentOperator = "";
let isResult = false;
display.textContent = "0";

// Math functions
function add(a, b) {
    let sum = (a + b)
    return Number(sum.toPrecision(7));
};

function subtract(a, b) {
    let difference = (a - b)
    return Number(difference.toPrecision(7));
};

function multiply(a, b) {
    let mult = (a * b)
    return Number(mult.toPrecision(7));
};

function divide(a, b) {
    let division = (a / b)
    return Number(division.toPrecision(7));
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
            if (b != 0) {
                return divide(a, b)
            } else {
                return "ERR! DIV/0"
            };
            // break;
    };
};

// Button functionality

const numberBtns = document.querySelectorAll("button.number");
const operatorBtns = document.querySelectorAll("button.operator:not(#equal)");
const equalBtn = document.querySelector("#equal");
const backBtn = document.querySelector("#back");
const clearBtn = document.querySelector("#c");
const percentBtn = document.querySelector("#percent");

for (let button of numberBtns) {
    button.addEventListener("click", () => {
        if(display.textContent.length < 9 && !isNaN(+display.textContent) 
            && !isResult && display.textContent != "0") {
            display.textContent = display.textContent.concat(button.textContent);
        } else if (isNaN(+display.textContent) || isResult 
        || display.textContent == "0") {
            display.textContent = button.textContent;
            isResult = false;
        };
    });
};

for (let button of operatorBtns) {
    button.addEventListener("click", () => {
        if (isNaN(display.textContent)) {
            return 0;
        } else if (currentOperator == "") {
            displayValue[0] = Number(display.textContent);
            displayValue[1] = Number(display.textContent);
        } else {
            displayValue[0] = Number(display.textContent);
            displayValue[1] = operate(
                currentOperator, displayValue[1], displayValue[0]
            );       
        };
        display.textContent = button.textContent;        
        currentOperator = button.textContent;
        });
};

equalBtn.addEventListener("click", () => {
    if(currentOperator != "") {
        displayValue[0] = Number(display.textContent);
        displayValue[1] = operate(currentOperator, displayValue[1], displayValue[0]);
        display.textContent = displayValue[1];
        currentOperator = "";
        isResult = true;
    };
});

backBtn.addEventListener("click", () => {
    if(display.textContent.length == 1) {
        display.textContent = "0";
        displayValue[0] = Number(display.textContent);
    } else if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(-1);
        displayValue[0] = Number(display.textContent);
    };
});

clearBtn.addEventListener("click", () => {
    displayValue = [];
    currentOperator = "";
    isResult = false;
    display.textContent = "0";
});

percentBtn.addEventListener("click", () => {
    if (!isNaN(+display.textContent) && display.textContent != "0") {
        displayValue[0] = Number((display.textContent / 100).toPrecision(7));
        display.textContent = displayValue[0];
    };
});