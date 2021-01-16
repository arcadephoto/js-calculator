//basic calculation works
//multi-digit input works
//prevents operator stacking (can't input +++ *** and so on)
//decimals appear to work. *fingers crossed*
//once calculation has run, inputting number automatically resets
//plus-minus button works, but can be broken by pushing it multiple times





//these create constants by converting the various classes defined
//in the HTML
const calcDisplay = document.querySelector('.calculator-screen');
const getNumber = document.querySelectorAll("[class='number']");
const getOperator = document.querySelectorAll("[class='operator']");
const getPlusMinus = document.querySelectorAll("[class='plus-minus']");
const getPercent = document.querySelectorAll("[class='percent']");
const getEquals = document.querySelectorAll("[class='equal-sign']");
const getClear = document.querySelectorAll("[class='clear']");
const getZero = document.querySelectorAll("[class='number btn-lg']")
const getDecimal = document.querySelectorAll("[class='decimal']");

//a handful of useful variables, all of which are reset to default on
//page load
let calculation = [];
let buffer = "";
let currentChar = "";
let operatorOn = false;
let calcDone = false;
let minusSwitch = false;


function pushNumber(event) {
  alert(event.target.value);
}
function pushOperator(event) {
  alert(event.target.value);
}
function calculate(event) {
  //alert(event.target.value);
  //console.log(calculation);
}
//possibly change flow control for +- to check currentChar flag
function clickPlusMinus(event){
  if (minusSwitch == false){
    if (calcDisplay.value == "0") {
      calcDisplay.value = null;
    }
    minusSwitch = true;
    calcDisplay.value = (calcDisplay.value + "-");
    buffer = buffer + "-"
  }
}

function clickButton(event) {
  console.log(event.target.value);
}
function clickClear(){
  operatorOn = false;
  calcDone = false;
  calcDisplay.value = 0;
  calculation = [];
  buffer = "";
  currentChar = "";
  minusSwitch = false;
}

//the number buttons push inputs to a buffer rather than straight to an
//array. this allows multiple-digit numbers.
//also checks calcDone function. if true, clickNumber resets the calculator.
//in other words, if the user has already run a calculation, then hitting
//a number button resets and starts fresh.
function clickNumber(event) {
  if (calcDone == true) {
    clickClear();
  }
  else {
    if (calcDisplay.value == "0") {
      calcDisplay.value = null;
      calcDisplay.value = (calcDisplay.value + event.target.value);
      buffer = (buffer + event.target.value);
      currentChar = event.target.value;
    }
    else{
      calcDisplay.value = (calcDisplay.value + event.target.value);
      buffer = (buffer + event.target.value);
      currentChar = event.target.value;
    }
  }
}


//if the display is already showing only "0" this function will not change
//the display, but it will push 0 to the calculation buffer so a
//fault doesn't arise when someone tries to calulate 0 + something.
function clickZero(event) {
  if (calcDisplay.value != "0") {
    calcDisplay.value = (calcDisplay.value + event.target.value);
    buffer = (buffer + event.target.value);
    currentChar = event.target.value;
  }
  else {
    buffer = (buffer + event.target.value);
    currentChar = event.target.value;
  }
}

function clickDecimal(event) {
  if (currentChar != "." ) {
    currentChar = ".";
    calcDisplay.value = (calcDisplay.value + event.target.value);
    buffer = (buffer + event.target.value);
    //console.log(event.target.value);
  }
}


//when any operator is pressed, the function pushes everything in the
//buffer into the calculation array. this allows for multiple-digit inputs.
//it then clears the buffer to make room for the next number input

//operatorOn flag prevents multiple operators at once. for example, you can't
//input ++++++
function smoothOperator(event) {
  if (operatorOn == false) {
    operatorOn = true;
    calcDisplay.value = (calcDisplay.value + event.target.value);
    calculation.push(buffer);
    buffer = "";
    calculation.push(event.target.value);
    //console.log(calculation);
  }
}

//this pushes everything else in the buffer into the calculation array.
function clickEquals(){
  if (calcDisplay.value != "0" && calcDone == false) {
    calcDone = true;
    calculation.push(buffer);
    //console.log(calculation);
    let num1 = parseFloat(calculation[0], 10);
    let num2 = parseFloat(calculation[2], 10);
    let opp = calculation[1];
    if (opp == "+") {
      result = num1 + num2;
    }
    else if (opp == "-"){
      result = num1 - num2;
    }
    else if (opp == "*"){
      result = num1 * num2;
    }
    else if (opp == "/") {
      result = num1 / num2;
    }
    if (result || result == "0"){
      calcDisplay.value = result;
    }

    //this is the for loop and alert required by the assignment
    // for (let i = 0; i < calculation.length; i++ ){
    //   alert(calculation[i]);
    //   if ((i + 1) == calculation.length ){
    //     alert(`equals ${result}!`);
    //   }
    // }
  }
}


//const getButton = document.querySelectorAll("[type='button']");
//console.log(getButton);
getNumber.forEach(function(e){
  e.addEventListener('click', clickNumber);
});
getOperator.forEach(function(e){
  e.addEventListener('click', smoothOperator);
});
getPlusMinus.forEach(function(e){
  e.addEventListener('click', clickPlusMinus);
});
getPercent.forEach(function(e){
  e.addEventListener('click', clickButton);
});
getEquals.forEach(function(e){
  e.addEventListener('click', clickEquals);
});
getClear.forEach(function(e){
  e.addEventListener('click', clickClear);
});
getDecimal.forEach(function(e){
  e.addEventListener('click', clickDecimal);
});
getZero.forEach(function(e){
  e.addEventListener('click', clickZero);
});
