//basic calculation works
//multi-digit input works
//prevents operator stacking (can't input +++ *** and so on)





const calcDisplay = document.querySelector('.calculator-screen');
const getNumber = document.querySelectorAll("[class='number']");
const getOperator = document.querySelectorAll("[class='operator']");
const getPlusMinus = document.querySelectorAll("[class='plus-minus']");
const getPercent = document.querySelectorAll("[class='percent']");
const getEquals = document.querySelectorAll("[class='equal-sign']");
const getClear = document.querySelectorAll("[class='clear']");
const getZero = document.querySelectorAll("[class='number btn-lg']")
const getDecimal = document.querySelectorAll("[class='decimal']");

let calculation = [];
let buffer = "";
let operatorOn = false;
let clearedBuffer = false;


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

function clickButton(event) {
  console.log(event.target.value);
}

function clickClear(){
  operatorOn = false;
  clearedBuffer = false;
  calcDisplay.value = 0;
  calculation = [];
  buffer = "";
}

//the number buttons push inputs to a buffer rather than straight to an
//array. this allows multiple-digit numbers.
function clickNumber(event) {
  if (calcDisplay.value == "0") {
    calcDisplay.value = null;
    calcDisplay.value = (calcDisplay.value + event.target.value);
    buffer = (buffer + event.target.value);
  }
  else{
    calcDisplay.value = (calcDisplay.value + event.target.value);
    buffer = (buffer + event.target.value);
  }
  //console.log(buffer);
}


//if the display is already showing only "0" this function will not change
//the display, but it will push 0 to the calculation buffer so a
//fault doesn't arise when someone tries to calulate 0 + something.
function clickZero(event) {
  if (calcDisplay.value != "0") {
    calcDisplay.value = (calcDisplay.value + event.target.value);
    buffer = (buffer + event.target.value);
    //calculation.push(event.target.value);
    //console.log(event.target.value);
  }
  else {
    buffer = (buffer + event.target.value);
  }
}

function clickDecimal(event) {
  if (calcDisplay.value.includes(".") === false) {
    calcDisplay.value = (calcDisplay.value + event.target.value);
    console.log(event.target.value);
  }
}


//when any operator is pressed, the function pushes everything in the
//buffer into the calculation array. this allows for multiple-digit inputs.
//in then clears the buffer to make room for the next number input

//oppYes flag prevents multiple operators at once. for example, you can't
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
  if (calcDisplay.value != "0" && clearedBuffer == false) {
    clearedBuffer = true;
    calculation.push(buffer);
    //console.log(calculation);
    let num1 = parseInt(calculation[0]);
    let num2 = parseInt(calculation[2]);
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
    for (let i = 0; i < calculation.length; i++ ){
      alert(calculation[i]);
      if ((i + 1) == calculation.length ){
        alert(`equals ${result}!`);
      }
    }
    //console.log(calculation);
    //console.log(result);
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
  e.addEventListener('click', clickButton);
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





//ORIGINAL CODE FOR EQUALS BUTTON
//
// function clickEquals(event) {
//   //console.log(event.target.value);
//   calcDisplay.value = (calcDisplay.value + event.target.value);
//   calculate(event);
//   //let doMath = calculation.toString();
//   //doMath = calculation.join('');
//   //console.log(doMath);
//   //calcDisplay.value = (calcDisplay.value + event.target.value);
//   equalTest();
// }

//document.querselectorall
//eventlistener (event)
//event.target.value
//event.target.addEventListener
