
pi = Math.PI;
e = Math.E;
degtorad =(2*Math.PI)/360.0;
radtodeg =360.0/(2*pi);

function sqrt(a){ return Math.sqrt(a);}
function abs(a){ return Math.abs(a);}
function floor(a){ return Math.floor(a);}
function ceil(a){ return Math.ceil(a);}
function round(a){ return Math.round(a);}
function log2(a){ return Math.log2(a);}
function log10(a){ return Math.log10(a);}
function ln(a){ return Math.log(a);}

function cos(a){ return Math.cos(degtorad*a);}
function sin(a){ return Math.sin(degtorad*a);}
function tan(a){ return Math.tan(degtorad*a);}
function acos(a){ return radtodeg*Math.acos(a);}
function asin(a){ return radtodeg*Math.asin(a);}
function atan(a){ return radtodeg*Math.atan(a);}
function atan2(a, b){ return radtodeg*Math.atan2(a, b);}



function syncScroll(e, other) {
  other.scrollTop = e.target.scrollTop;
}



function filterInput(ev){
  const cursorposition = ev.target.selectionStart;
  const len_before = ev.target.value.length;
  ev.target.value = ev.target.value
        .replace(/\+\+/g, '(')                  // ++ to (
        .replace(/\-\-/g, ')')                  // -- to )
        .replace(/(\d|\))(?=\()/g, '$&*')       // 5() to 5*() and so on
        .replace(/(\))(?=\d)/g, '$&*');         // 5() to 5*() and so on
  const diff = len_before - ev.target.value.length;
  ev.target.setSelectionRange(cursorposition-diff, cursorposition-diff);
}


function setup(){
  console.log("setup()");

  const expr_field = document.getElementById("expr_field");
  const result_field = document.getElementById("result_field");
  expr_field.addEventListener("scroll", (e) => syncScroll(e, result_field));
  result_field.addEventListener("scroll", (e) => syncScroll(e, expr_field));
  document.getElementById("expr_field").addEventListener("input", filterInput);
  document.getElementById("expr_field").addEventListener("keyup", _eval);
}


function _eval(){
  let txt = document.getElementById("expr_field").value;
  const lines = txt.split(/\r?\n/);
  console.log(lines);
  
  let results = [];
  for (let line of lines){
    if (line.trim().length === 0) {
      results.push("");
      continue;
    }
    try{
      results.push(eval(line));  
    }catch(e){
      results.push("Syntax Error");
    }
  }
  
  
  console.log("results = " + results);
  let results_txt = "";
  for (const res of results){
    results_txt += res + "\n";
  }
  document.getElementById("result_field").value = results_txt;
}
