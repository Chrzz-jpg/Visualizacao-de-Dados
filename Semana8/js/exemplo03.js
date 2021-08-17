const width  = 500;
const height = 50;

const svg = d3.select("#grafico")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

const coordsX = [10, 30, 50, 70, 90, 110, 130, 150, 170,
                 190, 210, 230, 250, 270, 290, 310, 330,
                 350, 370, 390, 410, 430, 450, 470, 490]

 var i = 0;
 
 var t = d3.interval(() => {
    svg.append("circle")
       .attr("cx", coordsX[i])
       .attr("cy", 10)
       .attr("r", 10)
       .attr("cy", "25");

    i++;
   
    if (i == 25) 
        t.stop();

 }, 200);