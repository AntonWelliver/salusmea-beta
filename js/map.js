//Function mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibGFyc24iLCJhIjoiY2s2YzByNTh4MDZjdTNxb21lMjY3NjBnMSJ9.bbEbVqLCn7Oco1FXsI1nFQ'; // token key

//set out the map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
    center: [11.975482095909456, 57.69282011876044], // starting position
    zoom: 16, // starting zoom

});

var biggerSmaller = '';

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
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
};

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
};
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: false,
    placeholder: "Adress",
    countries: 'SE',
    minLength: 2,
    
        flyTo: {
            bearing: 0,
            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 1.5, // make the flying slow
            curve: 1, // change the speed at which it zooms out
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function(t) {
                return t;
            }
        },
    mapboxgl: mapboxgl
    });
    
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());