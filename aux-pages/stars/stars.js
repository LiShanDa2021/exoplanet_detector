console.log("hi");

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("cleaned_planet_exploration_data.json").then((data) => {
        console.log("hello");
    //   var sampleNames = data.names;
  
    //   sampleNames.forEach((sample) => {
    //     selector
    //       .append("option")
    //       .text(sample)
    //       .property("value", sample);
    //   });
  
    //   // Use the first sample from the list to build the initial plots
    //   var firstSample = sampleNames[0];
    //   buildCharts(firstSample);
    //   buildMetadata(firstSample);
    });
  }

  

  
  // Initialize the dashboard
init();
  
//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildMetadata(newSample);
//     buildCharts(newSample);
//   }
  
//   // Demographics Panel 
//   function buildMetadata(sample) {
//     d3.json("samples.json").then((data) => {
//       var metadata = data.metadata;
//       // Filter the data for the object with the desired sample number
//       var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//       var result = resultArray[0];
//       // Use d3 to select the panel with id of `#sample-metadata`
//       var PANEL = d3.select("#sample-metadata");
  
//       // Use `.html("") to clear any existing metadata
//       PANEL.html("");
  
//       // Use `Object.entries` to add each key and value pair to the panel
//       // Hint: Inside the loop, you will need to use d3 to append new
//       // tags for each key-value in the metadata.
//       Object.entries(result).forEach(([key, value]) => {
//         PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//       });
  
//     });
//   }
  
//   // 1. Create the buildCharts function.
//   function buildCharts(sample) {
//     // 2. Use d3.json to load and retrieve the samples.json file 
//     d3.json("samples.json").then((data) => {
//       // 3. Create a variable that holds the samples array. 
//       sammplesArray = data.samples;
//       //console.log(sammplesArray)
//       // 4. Create a variable that filters the samples for the object with the desired sample number.
//       mySample = sammplesArray.filter(sampleObj => sampleObj.id == sample);
//       //console.log(mySample);
  
//       //  5. Create a variable that holds the first sample in the array.
//       firstSample = mySample[0];
//       //console.log(firstSample);
  
//       // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
//       otuIDs = mySample[0].otu_ids;
//       otuLabels = mySample[0].otu_labels;
//       sampleValues = mySample[0].sample_values;
//       //console.log(otuLabels);
//       //console.log(sampleValues);
  
//       // 7. Create the yticks for the bar chart.
//       // Hint: Get the the top 10 otu_ids and map them in descending order  
//       //  so the otu_ids with the most bacteria are last. 
  
//       //topTenIds =  otuIDs.sort((a,b) => sampleValues[b] - sampleValues[a]).slice(0,10);
//       //console.log(topTenIds)
  
//       var IDsInOrder = otuIDs.sort((a,b) => sampleValues[b] - sampleValues[a]).slice(0,10);
//       var yticks = IDsInOrder.map(id => ("OTU " + id)).reverse();
//       var xValues = sampleValues.sort((a,b) => b - a).slice(0,10).reverse();
  
//       //let's get those labels in order
//       var barText = otuLabels.sort((a,b) => sampleValues[b] - sampleValues[a]).slice(0,10).reverse();
  
//       // 8. Create the trace for the bar chart. 
//       var barData = [{
//         x: xValues,
//         y: yticks,
//         type: "bar",
//         orientation: "h",
//         text: barText
//     }];
//       // 9. Create the layout for the bar chart. 
//       var barLayout = {
//        title: "Top 10 Bacteria Cultures Found"
//       };
//       // 10. Use Plotly to plot the data with the layout.
//       Plotly.newPlot("bar", barData, barLayout);
  
//   // 1. Create the trace for the bubble chart.
//   var bubbleData = [{
//     x: otuIDs,
//     y: sampleValues,
//     mode: "markers",
//     marker: {size: sampleValues, color: otuIDs},
//     text: barText.reverse()
//   }];
  
//   // 2. Create the layout for the bubble chart.
//   var bubbleLayout = {
//     title: 'Bacteria Cultures Per Sample',
//     xaxis: {title: "OTU ID"},
//   };
  
//   // 3. Use Plotly to plot the data with the layout.
//   Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
//   // 3. Create a variable that holds the washing frequency.
//   var gaugeMD = data.metadata
//   sampleMD = gaugeMD.filter(i => i.id == sample)
//   wFreq = parseFloat(sampleMD[0].wfreq)
//   console.log(wFreq);
     
//   // Create the yticks for the bar chart.
  
//   // 4. Create the trace for the gauge chart.
//     var gaugeData = [{
//       value: wFreq,
//       type: "indicator",
//       mode: "gauge+number",
//       title: {text: "Wash Frequency"},
//       gauge: {
//         axis: { range: [null, 10] },
//         steps: [
//           { range: [0, 2], color: "red" },
//           { range: [2, 4], color: "orange" },
//           { range: [4, 6], color: "yellow" },
//           { range: [6, 8], color: "green" },
//           { range: [8, 10], color: "blue" },
//         ],
//         bar: { color: "black" },
//         }
//     }];
      
//   // 5. Create the layout for the gauge chart.
//     var gaugeLayout = { 
//       width: 600, 
//       height: 450, 
//       margin: { t: 0, b: 0 }
//     };
  
//   // 6. Use Plotly to plot the gauge data and layout.
//     Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  
  
//   });
  
//   }
  