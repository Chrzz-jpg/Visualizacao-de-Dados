var numeros = [1, 2, 3, 6, 8, 10, 11, 13, 15, 20, 18, 35, 33, 48, 50, 55, 71, 77, 85, 90, 99];

function filterarray() {
    var valoresfilter = numeros.filter(element => element > 30);
    return valoresfilter;
}

document.getElementById('teste').innerHTML = filterarray();