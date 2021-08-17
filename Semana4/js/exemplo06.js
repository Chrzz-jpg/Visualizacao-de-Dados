const dataArray = [22, 15, 28, 33, 42, 30, 48, 16, 20, 25, 18, 50]; //vendas do ano em milhares de reais

const width  = 500;
const height = 370;

const canvas = d3.select("#grafico")
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height);

const widthScale = d3.scaleLinear()
                     .domain([0, 55])
                     .range([0, width]);

const colorScale = d3.scaleLinear()
                     .domain([0, 55])
                     .range(["yellow", "red"]);
        
const bars = canvas.selectAll("rect")
                   .data(dataArray)
                   .enter()
                   .append("rect")
                   .attr("width", d => widthScale(d))
                   .attr("height", 20)
                   .attr("y", (d, i) => i * 30 + 10)
                   .attr("fill", d => colorScale(d)); 
