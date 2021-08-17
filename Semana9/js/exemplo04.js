const margin = { top: 10, left: 30, bottom: 30, right: 100 };
const width  = 330;
const height = 360;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

let dataTotal;
let line;
let dot;

const allGroup = ['valueA', 'valueB', 'valueC'];

d3.select("#selectButton")
  .selectAll('myOptions')
  .data(allGroup)
  .enter()
  .append('option')
  .text(d => d)
  .attr("value", d => d);

const xScale = d3.scaleLinear()
                 .domain([0, 10])
                 .range([0, width]);

const xAxisCall = d3.axisBottom(xScale);

svg.append("g")
   .attr("transform", `translate(0, ${height})`)
   .call(xAxisCall);

const yScale = d3.scaleLinear()
                 .domain([0, 20])
                 .range([height, 0]);

const yAxisCall = d3.axisLeft(yScale);

svg.append("g")
   .call(yAxisCall);
          
d3.csv("./data/data2.csv").then(data => {

    dataTotal = data;
    
    line = svg.append('g')
              .append("path")
              .datum(data)
              .attr("d", d3.line()
                           .x(d => xScale(+d.time))
                           .y(d => yScale(+d.valueA))
              )
              .attr("stroke", "black")
              .style("stroke-width", 4)
              .style("fill", "none");

    dot = svg.selectAll('circle')
             .data(data)
             .join('circle')
             .attr("cx", d => xScale(+d.time))
             .attr("cy", d => yScale(+d.valueA))
             .attr("r", 7)
             .style("fill", "red");
});

function update(selectedGroup) {

    const dataFilter = dataTotal.map(d => { return {time: d.time, value:d[selectedGroup]} });

    line.datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
                     .x(d => xScale(+d.time))
                     .y(d => yScale(+d.value))
        );

    dot.data(dataFilter)
       .transition()
       .duration(1000)
       .attr("cx", d => xScale(+d.time))
       .attr("cy", d => yScale(+d.value));
}

d3.select("#selectButton").on("change", (event, d) => {
    
    let selectedOption = d3.select(event.target).property("value");

    update(selectedOption);
});