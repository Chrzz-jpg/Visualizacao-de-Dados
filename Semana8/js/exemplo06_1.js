// Baseado nos exemplos do Mastering Data Visualization with D3.js
// Do link: https://github.com/adamjanes/udemy-d3

const margin = { top: 10, left: 100, right: 10, bottom: 100 };
const width  = 690;
const height = 390;

let time = 0;

const g = d3.select("#grafico")
			  .append("svg")
			  .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
			  .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xLabel = g.append("text")
  			    .attr("y", height + 50)
			    .attr("x", width / 2)
			    .attr("font-size", "20px")
			    .attr("text-anchor", "middle")
			    .text("PIB per capita ($)");

const yLabel = g.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", -40)
				.attr("x", -170)
				.attr("font-size", "20px")
				.attr("text-anchor", "middle")
				.text("Expectativa de vida (anos)");

const timeLabel = g.append("text")
 				   .attr("y", height - 10)
				   .attr("x", width - 40)
				   .attr("font-size", "40px")
				   .attr("opacity", "0.4")
				   .attr("text-anchor", "middle")
				   .text("");				

const continentColor = d3.scaleOrdinal(d3.schemePastel1);	

const xScale = d3.scaleLog()
				 .base(10)
				 .range([0, width])
				 .domain([142, 150000]);

const xAxisCall = d3.axisBottom(xScale)
   					.tickValues([400, 4000, 40000])
   					.tickFormat(d3.format("$"));

g.append("g")
 .attr("class", "x axis")
 .attr("transform", `translate(0, ${height})`)
 .call(xAxisCall);

const yScale = d3.scaleLinear()
				 .range([height, 0])
				 .domain([0, 90]);

const yAxisCall = d3.axisLeft(yScale);

g.append("g")
 .attr("class", "y axis")
 .call(yAxisCall);					 

const area = d3.scaleLinear()
			   .range([25 * Math.PI, 1500 * Math.PI])
			   .domain([2000, 1400000000]);

const continents = ["europe", "asia", "americas", "africa"];

const legend = g.append("g")
	            .attr("transform", `translate(${width - 10}, ${height - 125})`);

continents.forEach((continent, i) => {
	const legendRow = legend.append("g")
		                    .attr("transform", `translate(0, ${i * 20})`);

	legendRow.append("rect")
             .attr("width", 10)
             .attr("height", 10)
		     .attr("fill", continentColor(continent));

	legendRow.append("text")
             .attr("x", -10)
             .attr("y", 10)
             .attr("text-anchor", "end")
             .style("text-transform", "capitalize")
             .text(continent);
}); 			   

d3.json("data/data1.json").then(data => {

	const formattedData = data.map(year => {
		return year["countries"].filter(country => {
			const dataExists = (country.income && country.life_exp);
			return dataExists;
		}).map(country => {
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			return country
		});
	});

	update(formattedData[time]);
    time = time + 213;
    update1(formattedData[time]);
    time = time + 1;
    update1(formattedData[time]);    
})

function update(data) {

	const circles = g.selectAll("circle")
		             .data(data, d => d.country)
					 .enter()
           			 .append("circle")
					 .attr("class", "bubbles")
		   			 .attr("fill", d => continentColor(d.continent))
		   			 .attr("cy", d => yScale(d.life_exp))
		   			 .attr("cx", d => xScale(d.income))
		   			 .attr("r", d => Math.sqrt(area(d.population) / Math.PI));    

    console.log(circles);
    
	timeLabel.text(String(time + 1800));
}

function update1(data) {

	const circles = g.selectAll("circle")
		             .data(data, d => d.country);

	circles.exit()
		   .remove();    
           
	circles.enter()
           .append("circle")
		   .attr("fill", d => continentColor(d.continent))
		   .merge(circles)
		   .attr("class", "bubbles")
		   .attr("cy", d => yScale(d.life_exp))
		   .attr("cx", d => xScale(d.income))
		   .attr("r", d => Math.sqrt(area(d.population) / Math.PI));

    console.log(circles);

	timeLabel.text(String(time + 1800));
}