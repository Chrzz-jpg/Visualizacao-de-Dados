const margin = { top: 50, left: 90, right: 40, bottom: 90 };
const width  = 710;
const height = 410;
 
const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);

const g = svg.append('g')
             .attr('transform', `translate(${margin.left}, ${margin.top})`);

g.append('text')
 .attr('y', -20)
 .attr("font-weight", "bold")
 .attr("font-size", "16px") 
 .text('Ranking dos 10 países mais populosos');
         
g.append('text')
 .attr('y', height + margin.top)
 .attr('x', (width / 2))
 .attr("font-weight", "bold")
 .attr("font-size", "16px")
 .style("text-anchor", "middle") 
 .text('População');
                
d3.csv('data/data2.csv').then(data => { 
    
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
      
    const xScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.population)])
                     .range([0, width]);
                 
    const xAxisTickFormat = d => d3.format('.3s')(d)
                                   .replace('G', 'B');
      
    const xAxis = d3.axisBottom(xScale)
                    .tickFormat(xAxisTickFormat)
                    .tickSize(-height);

    g.append('g')
     .call(xAxis)
     .attr('transform', `translate(0, ${height})`)
     .select('.domain')
     .remove();          
      
    const yScale = d3.scaleBand()
                     .domain(data.map(d => d.country))
                     .range([0, height])
                     .padding(0.1);

    g.append('g')
     .call(d3.axisLeft(yScale));
                            
    const colorScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.population)])
          .range(d3.schemeDark2);

    g.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('y', d => yScale(d.country))
     .attr('x', 0)
     .attr('width', d => xScale(d.population))
     .attr('height', yScale.bandwidth())
     .attr("fill", d => colorScale(d.population));      
});