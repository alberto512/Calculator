var num = [];
var operator = undefined;
var numbers = [];
var text = '';
var end = 0;
var start = 0;
var total = 0;
var del_num = 0;
var dot = 0;

window.onload = function(){
  document.onkeypress = saveKeyboard;
}

function saveKeyboard(event){
  var key;
  if(event.which === 13){
    equal();
  }else{
    key = String.fromCharCode(event.which);
    if(key === '+' || key === '-' || key === '*' || key === '/'){
      saveOperator(key);
    }else if(key === '='){
      equal();
    }else if(key >= 0 && key < 10 || key == '.'){
      saveNumber(key);
    }
  }
}

function saveNumber(element){
  if(end === 1){
    text = '';
    end = 0;
    start = 0;
    total = 0;
    dot = 0;
  }

  if(del_num === 1){
    del_num = 0;
    num = [];
  }

  if(element == '.' && num.length == 0){
    num.push(0);
    change_text(0);
  }

  if(element == '.'){
    if(dot == 0){
      dot = 1;
      num.push(element);
      change_text(element);
    }
  }else{
    num.push(element);
    change_text(element);
  }
}

function saveOperator(element){
  if(num.length > 0){
    numbers.push(num.join(''));
    del_num = 1;
    dot = 0;
    operate(numbers[numbers.length-1]);
    operator = element;
    change_text(' ' + element + ' ');
  }
}

function operate(element){
  if(operator == undefined){
    total = parseFloat(element,10);
  }else if(operator === "+"){
    total = add(total, element);
  }else if(operator === "-"){
    if(start === 0){
      total = element;
    }else{
      total = substrac(total, element);
    }
  }else if(operator === "*"){
    if(start === 0){
      total = 1;
    }
    total = multiply(total, element);
  }else if(operator === "/"){
    if(start === 0){
      total = element;
    }else{
      total = divide(total, element);
    }
  }
  start = 1;
}

function equal(){
  var aux;
  var decimal;
  if(num.length > 0){
    numbers.push(num.join(''));
    num = [];
    operate(numbers[numbers.length-1]);
  }

  if(end === 0){
    change_text(' = ');
    numbers = [];
    end = 1;
    aux = total;
    aux = Math.abs(aux);
    decimal = aux - Math.floor(aux);
    if(decimal.toString().length > 4){
      total = total.toFixed(4);
    }
    change_text(total);
    if(total == Infinity){
      document.getElementById("screen").innerHTML = "Error dividing by cero";
    }
    operator = undefined;
  }
}

function add(a, b){
  b = parseFloat(b,10);
  return a+b;
}

function substrac(a, b){
  b = parseFloat(b,10);
  return a-b;
}

function multiply(a, b){
  b = parseFloat(b,10);
  return a*b;
}

function divide(a, b){
  b = parseFloat(b,10);
  return a/b;
}

function change_text(a){
  text += a;
  document.getElementById("screen").innerHTML = text;
}

function clear_screen(){
  operator = undefined;
  text = '';
  end = 1;
  numbers = [];
  num = [];
  change_text(0);
}

function backspace(){
  if(text != '' && end == 0){
    var char;
    var aux;

    char = text.slice(-1);
    text = text.slice(0,-1);

    while(char === " "){
      char = text.slice(-1);
      text = text.slice(0,-1);
    }

    if(text == ''){
      text = 0;
      end = 1;
      numbers = [];
      num = [];
    }else if(char === '+' || char === '-' || char === '*' || char === '/'){
      operator = undefined;
      aux = numbers.pop();
      if(del_num == 0){
        aux=aux.split("");
        aux.forEach(function(element) {
          num.push(element);
        });
      }
      del_num = 0;
    }else if((char >= 0 && char < 10 || char == '.') && char != " "){
        num.pop();
    }

    document.getElementById("screen").innerHTML = text;
  }
}
