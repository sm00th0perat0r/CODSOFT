let input = document.getElementById('inpbox');
let buttons = document.querySelectorAll('button');

let string = '';
let arr = Array.from(buttons);

function evaluateExpression() {
  try {
    // This is to check for invalid expressions with multiple consecutive operators or invalid characters
    if (/[^0-9+\-*/.%()]/.test(string) || /[+\-*/.]{2,}/.test(string)) {
      throw new Error('');
    }

    // check for invalid combinations with the '%' symbol
    if (/%[+\-*/]/.test(string) || /[+\-*/]%/.test(string) || /\d+%[^0-9.]/.test(string)) {
      throw new Error('');
    }

    // Check for percentage characters and convert them to decimal format
    string = string.replace(/(\d+(\.\d+)?)%/g, function(match, p1) {
      return parseFloat(p1) / 100;
    });

    let result = Function('return (' + string + ')')();
    if (isNaN(result)) {
      throw new Error('');
    }
    return result;
  } catch (error) {
    return 'Syntax Error';
  }
}

arr.forEach(button => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML === '=') {
      string = evaluateExpression();
      input.value = string;
    } else if (e.target.innerHTML === 'AC') {
      string = '';
      input.value = string;
    } else if (e.target.innerHTML === 'DEL') {
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});
