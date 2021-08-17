frutas = new Array();

function adicionarFruta(fruta) {
    frutas[frutas.length++] = fruta; 
    document.getElementById('edtfruta').value = '';
}

function listarFrutas() {
    div = document.getElementById('conteudo');
    div.innerHTML = '';
    frutas.forEach(element => {        
        div.innerHTML +=  element + '<br>';
    });
}