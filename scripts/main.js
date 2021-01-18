//basic calculation works
//multi-digit input works
//operator stacking prevented (can't input +++ *** and so on)
//decimals work.
//once calculation has run, inputting a number automatically resets
//plus-minus button works, but can be broken by pushing it multiple times
//square button works, but with no flow control
//square root works, but with no flow control
//cube works, but with no flow control
//cube root works, but with no flow control, also floating point needs work
//arbitary exponent works
//arbitary root works
//Percentage works
//SIN works, but with no flow control
//LOG works, again with the flow control caveat
//TAN works, no flow control
//COS works, no flow control
//SINH works
//COSH works
//TO DO: ADD CHECK TO OPERATOR FUNCTION SO THAT THE CALCULATOR
//ACCEPTS INPUT AFTER INPUT WITHOUT NEEDING TO HIT CLEAR OR EQUALS


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
const getSquare = document.querySelectorAll('.square');
const getSqroot = document.querySelectorAll('.sqroot');
const getCube = document.querySelectorAll('.cube');
const getCubeRoot = document.querySelectorAll('.cuberoot');
const getTrig = document.querySelectorAll('.trig');

//a handful of useful variables, all of which are reset to default on
//page load
let calculation = [];
let buffer = "";
let currentChar = "";
let operatorOn = false;
let calcDone = false;
let minusSwitch = false;
let numPerc;
let percentOn = false;
let trig = "";

//These are the event listners that translate button clicks into
//specific function calls
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
  e.addEventListener('click', clickPercent);
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
getSquare.forEach(function(e){
  e.addEventListener('click', clickSquare);
});
getSqroot.forEach(function(e){
  e.addEventListener('click', clickSqroot);
});
getCube.forEach(function(e){
  e.addEventListener('click', clickCube);
});
getCubeRoot.forEach(function(e){
  e.addEventListener('click', clickCubeRoot);
});
getTrig.forEach(function(e){
  e.addEventListener('click', clickTrig);
});



//these are three functions required by the assignment.
//in normal calculator mode, these would be disabled and the
//alerts() wouldn't pop up.
function pushNumber(event) {
  alert(event.target.value);
}
function pushOperator(event) {
  alert(event.target.value);
}
function calculate(event) {
  alert(event.target.value);
  //console.log(calculation);
}
//the PlusMinus button. it works, but it can be abused.
//more flow control to follow.
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

//placeholder function, will eventually be removed
function clickButton(event) {
  console.log(event.target.value);
}
//the CLEAR button - resets all variables
function clickClear(){
  operatorOn = false;
  calcDone = false;
  calcDisplay.value = 0;
  calculation = [];
  buffer = "";
  currentChar = "";
  minusSwitch = false;
  percentOn = false;
}

//the number buttons push inputs to a string "buffer" rather than
//straight to an array. this allows multiple-digit numbers.
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
    pushNumber(event);
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

//the decimal button. pushes decimal to buffer rather than array.
//later, pressing OPERATOR button sends buffer to array.
//currentChar variable prevents multiple decimals in a row
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
    pushOperator(event);
  }
}
//this is the bit that does the actual calculation.
//the switch:case sequence handles all the trig functions - sin, cos,
//and so on.
//after that, the function
//checks if the display includes a % sign. if it does, it triggers
//percCalc instead.
//then it checks to make sure that the display isn't showing just 0.
//it also checks the calcDone variable. this prevents activating
//the EQUALS function multiple times in a row.
//
//this function pushes the remaining buffer string into the
//calculation array, then performs the math on that array.

function clickEquals(){
  if (trig) {
    switch (trig){
      case "sin":
      calculation.push(buffer);
      num1 = calculation[0];
      result = Math.sin(num1);
      calcDisplay.value = result;
      break;
      case "log":
      calculation.push(buffer);
      num1 = calculation[0];
      result = Math.log10(num1);
      calcDisplay.value = result;
      break;
      case "cos":
      calculation.push(buffer);
      num1 = calculation[0];
      result = Math.cos(num1);
      calcDisplay.value = result;
      break;
      case "tan":
      calculation.push(buffer);
      num1 = calculation[0];
      result = Math.tan(num1);
      calcDisplay.value = result;
      break;
      case "cosh":
      calculation.push(buffer);
      num1 = calculation[0];
      result = Math.cosh(num1);
      calcDisplay.value = result;
      break;
      case "sinh":
      calculation.push(buffer);
      num1 = calculation[0];
      result = Math.sinh(num1);
      calcDisplay.value = result;
      break;
    }
  }
  else if (calcDisplay.value.includes("%")){
    percCalc();
  }
  else{
    if (calcDisplay.value != "0" && calcDone == false) {
      calcDone = true;
      calculation.push(buffer);
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
      else if (opp == "^") {
        result = Math.pow(num1, num2);
      }
      else if (opp == "√x") {
        result = Math.pow(num1, 1/num2);
      }
      if (result || result == "0"){
        calcDisplay.value = result;
      }
    }
    //this is the for() loop and alert required by the assignment
    for (let i = 0; i < calculation.length; i++ ){
      alert(calculation[i]);
      if ((i + 1) == calculation.length ){
        alert(`equals ${result}!`);
      }
    }
  }
}

//square and squareRoot are working, but can be easily broken.
//both need flow control.
function clickSquare(event) {
  calculation.push(buffer);
  let num1 = parseFloat(calculation[0]);
  result = num1 * num1;
  calcDisplay.value = result;
}
function clickSqroot(event) {
  calculation.push(buffer);
  let num1 = parseFloat(calculation[0]);
  result = Math.sqrt(num1);
  calcDisplay.value = result;
}

function clickCube(event) {
  calculation.push(buffer);
  let num1 = parseFloat(calculation[0]);
  result = num1 * num1 * num1;
  calcDisplay.value = result;
}

function clickCubeRoot(event) {
  calculation.push(buffer);
  let num1 = parseFloat(calculation[0]);
  result = Math.pow(num1, 1/3);
  calcDisplay.value = result;
}

//this is activated by clicking one of the trig buttons - sin, cos,
//log and so on. It uses the event input to set the "trig" variable,
//which is then used by the switch:case portion of the clickEquals()
//function above.

function clickTrig(event) {
  calcDisplay.value = event.target.value;
  trig = event.target.value;
}

//clickPercent function takes number in buffer, extracts it, divides
//it by 100, then adds it back to the calculation array.
function clickPercent(event) {
  if (percentOn == false && calcDisplay.value != "0"){
    percentOn = true;
    numPerc = parseFloat(buffer);
    buffer = "";
    numPerc = numPerc/100;
    calculation.push(numPerc);
    calcDisplay.value = (calcDisplay.value + event.target.value);
  }
}
//if the display has a %, the equals sign triggers this function.
function percCalc(){
  if (buffer != ""){
    calculation.push(buffer);
  }
  if (calcDisplay.value != "0" && calcDone == false) {
    calcDone = true;
    let i = calculation.length;
    let num1 = parseFloat(calculation[0], 10);
    let num2 = parseFloat(calculation[(i-1)], 10);
    result = num1 * num2;
  }
  if (result || result == "0"){
    calcDisplay.value = result;
  }
}
//I couldn't get this one to work. In theory, it should pass the trig
//variable into the Math function.
// if (trig){
//   calculation.push(buffer);
//   num1 = calculation[0];
//   result = Math.`${trig}`(num1);
//   calcDisplay.value = result;
// }
