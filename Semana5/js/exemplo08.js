d3.csv('./data/buble1.csv').then(data => {

    const heigth = 100;
    const radius = (heigth / 2) - 10;
    const width = ((radius + 1) * 2) * d3.count(data, d => d.value);    

    const svg = d3.select("#grafico")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", heigth + 10);    

    const y = d3.scaleLog()
                .domain([d3.min(data, d => d.value) / 2, d3.max(data, d => d.value)])
                .range([0, radius])
                .base(10);
    
    const mult = y(d3.max(data, d => d.value));

    const circle = svg.selectAll('circle')
                      .data(data)
                      .enter()
                      .append("circle")
                      .attr('cx', (d, i) => (i * mult * 2) + mult + 5)
                      .attr('cy', 50)
                      .attr('r', d => y(d.value))
                      .attr("fill", "red");    

    const texts = svg.selectAll("text")
                     .data(data)
                     .enter()
                     .append("text")
                     .text(d => d.value)
                     .attr("text-anchor", "middle")
                     .attr("x", (d, i) => (i * mult * 2) + mult + 5)
                     .attr("y", heigth + 5)
                     .attr("font-family", "sans-serif")
                     .attr("font-size", "11px")
                     .attr("fill", "black");                       
});