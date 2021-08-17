const margin = 
{ 
    top: 30,
    left: 50,
    bottom: 30,
    right: 10
};
const width = 500;
const height = 300;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

const yScale = d3.scaleLinear()
                 .domain([0, 10])
                 .range([height, 0]);
        
const yAxisCall = d3.axisLeft(yScale)
                    .ticks(5);

svg.append("g")
   .call(yAxisCall);

const colorScale = d3.scaleLinear()
                     .domain([0, 10])   
                     .range(["red", "blue"]);

const title = svg.append("text")                     
                 .attr("x", width / 2)
                 .attr("y", -10)
                 .attr("font-size", "20px")
                 .attr("text-anchor", "middle")
                 .text("");

d3.json("./data/gradesdisciplinas.json").then(data => {

    let disciplina = 1;

    update(data[0]);

    d3.interval(() => {
        update(data[disciplina]);
        disciplina = (disciplina == 0) ? 1 : 0;
    }, 500);
});

function update(data) {

    const xScale = d3.scaleBand()
                     .domain(data.notas.map(d => d.nome))
                     .range([0, width])
                     .paddingOuter(0.2)
                     .paddingInner(0.3);

    const xAxisCall = d3.axisBottom(xScale);

    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(xAxisCall);

    const t = d3.transition()
                .duration(300);

    const rects = svg.selectAll("rect")
                     .data(data.notas);

    //rects.exit()
    //     .remove();

    //rects.enter()
    //     .append("rect")
    
    rects.join("rect")
         .merge(rects)   
         .transition(t)
         .attr("y", d => yScale(d.nota / 10))
         .attr("x", d => xScale(d.nome))         
         .attr("width", xScale.bandwidth())
         .attr("height", d => height - yScale(d.nota / 10))
         .attr("fill", d => colorScale(d.nota / 10));

    title.text(data.disciplina);
}