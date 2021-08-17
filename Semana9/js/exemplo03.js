const margin = { top: 10, left: 40, bottom: 90, right: 30 };
const width  = 390;
const height = 350;

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

    const xAxisBottom = d3.axisBottom(xScale);

    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(xAxisBottom)
       .selectAll("text")
       .attr("transform", "translate(-10, 0) rotate(-45)")
       .style("text-anchor", "end");

    const yScale = d3.scaleLinear()
                     .domain([0, 16000])
                     .range([height, 0]);

    const yAxisLeft = d3.axisLeft(yScale);

    svg.append("g")
       .call(yAxisLeft);

    const colorScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.valor)])
                         .range(d3.schemeTableau10);    

    svg.selectAll("rect")
       .data(data)
       .join("rect")
       .attr("x", d => xScale(d.cargo))
       .attr("width", xScale.bandwidth())
       .attr("fill", d => colorScale(d.valor))
       .attr("height", d => height - yScale(0))
       .attr("y", d => yScale(0));


    svg.selectAll("rect")
       .transition()
       .duration(800)
       .attr("y", d => yScale(d.valor))
       .attr("height", d => height - yScale(d.valor))
       .delay((d, i) => i * 500);

});
