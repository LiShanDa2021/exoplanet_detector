console.log('/static/js/script.js')

function init() {
const url = '/api/close_planet_data'

d3.json(url).then(function(closePlanetData){

//attempt to filter json object
//look at belly button unit
//in class activities unit 12
//can be done!
//d3 selector
//for loop?
//map?
console.log(closePlanetData);
console.log(closePlanetData['Distance from Earth'][29])

planetArray=(Object.keys(closePlanetData['Planet Name']));
// planetNamesArray=(Object.values(closePlanetData['Planet Name']));
// planetTemps = (Object.values(closePlanetData['Equilibrium Temperature']));
// starNamesArray=(Object.values(closePlanetData['Star Name']));
// starTemps = (Object.values(closePlanetData['Stellar Temperature']));
// planetSizeArray = Object.values(closePlanetData['Planet Radius']);
// starSizeArray = Object.values(closePlanetData['Stellar Radius'])
// distanceFromEarthArray = Object.values(closePlanetData['Distance from Earth'])
// distanceFromStarArray = Object.values(closePlanetData['Distance from Host Star'])

initialMaxDistance = 200
maxDistance = initialMaxDistance

closePlanetArray = planetArray.filter(planet => closePlanetData['Distance from Earth'][planet] < maxDistance);
closePlanetNames = []; closePlanetTemps = []; closeStarNames = []; closeStarTemps = [];
planetSize = []; starSize = []; distanceFromEarth = []; distanceFromStar = []; habitability = []

function limitDistance(x) {
for (let i = 0; i < planetArray.length; i++) {
  if (closePlanetData['Distance from Earth'][planetArray[i]] < maxDistance) {
    closePlanetNames.push(closePlanetData['Planet Name'][planetArray[i]]);
    closePlanetTemps.push(closePlanetData['Equilibrium Temperature'][planetArray[i]]);
    closeStarNames.push(closePlanetData['Star Name'][planetArray[i]]);
    closeStarTemps.push(closePlanetData['Stellar Temperature'][planetArray[i]]);
    planetSize.push(closePlanetData['Planet Radius'][planetArray[i]]);
    starSize.push(closePlanetData['Stellar Radius'][planetArray[i]]);
    distanceFromEarth.push(closePlanetData['Distance from Earth'][planetArray[i]]);
    distanceFromStar.push(closePlanetData['Distance from Host Star'][planetArray[i]]);
    habitability.push(closePlanetData['Habitability'][planetArray[i]])
  }
}
};

limitDistance(maxDistance)

console.log("planet index", closePlanetArray);
console.log("planet names", closePlanetNames);
console.log("planet temps", closePlanetTemps);
console.log("star names", closeStarNames);
console.log("habitability", habitability);

var myPlanet = closePlanetArray[4];
console.log(myPlanet)
var habitability = closePlanetData['Habitability'][myPlanet];

function planetColorScale(c) {
  if (c < 100) {return 'white';}
  else if (c < 200) {return 'rgb(176,224,230)';}
  else if (c < 250) {return 'blue';}
  else if (c < 300) {return 'green';}
  else if (c < 400) {return 'yellow';}
  else if (c < 500) {return 'orange';}
  else {return 'red';}
};

function starColorScale(c) {
  if (c < 2800) {return 'brown';} 
  else if (c < 4000) {return 'red';}
  else if (c < 6000) {return 'orange';}
  else if (c < 10000) {return 'yellow';}
  else if (c < 25000) {return 'white';}
  else {return 'blue';}
};

// scale sizes and colors
var planetColor = closePlanetTemps.map(x=>planetColorScale(x));
var starColor = closeStarTemps.map(x=>starColorScale(x));
var planetSizeScaled = planetSize.map(x=>x*10);
var starSizeScaled = starSize.map(x=>x*100);

//var xData; var yData; var text; var chartTitle; var xtitle; var ytitle;
trace = [{
  x: distanceFromEarth,
  y: distanceFromStar,
  mode: 'markers',
  marker: {size: planetSizeScaled, color: planetColor},
  text: closePlanetNames,
  type: 'scatter',
  }];

var layout= {
    plot_bgcolor:"#FFF3",
    paper_bgcolor:"transparent",
    title: {text:"Kepler Confirmed Planets", font: {family: 'Arial', size: 24, color: "white"}},
    xaxis: {title: {text: "Distance from Earth (Light Years)", font: {family: 'Arial', size: 14, color: 'white'}, showGrid:false, zeroLineColor:"white", tickColor: "white"}},
    yaxis: {title: {text: "Distance from Host Star (Astronomical Units)", font: {family: 'Arial', size: 14, color: 'white'}, showGrid:false, zeroLineColor:"white", tickColor: "white"}},
}

var starTrace = [{
  x: distanceFromEarth,
  y: closeStarTemps,
  mode: 'markers',
  type: 'scatter',
  marker: {size: starSizeScaled, color: starColor},
  text: closeStarNames,
}];

var starLayout= {
  plot_bgcolor:"#FFF3",
  paper_bgcolor:"transparent",
  title: {text:"Kepler Stars with Confirmed Planets", font: {family: 'Arial', size: 24, color: "white"}},
  xaxis: {title: {text: "Distance from Earth (Light Years)", font: {family: 'Arial', size: 14, color: 'white'}, showgrid: false, zerolinecolor:"white", tickcolor: "white"}},
  yaxis: {title: {text: "Temperature", font: {family: 'Arial', size: 14, color: 'white'}, showGrid: false, zerolinecolor:"white", tickcolor: "white"}},
}

//Create the trace for the gauge chart.
var gaugeData = [{
  value: habitability,
  type: "indicator",
  mode: "gauge+number",
  title: {text: "Habitability"},
  gauge: {
    axis: { range: [null, 2] },
    steps: [
      { range: [0,.65], color: "darkbrown", text: "Uninhabitable"},
      { range: [.65,1.35], color: "yellow", text: "Possibly inhabitable (optimistic estimate)"},
      { range: [1.35, 2], color: "green", text: "Possibly inhabitable (conservative estimate)"},
    ],
    bar: { color: "green" },
    }
}];
  
// Create the layout for the gauge chart.

var gaugeLayout = { 
  width: 400, 
  height: 350, 
  margin: { t: 0, b: 0 },
  paper_bgcolor: "transparent",
  font: {'color': "white"}
};

// create dynamic pie variables

var pieData = [{
  values: [10, 39, 2571],
  labels: ['Habitable (Conservative)', 'Habitable (Optimistic', 'Uninhabitable'],
  marker: {
    colors: ["green","yellow","brown"]
  },
  type: 'pie',
}];

var pieLayout = {
  height: 300,
  width: 500,
  paper_bgcolor: "transparent",
  font: {'color': "white", size:"10"},
  legend: {
    x: 1,
    xanchor: 'top',
    y: 1
  }
};

// Draw the initial plots
  Plotly.newPlot("plot", trace, layout);
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  Plotly.newPlot("pie", pieData, pieLayout);
  Plotly.newPlot("starPlot", starTrace, starLayout);

  d3.selectAll("#lightYears").on("change", updatePlotly);

  function updatePlotly() {
  console.log("that did something")
  let changedElement = d3.select(this);
  maxDistance = changedElement.property("value")
  console.log(maxDistance)

  closePlanetArray = planetArray.filter(planet => closePlanetData['Distance from Earth'][planet] < maxDistance);
  closePlanetNames = []; closePlanetTemps = []; closeStarNames = []; closeStarTemps = [];
  planetSize = []; starSize = []; distanceFromEarth = []; distanceFromStar = []; habitability = []

  for (let i = 0; i < planetArray.length; i++) {
    if (closePlanetData['Distance from Earth'][planetArray[i]] < maxDistance) {
      closePlanetNames.push(closePlanetData['Planet Name'][planetArray[i]]);
      closePlanetTemps.push(closePlanetData['Equilibrium Temperature'][planetArray[i]]);
      closeStarNames.push(closePlanetData['Star Name'][planetArray[i]]);
      closeStarTemps.push(closePlanetData['Stellar Temperature'][planetArray[i]]);
      planetSize.push(closePlanetData['Planet Radius'][planetArray[i]]);
      starSize.push(closePlanetData['Stellar Radius'][planetArray[i]]);
      distanceFromEarth.push(closePlanetData['Distance from Earth'][planetArray[i]]);
      distanceFromStar.push(closePlanetData['Distance from Host Star'][planetArray[i]]);
      habitability.push(closePlanetData['Habitability'][planetArray[i]]);
    }

  planetColor = closePlanetTemps.map(x=>planetColorScale(x));
  starColor = closeStarTemps.map(x=>starColorScale(x));
  planetSizeScaled = planetSize.map(x=>x*10);
  starSizeScaled = starSize.map(x=>x*100);

    var planetTrace = [{
      x: distanceFromEarth,
      y: distanceFromStar,
      mode: 'markers',
      type: 'scatter',
      marker: {size: planetSizeScaled, color: planetColor},
      text: closePlanetNames,
    }];
    
    var planetLayout= {
      plot_bgcolor:"#FFF3",
      paper_bgcolor:"#FFF3",
      title: {text:"Kepler Confirmed Planets", font: {family: 'Arial', size: 24, color: "white"}},
      xaxis: {title: {text: "Distance from Earth (Light Years)", font: {family: 'Arial', size: 14, color: 'white'}, showgrid: false, zerolinecolor:"white", tickcolor: "white"}},
      yaxis: {title: {text: "Distance from Host Star (Astronomical Units)", font: {family: 'Arial', size: 14, color: 'white'}, showgrid: false, zerolinecolor:"white", tickcolor: "white"}},
    }

    var starTrace = [{
      x: distanceFromEarth,
      y: closeStarTemps,
      mode: 'markers',
      type: 'scatter',
      marker: {size: starSizeScaled, color: starColor},
      text: closeStarNames,
    }];
    
    var starLayout= {
      plot_bgcolor:"#FFF3",
      paper_bgcolor:"#FFF3",
      title: {text:"Kepler Stars with Confirmed Planets", font: {family: 'Arial', size: 24, color: "white"}},
      xaxis: {title: {text: "Distance from Earth (Light Years)", font: {family: 'Arial', size: 14, color: 'white'}, showgrid: false, zerolinecolor:"white", tickcolor: "white"}},
      yaxis: {title: {text: "Temperature", font: {family: 'Arial', size: 14, color: 'white'}, showgrid: false, zerolinecolor:"white", tickcolor: "white"}},
    }

    Plotly.update("plot", planetTrace, planetLayout);
    Plotly.update("starPlot", starTrace, starLayout);
  };
 }
});
}
init();
