var frutas = ["Maçã", "Banana", "Laraja", "Manga", "Kiwi", "Goiaba"];

var valores = [40, 100, 1, 5, 25, 10, 6, 12, 90, 6, 4, 0, 50, 66, 99, 8, 33];

var carros = [
    {modelo: "Honda City", ano: 2016},
    {modelo: "Toyota Corola", ano: 2008},
    {modelo: "Ford Ranger", ano: 2012}
  ];

function cleardiv() {
    frutas = ["Maçã", "Banana", "Laraja", "Manga", "Kiwi", "Goiaba"];
    document.getElementById('conteudo').innerHTML = 'Array Original: ' + frutas.toString() + '<br>';    
}

function sortarray() {    
    frutas.sort();
    document.getElementById('conteudo').innerHTML += 'sort(): ' + frutas.toString() + '<br>';    
}

function sortfunctionarray() {    
    valores.sort();
    document.getElementById('conteudo').innerHTML += 'sortfunction(): ' + valores.toString() + '<br>';    

    valores.sort((a, b) => a - b);
    document.getElementById('conteudo').innerHTML += 'sortfunction(): ' + valores.toString() + '<br>';        

    valores.sort((a, b) => b - a);
    document.getElementById('conteudo').innerHTML += 'sortfunction(): ' + valores.toString() + '<br>';            
    
    valores.sort((a, b) => 0.5 - Math.random());
    document.getElementById('conteudo').innerHTML += 'sortfunction(): ' + valores.toString() + '<br>';            
}

function sortobject() {    
    carros.sort((a, b) => a.ano - b.ano);
    
    carros.forEach(element => {        
        document.getElementById('conteudo').innerHTML +=  'Modelo: ' + element.modelo + ' - Ano: ' + element.ano + '<br>';
    });
}

function maparray() {
    var valoresmap = valores.map((element, i) => element * i);
    document.getElementById('conteudo').innerHTML += 'Original: ' + valores.toString() + '<br>';            
    document.getElementById('conteudo').innerHTML += 'map(): ' + valoresmap.toString() + '<br>';            
}

function filterarray() {
    var valoresfilter = valores.filter(element => element > 30);
    document.getElementById('conteudo').innerHTML += 'Original: ' + valores.toString() + '<br>';            
    document.getElementById('conteudo').innerHTML += 'filter(): ' + valoresfilter.toString() + '<br>';            
}

function reducearray() {
    var soma = valores.reduce((total, element) => total + element);
    document.getElementById('conteudo').innerHTML += 'Original: ' + valores.toString() + '<br>';            
    document.getElementById('conteudo').innerHTML += 'reduce(): ' + soma + '<br>';            
}

function everyarray() {
    var novo = valores.every(element => element > 30);
    document.getElementById('conteudo').innerHTML += 'Original: ' + valores.toString() + '<br>';            
    document.getElementById('conteudo').innerHTML += 'every(): ' + novo + '<br>';            
}

function somearray() {
    var novo = valores.some(element => element > 30);
    document.getElementById('conteudo').innerHTML += 'Original: ' + valores.toString() + '<br>';            
    document.getElementById('conteudo').innerHTML += 'some(): ' + novo + '<br>';            
}

function indexofarray() {
    var indice = frutas.indexOf("Manga");
    document.getElementById('conteudo').innerHTML += 'Original: ' + frutas.toString() + '<br>';            
    document.getElementById('conteudo').innerHTML += 'indexOf(): ' + indice + '<br>';            
}

function findarray() {
    var localizado = valores.find(element => element > 5 && element < 10);
    document.getElementById('conteudo').innerHTML += 'Original: ' + valores.toString() + '<br>';            
    document.getElementById('conteudo').innerHTML += 'find(): ' + localizado + '<br>';            
}