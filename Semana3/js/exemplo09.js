var frutas = ["Banana", "Laraja", "Maçã", "Manga", "Goiaba", "Kiwi"];
var legumes = ["Cenoura", "Abóbora", "Brócolis", "Pepino"];
var vegetais = [];

function cleardiv() {
    document.getElementById('conteudo').innerHTML = '';
}

function arraytostring() {
    document.getElementById('conteudo').innerHTML += 'toString(): ' + frutas.toString() + '<br>';
}

function joinarray() {
    document.getElementById('conteudo').innerHTML += 'join(): ' + frutas.join(" | ") + '<br>';
}

function reversearray() {
    frutas.reverse();
    document.getElementById('conteudo').innerHTML += 'reverse(): ' + frutas.toString() + '<br>';
    frutas.reverse();
    document.getElementById('conteudo').innerHTML += 'reverse(): ' + frutas.toString() + '<br>';    
}

function poparray() {
    frutas.pop();
    document.getElementById('conteudo').innerHTML += 'pop(): ' + frutas.toString() + '<br>';
}

function pusharray() {
    frutas.push("Kiwi");
    document.getElementById('conteudo').innerHTML += 'push(): ' + frutas.toString() + '<br>';
}

function shiftarray() {
    frutas.shift();
    document.getElementById('conteudo').innerHTML += 'shift(): ' + frutas.toString() + '<br>';
}

function unshiftarray() {
    frutas.unshift("Banana");
    document.getElementById('conteudo').innerHTML += 'unshift(): ' + frutas.toString() + '<br>';
}

function splicearray() {
    frutas.splice(2, 0, "Limão", "Caqui");
    document.getElementById('conteudo').innerHTML += 'splice(): ' + frutas.toString() + '<br>';
}

function concatarrays() {
    vegetais = frutas.concat(legumes);
    document.getElementById('conteudo').innerHTML += 'concat(): ' + vegetais.toString() + '<br>';
}

function slicearray() {
    legumes = vegetais.slice(6, 10);
    document.getElementById('conteudo').innerHTML += 'slice(): ' + legumes.toString() + '<br>';
}
