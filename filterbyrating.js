const markerClusterGroupByFilter= L.markerClusterGroup({maxClusterRadius: 268,
  spiderfyOnMaxZoom: false,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom:11});

const redlayer = L.layerGroup();
const greenlayer = L.layerGroup();
const yellowlayer = L.layerGroup();
const darkredlayer = L.layerGroup();
const bluelayer = L.layerGroup();

const star4=L.icon({
  iconUrl:"images/rating-markers/green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:"images/rating-markers/marker-shadow.png",
  shadowSize: [41, 41]
});

const star3=L.icon({
  iconUrl:"images/rating-markers/yellow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:"images/rating-markers/marker-shadow.png",
  shadowSize: [41, 41]
});

const star2=L.icon({
  iconUrl:"images/rating-markers/darkred.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:"images/rating-markers/marker-shadow.png",
  shadowSize: [41, 41]
});
const star1=L.icon({
  iconUrl:"images/rating-markers/red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:"images/rating-markers/marker-shadow.png",
  shadowSize: [41, 41]
});

const star = L.icon({
  iconUrl: "images/rating-markers/darkblue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:"images/rating-markers/marker-shadow.png",
  shadowSize: [41, 41]
});



fetch('location.json?' + Date.now())
.then(response => response.json())
.then(chargepoints => {
  chargepoints.forEach(chargepoint => {

      if(chargepoint.rating==null){
          marker = L.marker([chargepoint.lattitude, chargepoint.longitude],{icon:star});
          bluelayer.addLayer(marker);
      }
      else if(chargepoint.rating>4){
           marker = L.marker([chargepoint.lattitude, chargepoint.longitude],{icon:star4}); 
           greenlayer.addLayer(marker);
      }
      else if(chargepoint.rating>3&&chargepoint.rating<=4){
           marker = L.marker([chargepoint.lattitude, chargepoint.longitude],{icon:star3}); 
           yellowlayer.addLayer(marker);
      }
      else if(chargepoint.rating>2&&chargepoint.rating<=3){
           marker = L.marker([chargepoint.lattitude, chargepoint.longitude],{icon:star2}); 
           darkredlayer.addLayer(marker);
      }else if(chargepoint.rating<=2){
           marker = L.marker([chargepoint.lattitude, chargepoint.longitude],{icon:star1}); 
           redlayer.addLayer(marker);
      }
          marker.bindPopup(`<b>${chargepoint.name}</b><p>${chargepoint.address}</p>`,{ closeButton: false }); // Add popup with chargepoint name
          
    //markerClusterGroupByFilter.addLayer(marker);
    
    marker.on('click', function (e) {
      
      if(currentControl!=null){
        map.removeControl(currentControl);
                currentControl = null;
      }
      if(usermarker!=null){
        usermarker.remove();
        usermarker=null;
      }
      
     curr=chargepoint.id;
      console.log(curr);
      if(isDataFetched==false){
          isDataFetched = true;
          document.querySelector('.right-commentbar').style.display = "block";
      }

      
      showcmt();

    coord1=e.latlng.lat;
    coord2=e.latlng.lng;

       

    });
  });


});




function addlayerRed(){
  markersLocator.forEach(marker => marker.remove());
  markersLocator=[];
  markers.forEach(marker => markerClusterGroup.removeLayer(marker));
  if(document.querySelector('.redcheck').checked){
    markerClusterGroupByFilter.addLayer(redlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
  else{
    removeItemsFromLayer(markerClusterGroupByFilter,redlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
}







function addlayerGreen(){
  markersLocator.forEach(marker => marker.remove());
  markersLocator=[];
  markers.forEach(marker => markerClusterGroup.removeLayer(marker));
  if(document.querySelector('.greencheck').checked){
    markerClusterGroupByFilter.addLayer(greenlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
  else{
    removeItemsFromLayer(markerClusterGroupByFilter,greenlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
}
function addlayerYellow(){
  markersLocator.forEach(marker => marker.remove());
  markersLocator=[];
  markers.forEach(marker => markerClusterGroup.removeLayer(marker));
  if(document.querySelector('.yellowcheck').checked){
    markerClusterGroupByFilter.addLayer(yellowlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
  else{
    removeItemsFromLayer(markerClusterGroupByFilter,yellowlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
}

function addlayerBlue(){
  markersLocator.forEach(marker => marker.remove());
  markersLocator=[];
  markers.forEach(marker => markerClusterGroup.removeLayer(marker));
  if(document.querySelector('.bluecheck').checked){
    markerClusterGroupByFilter.addLayer(bluelayer);
    map.addLayer(markerClusterGroupByFilter);
  }
  else{
    removeItemsFromLayer(markerClusterGroupByFilter,bluelayer);
    map.addLayer(markerClusterGroupByFilter);
  }
}
function addlayerDarkRed(){
  markersLocator.forEach(marker => marker.remove());
  markersLocator=[];
  markers.forEach(marker => markerClusterGroup.removeLayer(marker));
  if(document.querySelector('.darkredcheck').checked){
    markerClusterGroupByFilter.addLayer(darkredlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
  else{
    removeItemsFromLayer(markerClusterGroupByFilter,darkredlayer);
    map.addLayer(markerClusterGroupByFilter);
  }
}

function checkAllRatingCheckboxes() {
  var ratingCheckboxes = document.getElementsByName("charging-point-rating");
  for (var i = 0; i < ratingCheckboxes.length; i++) {
    ratingCheckboxes[i].checked = checkbox.checked;
  }
}

function removeItemsFromLayer(layer1, layer2) {
  layer1.eachLayer(layer1Item => {
    const layer2Item = layer2.getLayer(layer1Item._leaflet_id);
    if (layer2Item) {
      layer1.removeLayer(layer1Item);
    }
  });
}
