function repeticao(ate) {
    texto = '';
    count = 0;
    while(count < parseInt(ate)) {
        texto += count;
        count++;
    }
    alert('Repetição while: ' + texto);

    texto = '';
    for(count=0; count<parseInt(ate); count++) {
        texto += count;
    }

    alert('Repetição for: ' + texto);
}