const calcDisplay = document.querySelector('.calculator-screen');
//let displayNum = calcDisplay.value
const getNumber = document.querySelectorAll("[class='number']");
const getOperator = document.querySelectorAll("[class='operator']");
const getPlusMinus = document.querySelectorAll("[class='plus-minus']");
const getPercent = document.querySelectorAll("[class='percent']");
const getEquals = document.querySelectorAll("[class='equal-sign']");
const getClear = document.querySelectorAll("[class='clear']");
const getZero = document.querySelectorAll("[class='number btn-lg']")
const getDecimal = document.querySelectorAll("[class='decimal']");

let calculation = [];


function pushNumber(event) {
  alert(event.target.value);
}

function pushOperator(event) {
  alert(event.target.value);
}

function calculate(event) {
  //alert(event.target.value);
  console.log(calculation);
}

function clickButton(event) {
  console.log(event.target.value);
  //calcDisplay.value = (calcDisplay.value + event.target.value);
}

function clickClear(){
  calcDisplay.value = 0;
  calculation = [];
}

function clickNumber(event) {
  if (calcDisplay.value == "0") {
    calcDisplay.value = null;
    calcDisplay.value = (calcDisplay.value + event.target.value);
    calculation.push(event.target.value);
  }
  else{
    calcDisplay.value = (calcDisplay.value + event.target.value);
    calculation.push(event.target.value);
  }
  //pushNumber(event);
  //console.log(event.target.value);
  //console.log(calculation);
}

function clickZero(event) {
  if (calcDisplay.value != "0") {
    calcDisplay.value = (calcDisplay.value + event.target.value);
    calculation.push(event.target.value);
    console.log(event.target.value);
  }
}

function clickDecimal(event) {
  if (calcDisplay.value.includes(".") === false) {
    calcDisplay.value = (calcDisplay.value + event.target.value);
    console.log(event.target.value);
  }
}

function smoothOperator(event) {
  //console.log(event.target.value);
  calcDisplay.value = (calcDisplay.value + event.target.value);
  //calculation.push(calcDisplay.value);
  calculation.push(event.target.value);
  console.log(calculation);
  //pushOperator(event);
  //calcDisplay.value = (calcDisplay.value + event.target.value);
}



function clickEquals(){
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
  calcDisplay.value = result;
//console.log(result);
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
}
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
