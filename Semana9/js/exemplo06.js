const margin = { top: 30, left: 60, bottom: 70, right: 30 }; 
const width  = 370;
const height = 300;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

const data1 = 
[
    {group: "A", value: 4},
    {group: "B", value: 16},
    {group: "C", value: 8},
    {group: "D", value: 18},
    {group: "E", value: 10}        
];
 
const data2 = 
[
    {group: "A", value: 7},
    {group: "B", value: 10},
    {group: "C", value: 2},
    {group: "D", value: 8},
    {group: "E", value: 15},
    {group: "F", value: 11},
    {group: "G", value: 6}
];
 
const xScale = d3.scaleBand()
                 .range([0, width])
                 .padding(0.2);

const xAxis = svg.append("g")
                 .attr("transform", `translate(0, ${height})`);
 
const yScale = d3.scaleLinear()
                 .range([height, 0]);

const yAxis = svg.append("g");
 
function update(data) {

    const colorScale = d3.scaleLinear()
                         .domain([0, d3.max(data, d => d.value)])
                         .range(d3.schemeDark2);    
 
    xScale.domain(data.map(d => d.group));
    const xAxisCall = d3.axisBottom(xScale);
    xAxis.transition()
         .duration(1000)
         .call(xAxisCall);
 
    yScale.domain([0, d3.max(data, d => d.value)]);
    yAxisCall = d3.axisLeft(yScale);
    yAxis.transition()
         .duration(1000)
         .call(yAxisCall);
 
    var rects = svg.selectAll("rect")
                   .data(data);
 
    rects.join("rect") 
         .transition() 
         .duration(1000)
         .attr("x", d => xScale(d.group))
         .attr("y", d => yScale(d.value))
         .attr("width", xScale.bandwidth())
         .attr("height", d => height - yScale(d.value))
         .attr("fill", d => colorScale(d.value));
}
 
update(data1);

btdata1.addEventListener("click", () => {
	update(data1);
});

btdata2.addEventListener("click", () => {
	update(data2);
});
 