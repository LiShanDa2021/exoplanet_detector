console.log('let us see if this works this time')


function init() {
const url = '/api/close_planet_data'

d3.json(url).then(function(closePlanetData){

console.log(closePlanetData)

var planetSize = Object.values(closePlanetData['Planet Radius']);

var planetSizeScaled = planetSize.map(x=>x*10);

data = [{
  x: Object.keys(closePlanetData['Distance from Earth']), //change to habitability?
  y: Object.values(closePlanetData['Distance from Earth']),
  mode: 'markers',
  type: 'scatter',
  marker: {size: planetSizeScaled, color: Object.values(closePlanetData['Equilibrium Temperature'])},
  text: Object.values(closePlanetData['Planet Name'])
  }];

  Plotly.newPlot("plot", data);
  });

};
  
  d3.selectAll("#dropdownMenu").on("change", updatePlotly);
  function updatePlotly() {
    var dropdownMenu = d3.select("#dropdownMenu");
    var dataset = dropdownMenu.property("value");
  
    var xData = [1, 2, 3, 4, 5];
    var yData = [];
  
    if (dataset === 'Planets') {
      xData = closePlanetData['Distance From Earth'],
      yData = closePlanetData['Planet Radius'];
    };
  
    if (dataset === 'Stars') {
      xData = closeStarData['Distance From Earth']
      yData = closeStarData['Stellar Radius'];
    };
  
    var trace = {
      x: [xData],
      y: [yData],
    };
    Plotly.restyle("plot", trace);
  };
  
init();