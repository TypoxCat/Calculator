let number1 = '';
let operation = "";
let number2 = '';
let inputNumber;
let step = 'a';
let error = 0;
const screen = document.querySelector(".display");
// Query buttons
const btn = document.querySelectorAll("button");

const dot = document.getElementById("dot");
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
                const input = btn.textContent;
                if (number1.includes(".")){
                    if (btn.textContent == '.'){
                        input = '';
                    }
                }
                number1 = updateNumber(input, operation);
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
                if (number2 != '' && btn.textContent == '%'){
                    screen.textContent = `${number1}${operation}${number2}%`

                }else if (operation !== btn.id && operation != '') { // Update the operation only if it's different
                    display(number1, btn.textContent, number2); // Display new operator on the screen
                    operation = btn.id;
                }
                break;
            case "num":
                if (operation != '' ) {
                    const input = btn.textContent;
                    if (number2.includes(".")){
                        if (btn.textContent == '.'){
                            input = '';
                    }
                }
                    number2 = updateNumber(input, operation);
                } 
                break;
            case "equal": 
                if (number1 != '' && number2 != '' && operation != ''){
                    let result = operate(Number(number1), operation, Number(number2));
                    result = Number(result.toFixed(3));
                    displayResult(result);
                    number1 = result.toString();
                    step = 'a'; // Move to step c
                }
                operation = '';
                number2 = '';
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
    switch (opr) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "x":
            return num1 * num2;
        case "/":
            if (num2 == 0){
                error = 1;
                return "Nu uh, error";
            }
            return num1 / num2;
        }
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
    error = 0;
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