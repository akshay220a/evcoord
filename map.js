var map = L.map('map').setView([11.19410,75.89060], 12);

// Create both tile layers and add them to the map
var googleTileLayer = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    minZoom: 4,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

var darkTileLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 18,
    minZoom: 4
});

var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    subdomains:['mt0','mt1','mt2','mt3'],
    maxZoom: 18,
    minZoom: 4,
    attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>',
});

map.zoomControl.remove();

var baseLayers = {
    'GoogleMap': googleTileLayer,
    'Satellite': googleSat,
    'darkTileLayer':darkTileLayer,
  };



const layers=document.querySelector('.layers');
const layer1=document.getElementById('layer1');
const layer2=document.getElementById('layer2');
const mapdef=document.getElementById('mapdef');
const mapsat=document.getElementById('mapsat');
layer2.style.display="none";
layer1.style.display="flex";
mapdef.style.borderColor="grey";
mapsat.style.borderColor="transparent";
function layerdef(){
  mapdef.style.borderColor="grey";
  mapsat.style.borderColor="transparent";
  map.removeLayer(googleSat);
    // Show the dark tile layer
    googleTileLayer.addTo(map);
    layer2.style.display="none";
    layer1.style.display="flex";
}

function layersat(){
  mapdef.style.borderColor="transparent";
  mapsat.style.borderColor="grey";
  map.removeLayer(googleTileLayer);
    // Show the dark tile layer
    googleSat.addTo(map);
    layer2.style.display="none";
    layer1.style.display="flex";
}

let b = 0;

layers.addEventListener("click", () => {

  if (b % 2 == 0) {
    layer1.style.display = "none";
    layer2.style.display = "flex";
  } else {
    layer1.style.display = "flex";
    layer2.style.display = "none";
  }

  b++;
});
