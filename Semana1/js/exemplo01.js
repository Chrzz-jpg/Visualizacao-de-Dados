//Definir margens e tamanhos do grafico
const margin = { top: 10, right: 10, bottom: 100, left: 110 };
const width  = 900;
const height = 500;

// Desenha o svg dentro do div com id grafico
const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);

//Desenha o label do eixo x
svg.append("text")
   .attr("x", (width / 2) + 50)
   .attr("y", height + 70)
   .attr("font-size", "22px")
   .attr("text-anchor", "middle")
   .text("Vendas de produtos do ano 2020 por horário");

//Desenha o label do eixo y
svg.append("text")
   .attr("x", -((height + margin.bottom + margin.top) / 2))
   .attr("y", 25)
   .attr("font-size", "22px")
   .attr("text-anchor", "middle")
   .attr("transform", "rotate(-90)")
   .text("Vendas em R$");

//Carrega os dados do arquivo vendas.json
d3.json("./data/vendas.json").then(data => {

    data = data.slice().sort((a, b) => d3.ascending(a.hora, b.hora));

    //Define a escala do eixo X
    const xAxis = d3.scaleBand()
                    .domain(data.map(d => d.hora)) 
                    .range([0, width])
                    .paddingInner(0.3)
                    .paddingOuter(0.2);

    //Define a chamada da função do eixo x
    const xAxisCall = d3.axisBottom(xAxis);

    //Desenha o eixo x
    svg.append("g")
       .attr("transform", `translate(${margin.left - 14}, ${height})`)
       .call(xAxisCall)
       .selectAll("text")
       .attr("Y", "10")
       .attr("x", "5")
       .attr("text-anchor", "end");

    //Define a escala do eixo y
    const yAxis = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.valor)])
                    .range([height, 0]);

    //Define a chamada da funcao do eixo y
    const yAxisCall = d3.axisLeft(yAxis)
                        .ticks(5)
                        .tickFormat(d => "R$ " + d);

    //Desenha o eixo Y
    svg.append("g")
       .attr("transform", `translate(${margin.left - 14}, 0)`) 
       .call(yAxisCall);

    //Define a escalo das barras
    const yRect = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.valor) + 1000])
                    .range([height, 0]);

    //Cria uma escala de cores
    const colorScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.valor)])
                         .range(["yellow", "red"]);

    //Desenha as barras
    const rects = svg.selectAll()
                     .data(data)
                     .enter()
                     .append("rect")
                     .attr("y", d => yRect(d.valor))
                     .attr("x", (d, i) => (i *  60 + margin. left))
                     .attr("width", 40)
                     .attr("height", d => height - yRect(d.valor))
                     .attr("fill", d => colorScale(d.valor));
});