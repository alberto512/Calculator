var num = [];
var operando = undefined;
var numeros = [];
var text = '';
var fin = 0;
var ini = 0;
var total = 0;
var num_del = 0;

window.onload = function(){
  document.onkeypress = guardaTeclado;
}

function guardaTeclado(event){
  var key;
  if(event.which === 13){
    equal();
  }else{
    key = String.fromCharCode(event.which);
    if(key === '+' || key === '-' || key === '*' || key === '/'){
      guardarOperando(key);
    }else if(key === '='){
      equal();
    }else if(key >= 0 && key < 10 || key == '.'){
      guardarNumero(key);
    }
  }
}

function guardarNumero(a){
  if(fin === 1){
    text = '';
    fin = 0;
    ini = 0;
    total = 0;
  }

  if(num_del === 1){
    num_del = 0;
    num = [];
  }

  if(a == '.' && num.length == 0){
    num.push(0);
    change_text(0);
  }
  num.push(a);
  change_text(a);
}

function guardarOperando(a){
  if(num.length > 0){
    numeros.push(num.join(''));
    num_del = 1;
    operate(numeros[numeros.length-1]);
    operando = a;
    change_text(' ' + a + ' ');
  }
}

function operate(a){
  if(operando == undefined){
    total = parseFloat(a,10);
  }else if(operando === "+"){
    total = add(total, a);
  }else if(operando === "-"){
    if(ini === 0){
      total = a;
    }else{
      total = substrac(total, a);
    }
  }else if(operando === "*"){
    if(ini === 0){
      total = 1;
    }
    total = multiply(total, a);
  }else if(operando === "/"){
    if(ini === 0){
      total = a;
    }else{
      total = divide(total, a);
    }
  }
  ini = 1;
}

function equal(){
  if(num.length > 0){
    numeros.push(num.join(''));
    num = [];
    operate(numeros[numeros.length-1]);
  }

  if(fin === 0){
    change_text(' = ');
    numeros = [];
    fin = 1;
    change_text(total);
    if(total == Infinity){
      document.getElementById("screen").innerHTML = "Error al dividir entre cero";
    }
    operando = undefined;
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
  operando = undefined;
  text = '';
  fin = 1;
  numeros = [];
  num = [];
  change_text(0);
}

function backspace(){
  if(text != '' && fin == 0){
    var char;
    var aux;

    char = text.slice(-1);
    text = text.slice(0,-1);

    if(text == ''){
      text = 0;
      fin = 1;
      numeros = [];
      num = [];
    }else if(char === '+' || char === '-' || char === '*' || char === '/'){
      operando = undefined;
      aux = numeros.pop();
      if(num_del == 0){
        num.push(aux);
      }
      num_del = 0;
    }else if((char >= 0 && char < 10 || char == '.') && char != " "){
        num.pop();
    }

    document.getElementById("screen").innerHTML = text;
  }
}
