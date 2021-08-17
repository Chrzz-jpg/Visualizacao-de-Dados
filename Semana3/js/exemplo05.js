function localizarPrimeiroNome(nomecompleto) {
    espacopos = nomecompleto.indexOf(' ');
    primeironome = nomecompleto.substr(0, parseInt(espacopos));
    alert(primeironome);    
}