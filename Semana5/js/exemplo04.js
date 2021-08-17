const width  = 500;
const height = 370;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

d3.json('./data/data.json').then(data => {                 

    const widthScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.valor)])
                         .range([0, width]);

    const colorScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.valor)])
                         .range(["yellow", "blue"]);

    const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()  
                    .append("rect")  
                    .attr("width", d => widthScale(d.valor))  
                    .attr("height", 25) 
                    .attr("y", (d, i) => i * 30 + 10) 
                    .attr("fill", d => colorScale(d.valor)); 
});