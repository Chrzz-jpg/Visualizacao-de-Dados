// Definição das margens do gráfico
const margin = { 
                    top: 30, 
                    left: 100, 
                    bottom: 100, 
                    right: 30
                };
// Definição das dimenções do gráfico
const width  = 500;
const height = 370;

// Desenha o svg dentro do div, cria o grupo do svg e movimenta o grafico para a direita e para baixo
const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")              
              .attr("transform", `translate(${margin.left}, ${margin.top})`);
              //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Carrega os dados do arquivo JSON
d3.json('./data/data.json').then(data => {                 

    // Cria a callback da escala linear do comprimento das barras
    const widthScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.valor)])
                         .range([0, width]);

    // Cria a callback da escala linear das cores das barras do gráfico
    const colorScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.valor)])
                         .range(d3.schemeCategory10);

    console.log(d3.schemeCategory10);
    console.log(d3.max(data, d => d.valor));
                         
    const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()  
                    .append("rect")  
                    .attr("width", d => widthScale(d.valor))  
                    .attr("height", 20) 
                    .attr("y", (d, i) => i * 30 + 10) 
                    .attr("fill", d => colorScale(d.valor)); 
});