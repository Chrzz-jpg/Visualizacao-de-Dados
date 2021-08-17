const margin = { top: 10, left: 100, bottom: 130, right: 10 }
const width  = 550;
const heigth = 450;  

console.log(d3);

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", heigth + margin.top + margin.bottom + 20)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);              

svg.append("text")
   .attr("x", (width / 2))
   .attr("y", heigth + margin.top + margin.bottom)
   .attr("font-size", "22px")
   .attr("text-anchor", "middle")
   .text("Média salarial de TI do ano 2020");

svg.append("text")
   .attr("x", -(heigth / 2))
   .attr("y", -70)
   .attr("font-size", "20px")
   .attr("text-anchor", "middle")
   .attr("transform", "rotate(-90)")
   .text("Salários em R$");   

d3.json('./data/jobs.json').then(data => {

    const xScale = d3.scaleBand()
                     .domain(data.map(d => d.job))
                     .range([0, width])
                     .paddingInner(0.3)
                     .paddingOuter(0.2);  
                 
    const xAxisCall = d3.axisBottom(xScale);
    
    svg.append("g")
       .attr("transform", `translate(0, ${heigth})`)
       .call(xAxisCall)
       .selectAll("text")
       .attr("y", "10")
       .attr("x", "-5")
       .attr("text-anchor", "end")
       .attr("transform", "rotate(-40)");    

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.salary)])
                     .range([heigth, 0]);

    const yAxisCall = d3.axisLeft(yScale)
                        .ticks(5)
                        .tickFormat(d => "R$" + d);

    svg.append("g")
       .call(yAxisCall);

    const yRect = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.salary) + 1000])
                    .range([heigth, 0]);

    const colorScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.salary)])
                         .range(["yellow", "blue"]);

    const rects = svg.selectAll("rect")
                     .data(data)
                     .enter()
                     .append("rect")
                     .attr("y", d => yRect(d.salary))
                     .attr("x", (d, i) => (i * xScale.step() + (xScale.bandwidth() * xScale.padding())))
                     .attr("width", xScale.bandwidth())
                     .attr("height", d => heigth - yRect(d.salary))
                     .attr("fill", d => colorScale(d.salary));
});