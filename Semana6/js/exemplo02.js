const margin = { top: 10, left: 100, bottom: 130, right: 10 };
const width  = 500;
const height = 260;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

svg.append("text")
   .attr("class", "x axis-label")
   .attr("x", width / 2)
   .attr("y", height + 120)
   .attr("font-size", "20px")
   .attr("text-anchor", "middle")
   .text("Os edifícios mais altos do mundo");

svg.append("text")
   .attr("class", "y axis-label")
   .attr("x", - (height / 2))
   .attr("y", -60)
   .attr("font-size", "20px")
   .attr("text-anchor", "middle")
   .attr("transform", "rotate(-90)")
   .text("Altura (m)")

d3.json("./data/buildings.json").then(data => {

    const xScale = d3.scaleBand()
                     .domain(data.map(d => d.name))
                     .range([0, width])
                     .paddingInner(0.3)
                     .paddingOuter(0.2);
  
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.height)])
                     .range([height, 0]);  // Alterar aqui

    const xAxisCall = d3.axisBottom(xScale);
  
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", `translate(0, ${height})`)
       .call(xAxisCall)
       .selectAll("text")
       .attr("y", "10")
       .attr("x", "-5")
       .attr("text-anchor", "end")
       .attr("transform", "rotate(-50)");

    const yAxisCall = d3.axisLeft(yScale)
                        .ticks(3)
                        .tickFormat(d => d + "m");

    svg.append("g")
       .attr("class", "y axis")
       .call(yAxisCall);

    const rects = svg.selectAll("rect")
                     .data(data)
                     .enter()
                     .append("rect")
                     .attr("y", d => yScale(d.height)) // Alterar aqui
                     .attr("x", d => xScale(d.name))
                     .attr("width", xScale.bandwidth())
                     .attr("height", d => height - yScale(d.height)) // Alterar aqui
                     .attr("fill", "grey");
});