const margin = { top: 10, left: 50, bottom: 50, right: 30 };
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
   .attr("y", 0 - margin.left + 5)
   .attr("x", 0 - (height / 2))
   .attr("dy", "1em")
   .attr("font-size", "14px")
   .style("text-anchor", "middle")
   .text("Quantidade de alunos"); 
			 
svg.append("text")
   .attr("y", height + (margin.bottom / 2))
   .attr("x",(width / 2))
   .attr("dy", "1em")
   .attr("font-weight", "bold")
   .attr("font-size", "16px")
   .style("text-anchor", "middle")
   .text("Disciplinas do semestre 2021/1"); 

d3.csv("./data/data3e4.csv").then(data => {

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
                    .tickSize(0);

    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(xAxis);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.aprovados)])
                .range([height, 0]);

    const yAxis = d3.axisLeft(y);

    svg.append("g")
       .call(yAxis);

    const xSubgroup = d3.scaleBand()
                        .domain(grupos)
                        .range([0, xScale.bandwidth()])
                        .padding([0.05]);

    const colorScale = d3.scaleOrdinal()
                         .domain(grupos)
                         .range(['#4daf4a', '#ff8000', '#e41a1c']);

    svg.append("g")
       .selectAll("g")
       .data(data)
       .join("g")
       .attr("transform", d => `translate(${xScale(d.disciplina)}, 0)`)
       .selectAll("rect")
       .data(d => grupos.map(key => { return {key: key, value: d[key]}; }))
       .join("rect")
       .attr("x", d => xSubgroup(d.key))
       .attr("y", d => y(d.value))
       .attr("width", xSubgroup.bandwidth())
       .attr("height", d => height - y(d.value))
       .attr("fill", d => colorScale(d.key));
});