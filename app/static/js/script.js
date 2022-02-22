console.log('do the titles appear now?')

function init() {
const url = '/api/close_planet_data'

d3.json(url).then(function(closePlanetData){

console.log(Object.values(closePlanetData['Equilibrium Temperature']))

var planetSize = Object.values(closePlanetData['Planet Radius']);
var planetSizeScaled = planetSize.map(x=>x*10);

function planetColorScale(c) {
  if (c < 100) {return 'white';} 
  else if (c < 200) {return 'rgb(176,224,230)';}
  else if (c < 250) {return 'blue';}
  else if (c < 300) {return 'green';}
  else if (c < 400) {return 'yellow';}
  else if (c < 500) {return 'orange';}
  else {return 'red';}
};
var planetColor = Object.values(closePlanetData['Equilibrium Temperature']).map(x=>planetColorScale(x));

//var starSize = Object.values(closePlanetData['Stellar Radius']);
//var starSizeScaled = starSize.map(x=>x*10);

// just keepig this here
//Object.values(closePlanetData['Equilibrium Temperature'])

data = [{
  x: Object.values(closePlanetData['Distance from Earth']),
  y: Object.values(closePlanetData['Distance from Host Star']),
  mode: 'markers',
  marker: {size: planetSizeScaled, color: planetColor},
  text: Object.values(closePlanetData['Planet Name']),
  type: 'scatter',
  }];

  var layout= {
    plot_bgcolor:"#FFF3",
    paper_bgcolor:"#FFF3",
    title: {text:"Kepler Confirmed Planets", font: {family: 'Arial', size: 24, color: "white"}},
    xaxis: {title: {text: "Distance from Earth (Light Years)", font: {family: 'Arial', size: 14, color: 'white'}, showgrid:false, zerolinecolor:"white", tickcolor: "white"}},
    yaxis: {title: {text: "Distance from Host Star (Astronomical Units)", font: {family: 'Arial', size: 14, color: 'white'}, showgrid:false, zerolinecolor:"white", tickcolor: "white"}},
}

  Plotly.newPlot("plot", data, layout);
  
  });

};

init();

  d3.selectAll("#dropdownMenu").on("change", updatePlotly);
  function updatePlotly() {
  const url = '/api/close_planet_data';
  d3.json(url).then((closePlanetData) => {
    var dropdownMenu = d3.select("#dropdownMenu");
    var dataset = dropdownMenu.property("value");
  
  var planetSize = Object.values(closePlanetData['Planet Radius']);
  var planetSizeScaled = planetSize.map(x=>x*10);
    
  var starSize = Object.values(closePlanetData['Stellar Radius']);
  var starSizeScaled = starSize.map(x=>x*100);

  function planetColorScale(c) {
    if (c < 100) {return 'rgb(255,255,255)';} 
    else if (c < 200) {return 'rgb(176,224,230)';}
    else if (c < 250) {return 'blue';}
    else if (c < 300) {return 'green';}
    else if (c < 400) {return 'yellow';}
    else if (c < 500) {return 'orange';}
    else {return 'red';}
  };
  var planetColor = Object.values(closePlanetData['Equilibrium Temperature']).map(x=>planetColorScale(x));

  function starColorScale(c) {
    if (c < 2800) {return 'brown';} 
    else if (c < 4000) {return 'red';}
    else if (c < 6000) {return 'orange';}
    else if (c < 10000) {return 'yellow';}
    else if (c < 25000) {return 'white';}
    else {return 'blue';}
  };
  var starColor = Object.values(closePlanetData['Stellar Temperature']).map(x=>starColorScale(x));
  
  var xData;
  var yData;
  var text;
  var chartTitle;
  var xtitle;
  var ytitle;
  
    if (dataset === 'Stars') {
      xData = Object.values(closePlanetData['Distance from Earth']);
      yData = Object.values(closePlanetData['Stellar Temperature']);
      text = Object.values(closePlanetData['Star Name']);
      size = starSizeScaled;
      temp = starColor;
      chartTitle = "Kepler Stars with Confirmed Planets";
      xtitle = "Distance from Earth (Light Years)";
      ytitle = "Number of Exoplanets in System";
      console.log('You chose stars.');
    };

    if (dataset === 'Planets') {
      xData = Object.values(closePlanetData['Distance from Earth']);
      yData = Object.values(closePlanetData['Distance from Host Star']);
      text = Object.values(closePlanetData['Planet Name']);
      size = planetSizeScaled;
      temp = planetColor;
      chartTitle = "Kepler Confirmed Planets";
      xtitle = "Distance from Earth (Light Years)";
      ytitle = "Distance from Host Star (Astronomical Units)";
      console.log('You chose planets.');
    };

    var trace = {
      x: [xData],
      y: [yData],
      mode: 'markers',
      type: 'scatter',
      marker: {size: size, color: temp},
      text: text,
    };
    
    var layout= {
      plot_bgcolor:"#FFF3",
      paper_bgcolor:"#FFF3",
      title: {text:chartTitle, font: {family: 'Arial', size: 24, color: "white"}},
      xaxis: {title: {text: xtitle, font: {family: 'Arial', size: 14, color: 'white'}, showgrid: false, zerolinecolor:"white", tickcolor: "white"}},
      yaxis: {title: {text: ytitle, font: {family: 'Arial', size: 14, color: 'white'}, showgrid: false, zerolinecolor:"white", tickcolor: "white"}},
    }

    Plotly.restyle("plot", trace, layout);
  });
  };
  
  d3.selectAll("#dropdownMenu").on("change", updatePlotly);