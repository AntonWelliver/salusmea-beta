//Function mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibGFyc24iLCJhIjoiY2s2YzByNTh4MDZjdTNxb21lMjY3NjBnMSJ9.bbEbVqLCn7Oco1FXsI1nFQ'; // token key

//set out the map
var map = new mapboxgl.Map({
    container: 'map1', // container id
    style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
    center: [11.975482095909456, 57.69282011876044], // starting position
    zoom: 16, // starting zoom

});

/* Resize function from map.js */
/* var biggerSmaller = '';

map.on('load', function () {
    var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
    var mapDiv = document.getElementById('map');
    var mapButton = document.getElementById('mapbtn');

    mapButton.onclick = function () {
        if (biggerSmaller !== 'smaller') {
            mapDiv.style.width = '100%';
            mapCanvas.style.width = '100%';
            biggerSmaller = 'smaller';
        }
        map.resize();
    };
}); */

var layerList = document.getElementById('menu3');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
};

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
};

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());