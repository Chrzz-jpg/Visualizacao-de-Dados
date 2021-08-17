const width  = 500;
const height = 370;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

d3.json('./data/data.json').then(data => {                 

    console.table(data);

    const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("width", d => d.valor * 10)                        
                    .attr("height", 25)
                    .attr("y", (d, i) => i * 30 + 10);         
});