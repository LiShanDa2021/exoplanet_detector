
var i = 0;
function drawPlots(maxDistance) {
  if (maxDistance > 2620) {
    alert("TOO BIG!");
    return;
  }
  console.log(maxDistance)
  const url = '/api/close_planet_data'
  d3.json(url).then(function (closePlanetData) {

    planetArray = (Object.keys(closePlanetData['Planet Name']));

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

    function planetColorScale(c) {
      if (c < 100) { return 'white'; }
      else if (c < 200) { return 'rgb(176,224,230)'; }
      else if (c < 250) { return 'blue'; }
      else if (c < 300) { return 'green'; }
      else if (c < 400) { return 'yellow'; }
      else if (c < 500) { return 'orange'; }
      else { return 'red'; }
    };

    function starColorScale(c) {
      if (c < 2800) { return 'brown'; }
      else if (c < 4000) { return 'red'; }
      else if (c < 6000) { return 'orange'; }
      else if (c < 10000) { return 'yellow'; }
      else if (c < 25000) { return 'white'; }
      else { return 'blue'; }
    };

    // scale sizes and colors
    var planetColor = closePlanetTemps.map(x => planetColorScale(x));
    var starColor = closeStarTemps.map(x => starColorScale(x));
    var planetSizeScaled = planetSize.map(x => x * 10);
    var starSizeScaled = starSize.map(x => x * 100);

    trace = [{
      x: distanceFromEarth,
      y: distanceFromStar,
      mode: 'markers',
      marker: { size: planetSizeScaled, color: planetColor },
      text: closePlanetNames,
      type: 'scatter',
    }];

    var layout = {
      plot_bgcolor: "#FFF3",
      paper_bgcolor: "transparent",
      title: { text: "Kepler Confirmed Planets", font: { family: 'Arial', size: 24, color: "white" } },
      xaxis: { title: { text: "Distance from Earth (Light Years)", font: { family: 'Arial', size: 14, color: 'white' }, showGrid: false, zeroLineColor: "white", tickColor: "white" } },
      yaxis: { title: { text: "Distance from Host Star (Astronomical Units)", font: { family: 'Arial', size: 14, color: 'white' }, showGrid: false, zeroLineColor: "white", tickColor: "white" } },
    }

    var starTrace = [{
      x: distanceFromEarth,
      y: closeStarTemps,
      mode: 'markers',
      type: 'scatter',
      marker: { size: starSizeScaled, color: starColor },
      text: closeStarNames,
    }];

    var starLayout = {
      plot_bgcolor: "#FFF3",
      paper_bgcolor: "transparent",
      title: { text: "Kepler Stars with Confirmed Planets", font: { family: 'Arial', size: 24, color: "white" } },
      xaxis: { title: { text: "Distance from Earth (Light Years)", font: { family: 'Arial', size: 14, color: 'white' }, showgrid: false, zerolinecolor: "white", tickcolor: "white" } },
      yaxis: { title: { text: "Temperature", font: { family: 'Arial', size: 14, color: 'white' }, showGrid: false, zerolinecolor: "white", tickcolor: "white" } },
    }

    Plotly.newPlot("plot", trace, layout);
    Plotly.newPlot("starPlot", starTrace, starLayout);

    var myPlanet = closePlanetArray[4];
    console.log(myPlanet)
    var habitability = closePlanetData['Habitability'][myPlanet];

    var gaugeData = [{
      value: habitability,
      type: "indicator",
      mode: "gauge+number",
      title: { text: "Habitability" },
      gauge: {
        axis: { range: [null, 2] },
        steps: [
          { range: [0, .65], color: "darkbrown", text: "Uninhabitable" },
          { range: [.65, 1.35], color: "yellow", text: "Possibly inhabitable (optimistic estimate)" },
          { range: [1.35, 2], color: "green", text: "Possibly inhabitable (conservative estimate)" },
        ],
        bar: { color: "green" },
      }
    }];

    var gaugeLayout = {
      width: 400,
      height: 350,
      margin: { t: 0, b: 0 },
      paper_bgcolor: "transparent",
      font: { 'color': "white" }
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  }
  )
}

function setLimit() {
  let changedElement = d3.select(this);
  maxDistance = changedElement.property("value")
  drawPlots(maxDistance)
}

function moveGauge() {
  // var myPlanet = closePlanetArray[4];
  // console.log(myPlanet)
  // var habitability = closePlanetData['Habitability'][myPlanet];

  var gaugeData = [{
    value: 2,
    type: "indicator",
    mode: "gauge+number",
    title: { text: "Habitability" },
    gauge: {
      axis: { range: [null, 2] },
      steps: [
        { range: [0, .65], color: "darkbrown", text: "Uninhabitable" },
        { range: [.65, 1.35], color: "yellow", text: "Possibly inhabitable (optimistic estimate)" },
        { range: [1.35, 2], color: "green", text: "Possibly inhabitable (conservative estimate)" },
      ],
      bar: { color: "green" },
    }
  }];

  var gaugeLayout = {
    width: 400,
    height: 350,
    margin: { t: 0, b: 0 },
    paper_bgcolor: "transparent",
    font: { 'color': "white" }
  };

  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}

function drawPie() {
  var pieData = [{
    values: [10, 39, 2571],
    labels: ['Habitable (Conservative)', 'Habitable (Optimistic', 'Uninhabitable'],
    marker: {
      colors: ["green", "yellow", "brown"]
    },
    type: 'pie',
  }];

  var pieLayout = {
    height: 300,
    width: 500,
    paper_bgcolor: "transparent",
    font: { 'color': "white", size: "10" },
    legend: {
      x: 1,
      xanchor: 'top',
      y: 1
    }
  };
  Plotly.newPlot("pie", pieData, pieLayout);
  // maybe make this dynamic
}

function init() {
  drawPlots(200);
  drawPie();
  d3.selectAll("#lightYears").on("change", setLimit);
  d3.selectAll("#plot").on("click", moveGauge);
}
init();

















//     // create dynamic pie variables

var pieData = [{
  values: [10, 39, 2571],
  labels: ['Habitable (Conservative)', 'Habitable (Optimistic', 'Uninhabitable'],
  marker: {
    colors: ["green", "yellow", "brown"]
  },
  type: 'pie',
}];

var pieLayout = {
  height: 300,
  width: 500,
  paper_bgcolor: "transparent",
  font: { 'color': "white", size: "10" },
  legend: {
    x: 1,
    xanchor: 'top',
    y: 1
  }
};


//     Plotly.newPlot("gauge", gaugeData, gaugeLayout);
//     Plotly.newPlot("pie", pieData, pieLayout);














