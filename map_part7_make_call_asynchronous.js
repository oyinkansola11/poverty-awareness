var ourLoc;
var view;
var map;

function init() {
	// Initalize things here
	ourLoc = ol.proj.fromLonLat([41.043316, 28.862457]);

	view = new ol.View({
		center: ourLoc,
		zoom: 6
	});

	map = new ol.Map({
		target: 'map',
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM()
		  })
		],
		// Note from the View Animation website:
		// Improve user experience by loading tiles while animating. Will make
		// animations stutter on mobile or slow devices.
		loadTilesWhileAnimating: true,
		view: view
	});
}

function panHome() {
	view.animate({
		center: ourLoc, // "Home" Location
		duration: 2000  // Two seconds
	});
}

function Nigeria(){
	ng = ol.proj.fromLonLat([8.6753, 9.0820]);
	view.animate({
		center: ng, // "Home" Location
		duration: 2000 //Two seconds
	});
}

function CentralAfricaRepublic(){
	ca = ol.proj.fromLonLat([20.9394, 6.6111]);
	view.animate({
	center: ca, // "Home" Location
	duration: 2000 // Two seconds
 });
}

function Burundi(){
	bu = ol.proj.fromLonLat([29.9189, 3.3731]);
	view.animate({
	center: bu, // "Home" Location
	duration: 2000 // Two seconds
 });
}

function Congo(){
	co = ol.proj.fromLonLat([21.7587, 4.0383]);
	view.animate({
	center: co, // "Home" Location
	duration: 2000 // Two seconds
});
}

function Somalia(){
	so = ol.proj.fromLonLat([46.1996, 5.1521]);
	view.animate({
	center: so, // "Home" Location
	duration: 2000 // Two seconds
});
}

function Liberia(){
	li = ol.proj.fromLonLat([9.4281, 6.4281]);
	view.animate({
	center: li, // "Home" Location
	duration: 2000 // Two seconds
});
}

// Step 1: Make a new function with this name.
// Copy from the Pan To Location function:
// countryName, query, countryRequest
// countryRequest.open()
// countryRequest.send()
function makeCountryRequest() {
	var countryName = document.getElementById("country-name").value;

	if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}

	var query = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true"

	query = query.replace(/ /g, "%20")

	countryRequest = new XMLHttpRequest();

	// Step 1: Switch this last condition to TRUE
	// This changes the call from synchronous to
	// an asynchronous call.
	countryRequest.open('GET', query, true);

	// Step 2: Add an onload function to process
	// what happens when we send the HTTP Request.
	countryRequest.onload = processCountryRequest

	countryRequest.send();
}

function processCountryRequest() {
	// Step 3: In the onload function, we wait
	// until the request is complete.
	if(countryRequest.readyState != 4) {
		return;
	}

	// Step 4: Once the request is completed,
	// We look for errors.
	if (countryRequest.status != 200 || countryRequest.responseText === "") {
	 	alert("We were unable to find your requested country!");
	 	return;
	}


	// Step 5: Now that the errors are gone, we add
	// in what happens when the request succeeds.
	var countryInformation = JSON.parse(countryRequest.responseText);
	var lon = countryInformation[0].latlng[1];
	var lat = countryInformation[0].latlng[0];

	// Note: If you run into an error like the map
	// disappearing, check that you have your
	// longtidue and latitude variables mapped
	// to the right indexes. Lon is index 1,
	// lat is index 0.
	//window.console.log("lon " + lon + " & lat " + lat);

	var location = ol.proj.fromLonLat([lon, lat]);

	// Note: If you run into an error like window
	// not loading, check that you declared VAR
	// before the location variable.
	//window.console.log("location " + location);

	view.animate({
		center: location, // Location
		duration: 2000  // Two seconds
	});
}

window.onload = init;
