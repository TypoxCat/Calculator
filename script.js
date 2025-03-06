let number1 = '';
let operation = "";
let number2 = '';
let inputNumber;
let step = 'a';
let error = 0;
const screen = document.querySelector(".display");
// Query buttons
const btn = document.querySelectorAll("button");

// Handle button clicks
btn.forEach((btn) => btn.addEventListener("click", () => {
    if (btn.classList.contains("clear")) {
        reset();
    }
    if (btn.classList.contains("delete")) {
        del();
    }

    if (error == 1){
        reset();
    }
    // Handle step a
    if (step == 'a') {
        switch (btn.classList.toString()) {
            case "num":
                number1 = updateNumber(btn.textContent, operation);
                console.log(number1);
                display(number1, operation, number2);
                break;
            case "operator":
                if (number1 != '') {
                    operation = btn.id;
                    display(number1, operation, number2);
                    step = 'b'; // Move to step b
                }
                break;
        }
    } 
    // Handle step b
    else if (step == 'b') {
        switch (btn.classList.toString()) {
            case "operator":
                if (operation !== btn.id && operation != '') { // Update the operation only if it's different
                    display(number1, btn.textContent, number2); // Display new operator on the screen
                }
                operation = btn.id;
                break;
            case "num":
                if (operation != "" ) {
                    number2 = updateNumber(btn.textContent, operation);
                } 
                // else {
                //     number1 = updateNumber(btn.textContent, operation);
                //     step = 'a';
                // }
                break;
            case "equal":
                let result = operate(Number(number1), operation, Number(number2));
                displayResult(result);
                number1 = result;
                step = 'c'; // Move to step c
                break;
        }
    } 
    // Handle step c
    else if (step == 'c') {
        switch (btn.classList.toString()) {
            case "operator":
                operation = btn.id;
                number2 = ''
                display(number1, operation, number2);
                step = 'b'; // Move back to step b
                break;
            case "num":
                inputNumber = btn.textContent;
                number2 = inputNumber;
                display(number1, operation, number2);
                step = 'b';
        }
    }
    console.log(`${number1} ${number2} ${operation} ${step}`);
}));

// Operate function to calculate the result
function operate(num1, opr, num2) {
    let result;
    switch (opr) {
        case "+":
            result = addition(num1, num2);
            break;
        case "-":
            result = substraction(num1, num2);
            break;
        case "x":
            result = multiplication(num1, num2);
            break;
        case "/":
            result = division(num1, num2);
            break;
    }
    return result;
}

function addition(a, b) {
    return a + b;
}

function substraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b == 0){
        error = 1;
        return "Nu uh, error";
    }
    return a / b;
}

// Function to update number (detects the operator)
function updateNumber(input, opt) {
    let indexOpt = 0;
    if (opt != "") {
        indexOpt = screen.textContent.indexOf(operation) + 1; // Adjust based on the current operation position
    }
    screen.textContent += input;
    inputNumber = screen.textContent.slice(indexOpt); // Get the number from the screen
    return inputNumber;
}

// Display a number on the screen
function display(num1, opt, num2){
    screen.textContent = screen.textContent.replace(operation, opt);
    screen.textContent = `${num1}${opt}${num2}`
}

// Display the result
function displayResult(val) {

    screen.textContent = val;
}

// Reset the calculator
function reset() {
    screen.textContent = "";
    step = 'a'; // Reset to step a
    number1 = '';
    number2 = '';
    operation = "";
}

// Delete the last character
function del(){
    switch(step){
        case 'a': 
            number1 = number1.toString().slice(0, -1);
            display(number1, operation, number2);
            break;
        case 'b':
            if (number2 != ''){
                number2 = number2.toString().slice(0, -1);
            } else if (operation != ''){
                operation = '';
                step = 'a';
            }
            display(number1, operation, number2);
            break;
        case 'c':
            number2 = '';
            operation = '';
            if (number1 != ''){
                number1 = number1.toString().slice(0, -1);
                step = 'a';
            }
            display(number1, operation, number2);
            break;
    }
}