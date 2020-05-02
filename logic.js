// Create a map object
var Map1 = L.map("map", {
  center: [0,0],
  preferCanvas: true,
  zoom: 3
});

var layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
})

layer.addTo(Map1)



d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  // inside scope
  console.log(data);

L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, coordinates) {
    
    return L.circleMarker(coordinates);
  },
  // We set the style for each circleMarker using our styleInfo function.
  style: {weight: 1},
  // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(Map1);
})

// // Create earthquake array for population
// var earthquakes = [];

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
//   var features = data.features;
//   // console.log(features)
//   for (var i = 0; i<features.length; i++) {
//     earthquakes.push({
//       place: features[i].properties.place,
//       location: [features[i].geometry.coordinates[0], features[i].geometry.coordinates[1]],
//       mag: features[i].properties.mag
//     })
//   }
// });

// console.log(earthquakes)

// // Loop through the earthquakes array and create one marker for each object
// for (var i = 0; i < earthquakes.length; i++) {

//   // Conditionals for earthquake mag coloring
//   var color = "";
//   if (earthquakes[i].mag > 4.0) {
//     var color = "red";
//   }
//   else if (earthquakes[i].mag > 2.0) {
//     var color = "yellow";
//   }
//   else if (earthquakes[i].mag > 0.0) {
//     var color = "green";
//   }
//   else {
//     var color = "blue";
//   }

//   // Add circles to map
//   L.circle(earthquakes[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust radius
//     radius: earthquakes[i].mag * 5000
//   }).bindPopup("<h1>" + earthquakes[i].place + "</h1> <hr> <h3>Magnitude: " + earthquakes[i].mag + "</h3>").addTo(Map1);
// }
