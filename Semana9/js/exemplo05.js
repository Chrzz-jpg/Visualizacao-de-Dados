const margin = { top: 30, left: 60, bottom: 70, right: 30 };
const width  = 370;
const height = 300;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./data/data1.csv").then(data => {

    const xScale = d3.scaleBand()
                     .range([0, width])
                     .domain(data.map(d => d.cargo))
                     .padding(0.2);

    const xAxisCall = d3.axisBottom(xScale);
   
    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(xAxisCall)
       .selectAll("text")
       .attr("transform", "translate(-10, 0) rotate(-45)")
       .style("text-anchor", "end");

    const yScale = d3.scaleLinear()
                     .domain([0, 16000])
                     .range([height, 0]);
          
    const yAxisCall = d3.axisLeft(yScale);

    svg.append("g")
       .call(yAxisCall);

    svg.selectAll("rect")
       .data(data)
       .join("rect")
       .attr("x", d => xScale(d.cargo))
       .attr("y", d => yScale(d.valor))
       .attr("width", xScale.bandwidth())
       .attr("height", d => height - yScale(d.valor))
       .attr("fill", "red");
});

function changeColor(color) {

    d3.selectAll("rect")
      .transition()
      .duration(2000)
      .style("fill", color);
}

colors.addEventListener("change", (event) => {

	changeColor(event.target.value);
});