const number = [4,2];
let number1 = 0;
let operation = "";
let number2 = 0;
let inputNumber;
let step = 'a';
const screen = document.querySelector(".display");
// step a -> blm set num1 blm klik op
//step b -> udh klik op, balik dr 2 ke 1 klo udh klik angka 2 trus klik op lg
//step c -> udh klik num ke 2
const btn = document.querySelectorAll("button");
btn.forEach((btn) => btn.addEventListener("click", () => {
    if (step == 'a'){
        // alert("number");
        switch(btn.classList.toString()) {
            case "num":
                displayNum(btn.textContent);
                inputNumber = screen.textContent;
                number1 = inputNumber;
                break;
            case "operator":
                displayNum(btn.textContent);
                operation = btn.id;
                step = 'b';
        }
    } else if (step == 'b'){
        switch(btn.classList.toString()) {
            case "operator":
                operation = btn.id;
                displayOpt(operation);
                break;
            case "num":
                if (operation != ""){
                    const indexOpt = screen.textContent.indexOf(operation);
                    displayNum(btn.textContent);
                    inputNumber = screen.textContent.slice(indexOpt + 1);
                    console.log("num2:" + inputNumber);
                    number2 = inputNumber;
                    break;
                }
            case "equal":
                let result = operate(Number(number1), operation, Number(number2));
                displayResult(result);
                number1 = result;
                step = 'c';
                break;
        }
    } else if (step == 'c'){
        switch(btn.classList.toString()) {
            case "operator":
                operate(number1, operation, number2);
                step = 'b';
                break;
            case "num":
                inputNumber = btn.textContent;
                number2 = inputNumber;
                displayNum(inputNumber);
        }
    }
    console.log(`${number1} ${number2} ${operation} ${step}`);
}));
function operate(num1, opr, num2) {
    let result;
    switch(opr.toString()) {
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
    }
    return result;
}

function addition(a,b){
    return a+b;
}

function substraction(a,b){
    return a-b;
}

function multiplication(a,b){
    return a*b;
}

function division(a,b){
    return a/b;
}

function displayNum(val){
    screen.textContent += val;
}

function displayOpt(opt){
    screen.textContent = screen.textContent.slice(0, -1) + opt;
}

function displayResult(val){
    screen.textContent = val;
}

// const add = document.querySelector("#add");
// add.addEventListener("click", (a,b) => {
//     a = number[0];
//     b = number[1];
//     console.log(a,b)
//     console.log(a+b);
// })

// const subst = document.querySelector("#substract");
// subst.addEventListener("click", (a,b) => {
//     a = number[0];
//     b = number[1];
//     console.log(a,b)
//     console.log(a-b);
// })

// const multi = document.querySelector("#multiply");
// multi.addEventListener("click", (a,b) => {
//     a = number[0];
//     b = number[1];
//     console.log(a,b)
//     console.log(a*b);
// })

// const divi = document.querySelector("#divide");
// divi.addEventListener("click", (a,b) => {
//     a = number[0];
//     b = number[1];
//     console.log(a,b)
//     console.log(a/b);
// })