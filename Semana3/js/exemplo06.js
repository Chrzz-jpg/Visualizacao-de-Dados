function Cachorro(nome, raca, adestrado, idade) {
    this.nome = nome;
    this.raca = raca;
    this.adestrado = adestrado;    
    this.idade = idade;

    this.mostraDados = function() {
          document.write("<pre> <b>Cachorro</b></pre>");	
          document.write("<pre>  Nome: " + this.nome + "</pre>");	
          document.write("<pre>  Raça: " + this.raca + "</pre>");	
          document.write("<pre>  Adestrado: " + this.adestrado + "</pre>");	          
          document.write("<pre>  Idade: " + this.idade + "</pre>");	
    }
  
}
  
cachorro1 = new Cachorro("Bob", "Doberman", true, 5);
cachorro2 = new Cachorro("Kiko", "Pincher", false, 2);
   
function mostraDoisCachorros() {
    cachorro1.mostraDados();
    cachorro2.mostraDados();
}