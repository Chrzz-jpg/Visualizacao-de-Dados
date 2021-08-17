//Criação das margens
const margin = {
  top: 30,
  left: 50,
  bottom: 50,
  right: 10,
};
//definição de constantes com largura e altura
const width = 600;
const height = 400;

/*
- criando o svg
- adicionando atributos de altura e largura personalizados baseados nas margens já definidas
- adicionando o grupo "g" ao svg
- utilizando o transform.transalte para 'traduzir' o numero de pixels
 horizontais e verticais para o elemento para sua 'nova' orientação

*/
const svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

/*
definindo uma yScale como linear com os valores minimos 0 e maximos 10(para mais 
  detalhamento dos dados) e com um range sendo crescente de baixo para cima
*/
const yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);

/*
Definindo a orientação dos valores em relação ao eixo e o valor de ticks (medidas)
*/
const yAxisCall = d3.axisLeft(yScale).ticks(10);

/*
após a definir o eixo y se agrega estes valores ao grupo 
*/
svg.append("g").call(yAxisCall);

/*
Definição da palheta de cores do grafico, utilizando as mesmas confirurações
básica da escala e definindo o range para cinza e verde, ele irá variar de cinza
como o menor valora até verde como o maior valor
*/
const colorScale = d3.scaleLinear().domain([0, 10]).range(["grey", "green"]);

/*
definição do texto titulo do svg passando a orientação em relação ao eixo x como
  a metade do proprio valor de x e em relação a y como sendo 10p a cima do eixo
definição da fonte
definição da ancora do texto como sendo o meio do svg (orientação central)
e definindo o próprio texto como vazio para ser manipulado depois
*/
const title = svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", -10)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("");

/*
Criando e ajustando uma label para eixo x
*/

const xLabel = svg
  .append("text")
  .attr("y", height + 50)
  .attr("x", width / 2 )
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Moradores");
  
/*
Criando e ajustando uma label para eixo y
*/
const yLabel = svg
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -40)
  .attr("x", -200)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Idade (anos)");

/*
--------
d3.json Envia uma solicitação http para o url especificado para carregar o arquivo .json
ou dados e executa a função de retorno de chamada com objetos de dados json analisados
--------
Neste caso, como temos arquivos locais, ele apenas buscou os arquivos ao invés de requistar por http
*/
d3.json("./data/data.json").then((data) => {
  update(data[0]);
});

/*
função para jogar/atualizar os dados na tela
*/
function update(data) {
  /*
  criando a escala de x como sendo escala de banda
  passando a função map ao item pessoas do json
  definindo o range da escala como sendo o minimo valor = 0 e o maximo a propria largura
  definindo o espacamento de fora das barras para 0.2 e o de dentro das barras para 0.3
  */
  const xScale = d3
    .scaleBand()
    .domain(data.people.map((d) => d.name))
    .range([0, width])
    .paddingOuter(0.2)
    .paddingInner(0.3);

  /*
  Definindo a orientação dos valores em relação ao eixo e os valores da escala
    como sendo os valores já mapeados
  */
  const xAxisCall = d3.axisBottom(xScale);
  /*
  transforamndo a orientação do eixo para como sendo o valor 0 em x e o próprio valor
  da sua altura, assim ele começa em x=0 e se posiciona em relação a y na parte mais
  inferior possivel
  */
  svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxisCall);

  /*
  criando a const de rects e selecionando todos os itens "react" que encontrar e passando
    o valor do json.pessoas 
  */
  const rects = svg.selectAll("rect").data(data.people);

  /*
  A função enter () cria a junção inicial dos dados com nossos elementos DOM. 
    Selecionando assim apenas os elementos que ainda não estavam no DOM
  função merge () selecionará os elementos DOM que não existiam
    no DOM antes e os que existiam
  A função exit () selecionará os elementos DOM que sobraram da junção.
  */

  /*
     vinculando ao eixo y os dados de idade
     vinculando ao eixo x os dados de nome
     passando a função bandwidth a gente se ausenta de calcular os espações das
      escalas de x e o d3 faz isso sozinho
    da mesma forma para y porem passando os dados de idade para a escala
    por fim passamos a métrica de cor da escala y, sendo os dados de idade do json
  */
  rects
    .enter()
    .append("rect")
    .merge(rects)
    .attr("y", (d) => yScale(d.age / 10))
    .attr("x", (d) => xScale(d.name))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.age / 10))
    .attr("fill", (d) => colorScale(d.age / 10));

  /*
  definindo o titulo criando anteriormente passando para seu atributo
    até então vazio o dado que se encontra dentro do json.
  */
  title.text(data.title);
}
