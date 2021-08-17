var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
        console.log(this.responseText);
        
        var dados = JSON.parse(this.responseText);

        let textTable = "<table>";
        textTable += `<tr>  
                          <td>Hora</td>
                          <td>Valor</td> 
                      </tr>`;        
        for(let i in dados) {
            textTable += `<tr>  
                              <td>${dados[i]['hora']}</td>
                              <td>${dados[i]['valor']}</td> 
                          </tr>`;
        }         
        textTable += '</table>'
        document.getElementById("dados").innerHTML = textTable;        

        console.log(dados);
    }
};

xmlhttp.open("GET", "./data/vendas.json", true);
xmlhttp.send();         