const margin = { top: 10, left: 50, bottom: 50, right: 150 };
const width  = 390;
const height = 370;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", -margin.left / 1.5)
   .attr("x", -(height / 2))
   .attr("font-size", "14px")
   .attr("font-weight", "bold")
   .style("text-anchor", "middle")
   .text("Quantidade de alunos"); 
			 
svg.append("text")
   .attr("y", height + (margin.bottom / 1.2))
   .attr("x", (width / 2))
   .attr("font-weight", "bold")
   .attr("font-size", "16px")
   .style("text-anchor", "middle")
   .text("Disciplinas do semestre 2021/1"); 

d3.csv("./data/data1e2.csv").then(data => {

    data.forEach(d => {
        d.aprovados = +d.aprovados;
        d.recuperacao = +d.recuperacao;
        d.reprovados = +d.reprovados;
        d.total = +d.total;         
    });

    const grupos = data.columns.slice(1, 4); 
    
    const disciplinas = data.map(d => (d.disciplina));

    const xScale = d3.scaleBand()
                     .domain(disciplinas)
                 	   .range([0, width])
                	   .padding([0.2]);

	const xAxis = d3.axisBottom(xScale)
					    .tickSizeOuter(0); 

    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(xAxis);

    const yScale = d3.scaleLinear()
                	 .domain([0, d3.max(data, d => d.total)])
                	 .range([height, 0]);
  
	const yAxis = d3.axisLeft(yScale);

    svg.append("g")
       .call(yAxis);

    const colorScale = d3.scaleOrdinal()
                    	 .domain(grupos)					
                    	 .range(['#4daf4a', '#ff8000', '#e41a1c']);

    const legend = svg.append("g")
                      .attr("transform", `translate(${width + 100}, ${height - 125})`);
         
    grupos.forEach((grupo, i) => {
        const legendRow = legend.append("g")
                                .attr("transform", `translate(0, ${i * 20})`);
                    
        legendRow.append("rect")
                 .attr("width", 10)
                 .attr("height", 10)
                 .attr("fill", colorScale(grupo));
                    
        legendRow.append("text")
                 .attr("x", -10)
                 .attr("y", 10)
                 .attr("text-anchor", "end")
                 .style("text-transform", "capitalize")
                 .text(grupo);
    });

    const stackedData = d3.stack()
                          .keys(grupos)(data);

    svg.append("g")
       .selectAll("g")
       .data(stackedData)
       .join("g")
       .attr("fill", d => colorScale(d.key))
       .selectAll("rect")
       .data(d => d)
       .join("rect")
       .attr("x", d => xScale(d.data.disciplina))
       .attr("y", d => yScale(d[1]))
       .attr("height", d => yScale(d[0]) - yScale(d[1]))
       .attr("width", xScale.bandwidth());
});