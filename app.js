const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const fove = document.getElementById("fove");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const zeroo = document.getElementById("zeroo");
const point = document.getElementById("point");

const clear = document.getElementById("clear");
const back = document.getElementById("back");

const addition = document.getElementById("addition");
const subtraction = document.getElementById("subtraction");
const multi = document.getElementById("multi");
const division = document.getElementById("division");
const equals = document.getElementById("equals");
const power = document.getElementById("power");

let output = document.querySelector(".output");
let display = document.querySelector(".display");
let outputEquals = document.getElementById("output-equals");

const updateOutput = (value) => {
  output.innerText = value;
}

const convertToReadabeFormat = (value) => {
  value = String(value).replaceAll(',', '')
  const indexOfDecimal = value.indexOf('.')

  if (String(value).length > 13) {
    if (indexOfDecimal == -1 || value.substring(0, indexOfDecimal).length > 13){
      return Number(value).toExponential(8);
    }
    else {
      return Number(value).toLocaleString();
    }
  }
  else {
    return Number(value).toLocaleString();
  }
}

updateOutput(0);
outputEquals.style.visibility = "hidden";

const appendOutput = (value) => {
  outputValue = String(output.innerText);
  if (output.innerText == "0" && value == "0") {
    return;
  }
  if (isNaN(outputValue[outputValue.length - 1]) && isNaN(String(value))) {
    return;
  }
  if (output.innerText == 0 && ['+','/','*','^'].includes(value)) {
    return;
  }
  if (output.innerText == 0) {
    updateOutput(value);
  } else {
    updateOutput(outputValue.replaceAll(',','') + value);
  }
  outputEquals.style.visibility = "hidden";
  display.scrollLeft = display.scrollWidth;
};

one.addEventListener("click", () => appendOutput(1));
two.addEventListener("click", () => appendOutput(2));
three.addEventListener("click", () => appendOutput(3));
four.addEventListener("click", () => appendOutput(4));
five.addEventListener("click", () => appendOutput(5));
six.addEventListener("click", () => appendOutput(6));
seven.addEventListener("click", () => appendOutput(7));
eight.addEventListener("click", () => appendOutput(8));
nine.addEventListener("click", () => appendOutput(9));
zeroo.addEventListener("click", () => appendOutput(0));
point.addEventListener("click", () => appendOutput("."));

clear.addEventListener("click", () => {
  updateOutput(0);
  outputEquals.style.visibility = "hidden";
});
back.addEventListener("click", () => {
  outputEquals.style.visibility = "hidden";
  outputString = String(output.innerText);
  if (outputString.length == 0 || outputString == 0) {
    updateOutput(0);
    return;
  }
  updateOutput(outputString.substring(0, outputString.length - 1));
});

addition.addEventListener("click", () => {
  appendOutput("+");
});
subtraction.addEventListener("click", () => {
  appendOutput("-");
});
multi.addEventListener("click", () => {
  appendOutput("*");
});
division.addEventListener("click", () => {
  appendOutput("/");
});
power.addEventListener("click", () => {
  appendOutput("^");
});

// Calculate

equals.addEventListener("click", () => {
  let expression = String(output.innerText);
  expression = expression.split("");

  const simplifiedExpression = extractSimplifiedExpression();
  while (simplifiedExpression.indexOf("^") != -1) {
    const index = simplifiedExpression.indexOf("^");
    const result =
      simplifiedExpression[index - 1] ** simplifiedExpression[index + 1];
    simplifiedExpression.splice(index - 1, 3, result);
  }
  while (simplifiedExpression.indexOf("/") != -1) {
    const index = simplifiedExpression.indexOf("/");
    const result =
      simplifiedExpression[index - 1] / simplifiedExpression[index + 1];
    simplifiedExpression.splice(index - 1, 3, result);
  }
  while (simplifiedExpression.indexOf("*") != -1) {
    const index = simplifiedExpression.indexOf("*");
    const result =
      simplifiedExpression[index - 1] * simplifiedExpression[index + 1];
    simplifiedExpression.splice(index - 1, 3, result);
  }
  let additionResult =
    simplifiedExpression[0] > 0 ? simplifiedExpression[0] : 0;
  while (simplifiedExpression.indexOf("+") != -1) {
    const index = simplifiedExpression.indexOf("+");
    additionResult += simplifiedExpression[index + 1];
    simplifiedExpression.splice(index, 1);
  }
  let subResult = simplifiedExpression[0] < 0 ? simplifiedExpression[0] : 0;
  while (simplifiedExpression.indexOf("-") != -1) {
    const index = simplifiedExpression.indexOf("-");
    subResult += simplifiedExpression[index + 1];
    simplifiedExpression.splice(index, 1);
  }

  const equalsResult = additionResult + subResult;

  updateOutput(convertToReadabeFormat(equalsResult));

  outputEquals.style.visibility = "";

  function extractSimplifiedExpression() {
    let i = 1;
    let temp = expression[0];
    let simplifiedExpression = [];
    while (i < expression.length) {
      if (!isNaN(expression[i]) || expression[i] == ".") {
        temp += expression[i];
      } else {
        simplifiedExpression.push(Number(temp));
        if (expression[i] == "-") {
          temp = "-";
        } else {
          temp = "";
        }
        simplifiedExpression.push(expression[i]);
      }
      i += 1;
      if (i == expression.length) {
        simplifiedExpression.push(Number(temp));
      }
    }
    return simplifiedExpression;
  }
});
