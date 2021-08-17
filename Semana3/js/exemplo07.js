function limpaDiv() {
    div = document.getElementById('conteudo');
    div.innerHTML = '';
}

function Cliente(codigo, nome, documento) {
    this.codigo = codigo;
    this.nome = nome;
    this.documento = documento;
    this.mostraDados = () => {
        div = document.getElementById('conteudo');
        div.innerHTML = div.innerHTML + 
                        "<pre> <b>Cliente</b></pre>" +	
                        "<pre>  Código: " + this.codigo + "</pre>" +
                        "<pre>  Nome: " + this.nome + "</pre>" +	
                        "<pre>  Documento: " + this.documento + "</pre>";	
    }  
}
  
function Conta(banco, agencia, numero, saldo, cliente) {
    this.banco = banco;
    this.agencia = agencia;
    this.numero = numero;
    this.saldo = saldo;
    this.cliente = cliente;
    this.mostraDados = () => {
        limpaDiv();
        div = document.getElementById('conteudo');
        div.innerHTML = div.innerHTML +         
                        "<pre><b>Conta</b></pre>" + 	
                        "<pre> Banco: " + this.banco + "</pre>" +	
                        "<pre> Agência: " + this.agencia + "</pre>" + 
                        "<pre> Número: " + this.numero + "</pre>" +
                        "<pre> Saldo: " + this.saldo + "</pre>";	
        this.cliente.mostraDados();
    }
    this.depositoConta = (deposito) => {
        this.saldo += parseFloat(deposito);
    }
    this.saqueConta = (saque) => {
        this.saldo -= parseFloat(saque);
    }
    this.mostraSaldo = () => {
        limpaDiv();
        div = document.getElementById('conteudo');
        div.innerHTML = div.innerHTML + "<pre> Saldo: " + this.saldo + "</pre>";
    }
}

cliente1 = new Cliente(1, "Cliente teste", "000.000.000-00") 
conta1 = new Conta("104", "0427", "1515-1", 0.00, cliente1);
  
function mostraConta() {
    conta1.mostraDados();
}

function movimento(valor) {
    parseFloat(valor) > 0 ? conta1.depositoConta(parseFloat(valor)) : conta1.saqueConta(parseFloat(valor) * -1);
}

function mostraSaldo() {
    conta1.mostraSaldo();
}