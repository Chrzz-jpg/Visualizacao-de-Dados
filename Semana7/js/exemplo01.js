const margin = { top: 50, left: 100, right: 30, bottom: 30 };
const width  = 470;
const height = 320;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
	          .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

svg.append("text")   
   .attr("y", -(margin.left / 1.2))
   .attr("x", -(height / 2))
   .attr("font-size", "12px")
   .style("text-anchor", "middle")
   .attr("transform", "rotate(-90)")
   .text("Número total de entrada de turistas"); 

svg.append("text")
   .attr("y", -(margin.top / 2))
   .attr("x", (width / 2))
   .attr("font-weight", "bold")
   .attr("font-size", "16px")
   .style("text-anchor", "middle")
   .text("Número total de entradas de turistas na Itália");   

d3.csv("data/data1.csv").then(data => {

    data = data.map(d => { 
        return { date: d.date, value: +d.IT }; 
    });

    data.forEach(d => d.date = d3.timeParse("%Y-%m-%d")(d.date));

    const xScale = d3.scaleTime()
                     .domain(d3.extent(data, d => d.date))
                     .range([0, width]);
    
    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.value)])
                     .range([height, 0]);
      
    svg.append("g")
       .call(d3.axisLeft(yScale));

    svg.append("linearGradient")
       .attr("id", "line-gradient")
       .attr("gradientUnits", "userSpaceOnUse")
       .attr("x1", 0)
       .attr("y1", yScale(0))
       .attr("x2", 0)
       .attr("y2", yScale(d3.max(data, d => d.value)))
       .selectAll("stop")
       .data([
            {offset: "0%", color: "blue"},
            {offset: "100%", color: "red"}
       ])
       .enter()
       .append("stop")
       .attr("offset", d => d.offset)
       .attr("stop-color", d => d.color);
            
    svg.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "url(#line-gradient)")
       .attr("stroke-width", 1.5)
       .attr("d", d3.line()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.value))
        );

});
